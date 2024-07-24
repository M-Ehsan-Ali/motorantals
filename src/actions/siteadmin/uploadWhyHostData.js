import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import {
	WHYHOST_UPDATE_ERROR,
	WHYHOST_UPDATE_START,
	WHYHOST_UPDATE_SUCCESS
} from '../../constants';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';
import messages from '../../locale/messages';

export default function uploadWhyHostData(dataList, formatMessage) {
	return async (dispatch, getState, { client }) => {
		let status, errorMessage = 'Oops! something went wrong! Please try again.';

		try {
			dispatch({
				type: WHYHOST_UPDATE_START
			});

			dispatch(setLoaderStart('whyHostData'));

			const mutation = gql`
            mutation (
              $dataList: String
            ) {
                updateWhyHost (
                    dataList:$dataList
                ) {
                    status
                    errorMessage                     
                }
            }`;

			const { data } = await client.mutate({
				mutation,
				variables: {
					dataList
				}
			});

			if (data && data.updateWhyHost && data.updateWhyHost.status == 200) {
				toastr.success(formatMessage(messages.commonSuccess), formatMessage(messages.whyHostDataUpdate));

				await dispatch({
					type: WHYHOST_UPDATE_SUCCESS
				});
				await dispatch(setLoaderComplete('whyHostData'));

			} else {
				errorMessage = data && data.updateWhyHost && data.updateWhyHost.errorMessage
				toastr.error(formatMessage(messages.commonError), errorMessage);

				await dispatch({
					type: WHYHOST_UPDATE_ERROR
				});
				dispatch(setLoaderComplete('whyHostData'));
			}
		} catch (error) {
			errorMessage = "Something went wrong! " + error;

			toastr.error(formatMessage(messages.commonError), errorMessage);

			await dispatch({
				type: WHYHOST_UPDATE_ERROR
			});
			dispatch(setLoaderComplete('whyHostData'));
		}
	}
};