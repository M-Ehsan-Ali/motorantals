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
    $minPrice: Float,
    $maxPrice: Float,
    $priceRangeCurrency: String,
    ){
      updateSearchSettings(
          id: $id,
          minPrice: $minPrice,
          maxPrice: $maxPrice,
          priceRangeCurrency: $priceRangeCurrency,
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

  if(data.updateSearchSettings.status === "success") {
    toastr.success(formatMessage(messages.updateSearchSettings), formatMessage(messages.commonChangesSuccess));
  } else {
    toastr.error(formatMessage(messages.updateSearchSettings), formatMessage(messages.updateSearchSettingsFail));
  }

}

export default submit;
