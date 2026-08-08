// ==============================
// 1. IMPORTS
// ==============================
import React, { useState, useEffect } from "react";
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
  TableFooter,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import useFacilities from "@/Hooks/useFacilities";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";
import DeleteConfirmation from "@/Shared/delete confirmation/delete confirmation";
import { useForm } from "react-hook-form";

// ==============================
// 2. COMPONENT
// ==============================
export default function FacilityList() {
  // --- States ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFacilityDialogOpen, setIsFacilityDialogOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "update"
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // --- Custom Hooks & Data ---
  const {
    data,
    totalCount,
    loading,
    getFacilities,
    deleteFacility,
    addFacility,
    updateFacility,
  } = useFacilities();

  // --- API Calls ---
  useEffect(() => {
    getFacilities(page, rowsPerPage);
  }, [page, rowsPerPage, getFacilities]);

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
    formState: { errors },
  } = useForm();

  // ==============================
  // 3. EVENT HANDLERS
  // ==============================
  const handleClick = (event, facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  // --- Delete Dialog ---
  const handleOpenDeleteDialog = () => {
    handleCloseMenu();
    setTimeout(() => {
      setIsDeleteDialogOpen(true);
    }, 0);
  };
  
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedFacility(null);
  };
  
  const confirmDelete = async () => {
    if (selectedFacility) {
      await deleteFacility(selectedFacility._id, page, rowsPerPage);
      handleCloseDeleteDialog();
    }
  };

  // --- Facility Dialog (Add / Update) ---
  const handleOpenFacilityDialog = (mode, facility = null) => {
    setMode(mode);
    if (mode === "update" && facility) {
      reset({ name: facility.name });
    } else {
      reset({ name: "" });
    }
    handleCloseMenu();
    setTimeout(() => {
      setIsFacilityDialogOpen(true);
    }, 0);
  };

  const handleCloseFacilityDialog = () => {
    setIsFacilityDialogOpen(false);
    reset();
    setSelectedFacility(null);
  };

  const onSubmitFacility = async (formData) => {
    if (mode === "add") {
      await addFacility(formData.name, 0, rowsPerPage);
      setPage(0);
    } else {
      await updateFacility(selectedFacility._id, { name: formData.name }, page, rowsPerPage);
    }
    handleCloseFacilityDialog();
  };

  // ==============================
  // 4. RENDER
  // ==============================
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
            sx={{
              fontWeight: "bold",
              color: "#1F263E",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            Facilities Table Details
          </Typography>
          <Typography variant="body1" sx={{ color: "#6c757d", mt: 0.5 }}>
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
          Add New Facility
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
              {["Name", "Created At", "Created By", "Updated At", "Actions"].map(
                (headerName) => (
                  <TableCell
                    key={headerName}
                    align={headerName === "Actions" ? "right" : "left"}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        justifyContent:
                          headerName === "Actions" ? "flex-end" : "flex-start",
                      }}
                    >
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
                )
              )}
            </TableRow>
          </TableHead>

          {/* ================= TABLE BODY (DATA) ================= */}
          <TableBody sx={{ "& .MuiTableCell-body": { color: "#3A3A3D" } }}>
            {data?.length > 0 ? (
              data.map((facility, index) => (
                <TableRow
                  key={facility._id || facility.id}
                  sx={{
                    "&:hover": { backgroundColor: "#F8F9FB" },
                    transition: "0.3s",
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                  }}
                >
                  <TableCell sx={{ fontWeight: "500" }}>{facility.name}</TableCell>
                  <TableCell>
                    {new Date(facility.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{facility.createdBy?.userName || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(facility.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleClick(e, facility)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : !loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No facilities found</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>

          {/* ================= TABLE FOOTER (PAGINATION) ================= */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={totalCount || 0}
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
        <MenuItem onClick={() => handleOpenFacilityDialog("update", selectedFacility)}>
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
        itemName={selectedFacility?.name}
        loading={loading}
      />

      {/*================= Facility Modal (Add / Update) ==================*/}
      <Dialog
        open={isFacilityDialogOpen}
        onClose={handleCloseFacilityDialog}
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
            {mode === "add" ? "Add Facility" : "Update Facility"}
          </Typography>
          <IconButton onClick={handleCloseFacilityDialog} size="small">
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
            onSubmit={handleSubmit(onSubmitFacility)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              fullWidth
              placeholder="Facility Name"
              {...register("name", { required: "Facility Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
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
                    <Typography
                      sx={{
                        fontWeight: "600",
                        color: "#fff",
                        textTransform: "none",
                      }}
                    >
                      Loading...
                    </Typography>
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
