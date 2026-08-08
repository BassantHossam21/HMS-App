import React, { useState } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

import placeholderimg from "../../assets/images/hotals1 (1).png";
import useFavorites from "../../Hooks/useFavorites";

export default function Favorites() {
  const { data: favorites, removeFavorite, loading } = useFavorites();
  
  // Client-side pagination logic
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalCount = favorites ? favorites.length : 0;
  const startIndex = (page - 1) * itemsPerPage;
  const currentFavorites = favorites ? favorites.slice(startIndex, startIndex + itemsPerPage) : [];

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
              Favorites
            </Typography>
          </Breadcrumbs>

          {/* 2. Main Page Title */}
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#152C5B" }}
          >
            Your Favorites
          </Typography>
        </Box>

        {/* ================= SUBTITLE ================= */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#152C5B", mb: 3 }}
        >
          Your Rooms
        </Typography>

        {/* ================= ROOMS GRID ================= */}
        {totalCount > 0 ? (
          <Grid container spacing={3}>
            {currentFavorites.map((favorite) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={favorite._id}>
                
                {/* ================= ROOM CARD ================= */}
                <Card
                  sx={{
                    borderRadius: "16px",
                    position: "relative",
                    height: 260,
                    boxShadow: "none",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  
                  {/* --- A. Heart Remove Icon --- */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(favorite._id);
                    }}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                      cursor: "pointer",
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(4px)",
                      borderRadius: "50%",
                      p: 1.5,
                      display: "flex",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translate(-50%, -50%) scale(1.2)",
                        bgcolor: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    <FavoriteIcon sx={{ color: "#fff", fontSize: "2rem" }} />
                  </Box>

                  {/* --- B. Room Background Image --- */}
                  <CardMedia
                    component="img"
                    height="100%"
                    image={
                      favorite.images?.length > 0 ? favorite.images[0] : placeholderimg
                    }
                    alt={favorite.name || favorite.roomNumber}
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
                      {favorite.roomNumber ? `Room ${favorite.roomNumber}` : "Ocean Land"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                      {favorite.capacity
                        ? `Capacity: ${favorite.capacity}`
                        : "Bandung, Indonesia"}
                    </Typography>
                  </Box>

                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 500, color: "#152C5B" }}
            >
              You haven't added any favorites yet.
            </Typography>
          </Box>
        )}

        {/* ================= PAGINATION ================= */}
        {totalCount > 0 && (
          <Stack spacing={2} sx={{ mt: 8, mb: 4, alignItems: "center" }}>
            <Pagination
              count={Math.ceil(totalCount / itemsPerPage) || 1}
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
        )}

      </Container>
    </Box>
  );
}
