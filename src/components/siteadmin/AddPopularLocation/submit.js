// Fetch Request
import fetch from '../../../core/fetch';

// Toaster
import {toastr} from 'react-redux-toastr';
import history from '../../../core/history';
import messages from '../../../locale/messages';
async function submit(formatMessage, values, dispatch) {


  if(values.image == null){
    toastr.error(formatMessage(messages.errorOccured), formatMessage(messages.addLocationImg));
  }
  else{
  const mutation = `
  mutation addPopularLocation(
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    addPopularLocation(
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


  if(data.addPopularLocation.status === "success") {
    toastr.success(formatMessage(messages.addedLocation), formatMessage(messages.addedLocationSuccess));
    history.push('/siteadmin/popularlocation');
  } else {
      toastr.error(formatMessage(messages.addedLocation), formatMessage(messages.addedLocationFail));
  }
  }

}

export default submit;
