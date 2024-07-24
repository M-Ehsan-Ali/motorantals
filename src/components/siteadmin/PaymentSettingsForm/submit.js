// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import {toastr} from 'react-redux-toastr';
import messages from '../../../locale/messages';

async function submit(formatMessage, values, dispatch) {

  const query = `
    query(
    $id: Int,
    $paymentName: String,
    $paymentStatus: String,
    $paymentMode: String,
    $email: String,
    $APIUserId: String,
    $APIPassword: String,
    $APISecret: String,
    $AppId: String
    ){
    updatePaymentSettings(
        id: $id,
        paymentName: $paymentName,
        paymentStatus: $paymentStatus,
        paymentMode: $paymentMode,
        email: $email,
        APIUserId: $APIUserId,
        APIPassword: $APIPassword,
        APISecret: $APISecret,
        AppId: $AppId
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

  if(data.updatePaymentSettings.status === "success") {
    toastr.success(formatMessage(messages.updatePaymentSettings), formatMessage(messages.commonChangesSuccess));
  } else {
      toastr.error(formatMessage(messages.updatePaymentSettings), formatMessage(messages.updatePaymentSettingsFail));
  }

}

export default submit;
