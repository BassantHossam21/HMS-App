import * as React from "react";
import { useNavigate } from "react-router-dom"; // إضافة useNavigate
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
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Reviews", path: "/reviews" },
  { name: "Favorites", path: "/favorites" },
];

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "/logout" },
];

function Navbar() {
  const navigate = useNavigate(); // استخدام useNavigate
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path); // الانتقال للصفحة
    }
  };

  const handleCloseUserMenu = (path?: string) => {
    setAnchorElUser(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <AppBar sx={{ bgcolor: "#fff" }} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#152C5B" }}>
            Stay<span style={{ color: "#3252df" }}>cation.</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "end",
                marginRight: "50px",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.path)}
                sx={{
                  my: 2,
                  color: "#000",
                  display: "block",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              display: { md: "flex" },
              gap: "10px",
              marginRight: "20px",
            }}
          >
            <Button component={Link} to="/auth/register" variant="contained">
              Register
            </Button>
            <Button component={Link} to="/auth" variant="contained">
              Login Now
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleCloseUserMenu(setting.path)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
