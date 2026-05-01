import React from "react";
import forgetImage from "../../../assets/images/forgatImage.jpg";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const { forgetPassword } = useAuth();

  const onSubmit = async (data) => {
    try {
      await forgetPassword(data);
      console.log("Forget Code Sent Success");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "95%", margin: "auto" }}>
      <Grid container spacing={2}>
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
          {/* LOGO */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#152C5B" }}>
              Stay<span style={{ color: "#3252df" }}>cation.</span>
            </Typography>
          </Box>

          {/* FORM CENTER */}
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Forget Password
            </Typography>

            <Typography sx={{ mb: 4, fontWeight: 300 }}>
              If you don't have an account register <br />
              You can{" "}
              <Link
                to="/"
                style={{
                  color: "#152C5B",
                  fontWeight: 800,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Login here !
              </Link>
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}
              >
                Email
              </Typography>

              <TextField
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

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "50%",
                  my: 5,
                  py: 1.6,
                  backgroundColor: "#3252DF",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#2841BE",
                  },
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
              height: "92vh",
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
                src={forgetImage}
                alt="Forget Password"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Overlay */}
              <Box
                sx={{
                  position: "relative",
                }}
              />
              {/* Overlay text */}
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
                  Forgot password
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
  );
}
