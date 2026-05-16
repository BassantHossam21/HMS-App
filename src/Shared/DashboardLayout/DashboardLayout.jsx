import React from "react";
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
  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <SideBar />
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
        <AdminNavbar />
        <Outlet />
      </Box>
    </Box>
  );
}
