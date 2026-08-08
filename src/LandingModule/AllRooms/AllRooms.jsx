import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Pagination,
  PaginationItem,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";

import placeholderimg from "@/assets/images/hotals1 (1).png";
import useLandingRooms from "@/Hooks/useLandingRooms";

export default function AllRooms() {
  const { rooms, loading, page, totalCount, setPage } = useLandingRooms();

  // ================= LOADER STATE =================
  if (loading) return <LoadingSpinner loading={loading} />;

  // ================= MAIN UI =================
  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: { xs: 2, md: 4 } }}>
      <Container maxWidth="xl">
        
        {/* ================= HEADER AREA ================= */}
        <Box sx={{ position: "relative", mb: 5, textAlign: "center" }}>
          
          {/* 1. Breadcrumbs Navigation */}
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
              sx={{ fontSize: "14px", fontWeight: 500 }}
            >
              Home
            </MuiLink>
            <Typography color="#B0B0B0" sx={{ fontSize: "14px", fontWeight: 500 }}>
              Explore
            </Typography>
          </Breadcrumbs>

          {/* 2. Main Page Title */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#152C5B" }}
          >
            Explore ALL Rooms
          </Typography>
        </Box>

        {/* ================= SUBTITLE ================= */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#152C5B", mb: 3 }}
        >
          All Rooms
        </Typography>

        {/* ================= ROOMS GRID ================= */}
        <Grid container spacing={3}>
          {rooms.map((room) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={room._id}>
              
              {/* ================= ROOM CARD ================= */}
              <Card
                sx={{
                  borderRadius: "16px",
                  position: "relative",
                  height: 260,
                  boxShadow: "none",
                  overflow: "hidden",
                }}
              >
                
                {/* --- A. Pink Price Badge --- */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "#FF498B",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "14px",
                    padding: "8px 24px",
                    borderRadius: "0 16px 0 16px",
                    zIndex: 2,
                  }}
                >
                  ${room.price}{" "}
                  <span style={{ fontWeight: 400, fontSize: "12px" }}>
                    per night
                  </span>
                </Box>

                {/* --- B. Room Background Image --- */}
                <CardMedia
                  component="img"
                  height="100%"
                  image={
                    room.images?.length > 0 ? room.images[0] : placeholderimg
                  }
                  alt={room.roomNumber}
                  sx={{ objectFit: "cover" }}
                />

                {/* --- C. Bottom Gradient & Details --- */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    p: 2,
                    width: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                    color: "white",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {room.roomNumber ? `Room ${room.roomNumber}` : "Ocean Land"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                    {room.capacity
                      ? `Capacity: ${room.capacity}`
                      : "Bandung, Indonesia"}
                  </Typography>
                </Box>

              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ================= PAGINATION ================= */}
        <Stack spacing={2} sx={{ mt: 8, mb: 4, alignItems: "center" }}>
          <Pagination
            count={Math.ceil(totalCount / 10) || 1}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            className="rooms-pagination"
            renderItem={(item) => (
              <PaginationItem
                slots={{
                  previous: () => <span style={{ padding: '0 8px' }}>Previous</span>,
                  next: () => <span style={{ padding: '0 8px' }}>Next</span>
                }}
                {...item}
              />
            )}
          />
        </Stack>

      </Container>
    </Box>
  );
}
