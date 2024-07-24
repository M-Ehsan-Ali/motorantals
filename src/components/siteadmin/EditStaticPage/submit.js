// Action
import { updateStaticPageAction } from '../../../actions/siteadmin/updateStaticPage';

// Toaster
import {toastr} from 'react-redux-toastr';
import messages from '../../../locale/messages';
async function submit(formatMessage, values, dispatch) {
   if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
    toastr.error(formatMessage(messages.commonError), formatMessage(messages.addPageContentFail));
  } else if (values.metaTitle == null || values.metaTitle && values.metaTitle.trim() == '') {
    toastr.error(formatMessage(messages.commonError), formatMessage(messages.addPageTitleFail))
  } else if (values.metaDescription == null || values.metaDescription && values.metaDescription.trim() == '') {
    toastr.error(formatMessage(messages.commonError), formatMessage(messages.addPageDescriptionFail))
   } else {
    await dispatch(updateStaticPageAction(values, formatMessage)) ;
  }

}

export default submit;
