// src/components/payment/StripeProvider.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from '../../lib/stripe';

const StripeProvider = ({ children, options }) => {
  const defaultOptions = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0066cc',
        colorBackground: '#ffffff',
        colorText: '#333333',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
      },
    },
    ...options,
  };

  return (
    <Elements stripe={stripePromise} options={defaultOptions}>
      {children}
    </Elements>
  );
};

export default StripeProvider;


