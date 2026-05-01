import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../Api/AxiosClient";
import StripeProvider from "../../components/payment/StripeProvider";
import CheckoutForm from "../../components/payment/CheckoutForm";

const steps = ["Booking", "Payment", "Payment Success"];

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [BookingData, setBookingData] = useState(null);
  const navigate = useNavigate();

  const getBooking = async () => {
    try {
      const res = await axiosClient.get(`/api/v0/portal/booking/${bookingId}`);
      console.log(res);

      setBookingData(
        res.data.data?.booking || res.data.data || res.data.booking,
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch booking data",
      );
    }
  };

  useEffect(() => {
    if (bookingId) getBooking();
  }, [bookingId]);

  return (
    <StripeProvider>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          {/* Title */}
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Staycation.
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={1} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={index === 0 ? CheckCircleIcon : undefined}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Payment Title */}
          <Typography variant="h6" fontWeight="bold" align="center">
            Payment
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Kindly follow the instructions below
          </Typography>

          <Grid container spacing={4} sx={{ display: "flex" }}>
            {/* Left Side - Transfer Info */}
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{ width: { md: "20%", xs: "30%" }, mx: { md: 13, xs: 4 } }}
            >
              <Typography variant="body2" gutterBottom>
                Transfer Pembayaran:
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Tax: 10%</Typography>
                <Typography variant="body2">
                  Sub total: $
                  {((BookingData?.totalPrice || 0) / 1.1).toFixed(2)} USD
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total: ${(BookingData?.totalPrice || 0).toFixed(2)} USD
                </Typography>
              </Box>

              <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                <Box>
                  <Typography fontWeight="bold" color="rgb(43, 60, 152)">
                    BCA
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">Bank central asia </Typography>
                  <Typography variant="body1">2208 1955 </Typography>
                  <Typography variant="body1">Builidwuyvg</Typography>
                </Box>
              </Box>
            </Grid>
            {/* Divider */}
            <Grid size={{ xs: 12, md: 1 }}>
              <Divider
                orientation="vertical"
                sx={{ display: { xs: "none", md: "block" }, height: "100%" }}
              />
            </Grid>
            {/* //////right side/////// */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ width: "35%" }}>
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
        </Paper>
      </Container>
    </StripeProvider>
  );
}
