// ==================== IMPORTS ====================
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StripeProvider from "@/components/payment/StripeProvider";
import CheckoutForm from "@/components/payment/CheckoutForm";
import useLandingBooking from "@/Hooks/useLandingBooking";
import LoadingSpinner from "@/Shared/LoadingSpinner/LoadingSpinner";

// ==================== CONSTANTS & HELPERS ====================
const steps = ["Booking", "Payment", "Payment Success"];

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;
  if (completed) {
    return (
      <Box sx={{ width: 45, height: 45, borderRadius: "50%", bgcolor: "#1ABC9C", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CheckIcon sx={{ color: "white", fontSize: 28 }} />
      </Box>
    );
  }
  return (
    <Box sx={{ width: 45, height: 45, borderRadius: "50%", bgcolor: active ? "#F5F6F8" : "#F5F6F8", display: "flex", justifyContent: "center", alignItems: "center", border: active ? '2px solid #E5E5E5' : 'none' }}>
      <Typography sx={{ color: active ? "#152C5B" : "#B0B0B0", fontSize: 18, fontWeight: 500 }}>{icon}</Typography>
    </Box>
  );
};

// ==================== MAIN COMPONENT ====================
export default function PaymentPage() {
  // ==================== STATE & HOOKS ====================
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBooking, bookingDetails: BookingData, loading } = useLandingBooking();

  // ==================== LOGIC & API CALLS ====================
  useEffect(() => {
    if (bookingId) getBooking(bookingId);
  }, [bookingId]);

  // ==================== UI RENDERING ====================
  if (loading) return <LoadingSpinner />;

  return (
    <StripeProvider>
      <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
        {/* Top Bar Logo */}
        <Box sx={{ width: "100%", borderBottom: "1px solid #E5E5E5", py: 2, textAlign: "center", mb: { xs: 3, md: 6 } }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" } }}>
            <Box component="span" sx={{ color: "#3252DF" }}>Stay</Box>
            <Box component="span" sx={{ color: "#152C5B" }}>cation.</Box>
          </Typography>
        </Box>

        <Container maxWidth="lg" sx={{ pb: 10, px: { xs: 2, md: 3 } }}>
          {/* Stepper */}
          <Stepper
            activeStep={1}
            alternativeLabel
            sx={{
              mb: 6,
              width: { xs: '100%', md: '30%' },
              mx: "auto",
              '& .MuiStepConnector-root': {
                top: 22,
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Payment Title */}
          <Typography sx={{ fontWeight: 800, color: "#152C5B", fontSize: { xs: "1.8rem", md: "2.2rem" }, textAlign: "center", mb: 1 }}>
            Payment
          </Typography>
          <Typography sx={{ color: "#B0B0B0", textAlign: "center", fontSize: "1rem", mb: { xs: 4, md: 8 } }}>
            Kindly follow the instructions below
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {/* Left Side - Transfer Info */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex", flexDirection: "column", pr: { md: 4 }, mb: { xs: 2, md: 0 } }}>
              <Typography sx={{ color: "#152C5B", fontSize: "1.1rem", mb: 2 }}>
                Transfer Pembayaran:
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography sx={{ color: "#152C5B", fontSize: "1rem" }}>Tax: 10%</Typography>
                <Typography sx={{ color: "#152C5B", fontSize: "1rem" }}>
                  Sub total: ${((BookingData?.totalPrice || 0) / 1.1).toFixed(2)} USD
                </Typography>
                <Typography sx={{ color: "#152C5B", fontSize: "1.1rem", fontWeight: 700 }}>
                  Total: ${(BookingData?.totalPrice || 0).toFixed(2)} USD
                </Typography>
              </Box>

              <Box sx={{ mt: { xs: 3, md: 4 }, display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, color: "#3252DF", fontStyle: "italic", fontSize: "2rem" }}>
                    BCA
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: "#152C5B", fontSize: "1rem" }}>Bank Central Asia</Typography>
                  <Typography sx={{ color: "#152C5B", fontSize: "1rem" }}>2208 1996</Typography>
                  <Typography sx={{ color: "#152C5B", fontSize: "1rem" }}>BuildWith Angga</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Divider */}
            <Grid size={{ xs: 12, md: 1 }} sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              <Divider
                orientation="vertical"
                sx={{ display: { xs: "none", md: "block" }, height: "100%", borderColor: "#E5E5E5" }}
              />
            </Grid>

            {/* Right Side - Stripe Form */}
            <Grid size={{ xs: 12, md: 5 }}>
              {BookingData && (
                <CheckoutForm
                  bookingId={bookingId}
                  amount={Number(BookingData?.totalPrice || 0) * 100}
                  currency="usd"
                  onSuccess={(data) => {
                    toast.success("Payment successful");
                    console.log("Payment successful");
                  }}
                  onError={(error) => {
                    toast.error(error);
                  }}
                />
              )}
            </Grid>
          </Grid>

          {/* Cancel Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 6, md: 10 } }}>
            <Button
              onClick={() => navigate(-1)}
              sx={{
                bgcolor: "#F5F6F8",
                color: "#B0B0B0",
                width: { xs: "100%", sm: "auto" },
                px: { xs: 0, sm: 12 },
                py: 2,
                borderRadius: "10px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": { bgcolor: "#E5E5E5" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </StripeProvider>
  );
}
