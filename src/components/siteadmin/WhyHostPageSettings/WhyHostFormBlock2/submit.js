import fetch from '../../../../core/fetch';
import { toastr } from 'react-redux-toastr';
import messages from '../../../../locale/messages';

async function submit(formatMessage, values, dispatch) {
  const query = `
  mutation (
    $earnBlockTitle1: String,
    $earnBlockContent1: String,
) {
  updateWhyHostPage (
    earnBlockTitle1: $earnBlockTitle1,
    earnBlockContent1: $earnBlockContent1,
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

  if (data.updateWhyHostPage.status === "success") {
    toastr.success(formatMessage(messages.commonSuccess), formatMessage(messages.hostSettingUpdateSuccess));
  } else {
    toastr.error(formatMessage(messages.errorOops), formatMessage(messages.hostSettingUpdateFail));
  }

}

export default submit;
