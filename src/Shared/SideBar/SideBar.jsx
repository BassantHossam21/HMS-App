import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { dashboardDrawerRoutes } from "../../Hooks/dashboardRoutes";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  const drawerWidth = 240;
  const collapsedWidth = 90;

  const [open, setOpen] = useState(true);
  let { logout } = useContext(AuthContext);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "#203FC7",
          color: "#fff",
        },
      }}
    >
      {/* Toggle Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton sx={{ color: "#fff" }} onClick={() => setOpen(!open)}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* Menu */}
      <List
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        {dashboardDrawerRoutes.map((route, index) => {
          const isLogout = route.action === "logout";

          return (
            <ListItem key={route.label} disablePadding sx={{ width: "100%" }}>
              <ListItemButton
                component={isLogout ? "button" : NavLink}
                to={isLogout ? undefined : route.path}
                onClick={() => {
                  if (isLogout) {
                    logout();
                  }
                }}
                sx={{
                  display: "flex",
                  flexDirection: open ? "row" : "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  "&.active": {
                    backgroundColor: "action.selected",
                  },
                  px: 2,
                }}
              >
                {/* icon */}
                {route.icon && <route.icon />}

                {/* text */}
                {open && (
                  <ListItemText
                    primary={route.label}
                    sx={{ ml: open ? 1 : 0, textAlign: "center" }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
