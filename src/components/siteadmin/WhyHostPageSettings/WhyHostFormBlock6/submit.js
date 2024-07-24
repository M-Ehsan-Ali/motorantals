import fetch from '../../../../core/fetch';
import { toastr } from 'react-redux-toastr';
import messages from '../../../../locale/messages';

async function submit(formatMessage, values, dispatch) {
  const query = `
  mutation (
    $peaceTitleHeading: String,
    $peaceTitle3: String,
    $peaceContent3: String
) {
  updateWhyHostPage (
    peaceTitleHeading: $peaceTitleHeading,
    peaceTitle3: $peaceTitle3,
    peaceContent3: $peaceContent3
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
