// import {
//   CLOSE_ADMIN_TRANSLATE_MODAL,
//   CLOSE_FILTER_MODAL,
//   CLOSE_FORGOT_PASSWORD_MODAL,
//   CLOSE_HEADER_MODAL,
//   CLOSE_LONGIN_MODAL,
//   CLOSE_REPORT_USER_MODAL,
//   CLOSE_SIGNUP_MODAL,
//   CLOSE_SOCIAL_SHARE_MODAL,
//   CLOSE_THANK_YOU_MODAL,
//   CLOSE_TRANSACTION_FILTER_MODAL,
//   OPEN_ADMIN_TRANSLATE_MODAL,
//   OPEN_FILTER_MODAL,
//   OPEN_FORGOT_PASSWORD_MODAL,
//   OPEN_HEADER_MODAL,
//   OPEN_LONGIN_MODAL,
//   OPEN_REPORT_USER_MODAL,
//   OPEN_SIGNUP_MODAL,
//   OPEN_SOCIAL_SHARE_MODAL,
//   OPEN_THANK_YOU_MODAL,
//   OPEN_TRANSACTION_FILTER_MODAL
// } from '../../constants';
// import { toggleClose } from '../Menu/toggleControl';

// export function openAdminTranslateModal(identifier, label, type = "default") {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_ADMIN_TRANSLATE_MODAL,
//       payload: {
//         isAdminTranslateModalOpen: true,
//         identifier,
//         label,
//         type
//       }
//     });
//     dispatch(toggleClose());
//   };

// }

// export function closeAdminTranslateModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_ADMIN_TRANSLATE_MODAL,
//       payload: {
//         isAdminTranslateModalOpen: false,
//         identifier: undefined,
//         label: undefined,
//         type: undefined
//       }
//     });
//     dispatch(toggleClose());
//   };

// }

// export function openLoginModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_LONGIN_MODAL,
//       isLoginModalOpen: true,
//       isSignupModalOpen: false,
//       isForgotPasswordOpen: false
//     });
//     dispatch(toggleClose());
//   };

// }

// export function closeLoginModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_LONGIN_MODAL,
//       isLoginModalOpen: false
//     });
//     dispatch(toggleClose());
//   };

// }

// export function openSignupModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_SIGNUP_MODAL,
//       isSignupModalOpen: true,
//       isLoginModalOpen: false
//     });
//   };

// }

// export function closeSignupModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_SIGNUP_MODAL,
//       isSignupModalOpen: false
//     });
//   };

// }

// export function openForgotPasswordModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_FORGOT_PASSWORD_MODAL,
//       isForgotPasswordOpen: true,
//       isLoginModalOpen: false
//     });
//   };

// }

// export function closeForgotPasswordModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_FORGOT_PASSWORD_MODAL,
//       isForgotPasswordOpen: false
//     });
//   };

// }

// export function openReportUserModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_REPORT_USER_MODAL,
//       payload: {
//         isReportUserModalOpen: true,
//       }
//     });
//   };

// }

// export function closeReportUserModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_REPORT_USER_MODAL,
//       payload: {
//         isReportUserModalOpen: false
//       }
//     });
//   };

// }

// export function openThankYouModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_THANK_YOU_MODAL,
//       payload: {
//         isThankYouModalOpen: true,
//         isReportUserModalOpen: false
//       }
//     });
//   };

// }

// export function closeThankYouModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_THANK_YOU_MODAL,
//       payload: {
//         isThankYouModalOpen: false,
//       }
//     });
//   };

// }

// export function openSocialShareModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_SOCIAL_SHARE_MODAL,
//       payload: {
//         isSocialShareModal: true,
//       }
//     });
//   };

// }

// export function closeSocialShareModal() {

//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_SOCIAL_SHARE_MODAL,
//       payload: {
//         isSocialShareModal: false,
//       }
//     });
//   };

// }

