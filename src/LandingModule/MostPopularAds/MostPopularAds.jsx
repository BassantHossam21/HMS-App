import React from "react";
import { Box, Card, CardMedia, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import useDetails from "../../Hooks/useDetails";
import useFavorites from "../../Hooks/useFavorites";
import { useNavigate } from "react-router-dom";

export default function MostPopularAds() {
  const { data } = useDetails();
  const { addFavorite } = useFavorites();
  const navigate = useNavigate();

  if (!data || data.length === 0) return null;

  const adsToShow = data.slice(0, 5);
  const bigAd = adsToShow[0];
  const smallAds = adsToShow.slice(1);

  // Reusable Overlay Component
  const HoverOverlay = ({ ad }) => (
    <Box
      className="card-overlay"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        opacity: 0,
        transition: "all 0.4s ease-in-out",
        zIndex: 2,
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          if (ad?.room?._id) {
            addFavorite(ad.room._id);
          }
        }}
        sx={{
          color: "white",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px)",
          "&:hover": { bgcolor: "#FF498B", transform: "scale(1.1)" },
          transition: "all 0.3s ease",
        }}
      >
        <FavoriteIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          navigate(`/details/${ad.room._id}`);
        }}
        sx={{
          color: "white",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px)",
          "&:hover": { bgcolor: "#152C5B", transform: "scale(1.1)" },
          transition: "all 0.3s ease",
        }}
      >
        <VisibilityIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 4,
          color: "#152C5B",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Most popular ads
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {/* الكارت الكبير */}
        {bigAd && (
          <Box
            sx={{
              gridRow: { md: "span 2" },
              position: "relative",
              height: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -15,
                left: -15,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(32, 63, 199, 0.1)",
                borderRadius: "15px",
                zIndex: 0,
                display: { xs: "none", md: "block" },
              }}
            />

            <Card
              sx={{
                height: "100%",
                borderRadius: "15px",
                position: "relative",
                zIndex: 1,
                boxShadow: "none",
                aspectRatio: { xs: "4/3", md: "auto" },
                overflow: "hidden", // Important for hover scale
                "&:hover img": { transform: "scale(1.08)" },
              }}
            >
              <CardMedia
                component="img"
                image={bigAd.room?.images?.[0]}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />
              <HoverOverlay ad={bigAd} />
            </Card>
          </Box>
        )}

        {/* الكروت الصغيرة */}
        {smallAds.map((ad, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "15px",
              boxShadow: "none",
              aspectRatio: "16/10",
              width: "100%",
              position: "relative",
              overflow: "hidden",
              "&:hover img": { transform: "scale(1.08)" },
            }}
          >
            <CardMedia
              component="img"
              image={ad.room?.images?.[0]}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease",
              }}
            />
            <HoverOverlay ad={ad} />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
