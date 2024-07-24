import { gql } from "react-apollo";
// Toaster
import { toastr } from "react-redux-toastr";
import {
  CANCEL_RESERVATION_START,
  CANCEL_RESERVATION_SUCCESS,
  CANCEL_RESERVATION_STATE_ERROR,
} from "../../constants";
import history from "../../core/history";
import { sendEmail } from "../../core/email/sendEmail";
import { decode } from "../../helpers/queryEncryption";
import messages from "../../locale/messages";

export function cancel(
  reservationId,
  cancellationPolicy,
  refundToGuest,
  payoutToHost,
  guestServiceFee,
  hostServiceFee,
  total,
  currency,
  threadId,
  cancelledBy,
  message,
  checkIn,
  checkOut,
  guests,
  listTitle,
  confirmationCode,
  hostName,
  guestName,
  hostEmail,
  guestEmail,
  startTime,
  endTime,
  intl
) {
  const { formatMessage } = intl;
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: CANCEL_RESERVATION_START,
    });

    try {
      const mutation = gql`
        mutation cancelReservation(
          $reservationId: Int!
          $cancellationPolicy: String!
          $refundToGuest: Float!
          $payoutToHost: Float!
          $guestServiceFee: Float!
          $hostServiceFee: Float!
          $total: Float!
          $currency: String!
          $threadId: Int!
          $cancelledBy: String!
          $message: String!
          $checkIn: String!
          $checkOut: String!
          $guests: Int!
          $startTime: Float!
          $endTime: Float!
        ) {
          cancelReservation(
            reservationId: $reservationId
            cancellationPolicy: $cancellationPolicy
            refundToGuest: $refundToGuest
            payoutToHost: $payoutToHost
            guestServiceFee: $guestServiceFee
            hostServiceFee: $hostServiceFee
            total: $total
            currency: $currency
            threadId: $threadId
            cancelledBy: $cancelledBy
            message: $message
            checkIn: $checkIn
            checkOut: $checkOut
            guests: $guests
            startTime: $startTime
            endTime: $endTime
          ) {
            status
          }
        }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          reservationId,
          cancellationPolicy,
          refundToGuest,
          payoutToHost,
          guestServiceFee,
          hostServiceFee,
          total,
          currency,
          threadId,
          cancelledBy,
          message,
          checkIn,
          checkOut,
          guests,
          startTime,
          endTime,
        },
        /*refetchQueries: [
          {
            query: getAllReservationQuery,
            variables: {
              userType
            },
          }
        ]*/
      });

      if (data.cancelReservation.status === "200") {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        if (cancelledBy === "owner") {
          history.push("/reservation/current");
          let content = {
            hostName,
            guestName,
            confirmationCode,
            checkIn,
            listTitle,
            refundToGuest,
            currency,
          };
          //First part: "id": "app.cancelReservation",
          toastr.success(
            formatMessage(messages.cancelReservation),
            formatMessage(messages.cancelReservationSuccess)
          );
          await sendEmail(decode(guestEmail), "cancelledByHost", content, intl);
        } else {
          history.push("/trips/current");
          let content = {
            hostName,
            guestName,
            confirmationCode,
            checkIn,
            listTitle,
            payoutToHost,
            currency,
          };
          //First part: "id": "app.cancelTrip",
          toastr.success(
            formatMessage(messages.cancelTrip),
            formatMessage(messages.cancelTripSuccess)
          );
          await sendEmail(decode(hostEmail), "cancelledByGuest", content, intl);
        }
      }

      if (data.cancelReservation.status === "400") {
        dispatch({
          type: CANCEL_RESERVATION_SUCCESS,
        });
        //First part: "id": "app.cancelReservation",
        toastr.error(
          formatMessage(messages.cancelReservation),
          formatMessage(messages.reservationIsAlreadyUpdated)
        );
      }
    } catch (error) {
      dispatch({
        type: CANCEL_RESERVATION_STATE_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
