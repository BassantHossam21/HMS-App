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
import { useAdsApi } from "../../Hooks/useLandingAds";

export default function Ads() {
  let { getAds, data, loading } = useAdsApi();
  useEffect(() => {
    getAds();
  }, []);

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "500", mb: 3, color: "#152C5B" }}
        >
          Ads
        </Typography>

        <Grid container spacing={2}>
          {data.slice(0, 4).map((item) => (
            <Grid item size={3} key={item._id}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: "none",
                  position: "relative",
                  backgroundColor: "transparent",
                }}
              >
                {item.room.discount && (
                  <Chip
                    label={
                      item.room.discount ? ` ${item.room.discount}% Off` : null
                    }
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      backgroundColor: "#FF498C",
                      color: "white",
                      borderRadius: "0 0 15px 0",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  />
                )}

                <Box sx={{ overflow: "hidden", borderRadius: "15px" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.room.images[0]}
                    alt={item.room.roomNumber}
                    sx={{
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </Box>

                <CardContent sx={{ px: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "1.1rem",
                      color: "#152C5B",
                      fontWeight: "bold",
                    }}
                  >
                    {item.room.roomNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
                    capacity: {item.room.capacity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
                    price: {item.room.price} EGP
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
