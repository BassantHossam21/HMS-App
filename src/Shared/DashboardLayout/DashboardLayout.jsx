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
          overflow: "hidden",
        }}
      >
        <AdminNavbar />
        <Outlet />
      </Box>
    </Box>
  );
}
