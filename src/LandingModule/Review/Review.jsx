import { Box, Typography, IconButton, Stack, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img from "../../assets/images/Login.jpg";
export default function Review() {
  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: "75%", mx: "auto", my: 8, alignItems: "center" }}
    >
      {/* Image Section */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Box sx={{ position: "relative", mt: { xs: 0, md: 4 } }}>
          {/* background card */}
          <Box
            sx={{
              position: "absolute",
              top: -20,
              left: -20,
              width: { xs: "100%", md: 320 },
              height: { xs: 350, md: 420 },
              borderRadius: 4,
              border: "1px solid #eee",
              backgroundColor: "#fff",
            }}
          />

          {/* main image */}
          <Box
            component="img"
            src={img}
            alt="family"
            sx={{
              width: { xs: "100%", md: 320 },
              height: { xs: 350, md: 420 },
              objectFit: "cover",
              borderBottomLeftRadius: 80,
              borderRadius: 4,
              position: "relative",
              zIndex: 1,
            }}
          />
        </Box>
      </Grid>

      {/* Content */}
      <Grid item size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: "#1D2B53",
              mb: 1,
            }}
          >
            Happy Family
          </Typography>

          {/* Stars */}
          <Stack direction="row" spacing={0.5} mb={2}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "#FFC107", fontSize: 20 }} />
            ))}
          </Stack>

          <Typography
            sx={{
              fontSize: 18,
              color: "#1D2B53",
              mb: 2,
              lineHeight: 1.6,
            }}
          >
            What a great trip with my family and I should try again next time
            soon ...
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#9CA3AF",
              mb: 3,
            }}
          >
            Angga, Product Designer
          </Typography>

          {/* Arrows */}
          <Stack direction="row" spacing={2}>
            <IconButton
              sx={{
                border: "2px solid #1D4ED8",
                color: "#1D4ED8",
                width: 48,
                height: 48,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              sx={{
                border: "2px solid #1D4ED8",
                color: "#1D4ED8",
                width: 48,
                height: 48,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
