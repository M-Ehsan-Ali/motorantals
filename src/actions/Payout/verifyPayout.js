import {
  VERIFY_PAYOUT_ERROR,
  VERIFY_PAYOUT_START,
  VERIFY_PAYOUT_SUCCESS,
} from "../../constants";
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";

// Stripe

import { setLoaderComplete, setLoaderStart } from "../loader/loader";

export function verifyPayout(currentAccountId, userId) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: VERIFY_PAYOUT_START,
    });

    await dispatch(setLoaderStart("payoutVerify"));

    try {
      let userDetails = {
        currentAccountId,
        userId,
      };

      const { status } = await processOpnPaymentsPayment(
        "verifyPayout",
        userDetails
      );

      if (status && status === 200) {
        await dispatch({
          type: VERIFY_PAYOUT_SUCCESS,
          payload: {
            status,
          },
        });
      }
      await dispatch(setLoaderComplete("payoutVerify"));
    } catch (error) {
      dispatch({
        type: VERIFY_PAYOUT_ERROR,
        payload: {
          error,
        },
      });

      await dispatch(setLoaderComplete("payoutVerify"));
      return false;
    }

    return true;
  };
}
