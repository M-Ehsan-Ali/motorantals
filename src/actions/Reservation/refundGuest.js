// Toaster
import { toastr } from "react-redux-toastr";

import {
  ADMIN_REFUND_GUEST_ERROR,
  ADMIN_REFUND_GUEST_START,
  ADMIN_REFUND_GUEST_SUCCESS,
} from "../../constants";

import { refundToGuest } from "../../core/payment/refund/refundToGuest";
// Helper
import { convert } from "../../helpers/currencyConvertion";

// Stripe
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";
import messages from "../../locale/messages";

export function refundGuest(
  reservationId,
  receiverEmail,
  receiverId,
  payerEmail,
  payerId,
  amount,
  currency,
  paymentCurrency,
  paymentMethodId,
  transactionId,
  changeState,
  formatMessage
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADMIN_REFUND_GUEST_START,
      payload: {
        refundLoading: true,
        reservationId,
      },
    });

    try {
      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = 0;
      let currentCurrency = getState().currency.to
        ? getState().currency.to
        : getState().currency.base;
      if (paymentMethodId == 1) {
        // PayPal
        convertedAmount = convert(
          baseCurrency,
          rates,
          amount,
          currency,
          paymentCurrency
        );

        const { status } = await refundToGuest(
          reservationId,
          receiverEmail,
          receiverId,
          payerEmail,
          payerId,
          convertedAmount.toFixed(2),
          paymentCurrency
        );

        if (status && status === "SUCCESS") {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true,
            },
          });
          if (changeState) changeState("successRefund", reservationId);
          toastr.success(
            formatMessage(messages.refundToGuest),
            formatMessage(messages.refundToGuestSuccess)
          );
        } else {
          toastr.error(
            formatMessage(messages.refundToGuest),
            formatMessage(messages.refundToGuestFail)
          );
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false,
            },
          });
        }
      } else {
        // convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
        let cardDetails = {};
        let reservationDetails = {
          reservationId,
          // amount: convertedAmount.toFixed(2),
          // currency: currentCurrency,
          amount: amount.toFixed(2),
          currency,
          transactionId,
          payerEmail,
          payerId,
          receiverEmail,
          receiverId,
        };

        const { status, errorMessage } = await processOpnPaymentsPayment(
          "refund",
          reservationDetails,
          null,
          null
        );

        if (status === 200) {
          dispatch({
            type: ADMIN_REFUND_GUEST_SUCCESS,
            payload: {
              refundLoading: false,
              completed: true,
            },
          });
          if (changeState) changeState("successRefund", reservationId);
          toastr.success(
            formatMessage(messages.refundToRenter),
            formatMessage(messages.refundToRenterSuccess)
          );
        } else {
          toastr.error(formatMessage(messages.commonFail), errorMessage);
          dispatch({
            type: ADMIN_REFUND_GUEST_ERROR,
            payload: {
              refundLoading: false,
            },
          });
        }
      }
      if (changeState) changeState("removeRefund", reservationId);
    } catch (error) {
      dispatch({
        type: ADMIN_REFUND_GUEST_ERROR,
        payload: {
          error,
          refundLoading: false,
        },
      });
      if (changeState) changeState("removeRefund", reservationId);
      return false;
    }

    return true;
  };
}
