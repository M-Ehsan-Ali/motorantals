import { isZeroDecimalCurrency } from "../../../helpers/zeroDecimalCurrency";
import { createTransaction } from "./helpers/createTransaction";

const omise = require("omise")({
  publicKey: "pkey_test_60bpe72e141odnwbuaq",
  secretKey: "skey_test_60bpe73hfeoo038mdqq",
});
export default async function opnPaymentRefund(
  reservation,
  transactionId,
  amount
) {
  try {
    let refundData,
      status = 200,
      errorMessage;
    try {
      refundData = await omise.charges.createRefund({
        transactionId,
        amount: isZeroDecimalCurrency(reservation.currency)
          ? Math.round(amount)
          : Math.round(amount * 100),
      });
    } catch (error) {
      status = 400;
      errorMessage = error.message;
    }

    if (status === 200 && refundData && "id" in refundData) {
      await createTransaction(
        reservation.id,
        null,
        null,
        refundData.id,
        amount,
        reservation.currency,
        "claimRefund",
        2
      );
    }

    return { status: 200, refundData, errorMessage };
  } catch (error) {
    return { status: 400, errorMessage: error.message };
  }
}
