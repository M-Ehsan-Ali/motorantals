import {gql} from 'react-apollo';
import {toastr} from 'react-redux-toastr';
import history from '../../core/history';
import {
  UPDATE_FORGOT_PASSWORD_START,
  UPDATE_FORGOT_PASSWORD_SUCCESS,
  UPDATE_FORGOT_PASSWORD_ERROR, 
} from '../../constants';
import messages from '../../locale/messages';

export function updatePassword(email, newPassword, formatMessage) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: UPDATE_FORGOT_PASSWORD_START,
    });

    try {

      let mutation = gql `
       mutation changeForgotPassword($email: String!, $newPassword: String!) {
        changeForgotPassword (email: $email, newPassword: $newPassword) {
          status
        }
      }
      `;

      // Send Message
      const {data} = await client.mutate({
        mutation,
        variables: {
          email,
          newPassword
        }
      });

      if(data && data.changeForgotPassword) {

        if(data.changeForgotPassword.status === '200') {
          toastr.success(formatMessage(messages.changePasswordSuccess), formatMessage(messages.changePasswordSuccessInfo))
          history.push('/login');
        } else {
          toastr.error(formatMessage(messages.changePasswordFail), formatMessage(messages.sthWentWrongTryLater));
          return false;
        }

        dispatch({
          type: UPDATE_FORGOT_PASSWORD_SUCCESS,
        });
      }

    } catch (error) {
        dispatch({
          type: UPDATE_FORGOT_PASSWORD_ERROR,
          payload: {
            error
          }
        });
      return false;
    }

    return true;
  };
}