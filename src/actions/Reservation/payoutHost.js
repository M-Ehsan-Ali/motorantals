// Toaster
import { toastr } from "react-redux-toastr";

import {
  ADMIN_PAYOUT_HOST_ERROR,
  ADMIN_PAYOUT_HOST_START,
  ADMIN_PAYOUT_HOST_SUCCESS,
} from "../../constants";

import { sendPaymentToHost } from "../../core/payment/payout/sendPaymentToHost";
// Helper
import { convert } from "../../helpers/currencyConvertion";
// Stripe
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";
import messages from "../../locale/messages";

export function payoutHost(
  reservationId,
  destination,
  payoutId,
  amount,
  currency,
  paymentCurrency,
  userId,
  paymentMethodId,
  hostEmail,
  changeState,
  formatMessage
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADMIN_PAYOUT_HOST_START,
      payload: {
        loading: true,
        reservationId,
      },
    });

    try {
      let rates = getState().currency.rates;
      let baseCurrency = getState().currency.base;
      let convertedAmount = convert(
        baseCurrency,
        rates,
        amount,
        currency,
        paymentCurrency
      );

      if (paymentMethodId == 1) {
        // Pay Pal
        const { status, errorMessage } = await sendPaymentToHost(
          reservationId,
          destination,
          payoutId,
          convertedAmount.toFixed(2),
          paymentCurrency,
          userId,
          paymentMethodId
        );

        if (status && (status === "SUCCESS" || status === "PENDING")) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true,
            },
          });
          if (changeState) changeState("successPayout", reservationId);
          toastr.success(
            formatMessage(messages.paymentToHost),
            formatMessage(messages.paymentToHostSuccess)
          );
        } else {
          if (errorMessage) {
            toastr.error(formatMessage(messages.paymentToHost), errorMessage);
          } else {
            toastr.error(
              formatMessage(messages.paymentToHost),
              formatMessage(messages.paymentToHostFail)
            );
          }

          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false,
            },
          });
        }
      } else {
        // Stripe
        let cardDetails = {};
        let reservationDetails = {
          reservationId,
          amount: convertedAmount.toFixed(2),
          currency: paymentCurrency,
          hostEmail,
          payoutId,
          userId,
          destination,
          transfer_group: "Payout to Host",
        };
        const { status, errorMessage } = await processOpnPaymentsPayment(
          "payout",
          cardDetails,
          reservationDetails
        );

        if (status && status === 200) {
          dispatch({
            type: ADMIN_PAYOUT_HOST_SUCCESS,
            payload: {
              loading: false,
              completed: true,
            },
          });
          if (changeState) changeState("successPayout", reservationId);
          toastr.success(
            formatMessage(messages.paymentToHost),
            formatMessage(messages.paymentToHostSuccess)
          );
        } else {
          toastr.error(formatMessage(messages.paymentToHost), errorMessage);
          dispatch({
            type: ADMIN_PAYOUT_HOST_ERROR,
            payload: {
              loading: false,
            },
          });
        }
      }
      if (changeState) changeState("removePayout", reservationId);
    } catch (error) {
      dispatch({
        type: ADMIN_PAYOUT_HOST_ERROR,
        payload: {
          error,
          loading: false,
        },
      });
      if (changeState) changeState("removePayout", reservationId);
      return false;
    }

    return true;
  };
}
