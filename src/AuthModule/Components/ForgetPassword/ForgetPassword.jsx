import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";

import forgetImage from "@/assets/images/forgatImage.jpg";
import useAuth from "@/Hooks/useAuth";

export default function ForgetPassword() {
  //========================= 1. AUTHENTICATION & CONTEXT =========================
  const { forgetPassword } = useAuth();
  const navigate = useNavigate();

  //========================= 2. FORM HANDLING ====================================
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  //========================= 3. SUBMIT HANDLER ===================================
  const onSubmit = async (data) => {
    try {
      await forgetPassword(data);
      navigate("/auth/resetpass");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "100vh" },
        minHeight: "100vh",
        backgroundColor: "#fff",
        overflow: { xs: "auto", md: "hidden" },
        display: "flex",
      }}
    >
      <Grid container spacing={0} sx={{ flex: 1 }}>
        {/* =================== 1. LEFT SIDE: LOGO & FORM CONTAINER ===================*/}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflowY: { xs: "auto", md: "hidden" },
            py: { xs: 4, md: 4 },
          }}
        >
          {/* ----------------- LOGO SECTION ----------------- */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#152C5B",
              fontSize: "32px",
              mb: 0,
              px: { xs: 4, md: 4 },
            }}
          >
            <span style={{ color: "#3252DF" }}>Stay</span>cation.
          </Typography>

          {/* ----------------- FORM SECTION ----------------- */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              px: { xs: 4, md: 14 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#152C5B",
                mb: 2,
                fontSize: "36px",
              }}
            >
              Forget Password
            </Typography>

            <Typography sx={{ color: "#B0B0B0", mb: 6, fontSize: "14px" }}>
              Remembered your password?
              <br />
              You can{" "}
              <Link
                to="/auth/login"
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
                gap: 4,
                width: "100%",
              }}
            >
              {/* --- Email Address Input --- */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: "#152C5B",
                    mb: 1.5,
                    fontSize: "16px",
                  }}
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
                    "& .MuiFormHelperText-root": {
                      position: "absolute",
                      bottom: "-22px",
                      mx: 0,
                      fontSize: "12px",
                      fontWeight: 600,
                    },
                    "& .MuiFilledInput-root": {
                      backgroundColor: "#F5F6F8",
                      borderRadius: "8px",
                      "&:before, &:after": { display: "none" },
                      "&:hover": { backgroundColor: "#EEF0F3" },
                      "&.Mui-focused": { backgroundColor: "#EEF0F3" },
                    },
                    "& .MuiFilledInput-input": {
                      padding: "16px 20px",
                      color: "#152C5B",
                      fontSize: "18px",
                    },
                  }}
                />
              </Box>

              {/* --- Submit Button --- */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  py: 1.5,
                  backgroundColor: "#3252DF",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  boxShadow: "0 8px 16px rgba(50, 82, 223, 0.24)",
                  "&:hover": {
                    backgroundColor: "#2844BD",
                  },
                }}
              >
                Send Email
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* ==================== 2. RIGHT SIDE: IMAGE OVERLAY ==================== */}
        <Grid
          size={6}
          sx={{
            display: { xs: "none", md: "flex" },
            p: 2,
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.3)), url(${forgetImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 6,
            }}
          >
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
              Forgot password
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#fff", mt: 1 }}>
              Homes as unique as you.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
