// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import {toastr} from 'react-redux-toastr';
import history from '../../../core/history';
import messages from '../../../locale/messages';
async function submit(formatMessage, values, dispatch) {

  const mutation = `
  mutation updatePopularLocation(
    $id: Int,
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    updatePopularLocation(
      id: $id,
      location: $location,
      locationAddress: $locationAddress,
      image: $image,
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
      query: mutation,
      variables: values
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();


  if(data.updatePopularLocation.status === "success") {
    toastr.success(formatMessage(messages.updateLocation), formatMessage(messages.commonChangesSuccess));
    history.push('/siteadmin/popularlocation');
  } else {
      toastr.error(formatMessage(messages.updateLocation), formatMessage(messages.updateLocationFail));
  }

}

export default submit;
