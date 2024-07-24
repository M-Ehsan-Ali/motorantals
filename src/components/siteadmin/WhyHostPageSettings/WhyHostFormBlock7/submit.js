import { toastr } from 'react-redux-toastr';
import { updateReview } from '../../../../actions/siteadmin/WhyHostReview/deleteWhyHostReview';
import messages from '../../../../locale/messages';

async function submit(formatMessage, values, dispatch) {

  if (values.image == null) {
    toastr.error(formatMessage(messages.commonError), formatMessage(messages.uploadImageInfo));
    return;
  }

  dispatch(updateReview(values,formatMessage));

}

export default submit;
