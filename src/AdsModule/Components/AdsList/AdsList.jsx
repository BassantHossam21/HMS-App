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
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close"; // إضافة الـ CloseIcon
import useAds from "@/Hooks/useAds";
import deleteImg from "@/assets/images/Delete.png";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "@/Api/AxiosClient";

import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";
import { TableFooter, TablePagination } from "@mui/material";
import DeleteConfirmation from "@/Shared/delete confirmation/delete confirmation";

// ==============================
// 1. COMPONENT
// ==============================
export default function AdsList() {
  // --- States ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdsDialogOpen, setIsAdsDialogOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "update"
  const [selectedAds, setSelectedAds] = useState(null);
  const [rooms, setRooms] = useState([]);
  const open = Boolean(anchorEl);

  // --- Custom Hooks & Data ---
  const { data, total, loading, getAds, deleteAds, addAds, updateAds } = useAds();

  // --- API Calls ---
  useEffect(() => {
    getAds(page, rowsPerPage);
  }, [page, rowsPerPage]);

  // --- Handlers for Pagination ---
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    if (document.activeElement) {
      document.activeElement.blur();
    }
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
    handleCloseMenu();
    setTimeout(() => {
      setIsDeleteDialogOpen(true);
    }, 0);
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
    handleCloseMenu();
    setTimeout(() => {
      setIsAdsDialogOpen(true);
    }, 0);
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
      {/* ================= FULL SCREEN LOADING ================= */}
      <LoadingSpinner loading={loading} />

      {/* ================= PAGE HEADER SECTION ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 2, sm: 0 },
          mb: 4,
          mt: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1F263E", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Ads Table Details
          </Typography>
          <Typography variant="body1" sx={{ color: "#6c757d", mt: 0.5 }}>
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
            px: { xs: 2, sm: 4 },
            py: 1.2,
            fontWeight: "500",
            boxShadow: "none",
            width: { xs: "100%", sm: "auto" },
            "&:hover": {
              backgroundColor: "#1831a3",
              boxShadow: "none",
            },
          }}
        >
          Add New Ads
        </Button>
      </Box>

      {/* ================= TABLE CONTAINER ================= */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "12px", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 1000 }}>
          {/* ================= TABLE HEADERS ================= */}
          <TableHead
            sx={{
              backgroundColor: "#E2E5EB",
              "& .MuiTableCell-root": {
                color: "#1F263E",
                fontWeight: "600",
                fontSize: "16px",
                padding: "20px 16px",
              },
            }}
          >
            <TableRow sx={{ height: "80px" }}>
              {[
                "Room Name",
                "Image",
                "Price",
                "Discount",
                "Capacity",
                "Active",
                "Actions",
              ].map((headerName) => (
                <TableCell key={headerName} align={headerName === "Actions" ? "right" : "left"}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: headerName === "Actions" ? "flex-end" : "flex-start" }}>
                    {headerName}
                    <UnfoldMoreIcon
                      htmlColor="#203FC7"
                      sx={{
                        fontSize: "26px",
                        stroke: "#203FC7",
                        strokeWidth: 0.4,
                      }}
                    />
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY (DATA) ================= */}
          <TableBody sx={{ "& .MuiTableCell-body": { color: "#3A3A3D" } }}>
            {data?.length > 0 ? (
              data.map((ad) => (
                <TableRow
                  key={ad._id}
                  sx={{
                    "&:hover": { backgroundColor: "#F8F9FB" },
                    transition: "0.3s",
                  }}
                >
                  <TableCell sx={{ fontWeight: "500" }}>
                    {ad.room?.roomNumber || "N/A"}
                  </TableCell>
                  <TableCell>
                    {ad.room?.images?.[0] ? (
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
                  <TableCell>${ad.room?.price || 0}</TableCell>
                  <TableCell>${ad.room?.discount || ad.discount || 0}</TableCell>
                  <TableCell>{ad.room?.capacity || "N/A"}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: ad.isActive ? "#2e7d32" : "#d32f2f",
                        fontWeight: "600",
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
              ))
            ) : !loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>No ads found</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>

          {/* ================= TABLE FOOTER (PAGINATION) ================= */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={total || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                labelRowsPerPage="Showing:"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        disableScrollLock
        disableRestoreFocus
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
      <DeleteConfirmation
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={confirmDelete}
        itemName={selectedAds?.room?.roomNumber}
        loading={loading}
      />

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
            px: { xs: 0, sm: 2 },
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
                disabled={loading}
                sx={{
                  backgroundColor: "#203FC7",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: { xs: 2, sm: 6 },
                  py: 1.2,
                  width: { xs: "100%", sm: "auto" },
                  fontWeight: "600",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#1831a3",
                    boxShadow: "none",
                  },
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                    <Typography sx={{ fontWeight: "600", color: "#fff", textTransform: "none" }}>Loading...</Typography>
                  </Box>
                ) : mode === "add" ? (
                  "Save"
                ) : (
                  "Update"
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
