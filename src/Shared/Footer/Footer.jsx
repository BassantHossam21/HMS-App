import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

const footerLinks = [
  {
    title: "For Beginners",
    links: ["New Account", "Start Booking a Room", "Use Payments"],
  },
  {
    title: "Explore Us",
    links: ["Our Careers", "Privacy", "Terms & Conditions"],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 5, md: 8 },
        bgcolor: "white",
        borderTop: "1px solid #E5E5E5",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>

          {/* ---- Brand ---- */}
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#3252DF" }}>
              Stay
              <Box component="span" sx={{ color: "#152C5B" }}>
                cation.
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1.5, color: "#B0B0B0", maxWidth: 240, lineHeight: 1.7 }}
            >
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* ---- Links Group ---- */}
          {footerLinks.map((section) => (
            <Grid key={section.title} size={{ xs: 6, sm: 4, md: 2.5 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 2, fontSize: "15px" }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                {section.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{
                      color: "#B0B0B0",
                      fontSize: "14px",
                      transition: "color 0.2s",
                      "&:hover": { color: "#3252DF" },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* ---- Contact ---- */}
          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#152C5B", mb: 2, fontSize: "15px" }}
            >
              Connect Us
            </Typography>
            {[
              "support@staycation.id",
              "021 - 2208 - 1996",
              "Staycation, Kemang, Jakarta",
            ].map((text) => (
              <Typography
                key={text}
                sx={{ color: "#B0B0B0", fontSize: "14px", mb: 0.5 }}
              >
                {text}
              </Typography>
            ))}
          </Grid>

        </Grid>

        {/* ---- Copyright ---- */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            textAlign: "center",
            borderTop: "1px solid #F0F1F2",
            pt: 3,
          }}
        >
          <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