// export function openHeaderModal(modalType) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: OPEN_HEADER_MODAL,
//       payload: {
//         modalType,
//         actionValue: true
//       }
//     });
//   };
// }

// export function closeHeaderModal(modalType) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: CLOSE_HEADER_MODAL,
//       payload: {
//         modalType,
//         actionValue: false
//       }
//     });
//   };
// }

// export function openFiletrModal() {
//   return (dispatch, getState) => {

//     dispatch({
//       type: OPEN_FILTER_MODAL,
//       payload: {
//         filterModal: true
//       }
//     })

//   }
// }

// export function closeFilterModal() {
//   return (dispatch, getState) => {

//     dispatch({
//       type: CLOSE_FILTER_MODAL,
//       payload: {
//         filterModal: false
//       }
//     })

//   }
// }
// export function openTransactionModal() {
//   return (dispatch) => {

//     dispatch({
//       type: OPEN_TRANSACTION_FILTER_MODAL,
//       payload: {
//         transactionFilterModal: true
//       }
//     })
//   }
// }

// export function closeTransactionModal() {
//   return (dispatch) => {

//     dispatch({
//       type: CLOSE_TRANSACTION_FILTER_MODAL,
//       payload: {
//         transactionFilterModal: false
//       }
//     })
//   }
// }

import { gql } from "react-apollo";
import {
  BOOKING_PAYMENT_ERROR,
  BOOKING_PAYMENT_START,
  BOOKING_PAYMENT_SUCCESS,
} from "../../constants";

// Helper
import { convert } from "../../helpers/currencyConvertion";

import moment from "moment";

// OpnPayments
import { processOpnPaymentsPayment } from "../../core/payment/opnPayments/processOpnPaymentsPayment";

import { startTimeData } from "../../helpers/formatting";

import { toastr } from "react-redux-toastr";

// args: {
//   listId: { type: new NonNull(IntType) },
// hostId: { type: IntType },
// guestId: { type: IntType },
//   checkIn: { type: new NonNull(StringType) },
//   checkOut: { type: new NonNull(StringType) },
//   guests: { type: new NonNull(IntType) },
//   message: { type: new NonNull(StringType) },
//   basePrice: { type: new NonNull(FloatType) },
//   delivery: { type: FloatType },
//   currency: { type: new NonNull(StringType) },
//   discount: { type: FloatType },
//   discountType: { type: StringType },
//   guestServiceFee: { type: FloatType },
//   hostServiceFee: { type: FloatType },
//   total: { type: new NonNull(FloatType) },
//   bookingType: { type: StringType },
//   paymentType: { type: IntType },
//   cardToken: { type: StringType },
//   averagePrice: { type: FloatType },
//   days: { type: IntType },
//   startTime: { type: FloatType },
//   endTime: { type: FloatType },
//   licenseNumber: { type: new NonNull(StringType) },
//   firstName: { type: new NonNull(StringType) },
//   middleName: { type: StringType },
//   lastName: { type: new NonNull(StringType) },
//   dateOfBirth: { type: new NonNull(StringType) },
//   countryCode: { type: StringType },
//   isDeliveryIncluded: { type: BooleanType },
//   paymentCurrency: { type: StringType },
//   paymentMethod: { type: StringType },
//   token: { type: StringType }
// },

