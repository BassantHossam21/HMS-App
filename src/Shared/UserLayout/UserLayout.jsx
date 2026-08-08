import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function UserLayout() {
  const location = useLocation();
  const isPaymentPage = location.pathname.includes("/payment");

  return (
    <>
      {!isPaymentPage && <Navbar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {!isPaymentPage && <Toolbar />}
        <Outlet />
      </Box>
      {!isPaymentPage && <Footer />}
    </>
  );
}
