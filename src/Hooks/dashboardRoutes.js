import HomeIcon from "@mui/icons-material/Home";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import LogoutIcon from "@mui/icons-material/Logout";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const dashboardDrawerRoutes = [
  {
    label: "Dashboard",
    path: "",
    icon: HomeIcon,
  },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: PeopleOutlineIcon,
  },
  
  {
    label: "Rooms",
    path: "/dashboard/rooms",
    icon: AutoAwesomeMosaicIcon,
  },

  {
    label: "Ads",
    path: "/dashboard/ads",
    icon: CalendarMonthIcon,
  },
  {
    label: "Bookings",
    path: "/dashboard/booking",
    icon: BookOnlineIcon,
  },
  { label: "Facilities", path: "/dashboard/facility", icon: DynamicFormIcon },
  {
    label: "Change Password",
    path: "/dashboard/changepass",
    icon: LockOutlinedIcon,
  },
  {
    label: "LogOut",
    action: "logout",
    icon: LogoutIcon,
  },
];
