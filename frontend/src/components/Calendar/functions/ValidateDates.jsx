import notify from "../../Notify/Notify";

/* eslint-disable no-alert */
const validateDates = (dateStart, dateEnd) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateRegex.test(dateStart) || !dateRegex.test(dateEnd)) {
    notify(
      "errorCreation",
      "Les dates doivent être au format YYYY-MM-DD HH:MM:SS"
    );
    return false;
  }
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  if (endDate <= startDate) {
    notify("errorCreation", "La date de début doit être avant la date de fin");
    return false;
  }

  return true;
};

export default validateDates;
