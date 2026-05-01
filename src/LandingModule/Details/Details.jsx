import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLandingRooms from "./../../Hooks/useLandingRooms";
import axiosClient from "../../Api/AxiosClient";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  CircularProgress,
  Stack,
  Button,
  Rating,
  TextField,
  Divider,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import placeholderImg from "../../assets/images/hotals1 (1).png";
import imgFacility1 from "../../assets/images/ic_bedroom.png";
import imgFacility2 from "../../assets/images/ic_bathroom.png";
import imgFacility3 from "../../assets/images/ic_diningroom.png";
import imgFacility4 from "../../assets/images/ic_livingroom.png";
import imgFacility5 from "../../assets/images/ic_wifi.png";
import imgFacility6 from "../../assets/images/ic_ac.png";
import imgFacility7 from "../../assets/images/ic_ref.png";
import imgFacility8 from "../../assets/images/ic_tv.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Details() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoomDetailsById, roomDetails } = useLandingRooms();
  const [loading, setLoading] = useState(true);

  // Booking state — same pattern as Header.jsx
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Comment & rating state
  const [ratingValue, setRatingValue] = useState(3);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await getRoomDetailsById(roomId);
      setLoading(false);
    };
    fetchDetails();
  }, [roomId]);

  // ── Number of nights ──
  const nights =
    startDate && endDate ? Math.max(endDate.diff(startDate, "day"), 0) : 0;

  const totalPrice =
    nights > 0 && roomDetails?.price ? nights * roomDetails.price : null;
  // ──=============== Handle Booking Submission ==========──
  const handleContinueBook = async () => {
    const start = startDate ? startDate.format("YYYY-MM-DD") : "";
    const end = endDate ? endDate.format("YYYY-MM-DD") : "";

    if (!start || !end) {
      toast.error("Please select a start and end date for your booking.");
      return;
    }

    const bookingData = {
      startDate: start,
      endDate: end,
      room: roomId,
      totalPrice: totalPrice,
    };

    try {
      const response = await axiosClient.post(
        "/api/v0/portal/booking",
        bookingData,
      );
      toast.success(response.data?.message || "Booking successful!");

      navigate(`/payment/${response.data.data.booking._id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking failed. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress sx={{ color: "#152C5B" }} />
      </Box>
    );
  }

  if (!roomDetails) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h5" color="textSecondary">
          Room not found.
        </Typography>
      </Box>
    );
  }

  const images = roomDetails.images || [];
  const mainImage = images[0] || placeholderImg;
  const sideImages = [images[1] || placeholderImg, images[2] || placeholderImg];

  // ── Facilities rows ──
  const facilitiesRow1 = [
    { img: imgFacility1, label: `${roomDetails.capacity ?? 5} bedroom` },
    { img: imgFacility4, label: "1 living room" },
    { img: imgFacility2, label: "3 bathroom" },
    { img: imgFacility3, label: "1 dining room" },
  ];
  const facilitiesRow2 = [
    { img: imgFacility5, label: "10 mbp/s" },
    { img: imgFacility6, label: "7 unit ready" },
    { img: imgFacility7, label: "2 refrigerator" },
    { img: imgFacility8, label: "4 television" },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 10 }}>
        <Box sx={{ px: { xs: 2, md: 10 }, pt: 4 }}>
          {/* ── Breadcrumbs ── */}
          <Breadcrumbs
            separator="/"
            aria-label="breadcrumb"
            sx={{
              mb: 2,
              fontSize: "15px",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Link
              underline="hover"
              color="gray"
              href="/"
              sx={{ cursor: "pointer" }}
            >
              Home
            </Link>
            <Typography
              color="#152C5B"
              sx={{ fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}
            >
              Room Details
            </Typography>
          </Breadcrumbs>

          {/* ── Room Name ── */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#152C5B",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Room {roomDetails.roomNumber}
            </Typography>
            {roomDetails.createdBy?.userName && (
              <Typography
                sx={{
                  color: "#9CA3AF",
                  fontSize: 15,
                  mt: 0.5,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Hosted by {roomDetails.createdBy.userName}
              </Typography>
            )}
          </Box>

          {/* ── Photo Gallery ── */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {/* Main large image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={mainImage}
                alt={`Room ${roomDetails.roomNumber}`}
                sx={{
                  width: "100%",
                  height: { xs: 250, md: 420 },
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Grid>

            {/* Two side images stacked */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2} height="100%">
                {sideImages.map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`Room view ${idx + 2}`}
                    sx={{
                      width: "100%",
                      height: { xs: 160, md: 200 },
                      objectFit: "cover",
                      borderRadius: "16px",
                      flex: 1,
                    }}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* ── Main Content: Description + Booking Card ── */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {/* ── LEFT: Description + Facilities ── */}
            <Grid item xs={12} md={8}>
              {/* Description paragraphs */}
              <Typography
                variant="body1"
                sx={{ color: "#6B7280", lineHeight: 1.8, mb: 2 }}
              >
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6B7280", lineHeight: 1.8, mb: 2 }}
              >
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#6B7280", lineHeight: 1.8 }}
              >
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>

              {/* ── Facilities Row 1 ── */}
              <Stack direction="row" spacing={5} sx={{ mt: 4 }}>
                {facilitiesRow1.map((f, i) => (
                  <Stack key={i} alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src={f.img}
                      alt={f.label}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#6B7280", textAlign: "center" }}
                    >
                      {f.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {/* ── Facilities Row 2 ── */}
              <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
                {facilitiesRow2.map((f, i) => (
                  <Stack key={i} alignItems="center" spacing={1}>
                    <Box
                      component="img"
                      src={f.img}
                      alt={f.label}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#6B7280", textAlign: "center" }}
                    >
                      {f.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* ── RIGHT: Booking Card ── */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "15px",
                  p: 3,
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 1.5 }}
                >
                  Start Booking
                </Typography>

                {/* Price */}
                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={1}
                  sx={{ mb: 0.5 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#3252DF" }}
                  >
                    ${roomDetails?.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#B0B0B0", fontWeight: 400 }}
                  >
                    per night
                  </Typography>
                </Stack>

                {/* Discount */}
                <Typography
                  variant="body2"
                  sx={{ color: "#E74C3C", fontWeight: 500, mb: 2.5 }}
                >
                  Discount {roomDetails?.discount}% Off
                </Typography>

                {/* ── Pick a Date — same style as Header.jsx ── */}
                <Typography sx={{ fontWeight: 500, mb: 1, color: "#152C5B" }}>
                  Pick a Date
                </Typography>

                {/* Start Date */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#F5F6F8",
                    borderRadius: 1,
                    px: 1,
                    mb: 1.5,
                  }}
                >
                  <CalendarMonthIcon sx={{ color: "#152C5B", mr: 1 }} />
                  <DatePicker
                    label="Start"
                    value={startDate}
                    onChange={setStartDate}
                    minDate={null}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        InputProps: { disableUnderline: true },
                        sx: { width: "100%" },
                      },
                    }}
                  />
                </Box>

                {/* End Date */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#F5F6F8",
                    borderRadius: 1,
                    px: 1,
                    mb: 2,
                  }}
                >
                  <CalendarMonthIcon sx={{ color: "#152C5B", mr: 1 }} />
                  <DatePicker
                    label="End"
                    value={endDate}
                    onChange={setEndDate}
                    minDate={startDate}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        InputProps: { disableUnderline: true },
                        sx: { width: "100%" },
                      },
                    }}
                  />
                </Box>

                {/* Total price summary */}
                {totalPrice !== null && (
                  <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
                    You will pay{" "}
                    <Box
                      component="span"
                      sx={{ fontWeight: 700, color: "#152C5B" }}
                    >
                      ${totalPrice} USD
                    </Box>{" "}
                    per{" "}
                    <Box
                      component="span"
                      sx={{ fontWeight: 700, color: "#152C5B" }}
                    >
                      {nights} Night{nights !== 1 ? "s" : ""}
                    </Box>
                  </Typography>
                )}

                {/* Continue Book button */}
                <Button
                  onClick={handleContinueBook}
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "#3252DF",
                    py: 1.5,
                    borderRadius: 1,
                    fontSize: 16,
                    fontWeight: 500,
                    textTransform: "none",
                    "&:hover": { bgcolor: "#2541c4" },
                  }}
                >
                  Continue Book
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* ── Rating & Comment Section ── */}
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={6}>
            {/* Rating */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}
              >
                Rate
              </Typography>
              <Rating
                value={ratingValue}
                onChange={(_, newVal) => setRatingValue(newVal)}
                sx={{ fontSize: 36, mb: 2 }}
              />
              <Typography sx={{ fontWeight: 500, color: "#152C5B", mb: 1 }}>
                Message
              </Typography>
              <TextField
                placeholder="Write your review..."
                multiline
                minRows={3}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    bgcolor: "#F5F6F8",
                  },
                }}
              />
            </Grid>

            {/* Add Your Comment */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 2 }}
              >
                Add Your Comment
              </Typography>
              <TextField
                placeholder="Share your experience about this room..."
                multiline
                minRows={5}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    bgcolor: "#F5F6F8",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "#3252DF",
                  borderRadius: 1,
                  textTransform: "none",
                  px: 4,
                  py: 1.2,
                  fontWeight: 500,
                  "&:hover": { bgcolor: "#2541c4" },
                }}
              >
                Send Comment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
