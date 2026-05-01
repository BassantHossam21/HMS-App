import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import headerImg from "../../assets/images/Header.png";

export default function Header() {
  const [capacity, setCapacity] = useState(2);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const navigate = useNavigate();

  const handleExplore = () => {
    const start = startDate ? startDate.format("YYYY-MM-DD") : "";
    const end = endDate ? endDate.format("YYYY-MM-DD") : "";
    navigate(
      `/all-rooms?startDate=${start}&endDate=${end}&capacity=${capacity}`,
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 5 } }}>
        <Grid container spacing={8} alignItems="stretch">
          {/* ===== LEFT CONTENT ===== */}
          <Grid
            item
            size={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                color: "#152C5B",
                mb: 2,
                fontSize: { xs: "28px", sm: "32px", md: "42px" },
                lineHeight: 1.2,
              }}
            >
              Forget Busy Work, <br /> Start Next Vacation
            </Typography>

            <Typography
              sx={{
                color: "#B0B0B0",
                mb: 5,
                maxWidth: { xs: "100%", md: 450 },
                lineHeight: 1.6,
                fontSize: { xs: 14, sm: 16 },
              }}
            >
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>

            <Box sx={{ mb: 5 }}>
              <Typography sx={{ fontWeight: 600, mb: 3, fontSize: 20 }}>
                Start Booking
              </Typography>
              <Grid container spacing={3}>
                {/* ===== Pick a Date ===== */}
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Pick a Date
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
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
                </Grid>

                {/* ===== Capacity ===== */}
                <Grid item size={6}>
                  <Typography sx={{ mb: 1, fontWeight: 500 }}>
                    Capacity
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "#F5F6F8",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      onClick={() =>
                        setCapacity((prev) => Math.max(1, prev - 1))
                      }
                      sx={{
                        bgcolor: "#E74C3C",
                        color: "#fff",
                        minWidth: 45,
                        height: 52,
                        borderRadius: 0,
                        "&:hover": { bgcolor: "#c0392b" },
                      }}
                    >
                      <RemoveIcon />
                    </Button>

                    <Typography
                      sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        fontWeight: 500,
                        color: "#152C5B",
                      }}
                    >
                      {capacity} person
                    </Typography>

                    <Button
                      onClick={() => setCapacity((prev) => prev + 1)}
                      sx={{
                        bgcolor: "#1ABC9C",
                        color: "#fff",
                        minWidth: 45,
                        height: 52,
                        borderRadius: 0,
                        "&:hover": { bgcolor: "#16a085" },
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Button
              onClick={handleExplore}
              variant="contained"
              sx={{
                bgcolor: "#3252DF",
                px: 6,
                py: 1.5,
                fontSize: 18,
                fontWeight: 500,
                textTransform: "none",
                borderRadius: 1,
              }}
            >
              Explore
            </Button>
          </Grid>

          {/* ===== RIGHT IMAGE ===== */}
          <Grid item size={6} sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid #E5E5E5",
                  borderRadius: "100px 15px 15px 15px",
                  transform: "translate(30px,30px)",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={headerImg}
                alt="Vacation"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  maxHeight: "600px",
                  objectFit: "cover",
                  borderRadius: "100px 15px 15px 15px",
                  display: "block",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
