import { gql } from 'react-apollo';
import {toastr} from 'react-redux-toastr';
import {
    DELETE_IMPORT_CALENDAR_START,
    DELETE_IMPORT_CALENDAR_SUCCESS,
    DELETE_IMPORT_CALENDAR_ERROR,
} from '../../constants';
import {getListingDataStep3} from '../getListingDataStep3';
import messages from '../../locale/messages';

const query = gql`
    query GetCalendars($listId: Int!) {
        getListingCalendars(listId: $listId) {
            id
            name
            url
            listId
            status
        }
    }`;

const mutation = gql`
    mutation DeleteCalendar($listId: Int!, $calendarId: Int!) {
        deleteCalendar(listId: $listId, calendarId: $calendarId) {
            status
        }
    }
`;
export function deleteImportCal(listId, calendarId, formatMessage) {

    return async(dispatch, getState, {client}) => {

        dispatch({ 
            type: DELETE_IMPORT_CALENDAR_START,
            payload: {
                importCalLoading: true 
            }
        });

        try {

            const {data} = await client.mutate({
                mutation,
                variables: { listId, calendarId },
            });

            if(data && data.deleteCalendar.status === '200') {
                toastr.success(formatMessage(messages.calendarDeleteSuccess), formatMessage(messages.calendarDeleteSuccessInfo));
                const { data } = await client.query({
                    query,
                    variables: { listId },
                    fetchPolicy: 'network-only',
                });
                if(data && data.getListingCalendars) {
                    dispatch({
                        type: DELETE_IMPORT_CALENDAR_SUCCESS,
                        payload: {
                            calendars: data.getListingCalendars,
                            importCalLoading: false
                        }
                    });
                    dispatch(getListingDataStep3(listId));
                }
            } else {
                toastr.error(formatMessage(messages.calendarDeleteFail), formatMessage(messages.calendarDeleteFailInfo));
                dispatch({
                    type: DELETE_IMPORT_CALENDAR_ERROR, 
                    payload: {
                        status: data.deleteCalendar.status,
                        importCalLoading: false
                    }
                });
            }
            

        } catch (error) {
            dispatch({
                type: DELETE_IMPORT_CALENDAR_ERROR, 
                payload: {
                    error,
                    importCalLoading: false
                }
            });
        }
    };
}