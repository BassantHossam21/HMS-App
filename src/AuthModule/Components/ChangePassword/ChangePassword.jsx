import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import loginImg from "../../../assets/images/Login.jpg";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";

const Item = styled(Paper)(() => ({
  backgroundColor: "#fff",
}));

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 👁️ states
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { changePassword } = useAuth();

  const onSubmit = async (data) => {
    try {
      await changePassword(data);
      console.log("changePassword Success");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Form */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#152C5B" }}>
            Stay<span style={{ color: "#3252df" }}>cation.</span>
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, my: 2 }}>
              Change Password
            </Typography>

            <Typography sx={{ mb: 4, fontWeight: 300 }}>
              Secure your account by updating your password
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Old Password */}
              <Typography sx={{ fontWeight: 600, color: "#152C5B", mb: 1 }}>
                Old Password
              </Typography>
              <TextField
                fullWidth
                type={showOld ? "text" : "password"}
                variant="standard"
                autoComplete="current-password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOld(!showOld)}>
                        {showOld ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* New Password */}
              <Typography
                sx={{ fontWeight: 600, color: "#152C5B", mb: 1, mt: 2 }}
              >
                New Password
              </Typography>
              <TextField
                fullWidth
                type={showNew ? "text" : "password"}
                variant="standard"
                autoComplete="new-password"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNew(!showNew)}>
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <Typography
                sx={{ fontWeight: 600, color: "#152C5B", mb: 1, mt: 2 }}
              >
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type={showConfirm ? "text" : "password"}
                variant="standard"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "100%",
                  my: 5,
                  py: 1.6,
                  backgroundColor: "#3252DF",
                  borderRadius: "8px",
                }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Image – hidden on mobile */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Item>
            <Box
              sx={{
                width: "100%",
                height: "90vh",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={loginImg}
                alt="Change Password"
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
                  Change your password
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Keep your account secure.
                </Typography>
              </Box>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
