// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch Request
import fetch from '../../../core/fetch';

// Language
import messages from '../../../locale/messages';
// Toaster
import {toastr} from 'react-redux-toastr';

async function submit(formatMessage, values, dispatch) {

  const query = `
    query (
      $id: Int,
      $title: String,
      $content: String,
    ) {
      updateBannerSettings (
        id: $id,
        title: $title,
        content: $content,
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

  if(data.updateBannerSettings.status === "success") {
    toastr.success(formatMessage(messages.updateBannerSettings), formatMessage(messages.commonChangesSuccess));
  } else {
      toastr.error(formatMessage(messages.updateBannerSettings), formatMessage(messages.updateBannerSettingsFail));
  }

}

export default submit;
