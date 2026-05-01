import React, { useState } from "react";
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
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useFacilities from "../../../Hooks/useFacilities";
import deleteImg from "../../../assets/images/Delete.png";
import { useForm } from "react-hook-form";

export default function FacilityList() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFacilityDialogOpen, setIsFacilityDialogOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "update"
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  let { data, deleteFacility, loading, addFacility, updateFacility } =
    useFacilities();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = (event, facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //========================Delete Dialog===================================
  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    handleCloseMenu();
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedFacility(null);
  };
  const confirmDelete = async () => {
    if (selectedFacility) {
      await deleteFacility(selectedFacility._id);
      handleCloseDeleteDialog();
    }
  };

  //========================Facility Dialog (Add / Update)===================================
  const handleOpenFacilityDialog = (mode, facility = null) => {
    setMode(mode);
    if (mode === "update" && facility) {
      reset({ name: facility.name });
    } else {
      reset({ name: "" });
    }
    setIsFacilityDialogOpen(true);
    handleCloseMenu();
  };

  const handleCloseFacilityDialog = () => {
    setIsFacilityDialogOpen(false);
    reset();
    setSelectedFacility(null);
  };

  const onSubmitFacility = async (data) => {
    if (mode === "add") {
      await addFacility(data.name);
    } else {
      await updateFacility(selectedFacility._id, { name: data.name });
    }
    handleCloseFacilityDialog();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 10,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", color: "#1F263E", fontSize: "1.25rem" }}
          >
            Facilities Table Details
          </Typography>
          <Typography variant="body2" sx={{ color: "#3A3A3D", mt: 0.5 }}>
            You can check all details
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleOpenFacilityDialog("add")}
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
          Add New Facility
        </Button>
      </Box>

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
              <TableCell>Name</TableCell>
              <TableCell>CreatedAt</TableCell>
              <TableCell>CreatedBy</TableCell>
              <TableCell>updatedAt</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((facility, index) => (
              <TableRow
                key={facility._id || facility.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                  "& td": { border: "none", py: 2, color: "#3A3A3D" },
                }}
              >
                <TableCell component="th" scope="row" sx={{ border: "none" }}>
                  {facility.name}
                </TableCell>
                <TableCell>
                  {new Date(facility.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{facility.createdBy?.userName}</TableCell>
                <TableCell>
                  {new Date(facility.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{facility.description}</TableCell>
                <TableCell>{facility.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleClick(e, facility)}>
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
        <MenuItem
          onClick={() => handleOpenFacilityDialog("update", selectedFacility)}
        >
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
            Delete This {selectedFacility?.name} Room ?
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

      {/*================= Facility Modal (Add / Update) ==================*/}
      <Dialog
        open={isFacilityDialogOpen}
        onClose={handleCloseFacilityDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: "15px", p: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "700", color: "#333" }}>
            {mode === "add" ? "Add Facility" : "Update Facility"}
          </Typography>
          <IconButton onClick={handleCloseFacilityDialog} size="small">
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

        <DialogContent sx={{ mt: 2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitFacility)}
            noValidate
          >
            <TextField
              fullWidth
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#F8F9FB",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                  "&.Mui-focused fieldset": { borderColor: "#203FC7" },
                },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#203FC7",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 5,
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
