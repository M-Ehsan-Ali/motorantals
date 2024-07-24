import { gql } from 'react-apollo';

import {
    ADMIN_DELETE_REVIEW_START,
    ADMIN_DELETE_REVIEW_SUCCESS,
    ADMIN_DELETE_REVIEW_ERROR
} from '../../../constants';

// Redirection
import history from '../../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';
import messages from '../../../locale/messages';

const query = gql`
    query getAdminReviews {
        getAdminReviews {
            id
            listId
            listData {
            id
            title
            }
            authorId
            reviewContent
            rating
            createdAt
            updatedAt
        }
    }
`;

const mutation = gql`
  mutation deleteAdminReview ($reviewId: Int!) {
      deleteAdminReview (reviewId: $reviewId) {
        status
      }
    }
  `;

export function deleteAdminReview(reviewId, formatMessage) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_REVIEW_START,
            data: reviewId
        });
       try {

            const { data } = await client.mutate({
                mutation,
                variables: { reviewId },
                // refetchQueries: [{ query, variables: { currentPage: 1 } }]
            });

            if (data.deleteAdminReview.status == "200") {
                dispatch({
                    type: ADMIN_DELETE_REVIEW_SUCCESS,
                });
                toastr.success(formatMessage(messages.deleteReview), formatMessage(messages.deleteReviewSuccess));
                history.push('/siteadmin/reviews');
            } else {
                toastr.error(formatMessage(messages.deleteReview), formatMessage(messages.deleteReviewFail));
            }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_REVIEW_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}