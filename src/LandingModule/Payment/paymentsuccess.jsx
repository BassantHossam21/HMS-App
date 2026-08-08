import React from "react";
import { Box, Typography, Button, Stepper, Step, StepLabel } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, useParams } from "react-router-dom";

// Import the specific image from assets
import successImage from "../../assets/images/payment-Success.png";

const steps = ["Booking", "Payment", "Payment Success"];

const CustomStepIcon = () => (
  <Box sx={{ width: 45, height: 45, borderRadius: "50%", bgcolor: "#1ABC9C", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <CheckIcon sx={{ color: "white", fontSize: 28 }} />
  </Box>
);

function PaymentSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 4 }}>
      {/* Top Bar Logo */}
      <Box sx={{ width: "100%", borderBottom: "1px solid #E5E5E5", py: 2, textAlign: "center", mb: { xs: 3, md: 6 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" } }}>
          <Box component="span" sx={{ color: "#3252DF" }}>Stay</Box>
          <Box component="span" sx={{ color: "#152C5B" }}>cation.</Box>
        </Typography>
      </Box>

      {/* Stepper */}
      <Stepper
        activeStep={3}
        alternativeLabel
        sx={{
          mb: 4,
          width: { xs: '100%', md: '30%' },
          mx: "auto",
          '& .MuiStepConnector-root': {
            top: 22,
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label} completed>
            <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Title */}
      <Typography
        variant="h3"
        fontWeight="800"
        align="center"
        sx={{ color: "#152C5B", mb: 4, fontSize: { xs: "2rem", md: "2.5rem" } }}
      >
        Yay! Completed
      </Typography>

      {/* Actual Figma Image */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Box 
          component="img"
          src={successImage}
          alt="Payment Success Illustration"
          sx={{
            width: '100%',
            maxWidth: '350px',
            height: 'auto',
          }}
        />
      </Box>

      {/* Subtitle */}
      <Typography align="center" sx={{ color: "#B0B0B0", fontSize: "1.1rem", mb: 4, maxWidth: 400, mx: "auto", lineHeight: 1.6 }}>
        We will inform you via email later once the transaction has been accepted
      </Typography>

      {/* Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#3252DF",
            color: "white",
            px: 6,
            py: 1.5,
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1.1rem",
            boxShadow: "0 8px 20px rgba(50, 82, 223, 0.3)",
            "&:hover": { bgcolor: "#223EAA" },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;
