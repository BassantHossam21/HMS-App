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
    <Box component="footer" sx={{ py: 8, bgcolor: "white", borderTop: "1px solid #E5E5E5" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Brand */}
          <Grid xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#3252DF" }}>
              Stay
              <Box component="span" sx={{ color: "#152C5B" }}>
                cation.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, color: "#B0B0B0", maxWidth: 250 }}>
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <Grid key={section.title} xs={6} sm={4} md={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "#152C5B", mb: 2 }}>
                {section.title}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {section.links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="none"
                    sx={{ color: "#B0B0B0", "&:hover": { color: "#3252DF" } }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Contact */}
          <Grid xs={12} sm={4} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "#152C5B", mb: 2 }}>
              Connect Us
            </Typography>
            <Typography sx={{ color: "#B0B0B0" }}>support@staycation.id</Typography>
            <Typography sx={{ color: "#B0B0B0" }}>021 - 2208 - 1996</Typography>
            <Typography sx={{ color: "#B0B0B0" }}>Staycation, Kemang, Jakarta</Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 8, textAlign: "center", borderTop: "1px solid #F0F1F2", pt: 3 }}>
          <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
            © 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
