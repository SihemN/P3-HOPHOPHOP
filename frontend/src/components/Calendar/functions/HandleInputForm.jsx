/* eslint-disable no-alert */
const handleErrorsInput = (error, name, value) => {
  const newErrors = { ...error };
  switch (name) {
    case "title":
      newErrors.title =
        value.length > 50 ? "Limite de caractères dépassée" : "";
      break;
    case "text":
      newErrors.text =
        value.length > 250 ? "Limite de caractères dépassée" : "";
      break;
    // Add more cases for other input fields as needed
    default:
      break;
  }
  return newErrors; // Return the updated error object
};

export default handleErrorsInput;
