import { gql } from "react-apollo";
import { toastr } from "react-redux-toastr";
import messages from "../../locale/messages";

import {
  SEND_FORGOT_PASSWORD_START,
  SEND_FORGOT_PASSWORD_SUCCESS,
  SEND_FORGOT_PASSWORD_ERROR,
} from "../../constants";

import { closeForgotPasswordModal } from "../modalActions";
import { sendEmail } from "../../core/email/sendEmail";

export function sendForgotLink(email, intl) {
  const { formatMessage } = intl;
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: SEND_FORGOT_PASSWORD_START,
    });

    dispatch(closeForgotPasswordModal());

    try {
      let mutation = gql`
        mutation sendForgotPassword($email: String!) {
          sendForgotPassword(email: $email) {
            id
            email
            token
            userId
            status
            profile {
              firstName
            }
          }
        }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          email,
        },
      });

      if (data && data.sendForgotPassword) {
        if (data.sendForgotPassword.status === "notAvailable") {
          toastr.error(
            formatMessage(messages.resetLinkFail),
            formatMessage(messages.resetLinkFailNoAcc)
          );
          return false;
        }
        if (data.sendForgotPassword.status === "400") {
          toastr.error(
            formatMessage(messages.resetLinkFail),
            formatMessage(messages.smthWentWrongTryLater)
          );
          return false;
        }
        toastr.success(
          formatMessage(messages.resetLinkSuccess),
          formatMessage(messages.resetLinkSuccessInfo)
        );
        let content = {
          token: data.sendForgotPassword.token,
          email: data.sendForgotPassword.email,
          name: data.sendForgotPassword.profile.firstName,
        };
        await sendEmail(email, "forgotPasswordLink", content, intl);
        dispatch({
          type: SEND_FORGOT_PASSWORD_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_FORGOT_PASSWORD_ERROR,
        payload: {
          error,
        },
      });
      return false;
    }

    return true;
  };
}
