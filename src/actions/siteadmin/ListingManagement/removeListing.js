import {gql} from 'react-apollo';
// Toaster
import {toastr} from 'react-redux-toastr';
import getAllListingsQuery from './getAllListing.graphql';
import {
  SITE_ADMIN_REMOVE_LISTING_START,
  SITE_ADMIN_REMOVE_LISTING_SUCCESS,
  SITE_ADMIN_REMOVE_LISTING_ERROR 
} from '../../../constants';
import messages from '../../../locale/messages';

const getUpcomingBookingQuery = gql`
query getUpcomingBookings ($listId: Int!){
    getUpcomingBookings(listId: $listId){
      count
    }
  }`;

export function removeListing( listId, formatMessage ) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: SITE_ADMIN_REMOVE_LISTING_START,
    });

    try {

      let upcomingBookingCount;
        const bookedData = await client.query({
            query: getUpcomingBookingQuery,
            variables: {
                listId
            },
            fetchPolicy: 'network-only'
        });

        if (bookedData && bookedData.data && bookedData.data.getUpcomingBookings) {
          upcomingBookingCount = bookedData.data.getUpcomingBookings.count;
        }

        if (upcomingBookingCount > 0 ) { 
          toastr.error(formatMessage(messages.errorOccured), formatMessage(messages.removeListErrorInfo));
        }
        else{
          const mutation = gql`
            mutation adminRemoveListing($listId:Int!) {
              adminRemoveListing (listId:$listId) {
                status
                id
                name
              }
            }
          `;
          // Send Request to get listing data
          const {data} = await client.mutate({
            mutation,
            variables: {listId},
            // refetchQueries: [{ query: getAllListingsQuery, variables: { currentPage: 1 } }]
          });
        
          if(data && data.adminRemoveListing){
            dispatch({
              type: SITE_ADMIN_REMOVE_LISTING_SUCCESS,
            });
            toastr.success(formatMessage(messages.commonSuccess), formatMessage(messages.removeListSuccess));
            
            if(data.adminRemoveListing.length > 0){
              const removeFiles = await fetch('/removeMultiFiles', {
                  method: 'post',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      files: data.adminRemoveListing,
                  }),
                  credentials: 'include',
              });
            }
          } else {
            dispatch({
              type: SITE_ADMIN_REMOVE_LISTING_ERROR,
            });
          }
        }
    } catch (error) {
        dispatch({
          type: SITE_ADMIN_REMOVE_LISTING_ERROR,
          payload:{
            error
          }
        });
      return false;
    }

    return true;
  };
}
