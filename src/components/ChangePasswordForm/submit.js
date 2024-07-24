// Redux Form
import { SubmissionError, reset } from 'redux-form';

// Fetch Request
import fetch from '../../core/fetch';

// Toaster
import {toastr} from 'react-redux-toastr';
import messages from '../../locale/messages';

async function submit(formatMessage, values, dispatch) {

  if(values.newPassword != values.confirmPassword){
      toastr.error(formatMessage(messages.changePasswordFail), formatMessage(messages.passwordChangeMismatching));
      return;
  }

  const query = `
    mutation (
        $oldPassword: String,
        $newPassword: String,
        $confirmPassword: String,
        $registeredType: String,
    ) {
        ChangePassword (
            oldPassword: $oldPassword,
            newPassword: $newPassword,
            confirmPassword: $confirmPassword,
            registeredType: $registeredType
        ) {
            status
        }
    }
  `;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if(data.ChangePassword.status === 'success') {
    toastr.success(formatMessage(messages.changePasswordLabel), formatMessage(messages.passwordUpdateSuccess));
    // Clear form data
    dispatch(reset('ChangePasswordForm'));
  } else if(data.ChangePassword.status === 'WrongPassword') {
    toastr.error(formatMessage(messages.changePasswordLabel), formatMessage(messages.passwordChangeCurrentFail));
  } else if(data.ChangePassword.status === 'notLoggedIn') {
    toastr.error(formatMessage(messages.changePasswordLabel), formatMessage(messages.commonNotLoggedIn));
  } else if(data.ChangePassword.status === 'WrongConfirmPassword') {
    toastr.error(formatMessage(messages.changePasswordLabel), formatMessage(messages.passwordChangeMismatching));
  } else {
      toastr.error(formatMessage(messages.changePasswordLabel), formatMessage(messages.sthWentWrongReloadTryAgain));
  }

}

export default submit;
