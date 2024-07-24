import {doUpdateImageBanner} from '../../../actions/siteadmin/manageImageBanner';

async function submit(formatMessage, values, dispatch) {
  await dispatch(doUpdateImageBanner(values, formatMessage));
}

export default submit;
