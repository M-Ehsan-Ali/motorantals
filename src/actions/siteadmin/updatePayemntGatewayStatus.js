import { gql } from 'react-apollo';
import { toastr } from 'react-redux-toastr';

import {
    SET_PAYMENT_GATEWAY_STATUS_START,
    SET_PAYMENT_GATEWAY_STATUS_SUCCESS,
    SET_PAYMENT_GATEWAY_STATUS_ERROR
} from '../../constants';
import messages from '../../locale/messages';

export function updatePaymentGatewayStatus(id, isEnable, formatMessage) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: SET_PAYMENT_GATEWAY_STATUS_START
        });
        try {

            let query = gql`
                query getAllPaymentMethods {
                    getAllPaymentMethods {
                        id
                        name
                        paymentName
                        processedIn
                        fees
                        currency
                        details
                        isEnable
                        paymentType
                        createdAt
                        updatedAt
                        status
                    }
                }
            `;

            let mutation = gql`
                mutation updatePaymentGateWayStatus ($id: Int!, $isEnable: Boolean!) {
                    updatePaymentGatewayStatus(id: $id, isEnable: $isEnable) {
                        status
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id, 
                    isEnable
                },
                refetchQueries: [{query}]
            });
            let activeStatus = isEnable ? 'activated' : 'de-activated';
            if(data && data.updatePaymentGatewayStatus && data.updatePaymentGatewayStatus.status == 200) {
                dispatch({
                    type: SET_PAYMENT_GATEWAY_STATUS_SUCCESS
                });
                if(id == 1){
                    toastr.success(formatMessage(messages.commonSuccess), `Paypal has been ${activeStatus} successfully`);
                } else {
                    toastr.success(formatMessage(messages.commonSuccess), `Stripe has been ${activeStatus} successfully`);
                }
               
                //Paypal has been activate successfully
                return true;
            } else if(data && data.updatePaymentGatewayStatus && data.updatePaymentGatewayStatus.status == 400) {
                dispatch({
                    type: SET_PAYMENT_GATEWAY_STATUS_ERROR
                });
                toastr.error(formatMessage(messages.commonFail), formatMessage(messages.updatePayoutStatusFail));
            } else if(data && data.updatePaymentGatewayStatus && data.updatePaymentGatewayStatus.status == 'Atleast one option must be active') {
                dispatch({
                    type: SET_PAYMENT_GATEWAY_STATUS_ERROR
                });
                toastr.error(formatMessage(messages.commonFail), formatMessage(messages.updatePayoutFailNoActive));
            }

        } catch(error) {
            dispatch({
                type: SET_PAYMENT_GATEWAY_STATUS_ERROR
            });
            toastr.error(formatMessage(messages.commonFail), formatMessage(messages.updatePayoutStatusFail));
        }
    }
}