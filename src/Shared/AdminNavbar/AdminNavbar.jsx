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
import { AuthContext } from "@/Context/AuthContext";
import useUsers from "@/Hooks/useUsers";

const settings = ["Profile", "Dashboard", "Logout"];

export default function AdminNavbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profileData, setProfileData] = React.useState(null);
  
  const { user } = React.useContext(AuthContext);
  const { getUserProfile } = useUsers();

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
        p: 1.5,
        px: 3,
        mt: 3,
        mb: 4,
      }}
    >
      {/* ================= LEFT: SEARCH BAR ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "24px",
          px: 2,
          py: 0.5,
          width: { xs: "200px", md: "350px" },
        }}
      >
        <SearchIcon sx={{ color: "#9ca3af", mr: 1 }} />
        <InputBase
          placeholder="Search Here"
          sx={{ flex: 1, fontSize: "14px", color: "#333" }}
        />
      </Box>

      {/* ================= RIGHT: USER & NOTIFICATIONS ================= */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 4 } }}
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
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={() => setAnchorElUser(null)}>
              {setting}
            </MenuItem>
          ))}
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