export function makePayment(
  listId,
  title,
  hostId,
  guestId,
  checkIn,
  checkOut,
  guests,
  message,
  basePrice,
  delivery,
  currency,
  discount,
  discountType,
  guestServiceFee,
  hostServiceFee,
  total,
  bookingType,
  // paymentCurrency,
  guestEmail,
  specialPricing,
  isSpecialPriceAssigned,
  isSpecialPriceAverage,
  dayDifference,
  startTime,
  endTime,
  licenseNumber,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  countryCode,
  securityDeposit,
  paymentMethod,
  paymentType,
  token,
  amount
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: BOOKING_PAYMENT_START,
      payload: {
        paymentLoading: true,
      },
    });

    // try {
    const mutation = gql`
      mutation createReservation(
        $listId: Int!
        $hostId: String!
        $guestId: String!
        $checkIn: String!
        $checkOut: String!
        $guests: Int!
        $message: String!
        $basePrice: Float!
        $delivery: Float
        $currency: String!
        $discount: Float
        $discountType: String
        $guestServiceFee: Float
        $hostServiceFee: Float
        $total: Float!
        $bookingType: String
        $paymentType: Int!
        $cancellationPolicy: Int!
        $specialPricing: String
        $isSpecialPriceAssigned: Boolean
        $isSpecialPriceAverage: Float
        $dayDifference: Float
        $startTime: Float
        $endTime: Float
        $licenseNumber: String!
        $firstName: String!
        $middleName: String
        $lastName: String!
        $dateOfBirth: String!
        $countryCode: String
        $securityDeposit: Float
        $paymentMethod: String!
        $token: String!
      ) {
        createReservation(
          listId: $listId
          hostId: $hostId
          guestId: $guestId
          checkIn: $checkIn
          checkOut: $checkOut
          guests: $guests
          message: $message
          basePrice: $basePrice
          delivery: $delivery
          currency: $currency
          discount: $discount
          discountType: $discountType
          guestServiceFee: $guestServiceFee
          hostServiceFee: $hostServiceFee
          total: $total
          bookingType: $bookingType
          paymentType: $paymentType
          cancellationPolicy: $cancellationPolicy
          specialPricing: $specialPricing
          isSpecialPriceAssigned: $isSpecialPriceAssigned
          isSpecialPriceAverage: $isSpecialPriceAverage
          dayDifference: $dayDifference
          startTime: $startTime
          endTime: $endTime
          licenseNumber: $licenseNumber
          firstName: $firstName
          middleName: $middleName
          lastName: $lastName
          dateOfBirth: $dateOfBirth
          countryCode: $countryCode
          securityDeposit: $securityDeposit
          paymentMethod: $paymentMethod
          token: $token
        ) {
          id
          listId
          hostId
          guestId
          checkIn
          checkOut
          guests
          message
          basePrice
          delivery
          currency
          discount
          discountType
          guestServiceFee
          hostServiceFee
          total
          confirmationCode
          createdAt
          status
          paymentMethodId
          cancellationPolicy
          isSpecialPriceAverage
          dayDifference
        }
      }
    `;

    let preApprove,
      bookingTypeData,
      cancellationPolicy,
      isStartValue,
      isStartDate,
      checkInDate,
      checkOutDate,
      isEndDate,
      isEndValue;
    preApprove = getState().book.bookDetails.preApprove;
    bookingTypeData = preApprove ? "instant" : bookingType;
    cancellationPolicy = getState().book.data.listingData.cancellation.id;
    (isStartValue = startTimeData(startTime)),
      (isEndValue = startTimeData(endTime));
    (isStartDate = moment(checkIn).format("YYYY-MM-DD")),
      (isEndDate = moment(checkOut).format("YYYY-MM-DD"));
    (checkInDate = moment.utc(isStartDate + " " + isStartValue)),
      (checkOutDate = moment.utc(isEndDate + " " + isEndValue));

    const { data } = await client.mutate({
      mutation,
      variables: {
        listId,
        hostId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        message,
        basePrice,
        delivery,
        currency,
        discount,
        paymentType,
        discountType,
        guestServiceFee,
        hostServiceFee,
        total,
        bookingType: bookingTypeData,
        cancellationPolicy,
        specialPricing,
        isSpecialPriceAssigned,
        isSpecialPriceAverage,
        dayDifference,
        startTime,
        endTime,
        licenseNumber,
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        countryCode,
        securityDeposit,
        paymentMethod,
        token,
      },
    });

    console.log("MUTATION DATA:", data);

    if (data && data.createReservation) {
      console.log("START PAYMENT PROCESS");
      let reservationId = data.createReservation.id;
      let amount = total + guestServiceFee + securityDeposit;
      console.log("securityDeposit: ", securityDeposit);
      let rates = getState().currency.rates;
      let currentCurrency = getState().currency.to
        ? getState().currency.to
        : getState().currency.base;
      let baseCurrency = getState().currency.base;

      // const convertedAmount = convert(
      //   baseCurrency,
      //   rates,
      //   amount,
      //   currency,
      //   currentCurrency
      // );
      let convertedAmount = convert(
        baseCurrency,
        rates,
        amount,
        currency,
        "THB"
      );

      if (!convertedAmount) {
        convertedAmount = convert(baseCurrency, rates, amount, currency, "THB");
      }
      let reservationDetails = {
        reservationId,
        listId,
        hostId,
        guestId,
        guestEmail,
        title,
        amount: convertedAmount,
        currency: "THB",
      };

      console.log("reservationDetails:", reservationDetails);

      const paymentData = await processOpnPaymentsPayment(
        "reservation",
        reservationDetails,
        paymentMethod,
        token
      );

      if (paymentData.success === true) {
        const { protocol, host, pathname } = window.location;
        const basePath = pathname.split("/")[1]; // Assuming your language path is always the second part
        const itineraryUrl = `${protocol}//${host}/${basePath}/users/trips/itinerary/${reservationId}`;
        window.location.href = itineraryUrl;
        dispatch({
          type: BOOKING_PAYMENT_SUCCESS,
          payload: { paymentLoading: true },
        });
        return true;
      } else {
        toastr.error(paymentData.message);
        dispatch({
          type: BOOKING_PAYMENT_ERROR,
          payload: { paymentLoading: false },
        });
        return false;
      }
    }

    dispatch({
      type: BOOKING_PAYMENT_SUCCESS,
      payload: { paymentLoading: false },
    });
    // } catch (error) {
    //   dispatch({
    //     type: BOOKING_PAYMENT_ERROR,
    //     payload: {
    //       error,
    //       paymentLoading: false,
    //     },
    //   });
    //   return false;
    // }

    // if (!paymentData.success) {
    //   toastr.error(paymentData.message);
    // }

    return true;
  };
}

