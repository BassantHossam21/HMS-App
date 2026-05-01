import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate, Link } from "react-router-dom";

import loginImg from "../../../assets/images/Login.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useAuthAction } from "../../../Context/AuthActionContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
}));

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const { login } = useAuth();
  const { runSavedAction } = useAuthAction();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const decoded = await login(data);

      // Execute any saved action (e.g., adding to favorites, etc.)
      if (runSavedAction) {
        runSavedAction();
      }

      if (decoded?.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: "100vh",
        width: "90%",
        margin: "auto",
      }}
    >
      <Grid container spacing={2}>
        {/* Form */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#152C5B" }}>
            Stay<span style={{ color: "#3252df" }}>cation.</span>
          </Typography>

          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, my: 2 }}>
              Sign In
            </Typography>

            <Typography sx={{ mb: 4, fontWeight: 300 }}>
              If you don't have an account register <br />
              You can{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#152C5B",
                  fontWeight: 800,
                }}
              >
                Register here !
              </Link>
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <Typography sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}>
                Email Address
              </Typography>

              <TextField
                fullWidth
                placeholder="Please type here ..."
                variant="standard"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Password */}
              <Typography
                sx={{ fontWeight: 600, color: "#152C5B", mb: 1, mt: 2 }}
              >
                Password
              </Typography>

              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="Please type here ..."
                variant="standard"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Link to="/forgetpass" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ mt: 1, color: "#4D4D4D", textAlign: "right" }}
                >
                  Forgot Password ?
                </Typography>
              </Link>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "50%",
                  my: 5,
                  py: 1.6,
                  backgroundColor: "#3252DF",
                  borderRadius: "8px",
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Image */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Item>
            <Box sx={{ width: "100%", height: "90vh", position: "relative" }}>
              <img
                src={loginImg}
                alt="Login"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "25px",
                  objectFit: "cover",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  color: "#fff",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  Sign in to Roamhome
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Homes as unique as you.
                </Typography>
              </Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
