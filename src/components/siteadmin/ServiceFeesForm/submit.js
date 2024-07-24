import { updateServiceFees } from '../../../actions/ServiceFees/updateServiceFees';

async function submit(formatMessage, values, dispatch) {

  	dispatch(
    	updateServiceFees(
	        values.guestType,
	        values.guestValue,
	        values.hostType,
	        values.hostValue,
	        values.currency,
			formatMessage,
      	)
    );
}

export default submit;
