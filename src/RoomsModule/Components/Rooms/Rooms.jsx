// ================= Rooms.jsx =================
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
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
  CircularProgress,
  Chip,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, useNavigate } from "react-router-dom";
import useRooms from "../../../Hooks/useRooms";
import DeleteConfirmation from "../../../Shared/delete confirmation/delete confirmation";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';import EditSquareIcon from '@mui/icons-material/EditSquare';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { toast } from "react-toastify";

export default function Rooms() {
  const { fetchRooms, deleteRoom, fetchFacilities } = useRooms();
  const navigate = useNavigate();




  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Filters
  const [selectedFacility, setSelectedFacility] = useState("");
  const [facilities, setFacilities] = useState([]);

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch facilities + rooms
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const facs = await fetchFacilities();
        setFacilities(facs || []);

        const data = await fetchRooms(1, 20);
        setRooms(data.rooms || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchRooms, fetchFacilities]);

  // Menu handlers
  const handleMenuClick = (event, room) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleView = () => {
    console.log("View:", selectedRoom);
    handleMenuClose();
  };
  const handleEdit = (room) => {
    if (room?._id) navigate(`/dashboard/rooms-data/${room._id}`);
    handleMenuClose();
  };
  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  // Confirm delete
  const confirmDelete = async () => {
  if (!selectedRoom?._id) return;

  try {
    await deleteRoom(selectedRoom._id);

    setRooms((prev) => prev.filter((r) => r._id !== selectedRoom._id));
    setDeleteDialogOpen(false);
    setSelectedRoom(null);

    toast.success("Room deleted successfully ✅");
  } catch (err) {
    console.error("Failed to delete room:", err);
    toast.error("Failed to delete room ❌");
  }
};

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedRoom(null);
  };

  // Filter rooms
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesFacility =
      !selectedFacility ||
      room.facilities?.some((f) => f._id === selectedFacility);
    return matchesSearch && matchesFacility;
  });

  return (
    <Box p={2}>
      {/* Header */}
      <Grid container justifyContent="space-between" mb={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">Rooms Table Details</Typography>
          <Typography color="text.secondary">You can check all details</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            component={Link}
            to="/dashboard/rooms-data"
            sx={{ backgroundColor: "#203FC7",px: 3, py: 1.5 }}
          >
            Add New Room
          </Button>
        </Grid>
      </Grid>

      {/* Search + Filters */}
      <Grid container spacing={2} mb={3} alignItems="center">
        <Grid size={8}>
    
        <Grid item  md={12}>
    <TextField
      fullWidth
      size="small"
      placeholder="Search by number ..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  </Grid>
   
  </Grid>
  <Grid size={4}>
   
        <Grid item  >
    <TextField
      select
      fullWidth
      size="small"
      label="Facility"
      value={selectedFacility}
      onChange={(e) => setSelectedFacility(e.target.value)}
    >
      <MenuItem value="">All Facilities</MenuItem>
      {facilities.map((f) => (
        <MenuItem key={f._id} value={f._id}>
          {f.name}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
  
  </Grid>
        </Grid>


      {/* Table */}
      {loading ? (
        <Box textAlign="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#E2E5EB" }}>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Capacity</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Facilities</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRooms.length ? (
                filteredRooms.map((room) => (
                  <TableRow key={room._id}>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell align="right">
                      <img
                        src={room.images?.[0] || "/placeholder.png"}
                        alt=""
                        width={50} 
                        height={50}
                        style={{ borderRadius: 4 }}
                      />
                    </TableCell>
                    <TableCell align="right">{room.price}</TableCell>
                    <TableCell align="right">{room.capacity}</TableCell>
                    <TableCell align="right">{room.discount}%</TableCell>
                    <TableCell align="right">
                      {room.facilities?.length
                        ? room.facilities.map((f) => (
                            <Chip
                              key={f._id}
                              label={f.name}
                              size="small"
                              sx={{ mr: 0.5 }}
                            />
                          ))
                        : "-"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, room)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Menu */}
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem onClick={handleView}><RemoveRedEyeOutlinedIcon sx={{ mr: 1 , color:'#203FC7'}} /> View</MenuItem>
            <MenuItem onClick={() => handleEdit(selectedRoom)}>
            <EditCalendarOutlinedIcon sx={{ mr: 1 , color:'#203FC7'}} /> Edit</MenuItem>
            <MenuItem onClick={handleDelete} >
           <DeleteOutlineOutlinedIcon sx={{ mr: 1 , color:'#203FC7'}} /> 
             Delete
            </MenuItem>
          </Menu>
        </TableContainer>
      )}

      {/* Delete dialog */}
      <DeleteConfirmation
        open={deleteDialogOpen}
        itemName={selectedRoom?.roomNumber}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Box>
  );
}
