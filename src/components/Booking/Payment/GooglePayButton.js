import React, { useRef } from "react";
import GooglePayButton from "@google-pay/button-react";

export const GoogleButton = ({ children, style }) => {
  const btnRef = useRef(null);

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
            gatewayMerchantId: "exampleGatewayMerchantId",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: "123.00",
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  const onLoadPaymentData = (paymentRequest) => {
    console.log("load payment data", paymentRequest);
  };

  const onPaymentAuthorized = (paymentData) => {
    // Perform any additional validation or processing here if necessary
    // You can also send the payment token to your server here

    // Return an object with a status to indicate whether the payment was successful
    return { transactionState: "SUCCESS" };
  };

  const onError = (error) => {
    console.error("Payment Error:", error);
    // Handle payment errors here
  };

  return (
    <div style={{ ...style }}>
      <div
        onClick={() => {
          const googlePayBtn = document.querySelector(
            ".google-pay-button-container button"
          );
          googlePayBtn.click();
        }}
      >
        {children}
      </div>
      <div style={{ display: "none" }}>
        <GooglePayButton
          environment="TEST"
          paymentRequest={paymentRequest}
          onLoadPaymentData={onLoadPaymentData}
        />
      </div>
    </div>
  );
};
