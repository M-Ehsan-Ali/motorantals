import { gql } from 'react-apollo';

import {
    ADMIN_DELETE_BlOGDETAILS_START,
    ADMIN_DELETE_BlOGDETAILS_SUCCESS,
    ADMIN_DELETE_BlOGDETAILS_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';
import messages from '../../locale/messages';

const query = gql`
    query getBlogDetails {
    getBlogDetails{
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        footerCategory
        isEnable
        createdAt
    }
    }
`;



export function deleteBlogDetails(id, formatMessage) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: ADMIN_DELETE_BlOGDETAILS_START,
            data: id
        });
        try {

                let mutation = gql`
                mutation deleteBlogDetails ($id: Int!) {
                    deleteBlogDetails (id: $id) {
                        status
                    }
                    }
                `;

                const { data } = await client.mutate({
                    mutation,
                    variables: { id },
                    refetchQueries: [{ query }]
                });


                if (data.deleteBlogDetails.status == "200") {
                    dispatch({
                        type: ADMIN_DELETE_BlOGDETAILS_SUCCESS,
                    });
                    toastr.success(formatMessage(messages.deleteBlogDetails), formatMessage(messages.deleteBlogDetailsSuccess));
                    history.push('/siteadmin/content-management');
                } else {
                    toastr.error(formatMessage(messages.deleteBlogDetails), formatMessage(messages.deleteBlogDetailsFail));
                }

        } catch (error) {
            dispatch({
                type: ADMIN_DELETE_BlOGDETAILS_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

export function updateBlogStatus(id, isEnable, formatMessage) {

    return async (dispatch, getState, { client }) => {


        try {
            let mutation = gql`
                  mutation updateBlogStatus ($id: Int, $isEnable: Boolean){
                    updateBlogStatus(id: $id, isEnable: $isEnable){
                          status
                      }
                  }
              `;

            const { data } = await client.mutate({
                mutation,
                variables: { id, isEnable },
                refetchQueries: [{ query }]
            });


            if (data.updateBlogStatus.status === "success") {
                toastr.success(formatMessage(messages.commonSuccess), formatMessage(messages.blogStatusChangeSuccess));
            }

        } catch (error) {
            toastr.error(formatMessage(messages.commonFail), formatMessage(messages.blogStatusChangeFail));
            return false;
        }
        return true;
    };
}