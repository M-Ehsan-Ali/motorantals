import { Reservation } from "../../../../data/models";
import { createThread } from "../../createThread";
import { blockDates } from "../helpers/blockDates";
// import { createThread } from "../helpers/createThread";
import { createTransaction } from "../helpers/createTransaction";

import { emailBroadcast } from "../helpers/email";
import {
  updateRemainingPaymentStatus,
  updateReservation,
} from "../helpers/updateReservation";

const omise = require("omise")({
  publicKey: "pkey_test_60bpe72e141odnwbuaq",
  secretKey: "skey_test_60bpe73hfeoo038mdqq",
});

export const opnPaymentsMakeReservation = (app) => {
  app.post("/opnPayments-add-reservation", function(req, res) {
    const {
      token,
      amount,
      currency,
      reservationId,
      paymentMethod,
      email,
      guestId,
    } = req.body;

    if (paymentMethod === "creditCard") {
      omise.charges.create(
        {
          amount: Math.ceil(amount), // Amount in the smallest unit of your currency
          currency: currency,
          card: token,
        },
        async function(error, charge) {
          if (error) {
            console.error("Error creating charge:", error);
            res.send({
              success: false,
              message: error.message,
            });
          } else {
            await Reservation.update(
              { paymentIntentId: charge.id },
              {
                where: {
                  id: reservationId,
                },
              }
            );
            await updateReservation(reservationId);
            await updateRemainingPaymentStatus(reservationId);
            await createThread(reservationId);
            await blockDates(reservationId);
            await createTransaction(
              reservationId,
              email,
              guestId,
              charge.id,
              amount,
              currency,
              "booking",
              2
            );
            await emailBroadcast(reservationId);
            // console.log(charge);
            // res.send({
            //   success: true,
            //   chargeId: charge.id,
            //   status: charge.status,
            // });
            //   res.redirect(charge.authorize_uri);

            res.send({
              success: true,
              status: 200,
              chargeId: charge.id,
            });
          }
        }
      );
    }
  });
};
