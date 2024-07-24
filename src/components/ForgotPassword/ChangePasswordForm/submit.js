// Toaster
import {toastr} from 'react-redux-toastr';

import {updatePassword} from '../../../actions/ForgotPassword/updateForgotPassword';
import messages from '../../../locale/messages';

async function submit(formatMessage, values, dispatch) {

  if(values.newPassword != values.confirmPassword){
      toastr.error(formatMessage(messages.changePasswordFail), formatMessage(messages.passwordChangeMismatching));
      return;
  }

  dispatch(updatePassword(values.email, values.newPassword, formatMessage))

}

export default submit;
