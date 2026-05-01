import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Breadcrumbs,
  Link,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useFavorites from "../../Hooks/useFavorites";

export default function Favorites() {
  const { data: favorites, removeFavorite } = useFavorites();

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 8 }}>
      {/* الحاوية الرئيسية مع هوامش جانبية مناسبة للتصميم */}
      <Box
        sx={{
          px: { xs: 2, md: 10 },
          pt: 4,
        }}
      >
        {/* 1. مسار الصفحة (Breadcrumbs) */}
        <Breadcrumbs
          separator="/"
          aria-label="breadcrumb"
          sx={{ mb: 5, fontSize: "16px", fontFamily: "'Poppins', sans-serif" }}
        >
          <Link underline="hover" color="gray" href="/">
            Home
          </Link>
          <Typography color="#152C5B" sx={{ fontWeight: 500 }}>
            Favorites
          </Typography>
        </Breadcrumbs>

        {/* 2. العنوان الرئيسي */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: "#152C5B",
            mb: 6,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Your Favorites
        </Typography>

        {/* 3. عنوان القسم */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#152C5B",
            mb: 4,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Your Rooms
        </Typography>

        {/* 4. شبكة عرض الغرف */}
        {favorites && favorites.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {favorites.map((favorite) => (
              <Card
                key={favorite._id}
                sx={{
                  borderRadius: "20px",
                  boxShadow: "none",
                  position: "relative",
                  cursor: "pointer",
                  aspectRatio: "16/10",
                  bgcolor: "#fff",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      favorite.images?.[0] ||
                      `https://placehold.co/600x400?text=${favorite.name}`
                    }
                    alt={favorite.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.08)" },
                    }}
                  />

                  {/* أيقونة القلب في المنتصف */}
                  <Box
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(favorite._id);
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none", // السماح بالضغط على الكارت نفسه إذا لزم الأمر
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "50%",
                        p: 1.5,
                        display: "flex",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                        pointerEvents: "auto", // تفعيل الضغط على الأيقونة
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.2)",
                          bgcolor: "rgba(255, 255, 255, 0.6)",
                        },
                      }}
                    >
                      <FavoriteIcon
                        sx={{ color: "#FF498B", fontSize: "2rem" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ fontFamily: "'Poppins', sans-serif" }}
            >
              You haven't added any favorites yet.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
