import React, { useState } from "react";
import resetPass from "../../../assets/images/forgatImage.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { resetPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      await resetPassword(data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const newPassword = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  return (
    <>
      <Box sx={{ flexGrow: 1, maxWidth: "95%", margin: "auto" }}>
        <Grid container spacing={2}>
          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
            {/* LOGO */}
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#152C5B" }}
              >
                Stay<span style={{ color: "#3252df" }}>cation.</span>
              </Typography>
            </Box>

            <Box
              sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Reset Password
              </Typography>

              <Typography sx={{ mb: 4, fontWeight: 300 }}>
                If you don't have an account register <br />
                You can{" "}
                <Link
                  to="/"
                  style={{
                    color: "#d82234ff",
                    fontWeight: 600,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Login here !
                </Link>
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B" }}
                >
                  Email
                </Typography>
                <TextField
                  sx={{ marginBottom: "15px" }}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="standard"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.email?.message}
                </FormHelperText>

                {/* Password */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}
                >
                  Password
                </Typography>
                <TextField
                  sx={{ marginBottom: "15px" }}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="standard"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must be at least 8 characters, with uppercase, lowercase, number, and special character",
                    },
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.password?.message}
                </FormHelperText>

                {/* Confirm Password */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}
                >
                  Confirm Password
                </Typography>
                <TextField
                  sx={{ marginBottom: "15px" }}
                  type={showConfirmPassword ? "text" : "password"}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="standard"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword}>
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.confirmPassword?.message}
                </FormHelperText>

                {/* OTP */}
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}
                >
                  OTP
                </Typography>
                <TextField
                  sx={{ marginBottom: "15px" }}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="standard"
                  {...register("seed", {
                    required: "OTP is required",
                    minLength: { value: 4, message: "OTP must be 4 digits" },
                  })}
                />
                <FormHelperText sx={{ color: "red" }}>
                  {errors.seed?.message}
                </FormHelperText>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "50%",
                    py: 1.6,
                    backgroundColor: "#3252DF",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#2841BE" },
                  }}
                >
                  Send Email
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT SIDE */}
          <Grid
            size={6}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
          >
            <Box
              sx={{
                margin: "auto",
                height: "90vh",
                position: "relative",
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "25px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={resetPass}
                  alt="Forget Password"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    left: 40,
                    color: "#fff",
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Reset password
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Homes as unique as you.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
