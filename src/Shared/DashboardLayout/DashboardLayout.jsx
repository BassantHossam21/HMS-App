import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SideBar from "../SideBar/SideBar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          minHeight: "100vh",
          px: { xs: 2, md: 3 }
        }}
      >
        <AdminNavbar handleDrawerToggle={handleDrawerToggle} />
        <Outlet />
      </Box>
    </Box>
  );
}
