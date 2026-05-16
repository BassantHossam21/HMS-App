import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useLandingRooms from "./../../Hooks/useLandingRooms";
import axiosClient from "../../Api/AxiosClient";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Button,
  Rating,
  TextField,
} from "@mui/material";
import placeholderImg from "../../assets/images/hotals1 (1).png";
import roomImg1 from "../../assets/images/RoomDetails(1).png";
import roomImg2 from "../../assets/images/RoomDetails(2).png";
import roomImg3 from "../../assets/images/RoomDetails(3).png";
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
  const location = useLocation();
  const { getRoomDetailsById, roomDetails } = useLandingRooms();
  const { user } = useContext(AuthContext);
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

    // Check if user is logged in before booking
    if (!user) {
      toast.info("Please login first to complete your booking.");
      navigate("/auth/login", { state: { from: location } });
      return;
    }

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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
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
  // Static gallery images for the room details page
  const img1 = roomImg1;
  const img2 = roomImg2;
  const img3 = roomImg3;

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
        <Box sx={{ mx: { md: 16, xs: 2 }, mt: { xs: 4, md: 6 } }}>

          {/* ── Room Name (centered) + Location ── */}
          <Box sx={{ textAlign: "center", mt: 3, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#152C5B" }}>
              {roomDetails.roomNumber}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: 14 }}>Bogor, Indonesia</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: "gray", fontSize: 14 }}>All Rooms</Typography>
          </Box>

          {/* ── Photo Gallery ── */}
          <Box sx={{ display: "flex", gap: 2, mb: 5 }}>
            <Box
              sx={{
                width: "54%",
                height: "455px",
                borderRadius: 5,
                backgroundImage: `url("${img1}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box sx={{ width: "45%" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "220px",
                  mb: 2,
                  borderRadius: 5,
                  backgroundImage: `url("${img2}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "220px",
                  borderRadius: 5,
                  backgroundImage: `url("${img3}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Box>
          </Box>

          {/* ── Description + Booking Card ── */}
          <Box sx={{ display: "flex", width: "100%", mt: 5, gap: 4 }}>

            {/* LEFT: Description + Facilities */}
            <Box sx={{ width: "55%", flexShrink: 0 }}>
              <Typography
                sx={{
                  pt: 3,
                  color: "gray",
                  maxHeight: { xs: 280, md: "auto" },
                  overflowY: { xs: "auto", md: "visible" },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  lineHeight: 1.9,
                }}
              >
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
                <br />
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
                <br />
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process.
              </Typography>

              {/* Facilities Row 1 */}
              <Box sx={{ display: "flex", width: "100%", gap: 3, mt: { md: 10, xs: 5 } }}>
                {facilitiesRow1.map((f, i) => (
                  <Box key={i} sx={{ width: "17%" }}>
                    <Box
                      sx={{
                        width: "50%",
                        height: "40px",
                        mb: 1,
                        backgroundImage: `url(${f.img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Typography variant="span" sx={{ fontWeight: 700 }}>
                      {f.label.split(" ")[0]}
                    </Typography>
                    <Typography variant="span" color="gray">
                      {" "}{f.label.split(" ").slice(1).join(" ")}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Facilities Row 2 */}
              <Box sx={{ display: "flex", width: "100%", gap: 3, mt: 3 }}>
                {facilitiesRow2.map((f, i) => (
                  <Box key={i} sx={{ width: "17%" }}>
                    <Box
                      sx={{
                        width: { md: "42%", xs: "90%" },
                        height: "38px",
                        mb: 1,
                        backgroundImage: `url(${f.img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Typography variant="span" sx={{ fontWeight: 700 }}>
                      {f.label.split(" ")[0]}
                    </Typography>
                    <Typography variant="span" color="gray">
                      {" "}{f.label.split(" ").slice(1).join(" ")}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* RIGHT: Booking Card */}
            <Box
              sx={{
                flex: 1,
                px: { md: 5, xs: 2 },
                pt: 4,
                pb: 4,
                border: 1,
                borderColor: "rgb(225, 225, 225)",
                mt: 1,
                borderRadius: 3,
                minWidth: 0,
              }}
            >
              <Box>
                <Typography sx={{ mt: 4, mb: 1, fontWeight: 600, fontSize: 18 }}>
                  Start Booking
                </Typography>
                <Typography variant="span" sx={{ fontSize: 25, color: "green" }}>
                  ${roomDetails?.price}
                </Typography>
                <Typography
                  variant="span"
                  sx={{ fontWeight: 300, fontSize: 22, color: "rgb(191, 191, 191)" }}
                >
                  {" "}per night
                </Typography>
                <Typography sx={{ color: "red", mt: 0 }}>
                  Discount {roomDetails?.discount}% off
                </Typography>
              </Box>

              <Box>
                <Box sx={{ mb: 2, mt: 8 }}>
                  <Typography>Pick a Date</Typography>
                </Box>

                {/* Pick a Date — same style as Header.jsx */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#F5F6F8",
                      borderRadius: 1,
                      px: 1,
                    }}
                  >
                    <CalendarMonthIcon sx={{ color: "#152C5B", mr: 1 }} />
                    <DatePicker
                      label="Start"
                      value={startDate}
                      onChange={setStartDate}
                      slotProps={{
                        textField: {
                          variant: "standard",
                          InputProps: { disableUnderline: true },
                          sx: { width: "100%" },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#F5F6F8",
                      borderRadius: 1,
                      px: 1,
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
                </Box>

                <Box mt={1}>
                  <Typography variant="span" color="gray">You will pay </Typography>
                  <Typography variant="span" sx={{ fontWeight: 700 }}>
                    ${totalPrice ?? roomDetails?.price} USD
                  </Typography>
                  <Typography variant="span" color="gray"> per </Typography>
                  <Typography variant="span" sx={{ fontWeight: 700 }}>
                    {roomDetails?.capacity ?? 2} Person
                  </Typography>
                </Box>

                <Button
                  onClick={handleContinueBook}
                  sx={{
                    width: "60%",
                    background: "#3252DF",
                    mt: 3,
                    mx: 8,
                    color: "white",
                    textTransform: "none",
                    borderRadius: 1,
                    py: 1.2,
                    fontSize: 15,
                    "&:hover": { background: "#2541c4" },
                  }}
                >
                  Continue Book
                </Button>
              </Box>
            </Box>
          </Box>

          {/* ── Reviews Section (only if logged in) ── */}
          {user && (
            <Box sx={{ display: "flex", mt: 4 }}>
              <Box sx={{ width: "50%", borderRight: 1, borderColor: "#ddd", pr: 4 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>Rate</Typography>
                <Rating
                  value={ratingValue}
                  onChange={(_, newVal) => setRatingValue(newVal)}
                  sx={{ color: "#f4c150" }}
                />
                <Typography sx={{ mt: 3, mb: 1 }}>Message</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& fieldset": { borderColor: "#ddd" },
                    borderRadius: "10px",
                    width: "95%",
                  }}
                />
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    px: 6,
                    py: 1,
                    mt: 2,
                    bgcolor: "#1a73e8",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  Rate
                </Button>
              </Box>
              <Box sx={{ width: "50%", mt: 9.5, ml: 3.5 }}>
                <Typography sx={{ fontWeight: 600 }}>Add Your Comment</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  variant="outlined"
                  sx={{
                    mt: 1,
                    "& fieldset": { borderColor: "#ddd" },
                    borderRadius: "10px",
                  }}
                />
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    px: 6,
                    py: 1,
                    mt: 2,
                    bgcolor: "#1a73e8",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
