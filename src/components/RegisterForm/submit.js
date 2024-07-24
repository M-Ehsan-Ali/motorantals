// Redux Form
import { SubmissionError } from "redux-form";
import { toastr } from "react-redux-toastr";

// Fetch request
import fetch from "../../core/fetch";

// Language
import messages from "../../locale/messages";

// Redux
import { setRuntimeVariable } from "../../actions/runtime";
import { loadAccount } from "../../actions/account";
import { closeSignupModal } from "../../actions/modalActions";

// Helper
import PopulateData from "../../helpers/populateData";

// Send Email
import { sendEmail } from "../../core/email/sendEmail";

async function submit(intl, values, dispatch) {
  const { formatMessage } = intl;
  let today, birthDate, age, monthDifference;
  let dateOfMonth = Number(values.month) + 1;
  let dobDate = values.year + "/" + dateOfMonth + "/" + values.day;

  if (!values.month || !values.day || !values.year) {
    throw new SubmissionError({ _error: messages.birthDayRequired });
  }

  today = new Date();
  birthDate = new Date(dobDate);
  age = today.getFullYear() - birthDate.getFullYear();
  monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  )
    age--;
  if (age < 18) {
    toastr.error(
      formatMessage(messages.updateProfileFail),
      formatMessage(messages.errorAgeRestrictions)
    );
    return false;
  }
  if (!values.termsPolicy) {
    toastr.error(
      formatMessage(messages.errorOops),
      formatMessage(messages.errorTermsPrivacy)
    );
    return false;
  }
  if (values.year && values.month && values.day) {
    if (!PopulateData.isValidDate(values.year, values.month, values.day)) {
      throw new SubmissionError({ _error: messages.WrongDayChosen });
    }
  }

  const query = `query (
    $firstName:String,
    $lastName:String,
    $email: String!,
    $password: String!,
    $dateOfBirth: String
  ) {
      userRegister (
        firstName:$firstName,
        lastName:$lastName,
        email: $email,
        password: $password,
        dateOfBirth: $dateOfBirth
      ) {
        emailToken
        status
      }
    }`;

  const { year, month, day } = values;
  const dateOfBirth = Number(month) + 1 + "-" + year + "-" + day;
  const birthday = `${day}/${Number(month) + 1}/${year}`;

  // if (values.mailing) {
  //   const response = await fetch(
  //     "https://flow.zoho.com/854713935/flow/webhook/incoming?zapikey=1001.7b839438e029714b068ae70bd6e49d69.3a4402a98a2b48d649b478504c330142&isdebug=false",
  //     {
  //       method: "POST",
  //       mode: "cors",
  //       body: JSON.stringify({
  //         email: values.email,
  //         firstName: values.firstName,
  //         lastName: values.lastName,
  //         birthday,
  //       }),
  //     }
  //   );
  // }

  if (values.mailing) {
    const response = await fetch(
      "https://flow.zoho.com/854713935/flow/webhook/incoming?zapikey=1001.7b839438e029714b068ae70bd6e49d69.3a4402a98a2b48d649b478504c330142&isdebug=false",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          birthday,
        }),
      }
    );
  }

  const params = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    dateOfBirth: dateOfBirth,
  };

  const resp = await fetch("/graphql", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: params,
    }),
    credentials: "include",
  });

  const { data } = await resp.json();

  if (data.userRegister.status == "success") {
    dispatch(closeSignupModal());
    let registerScreen = true;
    let refer = values.refer;
    dispatch(loadAccount(registerScreen, refer));
    dispatch(
      setRuntimeVariable({
        name: "isAuthenticated",
        value: true,
      })
    );
    // Send Email
    let content = {
      token: data.userRegister.emailToken,
      name: values.firstName,
      email: values.email,
    };
    sendEmail(values.email, "welcomeEmail", content, intl);
  } else if (data.userRegister.status == "email") {
    throw new SubmissionError({ _error: messages.emailAlreadyExists });
  } else if (data.userRegister.status == "loggedIn") {
    dispatch(loadAccount());
    dispatch(
      setRuntimeVariable({
        name: "isAuthenticated",
        value: true,
      })
    );
    throw new SubmissionError({ _error: messages.loggedIn });
  } else if (data.userRegister.status == "adminLoggedIn") {
    throw new SubmissionError({ _error: messages.adminLoggedIn });
  } else {
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }
}

export default submit;
