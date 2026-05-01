import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const settings = ["Profile", "Dashboard", "Logout"];

export default function AdminNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* ================= RIGHT SIDE (ALL) ================= */}
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Mobile Menu */}
            <IconButton
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={(e) => setAnchorElNav(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>

            {/* User */}
            <Tooltip title="Account settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <Avatar alt="Admin" />
              </IconButton>
            </Tooltip>

            <Typography color="white">Welcome</Typography>
            {/* Notifications */}
            <IconButton color="inherit">
              <NotificationsActiveIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
