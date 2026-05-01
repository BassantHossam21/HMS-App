import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";

import placeholderimg from "../../assets/images/hotals1 (1).png";
import useLandingRooms from "../../Hooks/useLandingRooms";

export default function AllRooms() {
  const { rooms, loading, page, totalCount, setPage } =
    useLandingRooms();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f8f9fa" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#1a237e", mb: 4 }}
      >
        Explore ALL Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item size={4} key={room._id}>
            <Card
              sx={{
                borderRadius: 4,
                position: "relative",
                height: 280,
                boxShadow: 3,
              }}
            >
              <Chip
                label={`$${room.price} per night`}
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  backgroundColor: "#ff4081",
                  color: "white",
                  fontWeight: "bold",
                  zIndex: 2,
                }}
              />

              <CardMedia
                component="img"
                height="100%"
                image={
                  room.images?.length > 0
                    ? room.images[0]
                    : placeholderimg
                }
                alt={room.roomNumber}
                sx={{ filter: "brightness(0.9)" }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  p: 2,
                  width: "100%",
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body2">
                  Hosted by {room.createdBy?.userName}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Stack spacing={2} sx={{ mt: 6, alignItems: "center" }}>
        <Pagination
          count={Math.ceil(totalCount / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}
