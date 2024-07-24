import messages from "../../../locale/messages";

export function getSubject(type, intl) {
  let subject, previewText;
  const { formatMessage } = intl;
  if (type === "welcomeEmail" || type === "confirmEmail") {
    subject = formatMessage(messages.pleaseConfirmEmail);
    previewText = formatMessage(messages.actionReqConfirmEmail);
  }
  if (type === "bookingRequest") {
    subject = formatMessage(messages.haveNewTripMsg);
    previewText = formatMessage(messages.haveNewTripNews);
  }
  if (type === "bookingRequestGuest") {
    subject = formatMessage(messages.tripReqSentOwner);
    previewText = formatMessage(messages.tripReqSentOwnerNews);
  }
  if (type === "bookingConfirmedToHost") {
    subject = formatMessage(messages.confirmedTrip);
    previewText = formatMessage(messages.confirmedReservationDetails);
  }
  if (type === "bookingConfirmedToGuest") {
    subject = formatMessage(messages.tripConfirmedByOwner);
    previewText = formatMessage(messages.packYourBag);
  }
  if (type === "bookingDeclinedToGuest") {
    subject = formatMessage(messages.tripReqDeclined);
    previewText = formatMessage(messages.reqIsDeclined);
  }
  if (type === "bookingExpiredGuest") {
    subject = formatMessage(messages.tripReqIsExpired);
    previewText = formatMessage(messages.reqIsExpired);
  }
  if (type === "bookingExpiredHost") {
    subject = formatMessage(messages.tripIsExpired);
    previewText = formatMessage(messages.tripIsExpired);
  }
  if (type === "cancelledByHost") {
    subject = formatMessage(messages.tripCanceledOwner);
    previewText = formatMessage(messages.tripCanceled);
  }
  if (type === "cancelledByGuest") {
    subject = formatMessage(messages.tripCanceledRenter);
    previewText = formatMessage(messages.tripCanceled);
  }
  if (type === "completedGuest") {
    subject = formatMessage(messages.writeReviewOwner);
    previewText = formatMessage(messages.actionReqWriteReview);
  }
  if (type === "completedHost") {
    subject = formatMessage(messages.writeReviewForRenter);
    previewText = formatMessage(messages.actionReqWriteReview);
  }
  if (type === "forgotPasswordLink") {
    subject = formatMessage(messages.resetYourPass);
    previewText = formatMessage(messages.actionReqResetPass);
  }

  if (type === "message") {
    subject = formatMessage(messages.haveGotNewMessage);
    previewText = formatMessage(messages.someoneSentMessage);
  }

  if (type === "inquiry") {
    subject = formatMessage(messages.haveGotNewInjury);
    previewText = formatMessage(messages.someHaveGotNewInjury);
  }

  if (type === "documentVerification") {
    subject = formatMessage(messages.documentVerificationStatus);
    previewText = formatMessage(messages.documentVerificationStatus);
  }
  if (type === "contact") {
    subject = formatMessage(messages.contactFormMsg);
    previewText = formatMessage(messages.contactFormMsg);
  }
  if (type === "reportUser") {
    subject = formatMessage(messages.reportingTheUser);
    previewText = formatMessage(messages.reportingTheUserForm);
  }
  if (type === "bookingPreApproval") {
    subject = formatMessage(messages.ownerPreApproveReq);
    previewText = formatMessage(messages.ownerPreApproveReqBooking);
  }
  if (type === "banStatusServiceStatusBanned") {
    subject = formatMessage(messages.statusBanned);
    previewText = formatMessage(messages.statusBanned);
  }
  if (type === "banStatusServiceStatusUnBanned") {
    subject = formatMessage(messages.statusUnBanned);
    previewText = formatMessage(messages.statusUnBanned);
  }
  if (type === "contactSupport") {
    subject = formatMessage(messages.customerSupport);
    previewText = formatMessage(messages.customerSupport);
  }
  if (type === "userFeedback") {
    subject = formatMessage(messages.customerFeedback);
    previewText = formatMessage(messages.customerFeedback);
  }

  return {
    subject,
    previewText,
  };
}
