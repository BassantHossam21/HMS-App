import * as React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../Context/AuthContext";
import useUsers from "../../Hooks/useUsers";
// Link imported above

const settings = [
  { name: "Logout", path: "/logout" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, logout } = React.useContext(AuthContext);
  const { getUserProfile } = useUsers();
  const [profileData, setProfileData] = React.useState(null);

  React.useEffect(() => {
    if (user?._id) {
      getUserProfile(user._id)
        .then((data) => {
          setProfileData(data?.user || data);
        })
        .catch((err) => console.error("Failed to fetch user profile", err));
    }
  }, [user?._id]);

  // Check if token exists in localStorage
  const token = localStorage.getItem("access_token");

  const pages = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/All-rooms" },
    { name: "Reviews", path: "/reviews" },
    { name: "Favorites", path: "/favorites" },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) {
      if (path === "/logout") {
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        navigate(path);
      }
    }
  };

  const handleCloseUserMenu = (path) => {
    setAnchorElUser(null);
    if (path) {
      if (path === "/logout") {
        if (logout) logout();
        localStorage.removeItem("access_token");
        navigate("/");
      } else {
        navigate(path);
      }
    }
  };

  return (
    <AppBar sx={{ bgcolor: "#fff", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }} position="fixed">
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
              <MenuIcon sx={{ color: "#000" }} />
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
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.path)}
                  sx={{
                    my: 2,
                    color: isActive ? "#3252df" : "#000",
                    display: "block",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "15px",
                    textTransform: 'none',
                    mx: 1
                  }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>

          {!token && (
            <Box
              sx={{
                display: { md: "flex" },
                gap: "10px",
              }}
            >
              <Button component={Link} to="/auth/register" variant="contained" sx={{ bgcolor: '#3252df', textTransform: 'none', borderRadius: '4px', boxShadow: 'none' }}>
                Register
              </Button>
              <Button component={Link} to="/auth" variant="contained" sx={{ bgcolor: '#3252df', textTransform: 'none', borderRadius: '4px', boxShadow: 'none' }}>
                Login Now
              </Button>
            </Box>
          )}

          {token && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <Button onClick={handleOpenUserMenu} sx={{ p: 0, textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar
                    alt={profileData?.userName || user?.userName || "User"}
                    src={profileData?.profileImage || "https://mui.com/static/images/avatar/2.jpg"}
                    sx={{ width: 36, height: 36 }}
                  />
                  <Typography sx={{ color: '#111', fontWeight: 600, fontSize: '14px', display: { xs: 'none', sm: 'block' } }}>
                    {profileData?.userName || user?.userName || "User"}
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ color: "#111", fontSize: "20px" }} />
                </Button>
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
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
