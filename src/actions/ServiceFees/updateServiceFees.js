import {gql} from 'react-apollo';

// Toaster
import {toastr} from 'react-redux-toastr';

import {
  ADMIN_UPDATE_SERVICE_FEES_START,
  ADMIN_UPDATE_SERVICE_FEES_SUCCESS,
  ADMIN_UPDATE_SERVICE_FEES_ERROR, 
} from '../../constants';
import messages from '../../locale/messages';

const query = gql `
  query getServiceFees{
    getServiceFees{
        id
        guestType
        guestValue
        hostType
        hostValue
        currency
        status
    }
  }
`;

export function updateServiceFees(guestType, guestValue, hostType, hostValue, currency, formatMessage) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADMIN_UPDATE_SERVICE_FEES_START,
    });

    try {

      const mutation = gql `
          mutation updateServiceFees(
            $guestType: String!, 
            $guestValue: Float!,
            $hostType: String!,
            $hostValue: Float!,
            $currency: String,
          ){
              updateServiceFees(
                guestType: $guestType,
                guestValue: $guestValue,
                hostType: $hostType,
                hostValue: $hostValue,
                currency: $currency
              ) {
                  id
                  guestType
                  guestValue
                  hostType
                  hostValue
                  currency
                  status
              }
          }
      `;

      // If admin didn't provide currency, use the base currency
      let baseCurrency = getState().currency.base;
      let currencyData = currency ? currency : baseCurrency;

      const {data} = await client.mutate({
        mutation,
        variables: {
          guestType, 
          guestValue, 
          hostType, 
          hostValue,
          currency: currencyData
        },
        refetchQueries: [{ query }]
      });

      dispatch({
        type: ADMIN_UPDATE_SERVICE_FEES_SUCCESS,
      });

      toastr.success(formatMessage(messages.updateServiceFees), formatMessage(messages.updateServiceFeesSuccess));

    } catch (error) {
        dispatch({
          type: ADMIN_UPDATE_SERVICE_FEES_ERROR,
          payload: {
            error
          }
        });
        toastr.error(formatMessage(messages.updateServiceFees), formatMessage(messages.updateServiceFeesFail));
      return false;
    }

    return true;
  };
}