// if (paymentType == 1) {
//   convertedAmount = convert(baseCurrency, rates, amount, currency, paymentCurrency);
// const { status, errorMessage } = await sendPayment(reservationId, convertedAmount.toFixed(2), paymentCurrency, title);
//   if (status == 400) {
//     errorMessage ? toastr.error('Failed!', errorMessage) : '';
//     dispatch({
//       type: BOOKING_PAYMENT_ERROR,
//       payload: { paymentLoading: false }
//     });
//   } else {
//     dispatch({
//       type: BOOKING_PAYMENT_SUCCESS,
//       payload: { paymentLoading: false }
//     });
//   }

// } else {
//   convertedAmount = convert(baseCurrency, rates, amount, currency, currentCurrency);
//   let cardDetails = {
//     // name,
//     // number: cardNumber,
//     // exp_month: expiryDate,
//     // exp_year: expiryYear,
//     // cvc: cvv
//   };
//   let reservationDetails = {
//     reservationId,
//     listId,
//     hostId,
//     guestId,
//     guestEmail,
//     title,
//     amount: convertedAmount.toFixed(2),
//     currency: currentCurrency
//   };

//   const { status, errorMessage, paymentIntentSecret } = await processStripePayment(
//     'reservation',
//     cardDetails,
//     reservationDetails,
//     paymentMethodId
//   );

//   if (status === 200) {
//     dispatch({
//       type: BOOKING_PAYMENT_SUCCESS,
//       payload: { paymentLoading: true }
//     });

//     return {
//       status
//     }

//   } else {
//     errorMessage ? toastr.error('Failed!', errorMessage) : '';
//     dispatch({
//       type: BOOKING_PAYMENT_ERROR,
//       payload: { paymentLoading: false }
//     });

//     return {
//       status,
//       paymentIntentSecret,
//       reservationId
//     }
//   }
// }
