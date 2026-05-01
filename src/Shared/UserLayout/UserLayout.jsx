import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar.tsx";

export default function UserLayout() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "hidden",
        }}
      >
        <Navbar />
        <Outlet />
      </Box>
    </>
  );
}
