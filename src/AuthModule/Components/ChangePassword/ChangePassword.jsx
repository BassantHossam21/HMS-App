// ==============================
// 1. IMPORTS
// ==============================
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, VpnKey } from "@mui/icons-material";
import { toast } from "react-toastify";
import useAuth from "@/Hooks/useAuth";

// ==============================
// 2. COMPONENT
// ==============================
export default function ChangePassword() {
  // --- Form Hook Setup ---
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // --- UI States (Show/Hide Password) ---
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // --- Auth Context ---
  const { changePassword } = useAuth();

  // ==============================
  // 3. HANDLERS
  // ==============================
  const onSubmit = async (data) => {
    try {
      await changePassword(data);
      toast.success("Password changed successfully!");
    } catch (err) {
      console.log("error", err);
      toast.error("Failed to change password. Please try again.");
    }
  };

  // ==============================
  // 4. RENDER
  // ==============================
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 120px)",
        p: 3,
      }}
    >
      {/* ================= CARD CONTAINER ================= */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          width: "100%",
          maxWidth: "500px",
          borderRadius: "16px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#fff",
        }}
      >
        {/* ================= HEADER SECTION ================= */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* Icon */}
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              backgroundColor: "rgba(32, 63, 199, 0.1)",
              color: "#203FC7",
              mb: 2,
            }}
          >
            <VpnKey sx={{ fontSize: 40 }} />
          </Box>
          {/* Titles */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1F263E" }}>
            Change Password
          </Typography>
          <Typography sx={{ color: "#6c757d", mt: 1 }}>
            Secure your account by updating your password.
          </Typography>
        </Box>

        {/* ================= FORM SECTION ================= */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          
          {/* -------- Old Password Input -------- */}
          <Typography sx={{ fontWeight: 600, color: "#1F263E", mb: 1 }}>
            Old Password
          </Typography>
          <TextField
            fullWidth
            type={showOld ? "text" : "password"}
            variant="outlined"
            placeholder="Enter your old password"
            autoComplete="current-password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            error={!!errors.oldPassword}
            helperText={errors.oldPassword?.message}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowOld(!showOld)} edge="end">
                    {showOld ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* -------- New Password Input -------- */}
          <Typography sx={{ fontWeight: 600, color: "#1F263E", mb: 1 }}>
            New Password
          </Typography>
          <TextField
            fullWidth
            type={showNew ? "text" : "password"}
            variant="outlined"
            placeholder="Enter your new password"
            autoComplete="new-password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowNew(!showNew)} edge="end">
                    {showNew ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* -------- Confirm Password Input -------- */}
          <Typography sx={{ fontWeight: 600, color: "#1F263E", mb: 1 }}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            type={showConfirm ? "text" : "password"}
            variant="outlined"
            placeholder="Confirm your new password"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 4 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* -------- Submit Button -------- */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              backgroundColor: "#203FC7",
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(32, 63, 199, 0.3)",
              "&:hover": {
                backgroundColor: "#1a329f",
              },
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
