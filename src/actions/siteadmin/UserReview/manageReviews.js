import { gql } from 'react-apollo';
// Toaster
import { toastr } from 'react-redux-toastr';
import history from '../../../core/history';
import getReviewsDetails from './getReviewsDetails.graphql';

import {
    UPDATE_REVIEW_START,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_ERROR,

} from '../../../constants';
import query from '../../../routes/siteadmin/userReviews/userReviewsQuery.graphql';
import messages from '../../../locale/messages';

export function updateReviewStatus(id, type, refetchVariables, formatMessage) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: UPDATE_REVIEW_START,
        });

        let mutation = gql`
        mutation updateReview($id: Int, $type: String){
            updateReview(id: $id, type: $type) {
              status
            }
          }
    `;

        try {

            const { data } = await client.mutate({
                mutation,
                variables: { id, type },
                refetchQueries: [{ query, variables: refetchVariables }]
            });

            if (data.updateReview.status === "success") {
                dispatch({
                    type: UPDATE_REVIEW_SUCCESS,
                });
                toastr.success(formatMessage(messages.commonSuccess), formatMessage(messages.commonUpdateSuccess));
            } else {
                dispatch({
                    type: UPDATE_REVIEW_ERROR,
                    payload: {
                        status
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_REVIEW_ERROR,
                payload: {
                    error
                }
            });
        }
    };
}



