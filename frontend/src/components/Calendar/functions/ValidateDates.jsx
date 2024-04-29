/* eslint-disable no-alert */
const validateDates = (dateStart, dateEnd) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateRegex.test(dateStart) || !dateRegex.test(dateEnd)) {
    alert("Les dates doivent être au format YYYY-MM-DD HH:MM:SS");
    return false;
  }
  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  if (endDate <= startDate) {
    alert("La date de fin doit être après la date de début");
    return false;
  }

  return true;
};

export default validateDates;
