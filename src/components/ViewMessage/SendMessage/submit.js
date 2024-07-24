// Redux Form
import { reset } from "redux-form";

// Redux action
import { sendMessageAction } from "../../../actions/message/sendMessageAction";

async function submit(intl, values, dispatch) {
  let threadId = values.threadId;
  let threadType = values.threadType;
  let type = values.type;
  let content = values.content;
  dispatch(
    sendMessageAction(
      threadId,
      threadType,
      content,
      type,
      undefined,
      undefined,
      0,
      undefined,
      values.receiverName,
      values.senderName,
      values.receiverType,
      values.receiverEmail,
      intl
    )
  );
  dispatch(reset("SendMessage"));
}

export default submit;
