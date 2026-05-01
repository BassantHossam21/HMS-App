import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import { PieChart } from "@mui/x-charts/PieChart";

import useRooms from "../../../Hooks/useRooms";
import useFacilities from "../../../Hooks/useFacilities";
import useAds from "../../../Hooks/useAds";
import useUsers from "../../../Hooks/useUsers";
import { useBookingApi } from "../../../Hooks/useBooking";

export default function Dashboard() {
  // ================= Hooks =================
  const { fetchRooms } = useRooms();
  const { totalCount: totalFacilities } = useFacilities();
  const { total } = useAds();
  const { users = [], loading: usersLoading } = useUsers(0, 1000);

  const {
    bookings = [],
    getBookings,
    loading: bookingsLoading,
  } = useBookingApi();

  // ================= State =================
  const [totalRooms, setTotalRooms] = useState(0);
  const [loading, setLoading] = useState(true);

  // ================= Rooms Count =================
  useEffect(() => {
    const loadRoomsCount = async () => {
      try {
        const data = await fetchRooms(1, 1);
        setTotalRooms(data?.totalCount || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRoomsCount();
  }, []);

  // ================= Bookings =================
  useEffect(() => {
    getBookings(1, 1000);
  }, []);

  // if (loading || usersLoading || bookingsLoading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // ================= SAFE DATA =================
  const safeUsers = Array.isArray(users) ? users : [];
  const safeBookings = Array.isArray(bookings) ? bookings : [];

  // ================= Charts Data =================

  // Users vs Admin
  const adminCount = safeUsers.filter((u) => u.role === "admin").length;
  const userCount = safeUsers.filter((u) => u.role === "user").length;

  // Bookings
  const pendingBookings = safeBookings.filter(
    (b) => b.status === "pending",
  ).length;

  const completedBookings = safeBookings.filter(
    (b) => b.status === "completed",
  ).length;

  return (
    <>
      {/* ================= CARDS ================= */}
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid
          container
          spacing={3}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Grid
            sx={{ backgroundColor: "#1A1B1E", color: "#fff" }}
            item
            size={{ xs: 12, md: 4 }}
            p={3}
            borderRadius={2}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">
                {totalRooms}
                <Typography sx={{ mt: 1 }} variant="body2">
                  Rooms
                </Typography>
              </Typography>
              <WorkIcon />
            </Box>
          </Grid>

          <Grid
            sx={{ backgroundColor: "#1A1B1E", color: "#fff" }}
            item
            size={{ xs: 12, md: 4 }}
            p={3}
            borderRadius={2}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">
                {totalFacilities}
                <Typography sx={{ mt: 1 }} variant="body2">
                  Facilities
                </Typography>
              </Typography>
              <WorkIcon />
            </Box>
          </Grid>

          <Grid
            sx={{ backgroundColor: "#1A1B1E", color: "#fff" }}
            item
            size={{ xs: 12, md: 4 }}
            p={3}
            borderRadius={2}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5">
                {total}
                <Typography sx={{ mt: 1 }} variant="body2">
                  Ads
                </Typography>
              </Typography>
              <WorkIcon />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ================= PIE CHARTS ================= */}
      <Box sx={{ mt: 25 }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}
        >
          {/* ===== LEFT: BOOKINGS ===== */}
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: pendingBookings,
                    label: "Pending",
                    color: "#FFA500",
                  },
                  {
                    id: 1,
                    value: completedBookings,
                    label: "Completed",
                    color: "#4CAF50",
                  },
                ],
              },
            ]}
            width={200}
            height={200}
          />

          {/* ===== RIGHT: USERS vs ADMIN ===== */}
          <PieChart
            slotProps={{
              legend: {
                sx: {
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                },
                direction: "horizontal",
                position: { vertical: "bottom", horizontal: "center" },
              },
            }}
            size={{ xs: 12, md: 6 }}
            sx={{ width: "100%" }}
            series={[
              {
                data: [
                  { id: 0, value: userCount, label: "Users", color: "#54D14D" },
                  {
                    id: 1,
                    value: adminCount,
                    label: "Admins",
                    color: "#35C2FD",
                  },
                ],
              },
            ]}
            width={200}
            height={200}
          />
        </Grid>
      </Box>
    </>
  );
}
