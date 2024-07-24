import { isZeroDecimalCurrency } from "../../../../helpers/zeroDecimalCurrency";
import { createTransaction } from "../helpers/createTransaction";
const omise = require("omise")({
  publicKey: "pkey_test_60bpe72e141odnwbuaq",
  secretKey: "skey_test_60bpe73hfeoo038mdqq",
});
const opnPaymentRefund = (app) => {
  app.post("/opnPayments-refund", async function(req, res) {
    const {
      amount,
      currency,
      transactionId,
      reservationId,
      reservationDetails,
    } = req.body;
    let status = 200,
      errorMessage,
      refund;

    if (status === 200) {
      try {
        refund = await omise.charges.createRefund(transactionId, {
          amount: isZeroDecimalCurrency(currency)
            ? Math.round(amount)
            : Math.round(amount * 100),
        });
        console.log("refund: ", refund);
      } catch (error) {
        status = 400;
        errorMessage = error.message;
      }
    }

    if (status === 200 && refund && "id" in refund) {
      // Update Transactions
      await createTransaction(
        reservationId,
        null,
        null,
        refund.id,
        reservationDetails.amount,
        reservationDetails.currency,
        "cancellation",
        2
      );
    }
    res.send({ status, errorMessage });
  });
};

export default opnPaymentRefund;
