import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Select,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close"; // إضافة الـ CloseIcon
import useAds from "../../../Hooks/useAds";
import deleteImg from "../../../assets/images/Delete.png";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../Api/AxiosClient";

export default function AdsList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdsDialogOpen, setIsAdsDialogOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "update"
  const [selectedAds, setSelectedAds] = useState(null);
  const [rooms, setRooms] = useState([]);
  const open = Boolean(anchorEl);

  const { data, deleteAds, addAds, updateAds } = useAds();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      room: "",
      discount: "",
      isActive: true,
    },
  });

  const handleClick = (event, ad) => {
    setAnchorEl(event.currentTarget);
    setSelectedAds(ad);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getRooms = async () => {
    try {
      const res = await axiosClient.get("/api/v0/admin/rooms", {
        params: { pageSize: 100, pageNumber: 1 },
      });
      setRooms(res.data.data.rooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  //========================Delete Dialog===================================
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseMenu();
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAds(null);
  };
  const confirmDelete = async () => {
    if (selectedAds) {
      await deleteAds(selectedAds._id);
      handleCloseDeleteDialog();
    }
  };

  //========================Ads Dialog (Add/Update)===================================
  const handleOpenAdsDialog = (mode, selectedAds = null) => {
    console.log("Opening Ads Dialog:", mode, selectedAds);
    setMode(mode);
    if (mode === "update" && selectedAds) {
      reset({
        room: selectedAds.room?._id,
        discount: selectedAds.discount ?? selectedAds.room?.discount,
        isActive: selectedAds.isActive,
      });
    } else {
      reset({
        room: "",
        discount: "",
        isActive: true,
      });
    }
    setIsAdsDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseAdsDialog = () => {
    setIsAdsDialogOpen(false);
    reset();
    setSelectedAds(null);
  };

  const onSubmitAds = async (data) => {
    console.log("Submitting Ads Form:", mode, data);

    try {
      if (mode === "add") {
        await addAds(data);
      } else {
        const updateData = {
          discount: data.discount,
          isActive: data.isActive,
        };
        await updateAds(selectedAds._id, updateData);
      }
      handleCloseAdsDialog();
    } catch (err) {
      console.error(
        "Form Submission Error Details:",
        JSON.stringify(err.response?.data || err),
      );
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", color: "#1F263E", fontSize: "1.25rem" }}
          >
            Ads Table Details
          </Typography>
          <Typography variant="body2" sx={{ color: "#3A3A3D", mt: 0.5 }}>
            You can check all details
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleOpenAdsDialog("add")}
          sx={{
            backgroundColor: "#203FC7",
            borderRadius: "8px",
            textTransform: "none",
            px: 4,
            py: 1.2,
            fontWeight: "500",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#1831a3",
              boxShadow: "none",
            },
          }}
        >
          Add New Ads
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: "15px",
          overflow: "hidden",
          border: "none",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#E2E5EB",
                "& th": {
                  border: "none",
                  fontWeight: "bold",
                  color: "#1F263E",
                  py: 3,
                },
              }}
            >
              <TableCell>Room Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ad, index) => (
              <TableRow
                key={ad._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                  "& td": { border: "none", py: 2, color: "#3A3A3D" },
                }}
              >
                <TableCell sx={{ fontWeight: "500" }}>
                  {ad.room.roomNumber}
                </TableCell>
                <TableCell>
                  {ad.room.images?.[0] ? (
                    <Box
                      component="img"
                      src={ad.room.images[0]}
                      alt="Room"
                      sx={{
                        width: "60px",
                        height: "45px",
                        borderRadius: "8px",
                        objectFit: "cover",
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      No Image
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{ad.room.price}</TableCell>
                <TableCell>{ad.room.discount}</TableCell>
                <TableCell>{ad.room.capacity}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: ad.isActive ? "#2e7d32" : "#d32f2f",
                      fontWeight: "500",
                    }}
                  >
                    {ad.isActive ? "Yes" : "No"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleClick(e, ad)}>
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
            borderRadius: "12px",
            minWidth: 150,
            "& .MuiMenuItem-root": {
              px: 2,
              py: 1.5,
              gap: 1.5,
              "&:hover": { backgroundColor: "#f8fafc" },
            },
          },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <VisibilityOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            View
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleOpenAdsDialog("update", selectedAds)}>
          <EditOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog}>
          <DeleteOutlineOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>

      {/*================= Delete Confirmation Modal ==================*/}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "15px", p: 2 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleCloseDeleteDialog} size="small">
            <CloseIcon
              sx={{
                color: "red",
                border: "1px solid red",
                borderRadius: "50%",
                fontSize: 16,
                p: 0.2,
              }}
            />
          </IconButton>
        </Box>

        <DialogContent sx={{ textAlign: "center", pb: 4 }}>
          <Box sx={{ mb: 3 }}>
            <img src={deleteImg} alt="Delete" style={{ width: "120px" }} />
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: "700", color: "#333", mb: 1 }}
          >
            Delete This {selectedAds?.room?.roomNumber} Room ?
          </Typography>

          <Typography variant="body2" sx={{ color: "#666", mb: 4, px: 2 }}>
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCloseDeleteDialog}
              sx={{
                borderColor: "#ccc",
                color: "#666",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                "&:hover": { borderColor: "#999", bgcolor: "transparent" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={confirmDelete}
              sx={{
                backgroundColor: "#ef4444",
                textTransform: "none",
                borderRadius: "8px",
                px: 4,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#dc2626", boxShadow: "none" },
              }}
            >
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/*================= Ads Modal (Add / Update) ==================*/}
      <Dialog
        open={isAdsDialogOpen}
        onClose={handleCloseAdsDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "20px", p: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 1,
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "700", color: "#333" }}>
            {mode === "add" ? "Add Ads" : "Update Ads"}
          </Typography>
          <IconButton onClick={handleCloseAdsDialog} size="small">
            <CloseIcon
              sx={{
                color: "red",
                border: "1px solid red",
                borderRadius: "50%",
                fontSize: 18,
                p: 0.3,
              }}
            />
          </IconButton>
        </Box>

        <DialogContent sx={{ mt: 0 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitAds)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {/* Room Name Select */}
            <FormControl fullWidth error={!!errors.room}>
              <Controller
                name="room"
                control={control}
                rules={{ required: "Room is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#F8F9FB",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#203FC7",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <Typography color="text.secondary">Room Name</Typography>
                    </MenuItem>
                    {rooms.map((room) => (
                      <MenuItem key={room._id} value={room._id}>
                        {room.roomNumber}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.room && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 0.5, ml: 1 }}
                >
                  {errors.room.message}
                </Typography>
              )}
            </FormControl>

            {/* Discount TextField */}
            <TextField
              fullWidth
              placeholder="Discount"
              type="number"
              {...register("discount", {
                required: "Discount is required",
                valueAsNumber: true,
              })}
              error={!!errors.discount}
              helperText={errors.discount?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F8F9FB",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                  "&.Mui-focused fieldset": { borderColor: "#203FC7" },
                },
              }}
            />

            {/* Active Select */}
            <FormControl fullWidth>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    IconComponent={ExpandMoreIcon}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: "#F8F9FB",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ccc",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#203FC7",
                      },
                    }}
                  >
                    <MenuItem value="active_placeholder" disabled>
                      <Typography color="text.secondary">Active</Typography>
                    </MenuItem>
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#203FC7",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 6,
                  py: 1.2,
                  fontWeight: "600",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#1831a3",
                    boxShadow: "none",
                  },
                }}
              >
                {mode === "add" ? "Save" : "Update"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
