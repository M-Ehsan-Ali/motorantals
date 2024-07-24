import { manageFindYourVehicleBlock } from '../../../actions/siteadmin/manageFindYourVehicleBlock';

async function submit(formatMessage, values, dispatch) {
  await dispatch(manageFindYourVehicleBlock(values, formatMessage));
}

export default submit;