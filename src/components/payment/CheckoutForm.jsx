// src/components/payment/CheckoutForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosClient from "../../Api/AxiosClient";

// Card Element styling options
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#152C5B",
      fontFamily: '"Poppins", "Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#B0B0B0",
      },
      iconColor: "#3252DF",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const CheckoutForm = ({ bookingId, amount, currency = "usd", onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage("Card element not found.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 1. Create token securely with Stripe using the card details
      const { error: stripeError, token } = await stripe.createToken(cardElement);

      if (stripeError) {
        setErrorMessage(stripeError.message || "Failed to create payment token");
        onError?.(stripeError.message || "Failed to create payment token");
        return;
      }

      // 2. Send the token to the backend API exactly as required
      const response = await axiosClient.post(`/api/v0/portal/booking/${bookingId}/pay`, {
        token: token.id,
      });

      // 3. Handle successful backend response
      onSuccess?.(response.data);

    } catch (error) {
      const message = error.response?.data?.message || error.message || "An error occurred during payment";
      setErrorMessage(message);
      onError?.(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage(null);
    }
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
      {/* Hide the top total since it's already shown on the left side of the page */}
      <div style={{ display: "none" }}>
        <span>Total:</span>
        <span className="amount">{formatAmount(amount, currency)}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="card-element" style={{ fontWeight: '600', color: '#152C5B', fontSize: '15px' }}>
          Card Information
        </label>
        <div style={{ 
          padding: '16px', 
          border: '1px solid #E5E7EB', 
          borderRadius: '8px', 
          backgroundColor: '#F9FAFB',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
          transition: 'border-color 0.2s ease-in-out'
        }}>
          <CardElement
            id="card-element"
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange}
          />
        </div>
      </div>

      {errorMessage && (
        <div style={{ color: '#D32F2F', fontSize: '14px', backgroundColor: '#FDECEA', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }} role="alert">
          <span style={{ fontSize: '18px' }}>⚠️</span> {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing || !isCardComplete}
        style={{
          backgroundColor: (!stripe || isProcessing || !isCardComplete) ? '#B0B0B0' : '#3252DF',
          color: 'white',
          padding: '14px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: (!stripe || isProcessing || !isCardComplete) ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s',
          boxShadow: (!stripe || isProcessing || !isCardComplete) ? 'none' : '0 4px 6px rgba(50, 82, 223, 0.2)'
        }}
      >
        {isProcessing
          ? "Processing..."
          : `Pay ${formatAmount(amount, currency)}`}
      </button>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
        🔒 Secured by Stripe
      </div>
    </form>
  );
};

export default CheckoutForm;
