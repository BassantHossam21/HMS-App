import { Box, Typography, IconButton, Stack, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import img from "@/assets/images/Review.png";
export default function Review() {
  return (
    <Grid
      container
      spacing={4}
      sx={{ px: { xs: 2, md: 8 }, my: 10, alignItems: "center", justifyContent: 'center' }}
    >
      {/* Image Section */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Box sx={{ position: "relative", width: "100%", display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 0 } }}>
          {/* background card */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              maxWidth: "380px",
              height: "450px",
              border: "2px solid #E5E5E5",
              borderRadius: "15px 15px 100px 15px",
              transform: "translate(-35px, -35px)",
              zIndex: 0,
            }}
          />

          {/* main image */}
          <Box
            component="img"
            src={img}
            alt="family"
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "380px",
              height: "450px",
              objectFit: "cover",
              borderRadius: "15px 15px 100px 15px",
              zIndex: 1,
            }}
          />
        </Box>
      </Grid>

      {/* Content */}
      <Grid size={{ xs: 12, md: 7 }} sx={{ pl: { xs: 0, md: 8 }, mt: { xs: 6, md: 0 } }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 24,
              color: "#152C5B",
              mb: 3,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Happy Family
          </Typography>

          {/* Stars */}
          <Stack direction="row" spacing={0.5} mb={3}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: "#FFC107", fontSize: 32 }} />
            ))}
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              color: "#152C5B",
              mb: 4,
              lineHeight: 1.5,
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            What a great trip with my family and I should try again next time
            soon ...
          </Typography>

          <Typography
            sx={{
              fontSize: 16,
              color: "#B0B0B0",
              mb: 5,
              fontWeight: 400
            }}
          >
            Angga, Product Designer
          </Typography>

          {/* Arrows */}
          <Stack direction="row" spacing={3}>
            <IconButton
              sx={{
                border: "2px solid #3252DF",
                color: "#3252DF",
                width: 50,
                height: 50,
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <IconButton
              sx={{
                border: "2px solid #3252DF",
                color: "white",
                bgcolor: "#3252DF",
                width: 50,
                height: 50,
                "&:hover": {
                  bgcolor: "#2844B5"
                }
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
