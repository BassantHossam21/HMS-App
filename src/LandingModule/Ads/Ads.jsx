import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { useAdsApi } from "@/Hooks/useLandingAds";

export default function Ads() {
  let { getAds, data } = useAdsApi();
  useEffect(() => {
    getAds();
  }, []);

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 4, color: "#152C5B", fontFamily: "'Poppins', sans-serif" }}
        >
          Ads
        </Typography>

        <Grid container spacing={3}>
          {data.slice(0, 4).map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item._id}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: "none",
                  position: "relative",
                  backgroundColor: "transparent",
                }}
              >
                {item.room.discount && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "#FF498B",
                      color: "white",
                      px: 2.5,
                      py: 1,
                      borderBottomLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                      zIndex: 3,
                      fontSize: "15px",
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{item.room.discount}%</span> 
                    <span style={{ fontWeight: 'normal', fontSize: '13px' }}>Off</span>
                  </Box>
                )}

                <Box sx={{ overflow: "hidden", borderRadius: "15px", aspectRatio: '4/3', width: '100%', position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={item.room.images[0]}
                    alt={item.room.roomNumber}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      "&:hover": { transform: "scale(1.08)" },
                    }}
                  />
                </Box>

                <CardContent sx={{ px: 0, pt: 2, pb: "0 !important" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.1rem",
                      color: "#152C5B",
                      fontWeight: 600,
                      mb: 0.5
                    }}
                  >
                    {item.room.roomName || `Room ${item.room.roomNumber}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#B0B0B0", fontWeight: 400 }}>
                    {item.room.facilities?.[0]?.name ? `${item.room.facilities[0].name}, Indonesia` : `Capacity: ${item.room.capacity} | ${item.room.price} EGP`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
