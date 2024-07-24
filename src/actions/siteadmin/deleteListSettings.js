import { gql } from 'react-apollo';

import {
  DELETE_LIST_SETTINGS_START,
  DELETE_LIST_SETTINGS_SUCCESS,
  DELETE_LIST_SETTINGS_ERROR,
  CLOSE_LIST_SETTINGS_MODAL
} from '../../constants';
import { getAdminListingSettings } from './getAdminListingSettings';

// Toaster
import { toastr } from 'react-redux-toastr';
import messages from '../../locale/messages';

const query = gql`
query($id:Int, $typeId: Int) {
  deleteListSettings(id: $id, typeId: $typeId){
      status
      errorMessage
      }
    }
  `;

export function deleteListSettings(id, typeId, formatMessage) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: DELETE_LIST_SETTINGS_START,
    });

    try {

      const { data } = await client.query({
        query,
        variables: { id, typeId },
        fetchPolicy: 'network-only'
      });

      if (data.deleteListSettings) {
        if (data.deleteListSettings.status === "success") {
          dispatch({
            type: CLOSE_LIST_SETTINGS_MODAL,
          });

          dispatch({
            type: DELETE_LIST_SETTINGS_SUCCESS,
          });

          toastr.success(formatMessage(messages.deleteListSettingsSuccess), formatMessage(messages.deleteListSettingsSuccessInfo));

          dispatch(getAdminListingSettings(typeId));
        } else {
          if (data.deleteListSettings.status === "unableToDisable") {
            toastr.error(formatMessage(messages.updateListSettings), formatMessage(messages.listSettingsNotSelected));
          } else if (data.deleteListSettings.status === "listingUsed") {
            toastr.error(formatMessage(messages.updateListSettings), formatMessage(messages.unableDeleteListSettings));
          } else {
            toastr.error(formatMessage(messages.updateListSettings), formatMessage(messages.somethingWentWrong));
            dispatch({
              type: CLOSE_LIST_SETTINGS_MODAL,
            });
          }

          dispatch({
            type: DELETE_LIST_SETTINGS_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: DELETE_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
