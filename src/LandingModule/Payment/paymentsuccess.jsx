import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";


const steps = ["Booking", "Payment", "Payment Success"];

function PaymentSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          textAlign: "center",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="800"
          align="center"
          color="#3252DF"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Staycation.
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Success Icon with subtle background pulse */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#E8F5E9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            mb: 4,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: "#4CAF50",
            }}
          />
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#152C5B" }}>
          Payment Successful! 🎉
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: "500px", mx: "auto", lineHeight: 1.6 }}>
          Thank you for completing your payment. Your booking has been confirmed successfully. We are looking forward to hosting you!
        </Typography>

        {id && (
          <Box
            sx={{
              backgroundColor: "#F9FAFB",
              p: 2,
              borderRadius: 2,
              display: "inline-block",
              mb: 5,
              border: "1px dashed #D1D5DB",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Booking ID
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="#152C5B">
              #{id}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#3252DF",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 14px 0 rgba(50, 82, 223, 0.39)",
              "&:hover": {
                backgroundColor: "#223EAA",
                boxShadow: "0 6px 20px rgba(50, 82, 223, 0.23)",
              },
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(`/dashboard/booking`)}
            sx={{
              ml: { xs: 0, sm: 2 },
              mt: { xs: 2, sm: 0 },
              color: "#152C5B",
              borderColor: "#E5E7EB",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "600",
              "&:hover": {
                borderColor: "#152C5B",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            View My Bookings
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default PaymentSuccess;
