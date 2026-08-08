import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "@/Context/AuthContext";
import useUsers from "@/Hooks/useUsers";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ handleDrawerToggle }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileData, setProfileData] = React.useState(null);
  
  const { user, logout } = React.useContext(AuthContext);
  const { getUserProfile } = useUsers();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user?._id) {
      getUserProfile(user._id)
        .then((data) => {
          setProfileData(data?.user || data);
        })
        .catch((err) => console.error("Failed to fetch user profile", err));
    }
  }, [user?._id]);

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FB",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: { xs: 1, sm: 1.5 },
        px: { xs: 1.5, sm: 3 },
        mt: { xs: 1.5, sm: 3 },
        mb: { xs: 2, sm: 4 },
      }}
    >
      {/* ================= LEFT: HAMBURGER & SEARCH ================= */}
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
        {/* Mobile Hamburger Menu */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" }, color: "#203FC7", p: 0 }}
        >
          <MenuIcon sx={{ fontSize: "28px" }} />
        </IconButton>

        {/* Search Bar */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "24px",
            px: { xs: 1, sm: 2 },
            py: 0.5,
            width: { xs: "130px", sm: "200px", md: "350px" },
          }}
        >
        <SearchIcon sx={{ color: "#9ca3af", mr: 1 }} />
        <InputBase
          placeholder="Search Here"
          sx={{ flex: 1, fontSize: "14px", color: "#333" }}
        />
      </Box>

      </Box>

      {/* ================= RIGHT: USER & NOTIFICATIONS ================= */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2, md: 4 } }}
      >
        {/* User Info */}
        <Box
          onClick={(e) => setAnchorElUser(e.currentTarget)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
        >
          <Avatar
            alt={profileData?.userName || user?.userName || "Admin"}
            src={profileData?.profileImage || "https://mui.com/static/images/avatar/2.jpg"}
            sx={{ width: 36, height: 36 }}
          />
          <Typography
            sx={{
              display: { xs: "none", sm: "block" }, // Hidden on mobile
              fontWeight: 600,
              fontSize: "14px",
              color: "#111",
            }}
          >
            {profileData?.userName || user?.userName || "Admin"}
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "#111", fontSize: "20px" }} />
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              setAnchorElUser(null);
              navigate("/dashboard/changepass");
            }}
          >
            Change Password
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorElUser(null);
              if (logout) logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications */}
        <IconButton color="inherit" sx={{ p: 0 }}>
          <Badge variant="dot" color="error" overlap="circular">
            <NotificationsIcon sx={{ color: "#333", fontSize: "24px" }} />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
