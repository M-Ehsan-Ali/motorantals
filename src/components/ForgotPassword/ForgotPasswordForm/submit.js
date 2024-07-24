import { sendForgotLink } from "../../../actions/ForgotPassword/sendForgotLink";

async function submit(intl, values, dispatch) {
  dispatch(sendForgotLink(values.email, intl));
}

export default submit;
