import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { PieChart } from "@mui/x-charts/PieChart";
import useDashboard from "@/Hooks/useDashboard";

export default function Dashboard() {
  // ================= Hooks =================
  const { chartsData, getDashboardCharts } = useDashboard();

  useEffect(() => {
    getDashboardCharts();
  }, []);

  // ================= Charts Data =================
  const totalRooms = chartsData?.rooms || 0;
  const totalFacilities = chartsData?.facilities || 0;
  const total = chartsData?.ads || 0;

  // Users vs Admin
  const adminCount = chartsData?.users?.admin || 0;
  const userCount = chartsData?.users?.user || 0;

  // Bookings
  const pendingBookings = chartsData?.bookings?.pending || 0;
  const completedBookings = chartsData?.bookings?.completed || 0;

  const topCards = [
    { title: "Rooms", count: totalRooms },
    { title: "Facilities", count: totalFacilities },
    { title: "Ads", count: total },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "80px", px: { xs: 3, md: 8 }, py: { xs: 3, md: 6 } }}>
      {/* ================= CARDS ================= */}
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {topCards.map((card, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Box
                sx={{
                  backgroundColor: "#1A1B1E",
                  color: "#fff",
                  p: 4,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {card.count}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#8a8b8e", mt: 0.5 }}
                  >
                    {card.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: "rgba(32, 59, 140, 0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <WorkIcon sx={{ color: "#3B5EDB" }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================= PIE CHARTS ================= */}
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={5} alignItems="center" sx={{ width: "100%" }}>
          {/* ===== LEFT: BOOKINGS ===== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
              <Box sx={{ width: 220, height: 220 }}>
                <PieChart
                  series={[
                    {
                      innerRadius: 65,
                      outerRadius: 110,
                      data: [
                        { id: 0, value: pendingBookings, color: "#4B63F3" }, // Blue
                        { id: 1, value: completedBookings, color: "#9B5DE5" }, // Purple
                      ],
                    },
                  ]}
                  slotProps={{ legend: { hidden: true } }}
                  width={220}
                  height={220}
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 14, height: 14, borderRadius: "4px", backgroundColor: "#4B63F3" }} />
                  <Typography variant="body2" sx={{ color: "#6c757d", fontWeight: 500 }}>
                    pending
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ width: 14, height: 14, borderRadius: "4px", backgroundColor: "#9B5DE5" }} />
                  <Typography variant="body2" sx={{ color: "#6c757d", fontWeight: 500 }}>
                    completed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ===== RIGHT: USERS vs ADMIN ===== */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: "#fff",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.03)",
                borderRadius: 4,
                p: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 320,
                ml: "auto",
                mr: 5,
              }}
            >
              {/* Thin Donut Chart */}
              <Box sx={{ position: "relative", width: 180, height: 180 }}>
                <PieChart
                  series={[
                    {
                      innerRadius: 82,
                      outerRadius: 90,
                      data: [
                        { id: 0, value: userCount, color: "#2bcb60" }, // Green
                        { id: 1, value: adminCount, color: "#3dc6f4" }, // Light Blue
                      ],
                    },
                  ]}
                  slotProps={{ legend: { hidden: true } }}
                  width={180}
                  height={180}
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                />
                {/* Center Text */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "600", color: "#111", fontSize: "14px" }}
                  >
                    Users
                  </Typography>
                </Box>
              </Box>

              {/* Custom Legend */}
              <Box sx={{ width: "100%", mt: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#2bcb60",
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#333", fontWeight: 600, fontSize: "13px" }}>
                      User
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#333", fontWeight: 600, fontSize: "13px" }}>
                    {userCount}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#3dc6f4",
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#333", fontWeight: 600, fontSize: "13px" }}>
                      Admin
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#333", fontWeight: 600, fontSize: "13px" }}>
                    {adminCount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
