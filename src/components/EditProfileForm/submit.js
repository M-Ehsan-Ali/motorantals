// Redux Form
import { SubmissionError } from 'redux-form';

// Language
import { FormattedMessage } from 'react-intl';

// Fetch request
import fetch from '../../core/fetch';

// Redux
import { setRuntimeVariable } from '../../actions/runtime';
import { setUserLogout } from '../../actions/logout';

import { loadAccount } from '../../actions/account';

// Toaster
import { toastr } from 'react-redux-toastr';

// Helper
import PopulateData from '../../helpers/populateData';

// Locale
import messages from '../../locale/messages';

async function submit(formatMessage, values, dispatch) {


  let today, birthDate, age, monthDifference;
  let dateOfMonth = Number(values.month) + 1;
  let dobDate = values.year + '/' + dateOfMonth + '/' + values.day;


  if (!values.day) {
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.missingBirthDay));

    return false;
  }

  if (!values.year) {
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.missingBirthDay));
    return false;
  }

  let monthValidation = parseInt(values.month);
  if (isNaN(monthValidation)) {
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.missingBirthDay));
    return false;
  }

  today = new Date();
  birthDate = new Date(dobDate);
  age = today.getFullYear() - birthDate.getFullYear();
  monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
  if (age < 18) {
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.errorAgeRestrictions));
    return false;
  }

  if (values.year && values.month && values.day) {
    if (!PopulateData.isValidDate(values.year, values.month, values.day)) {
      toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.invalidDateOfBirth));
      return false;
    }
  }

  const query = `
  query (
    $firstName:String,
    $lastName:String,
  	$gender: String,
    $dateOfBirth: String,
    $email: String!,
  	$phoneNumber: String,
  	$preferredLanguage: String,
  	$preferredCurrency: String,
  	$location: String,
    $info: String,
    $loggedinEmail: String,
    $countryCode: String,
    $countryName: String,
  ) {
      userEditProfile (
        firstName:$firstName,
        lastName:$lastName,
        gender: $gender,
        dateOfBirth: $dateOfBirth,
        email: $email,
        phoneNumber: $phoneNumber,
        preferredLanguage: $preferredLanguage,
        preferredCurrency: $preferredCurrency,
        location: $location,
        info: $info,
        loggedinEmail: $loggedinEmail,
        countryCode: $countryCode,
        countryName: $countryName,
      ) {
        status
      }
    }
    `;

  const { year, month, day } = values;
  let dateOfBirth = (Number(month) + 1) + "-" + year + "-" + day;

  let firstNameValue = values.firstName ? values.firstName.trim() : values.firstName;
  let lastNameValue = values.lastName ? values.lastName.trim() : values.lastName;
  let phoneNumber = values.phoneNumber ? values.phoneNumber.trim() : values.phoneNumber;
  let location = values.location ? values.location.trim() : values.location;
  let infoValue = values.info ? values.info.trim() : values.info;
  let loggedinEmailValue = values.loggedinEmail ? values.loggedinEmail.trim() : values.loggedinEmail;
  let countryCode = values.phoneDialCode ? values.phoneDialCode : values.dialCode;
  let countryName = values.phoneCountryCode ? values.phoneCountryCode : null;

  const params = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    gender: values.gender,
    dateOfBirth: dateOfBirth,
    email: values.email,
    preferredLanguage: values.preferredLanguage,
    preferredCurrency: values.preferredCurrency,
    location: location,
    info: infoValue,
    phoneNumber: values.phoneNumber,
    loggedinEmail: loggedinEmailValue,
    countryCode: countryCode,
    countryName: countryName
  };
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: params
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data.userEditProfile.status == "success") {
    await dispatch(loadAccount());
    toastr.success(formatMessage(messages.updateProfileSuccess), formatMessage(messages.updateProfileSuccessInfo));
  } else if (data.userEditProfile.status == "email") {
    //throw new SubmissionError({ _error: messages.emailAlreadyExists });
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.errorEmailExist));
    } else if (data.userEditProfile.status == "notLoggedIn") {
    dispatch(setRuntimeVariable({
      name: 'isAuthenticated',
      value: false,
    }));
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.errorNotLogIn))
    //throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
    // throw new SubmissionError({ _error: messages.somethingWentWrong });
    toastr.error(formatMessage(messages.updateProfileFail), formatMessage(messages.sthWentWrongReloadTryAgain))
  }

}

export default submit;
