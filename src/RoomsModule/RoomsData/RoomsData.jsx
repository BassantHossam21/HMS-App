import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, TextField, Button, Typography, MenuItem, Select,
  FormControl, CircularProgress, Chip, Grid, IconButton
} from "@mui/material";
import { CloudUpload, Cancel } from "@mui/icons-material";
import { toast } from "react-toastify";
import useRooms from "../../Hooks/useRooms";

export default function RoomsData() {
  const { roomId } = useParams();
  const { createRoom, updateRoom, fetchFacilities, getRoomById } = useRooms();
  const navigate = useNavigate();

  const [facilities, setFacilities] = useState([]);
  const [facilitiesMap, setFacilitiesMap] = useState({});
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roomNumber, setRoomNumber] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [discount, setDiscount] = useState("");
  const [images, setImages] = useState([]); 
  const [submitting, setSubmitting] = useState(false);

  const inputStyle = {
    "& .MuiOutlinedInput-root": { backgroundColor: "#F8F9FB", borderRadius: "8px", height: 56, "& fieldset": { border: "none" } },
    "& .MuiSelect-select": { paddingLeft: 14 }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const facs = await fetchFacilities();
        setFacilities(facs || []);
        setFacilitiesMap(Object.fromEntries((facs || []).map(f => [f._id, f.name])));
        if (roomId) {
          const room = await getRoomById(roomId);
          setRoomNumber(room.roomNumber || "");
          setPrice(room.price || "");
          setCapacity(room.capacity || "");
          setDiscount(room.discount || "");
          setSelectedFacilities(room.facilities.map(f => f._id));
          if (room.images?.length) {
            setImages(room.images.map(url => ({ preview: url, isOld: true })));
          }
        }
      } catch {
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roomId, fetchFacilities, getRoomById]);

  useEffect(() => () => images.forEach(img => !img.isOld && URL.revokeObjectURL(img.preview)), [images]);

  const handleImageChange = e => {
    const files = Array.from(e.target.files).map(f => ({ file: f, preview: URL.createObjectURL(f), isOld: false }));
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = i => setImages(prev => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!roomNumber || !price || !capacity) return toast.error("Please fill Room Number, Price, Capacity");

    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("discount", discount || 0);
    selectedFacilities.forEach(id => formData.append("facilities", id));
    images.forEach(img => img.isOld ? formData.append("imgs", img.preview) : formData.append("imgs", img.file));

    setSubmitting(true);
    try {
      if (roomId) {
        await updateRoom(roomId, formData);
        toast.success("Room updated!");
        navigate("/dashboard/rooms");
      } else {
        await createRoom(formData);
        toast.success("Room created!");
        setRoomNumber(""); setPrice(""); setCapacity(""); setDiscount(""); setSelectedFacilities([]); setImages([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save room");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 900, mx: "auto" , borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)"  }}>
      <Grid container spacing={2}>
        <TextField fullWidth placeholder="Room Number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} sx={{...inputStyle, bgcolor: "#F7"}} />
          
       <Box md={6} sx={{ display: "flex", gap: 2, width: "100%" }}>
        <TextField fullWidth placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} sx={inputStyle} />
         
        
        <TextField fullWidth placeholder="Capacity" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} sx={inputStyle} />
       </Box>
        
        <Box md={6} sx={{ display: "flex", gap: 2, width: "100%" }}>
          <TextField fullWidth placeholder="Discount" type="number" value={discount} onChange={e => setDiscount(e.target.value)} sx={inputStyle} />
     
          <FormControl fullWidth sx={inputStyle}>
            <Select multiple displayEmpty value={selectedFacilities} onChange={e => setSelectedFacilities(e.target.value)}
              renderValue={selected => selected.length ? <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>{selected.map(id => <Chip key={id} label={facilitiesMap[id]} size="small" />)}</Box> : <span style={{ color: "#666" }}>Facilities</span>}
            >
              {facilities.map(f => <MenuItem key={f._id} value={f._id}>{f.name}</MenuItem>)}
            </Select>
          </FormControl>
        
        </Box>
      {/* img */}
<Box
  component="label"
  sx={{
    mt: 1,
    p: 4,
    border: "2px dashed #4CAF50",
    borderRadius: 2,
    backgroundColor: "#F7FDF9",
    cursor: "pointer",
    minHeight: 180,
    width: "100%", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { backgroundColor: "#F0FFF4" }
  }}
>
  <input type="file" hidden multiple accept="image/*" onChange={handleImageChange} />
  <CloudUpload sx={{ fontSize: 48, color: "#454545", mb: 1 }} />
  <Typography fullWidth>
    Drag & Drop or <span style={{ color: "#4CAF50", fontWeight: 600 }}>Choose Room Images</span>
  </Typography>
  {images.length > 0 && (
    <Box sx={{ display: "flex", gap: 1.5, mt: 3, flexWrap: "wrap", justifyContent: "center" }}>
      {images.map((img, i) => (
        <Box key={i} sx={{ position: "relative", width: 80, height: 80 }}>
          <img
            src={img.preview}
            alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, border: "1px solid #ddd" }}
          />
          <IconButton
            size="small"
            onClick={e => { e.preventDefault(); removeImage(i); }}
            sx={{ position: "absolute", top: -10, right: -10, color: "error.main", bgcolor: "#fff", "&:hover": { bgcolor: "#eee" } }}
          >
            <Cancel fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  )}
</Box>
      </Grid>
       <Box sx={{ textAlign: "center" }}>
        <Button fullWidth type="submit" variant="contained" disabled={submitting}  sx={{ px:4, mt:4}}>
            {submitting ? "Saving..." : roomId ? "Update Room" : "Save"}
          </Button>
       </Box>
    </Box>
  );
}
