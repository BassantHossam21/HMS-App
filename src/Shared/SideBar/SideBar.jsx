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

export default function SideBar({ mobileOpen, handleDrawerToggle }) {
  // Desktop specific state
  const [desktopOpen, setDesktopOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  const drawerContent = (isMobile) => {
    // If mobile, the drawer is technically always "open" visually when mounted
    const isOpen = isMobile ? true : desktopOpen;
    return (
      <>
        {/* Toggle Button (Hidden on Mobile) */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: isOpen ? "flex-end" : "center",
              p: 1,
            }}
          >
            <IconButton sx={{ color: "#fff" }} onClick={() => setDesktopOpen(!desktopOpen)}>
              {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        )}

        {/* Menu */}
        <List
          sx={{
            mt: isMobile ? 4 : 2,
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
                    if (isMobile && handleDrawerToggle) {
                      handleDrawerToggle(); // close drawer on mobile after clicking
                    }
                  }}
                  sx={{
                    display: "flex",
                    flexDirection: isOpen ? "row" : "column",
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
                  {isOpen && (
                    <ListItemText
                      primary={route.label}
                      sx={{ ml: isOpen ? 1 : 0, textAlign: "center" }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </>
    );
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: desktopOpen ? 240 : 90 },
        flexShrink: { sm: 0 },
        transition: "width 0.3s",
      }}
    >
      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#203FC7",
            color: "#fff",
          },
        }}
      >
        {drawerContent(true)}
      </Drawer>

      {/* ================= DESKTOP DRAWER ================= */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: desktopOpen ? 240 : 90,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
            backgroundColor: "#203FC7",
            color: "#fff",
          },
        }}
        open
      >
        {drawerContent(false)}
      </Drawer>
    </Box>
  );
}
