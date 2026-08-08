import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  TableFooter,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useRooms from "@/Hooks/useRooms";
import DeleteConfirmation from "@/Shared/delete confirmation/delete confirmation";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";

export default function Rooms() {
  const { fetchRooms, deleteRoom, fetchFacilities } = useRooms();
  const navigate = useNavigate();

  // ===================== States & Variables =====================
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filters
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilities, setFacilities] = useState([]);

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ===================== Fetch Data =====================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const facs = await fetchFacilities();
        setFacilities(facs || []);

        const data = await fetchRooms(1, 100); // Fetch a reasonable amount for client-side filtering
        setRooms(data.rooms || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===================== Filters & Pagination =====================
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesFacility =
      !selectedFacility ||
      room.facilities?.some((f) => f._id === selectedFacility);
    return matchesSearch && matchesFacility;
  });

  const paginatedRooms = filteredRooms.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ===================== Action Menu Handlers =====================
  const handleMenuClick = (event, room) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  const handleView = () => {
    console.log("View:", selectedRoom);
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedRoom?._id) navigate(`/dashboard/rooms-data/${selectedRoom._id}`);
    handleMenuClose();
  };

  const handleDelete = () => {
    handleMenuClose();
    setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 0);
  };

  // ===================== Delete Confirmation =====================
  const confirmDelete = async () => {
    if (!selectedRoom?._id) return;
    setIsDeleting(true);
    try {
      await deleteRoom(selectedRoom._id);
      setRooms((prev) => prev.filter((r) => r._id !== selectedRoom._id));
      setDeleteDialogOpen(false);
      setSelectedRoom(null);
      toast.success("Room deleted successfully ✅");
    } catch (err) {
      console.error("Failed to delete room:", err);
      // Toast is already fired in hook, but this ensures fallback
    } finally {
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedRoom(null);
  };

  // ===================== RENDER =====================
  return (
    <Box>
      {/* Full screen loader */}
      <LoadingSpinner loading={loading} />

      {/* ===================== Header Section ===================== */}
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
            Rooms Table Details
          </Typography>
          <Typography variant="body1" sx={{ color: "#6c757d", mt: 0.5 }}>
            You can check all details
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={Link}
          to="/dashboard/rooms-data"
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
          Add New Room
        </Button>
      </Box>

      {/* ===================== Search & Filters ===================== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search by number ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9ca3af" }} />
              </InputAdornment>
            ),
          }}
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

        <TextField
          select
          fullWidth
          label="Facility"
          value={selectedFacility}
          onChange={(e) => setSelectedFacility(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#F8F9FB",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "#ccc" },
              "&.Mui-focused fieldset": { borderColor: "#203FC7" },
            },
            minWidth: { md: "250px" },
          }}
        >
          <MenuItem value="">All Facilities</MenuItem>
          {facilities.map((f) => (
            <MenuItem key={f._id} value={f._id}>
              {f.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* ===================== Table Section ===================== */}
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "12px", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 1000 }}>
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
                "Room Number",
                "Image",
                "Price",
                "Capacity",
                "Discount",
                "Facilities",
                "Actions",
              ].map((headerName) => (
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
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ "& .MuiTableCell-body": { color: "#3A3A3D" } }}>
            {paginatedRooms?.length > 0 ? (
              paginatedRooms.map((room, index) => (
                <TableRow
                  key={room._id}
                  sx={{
                    "&:hover": { backgroundColor: "#F8F9FB" },
                    transition: "0.3s",
                    backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FB",
                  }}
                >
                  <TableCell sx={{ fontWeight: "500" }}>
                    {room.roomNumber}
                  </TableCell>
                  <TableCell>
                    <img
                      src={room.images?.[0] || "https://placehold.co/50x50"}
                      alt="Room"
                      width={50}
                      height={50}
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>{room.price}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>{room.discount}%</TableCell>
                  <TableCell>
                    {room.facilities?.length
                      ? room.facilities.map((f) => (
                          <Chip
                            key={f._id}
                            label={f.name}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5, backgroundColor: "#E2E5EB" }}
                          />
                        ))
                      : "—"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuClick(e, room)}>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : !loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography variant="h6" color="textSecondary">
                    No Rooms found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>

          {/* Table Footer (Pagination) */}
          <TableFooter>
            <TableRow>
              <TablePagination
                count={filteredRooms.length || 0}
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
        open={openMenu}
        onClose={handleMenuClose}
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
        <MenuItem onClick={handleView}>
          <RemoveRedEyeOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            View
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditCalendarOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            Edit
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon sx={{ color: "#203FC7", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#1F263E" }}>
            Delete
          </Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        open={deleteDialogOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemName={selectedRoom?.roomNumber}
        loading={isDeleting}
      />
    </Box>
  );
}
