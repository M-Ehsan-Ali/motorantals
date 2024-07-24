import messages from "../../locale/messages";

import history from "../../core/history";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = messages.required;
  }
  if (!values.address) {
    errors.address = messages.required;
  }
  if (!values.phone) {
    errors.phone = messages.required;
  }
  if (!values.email) {
    errors.email = messages.required;
  }
  if (!values.personName) {
    errors.personName = messages.required;
  }
  if (!values.personAddress) {
    errors.personAddress = messages.required;
  }
  if (!values.personPhone) {
    errors.personPhone = messages.required;
  }
  if (!values.personEmail) {
    errors.personEmail = messages.required;
  }

  return errors;
};

export default validate;
