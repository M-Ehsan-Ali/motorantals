import { toastr } from "react-redux-toastr";
import messages from "../../locale/messages";

async function submit(
  formatMessage,
  updateModalState,
  email,
  values,
  dispatch
) {
  // const response = await fetch(
  //   "https://flow.zoho.com/854713935/flow/webhook/incoming?zapikey=1001.425394e5ae4637ccee0271a1865ffd8e.7ef74c15e498566690ace2eef042bbf3&isdebug=true",
  //   {
  //     method: "POST",
  //     mode: "cors",
  //     body: JSON.stringify({ email, ...values }),
  //   }
  // );

  const response = await fetch(
    "https://flow.zoho.com/854713935/flow/webhook/incoming?zapikey=1001.425394e5ae4637ccee0271a1865ffd8e.7ef74c15e498566690ace2eef042bbf3&isdebug=true",
    {
      method: "POST",
      // TODO:
      mode: "no-cors",
      body: JSON.stringify({
        email,
        ...values,
      }),
    }
  );

  console.log("RESPONSE:", response);

  if (response) {
    toastr.success(
      formatMessage(messages.commonSuccess),
      formatMessage(messages.emailOpenNotify)
    );
  } else {
    toastr.error(
      formatMessage(messages.commonError),
      formatMessage(messages.somethingWentWrong)
    );
  }

  updateModalState({
    email: "",
    isValidEmail: true,
    isModalOpen: false,
  });
}

export default submit;
