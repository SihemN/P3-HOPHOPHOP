/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
// import { Checkbox } from "@mui/material";
// import AddEventFormButton from "./AddEventFormButton";
// import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
import { useState } from "react";
import validateDates from "./functions/ValidateDates";
import handleErrorsInput from "./functions/HandleInputForm";
import FormEvent from "./FormEvent";
import notify from "../Notify/Notify";

export default function UpdateEvent({
  setDeleteOrUpdateToShow,
  eventToDisplay,
  setEventUpdated,
}) {
  const handleClickCancelButton = () => {
    setDeleteOrUpdateToShow(null);
  };

  // gérer les inputs qui ne correspondent pas
  const [errors, setErrors] = useState({
    title: "",
    text: "",
  });
  // Formater les dates existantes pour remplir l'input dateStart et dateEnd
  // On reçoit >>> Wed Apr 10 2024 10:00:00 GMT+0200 (heure d’été d’Europe centrale)
  // On veut >>> 2024-04-10T10:00

  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;
    let day = date.getDate().toString();
    day = day.length === 1 ? `0${day}` : day;
    let hours = date.getHours().toString();
    hours = hours.length === 1 ? `0${hours}` : hours;
    let minutes = date.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ajoute un zéro en tête si nécessaire
    const day = String(date.getDate()).padStart(2, "0"); // Ajoute un zéro en tête si nécessaire
    const hours = String(date.getHours()).padStart(2, "0"); // Ajoute un zéro en tête si nécessaire
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ajoute un zéro en tête si nécessaire
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Ajoute un zéro en tête si nécessaire

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const {
    eventId,
    title,
    start,
    end,
    description,
    e_private: isPrivate,
  } = eventToDisplay;

  const [dataEvent, setDataEvent] = useState(
    {
      title,
      text: description || "",
      date_start: formatDate(start),
      date_end: formatDate(end),
      dateStartToConvert: formatDateForInput(new Date(start)),
      dateEndToConvert: formatDateForInput(new Date(end)),
      private: !!isPrivate,
    } || {
      title: "",
      text: "",
      date_start: "",
      date_end: "",
      dateStartToConvert: "",
      dateEndToConvert: "",
      private: false,
    }
  );

  // Déplacez la fonction handleChangeAndConvertDate à l'intérieur du composant UpdateEvent
  const handleChangeAndConvertDate = (value, name) => {
    const formattedDate = `${value.replace("T", " ")}:00`;
    setDataEvent((prevData) => {
      const updatedData = {
        ...prevData,
        [name === "dateStartToConvert" ? "date_start" : "date_end"]:
          formattedDate,
      };
      return updatedData;
    });
  };

  const handleChange = (e) => {
    // on déstructure notre target
    const { name, value, type, checked } = e.target;
    const newErrors = handleErrorsInput(errors, name, value);
    setErrors(newErrors);
    // si l'input est de type "checkbox", on récupère une valeur checked true ou false
    // sinon on récupère juste la valeur de l'input qui n'est pas une checkbox
    const newValue = type === "checkbox" ? checked : value;

    setDataEvent((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    if (name === "dateStartToConvert" || name === "dateEndToConvert") {
      handleChangeAndConvertDate(value, name, setDataEvent);
    }
  };

  // submit et fetch la route backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // Supprimer les propriétés dateStartToConvert et dateEndToConvert
    const { dateStartToConvert, dateEndToConvert, ...formData } = dataEvent;
    const fetchUpdateEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/events/${eventId}`,
          {
            method: "PATCH",
            headers: {
              // eslint-disable-next-line prettier/prettier
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          notify(
            "errorCreation",
            errorResponse.message || "Vérifiez vos données"
          );
        }
        const message = await response.json();
        // console.info("message", message);
        setDataEvent({
          title: "",
          text: "",
          dateStartToConvert: "",
          dateStart: "",
          dateEndToConvert: "",
          dateEnd: "",
          private: false,
        });
        notify("success", message);
        setEventUpdated((prev) => !prev);
        setDeleteOrUpdateToShow(null);

        // eslint-disable-next-line no-alert
      } catch (error) {
        console.info("Erreur pour mettre à jour l'événement >>", error);
      }
    };
    // Contrôle des inputs
    if (errors.title || errors.text) {
      notify("errorCreation", "Vérifiez vos données");
      setErrors((prevErrors) => ({
        ...prevErrors,
      }));
    } else if (!validateDates(dataEvent.date_start, dataEvent.date_end)) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      fetchUpdateEvent();
    }
  };

  return (
    <FormEvent
      handleSubmit={handleSubmit}
      dataEvent={dataEvent}
      handleChange={handleChange}
      errors={errors}
      handleClickButtonCancel={handleClickCancelButton}
    />
  );
}
