import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import registerImg from "../../../assets/images/Register.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();

  let {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      console.log("Registration Success");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={0} sx={{ minHeight: "100vh" }}>
        {/* Left Side: Form */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            px: { xs: 4, md: 12 },
            py: 2,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#152C5B",
              mb: 5,
              fontSize: "24px",
            }}
          >
            Stay<span style={{ color: "#3252DF" }}>cation.</span>
          </Typography>

          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#152C5B", mb: 1, fontSize: "26px" }}
          >
            Sign up
          </Typography>

          <Typography sx={{ color: "#4D4D4D", mb: 3, fontSize: "14px" }}>
            If you already have an account register <br />
            You can{" "}
            <Link
              to="/"
              style={{
                color: "#FF4D4D",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login here !
            </Link>
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
              >
                User Name
              </Typography>
              <TextField
                {...register("userName", { required: "Username is required" })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                fullWidth
                placeholder="Please type here ..."
                variant="filled"
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F5F6F8",
                    borderRadius: "12px",
                    "&:before, &:after": { display: "none" },
                    "&:hover": { backgroundColor: "#EEF0F3" },
                    "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                  },
                  "& .MuiFilledInput-input": {
                    padding: "16px 20px",
                    color: "#152C5B",
                  },
                }}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
                >
                  Phone Number
                </Typography>
                <TextField
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="filled"
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F5F6F8",
                      borderRadius: "12px",
                      "&:before, &:after": { display: "none" },
                      "&:hover": { backgroundColor: "#EEF0F3" },
                      "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                    },
                    "& .MuiFilledInput-input": {
                      padding: "16px 20px",
                      color: "#152C5B",
                    },
                  }}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
                >
                  Country
                </Typography>
                <TextField
                  {...register("country", { required: "Country is required" })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  fullWidth
                  placeholder="Please type here ..."
                  variant="filled"
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F5F6F8",
                      borderRadius: "12px",
                      "&:before, &:after": { display: "none" },
                      "&:hover": { backgroundColor: "#EEF0F3" },
                      "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                    },
                    "& .MuiFilledInput-input": {
                      padding: "16px 20px",
                      color: "#152C5B",
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
              >
                Email Address
              </Typography>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                placeholder="Please type here ..."
                variant="filled"
                size="small"
                type="email"
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F5F6F8",
                    borderRadius: "12px",
                    "&:before, &:after": { display: "none" },
                    "&:hover": { backgroundColor: "#EEF0F3" },
                    "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                  },
                  "& .MuiFilledInput-input": {
                    padding: "16px 20px",
                    color: "#152C5B",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
              >
                Password
              </Typography>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                placeholder="Please type here ..."
                variant="filled"
                size="small"
                type={showPassword ? "text" : "password"}
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F5F6F8",
                    borderRadius: "12px",
                    "&:before, &:after": { display: "none" },
                    "&:hover": { backgroundColor: "#EEF0F3" },
                    "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                  },
                  "& .MuiFilledInput-input": {
                    padding: "16px 20px",
                    color: "#152C5B",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#B0B0B0" }}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={16} />
                        ) : (
                          <FaEye size={16} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
              >
                Confirm Password
              </Typography>
              <TextField
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                fullWidth
                placeholder="Please type here ..."
                variant="filled"
                size="small"
                type={showConfirmPassword ? "text" : "password"}
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "#F5F6F8",
                    borderRadius: "12px",
                    "&:before, &:after": { display: "none" },
                    "&:hover": { backgroundColor: "#EEF0F3" },
                    "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                  },
                  "& .MuiFilledInput-input": {
                    padding: "16px 20px",
                    color: "#152C5B",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        sx={{ color: "#B0B0B0" }}
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash size={16} />
                        ) : (
                          <FaEye size={16} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Profile Image Upload */}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 0.5 }}
              >
                Profile Image
              </Typography>
              <Box
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "70px",
                  backgroundColor: "#F5F6F8",
                  borderRadius: "12px",
                  border: errors.profileImage
                    ? "2px dashed #d32f2f"
                    : "2px dashed #3252DF",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#EEF0F3",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#3252DF", fontWeight: 600 }}
                >
                  {watch("profileImage")?.[0]?.name ||
                    "Click to upload profile image"}
                </Typography>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  {...register("profileImage", {
                    required: "Profile image is required",
                  })}
                />
              </Box>
              {errors.profileImage && (
                <Typography
                  variant="caption"
                  sx={{ color: "#d32f2f", mt: 0.5, ml: 1 }}
                >
                  {errors.profileImage.message}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                py: 1.5,
                backgroundColor: "#3252DF",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0 8px 16px rgba(50, 82, 223, 0.24)",
                "&:hover": {
                  backgroundColor: "#2844BD",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
        </Grid>

        {/* Right Side: Image Overlay */}
        <Grid
          size={6}
          sx={{
            display: { xs: "none", md: "flex" },
            p: 2.5,
          }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.3)), url(${registerImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 6,
              pb: 8,
              color: "#fff",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 1, fontSize: "36px" }}
            >
              Sign up to Roamhome
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                opacity: 0.9,
                fontSize: "16px",
              }}
            >
              Homes as unique as you.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
