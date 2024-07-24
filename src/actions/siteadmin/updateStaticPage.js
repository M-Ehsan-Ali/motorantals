import { gql } from 'react-apollo';

import {
    ADMIN_UPDATE_STATIC_START,
    ADMIN_UPDATE_STATIC_SUCCESS,
    ADMIN_UPDATE_STATIC_ERROR
} from '../../constants';

// Redirection
import history from '../../core/history';

// Toaster
import { toastr } from 'react-redux-toastr';
import messages from '../../locale/messages';


const mutation = gql`
mutation updateStaticPage(
  $id: Int,
  $content: String,
  $metaTitle: String,
  $metaDescription: String,
) {
  updateStaticPage(
    id: $id,
    content: $content,
    metaTitle: $metaTitle,
    metaDescription: $metaDescription,
  ) {
      status
  }
}
`;

const query = gql`query getEditStaticPage ($id: Int!) {
  getEditStaticPage (id: $id) {
      id
      pageName
      content
      metaTitle
      metaDescription
      createdAt
  }
}`;

export function updateStaticPageAction(values, formatMessages) {

    return async (dispatch, getState, { client }) => {
        try {
            dispatch({ type: ADMIN_UPDATE_STATIC_START });
            const { data } = await client.mutate({
                mutation,
                variables: { 
                    content : values.content,
                    metaTitle: values.metaTitle,
                    metaDescription: values.metaDescription,
                    id: values.id
                 },
                refetchQueries: [{ query , variables: { id: values.id } }]
            });


            if (data.updateStaticPage.status === "success") {
                toastr.success(formatMessages(messages.commonSuccess), formatMessages(messages.commonChangesSuccess));
                history.push('/siteadmin/staticpage/management');
                dispatch({ type: ADMIN_UPDATE_STATIC_SUCCESS });
              } 
              else {
                  toastr.error(formatMessages(messages.commonFail), formatMessages(messages.translationUpdateFail));
                  dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
              }

        } catch (error) {
            console.log(error);
            toastr.error(formatMessages(messages.commonFail), formatMessages(messages.blogStatusChangeFail));
            dispatch({ type: ADMIN_UPDATE_STATIC_ERROR });
            return false;
        }
        return true;
    };
}