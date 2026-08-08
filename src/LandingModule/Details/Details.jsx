import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import useLandingRooms from "@/Hooks/useLandingRooms";
import useLandingBooking from "@/Hooks/useLandingBooking";
import useLandingComments from "@/Hooks/useLandingComments";
import useLandingRate from "@/Hooks/useLandingRate";
import { toast } from "react-toastify";
import { AuthContext } from "@/Context/AuthContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
  Container,
} from "@mui/material";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";
import roomImg1 from "@/assets/images/RoomDetails(1).png";
import roomImg2 from "@/assets/images/RoomDetails(2).png";
import roomImg3 from "@/assets/images/RoomDetails(3).png";
import imgFacility1 from "@/assets/images/ic_bedroom.png";
import imgFacility2 from "@/assets/images/ic_bathroom.png";
import imgFacility3 from "@/assets/images/ic_diningroom.png";
import imgFacility4 from "@/assets/images/ic_livingroom.png";
import imgFacility5 from "@/assets/images/ic_wifi.png";
import imgFacility6 from "@/assets/images/ic_ac.png";
import imgFacility7 from "@/assets/images/ic_ref.png";
import imgFacility8 from "@/assets/images/ic_tv.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Details() {
  // ================= Hooks & Routing =================
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ================= Custom Hooks & Context =================
  const { getRoomDetailsById, roomDetails } = useLandingRooms();
  const { bookRoom, loading: bookingLoading } = useLandingBooking();
  const { addComment, loading: commentLoading } = useLandingComments();
  const { addReview, loading: rateLoading } = useLandingRate();
  const { user } = useContext(AuthContext);

  // ================= Local State =================
  const [loading, setLoading] = useState(true);

  // ── Booking State ──
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // ── Comment & Rating State ──
  const [ratingValue, setRatingValue] = useState(3);
  const [comment, setComment] = useState("");
  const [userComment, setUserComment] = useState("");

  // ================= Effects =================
  // Fetch room details on mount or when roomId changes
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await getRoomDetailsById(roomId);
      setLoading(false);
    };
    fetchDetails();
  }, [roomId]);

  // ================= Computed Values =================
  // ── Calculate Number of Nights & Total Price ──
  const nights =
    startDate && endDate ? Math.max(endDate.diff(startDate, "day"), 0) : 0;

  const totalPrice =
    nights > 0 && roomDetails?.price ? nights * roomDetails.price : null;

  // ================= Handlers =================
  // ── Handle Booking Submission ──
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
      await bookRoom(bookingData);
    } catch (error) {
      console.error("Booking submission error:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner loading={loading} />;
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

  // ================= Render Helpers & Static Data =================
  // ── Static gallery images ──
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
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh", py: { xs: 2, md: 4 }, pb: 10 }}>
        <Container maxWidth="xl">

          {/* ================== Header Section ================== */}
          <Box sx={{ position: "relative", textAlign: "center", mb: 5 }}>
            <Breadcrumbs
              separator="/"
              aria-label="breadcrumb"
              sx={{
                position: { md: "absolute" },
                left: 0,
                top: "50%",
                transform: { md: "translateY(-50%)" },
                justifyContent: { xs: "center", md: "flex-start" },
                display: "flex",
                mb: { xs: 2, md: 0 },
              }}
            >
              <MuiLink
                component={Link}
                to="/"
                color="#B0B0B0"
                underline="hover"
                sx={{ fontSize: "16px", fontWeight: 500 }}
              >
                Home
              </MuiLink>
              <Typography color="#152C5B" sx={{ fontSize: "16px", fontWeight: 600 }}>
                Room Details
              </Typography>
            </Breadcrumbs>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#152C5B", fontSize: { xs: "2rem", md: "2.5rem" } }}>
              {roomDetails.roomNumber || "Village Angga"}
            </Typography>
            <Typography sx={{ color: "#B0B0B0", fontSize: 16, mt: 1 }}>
              Bogor, Indonesia
            </Typography>
          </Box>

          {/* ================== Photo Gallery Section ================== */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 6 }}>
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                height: { xs: "250px", sm: "400px", md: "500px" },
                borderRadius: "20px",
                backgroundImage: `url("${img1}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Box sx={{ width: { xs: "100%", md: "40%" }, display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 2 }}>
              <Box
                sx={{
                  flex: { xs: 1, md: "none" },
                  width: { xs: "auto", md: "100%" },
                  height: { xs: "120px", sm: "190px", md: "242px" },
                  borderRadius: "20px",
                  backgroundImage: `url("${img2}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <Box
                sx={{
                  flex: { xs: 1, md: "none" },
                  width: { xs: "auto", md: "100%" },
                  height: { xs: "120px", sm: "190px", md: "242px" },
                  borderRadius: "20px",
                  backgroundImage: `url("${img3}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Box>
          </Box>

          {/* ================== Main Content: Description & Booking Card ================== */}
          <Box sx={{ boxSizing: "border-box", display: "flex", flexDirection: { xs: "column", md: "row" }, width: "100%", mt: 5, gap: 4 }}>

            {/* ── Left Column: Description & Facilities ── */}
            <Box sx={{ width: { xs: "100%", md: "55%" }, flexShrink: 0 }}>
              <Typography
                sx={{
                  pt: 3,
                  color: "gray",
                  fontSize: { xs: "0.9rem", sm: "0.9rem", md: "1rem" },
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

              {/* Facilities Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)", md: "repeat(4, 1fr)" },
                  columnGap: { xs: 2, md: 3 },
                  rowGap: { xs: 4, md: 5 },
                  mt: { md: 10, xs: 5 },
                  width: "100%",
                }}
              >
                {[...facilitiesRow1, ...facilitiesRow2].map((f, i) => (
                  <Box key={i} sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        width: "36px",
                        height: "36px",
                        mb: 1.5,
                        backgroundImage: `url(${f.img})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Box>
                      <Typography component="span" sx={{ fontWeight: 700, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                        {f.label.split(" ")[0]}
                      </Typography>
                      <Typography component="span" color="gray" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                        {" "}{f.label.split(" ").slice(1).join(" ")}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Right Column: Booking Card ── */}
            <Box
              sx={{
                boxSizing: "border-box",
                width: { xs: "100%", md: "40%" },
                maxWidth: { xs: "100%", sm: "500px", md: "none" },
                mx: { xs: 0, sm: "auto", md: 0 },
                px: { md: 4, xs: 2 },
                py: 4,
                border: "1px solid #E5E5E5",
                borderRadius: "16px",
                bgcolor: "#fff",
              }}
            >
              <Box>
                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: 18, color: "#152C5B" }}>
                  Start Booking
                </Typography>
                <Typography component="span" sx={{ fontSize: 36, fontWeight: 700, color: "#1ABC9C" }}>
                  ${roomDetails?.price || 280}
                </Typography>
                <Typography
                  component="span"
                  sx={{ fontWeight: 400, fontSize: 24, color: "#B0B0B0" }}
                >
                  {" "}per night
                </Typography>
                <Typography sx={{ color: "#FF498B", mt: 1, fontSize: 14, fontWeight: 500 }}>
                  Discount {roomDetails?.discount || 20}% Off
                </Typography>
              </Box>

              <Box>
                <Box sx={{ mb: 2, mt: 5 }}>
                  <Typography sx={{ color: "#152C5B", fontWeight: 500 }}>Pick a Date</Typography>
                </Box>

                {/* ── Date Picker Selection ── */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#F5F6F8",
                      borderRadius: 1,
                      px: 1,
                      width: "100%",
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
                          sx: { width: "100%", minWidth: 0 },
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
                      width: "100%",
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
                          sx: { width: "100%", minWidth: 0 },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box mt={4} mb={4}>
                  <Typography component="span" color="#B0B0B0" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    You will pay{" "}
                  </Typography>
                  <Typography component="span" sx={{ fontWeight: 700, color: "#152C5B", fontSize: { xs: "1.1rem", md: "1.2rem" } }}>
                    ${totalPrice ?? (roomDetails?.price * 2) ?? 480} USD
                  </Typography>
                  <Typography component="span" color="#B0B0B0" sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>
                    {" "}per{" "}
                  </Typography>
                  <Typography component="span" sx={{ fontWeight: 700, color: "#152C5B", fontSize: { xs: "1.1rem", md: "1.2rem" } }}>
                    {roomDetails?.capacity ?? 2} Person
                  </Typography>
                </Box>

                <Button
                  onClick={handleContinueBook}
                  disabled={bookingLoading}
                  fullWidth
                  sx={{
                    background: "#3252DF",
                    color: "white",
                    textTransform: "none",
                    borderRadius: "8px",
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                    boxShadow: "0px 8px 15px rgba(50, 82, 223, 0.3)",
                    "&:hover": { background: "#2541c4", boxShadow: "0px 10px 20px rgba(50, 82, 223, 0.4)" },
                  }}
                >
                  {bookingLoading ? "Booking..." : "Continue Book"}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* ================== Reviews & Comments Section ================== */}
          {user && (
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 8, pt: 6 }}>
              {/* ── Add Rating & Message ── */}
              <Box sx={{ width: { xs: "100%", md: "50%" }, borderRight: { md: "1px solid #E5E5E5", xs: "none" }, borderBottom: { xs: "1px solid #E5E5E5", md: "none" }, pr: { md: 6, xs: 0 }, pb: { xs: 5, md: 0 }, mb: { xs: 5, md: 0 } }}>
                <Typography sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}>Rate</Typography>
                <Rating
                  value={ratingValue}
                  onChange={(_, newVal) => setRatingValue(newVal)}
                  sx={{ color: "#f4c150", mb: 3 }}
                />
                <Typography sx={{ mb: 1, color: "#152C5B", fontWeight: 600 }}>Message</Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#3252DF" },
                      "&:hover fieldset": { borderColor: "#2541c4" },
                      "&.Mui-focused fieldset": { borderColor: "#3252DF" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  disabled={rateLoading}
                  onClick={async () => {
                    if (!comment.trim()) {
                      toast.error("Please write a review message first!");
                      return;
                    }
                    try {
                      await addReview(roomId, ratingValue, comment);
                      setComment("");
                      setRatingValue(3);
                    } catch (err) {}
                  }}
                  sx={{
                    borderRadius: "6px",
                    textTransform: "none",
                    px: 5,
                    py: 1.2,
                    mt: 3,
                    bgcolor: "#3252DF",
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#2541c4", boxShadow: "none" },
                  }}
                >
                  Rate
                </Button>
              </Box>

              {/* ── Add Comment Box ── */}
              <Box sx={{ width: { xs: "100%", md: "50%" }, pl: { md: 6, xs: 0 }, display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography sx={{ fontWeight: 600, color: "#152C5B", mb: { xs: 2, md: 6 } }}>
                  Add Your Comment
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={6}
                  variant="outlined"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": { borderColor: "#3252DF" },
                      "&:hover fieldset": { borderColor: "#2541c4" },
                      "&.Mui-focused fieldset": { borderColor: "#3252DF" },
                    },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
                  <Button
                    variant="contained"
                    disabled={commentLoading}
                    onClick={async () => {
                      if (!userComment.trim()) {
                        toast.error("Please write a comment first!");
                        return;
                      }
                      try {
                        await addComment(roomId, userComment);
                        setUserComment(""); // clear on success
                      } catch (err) {}
                    }}
                    sx={{
                      borderRadius: "6px",
                      textTransform: "none",
                      px: 5,
                      py: 1.2,
                      bgcolor: "#3252DF",
                      fontWeight: 600,
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#2541c4", boxShadow: "none" },
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </LocalizationProvider>
  );
}
