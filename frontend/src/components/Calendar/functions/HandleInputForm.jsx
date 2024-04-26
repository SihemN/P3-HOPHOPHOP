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
    default:
      break;
  }
  return newErrors; // Return l'objet error mis à jour
};

export default handleErrorsInput;
