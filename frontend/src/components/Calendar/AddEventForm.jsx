/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import AddEventFormButton from "./AddEventFormButton";
// import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
// import ErrorInputForm from "./ErrorInputForm";
import handleErrorsInput from "./functions/HandleInputForm";
import validateDates from "./functions/ValidateDates";
import FormEvent from "./FormEvent";
import notify from "../Notify/Notify";

export default function AddEventForm({
  formIsOpen,
  setFormIsOpen,
  setEventUpdated,
}) {
  // On initialise les données de l'event à créer
  const [dataEvent, setDataEvent] = useState({
    title: "",
    text: "",
    dateStart: "",
    dateStartToConvert: "",
    dateEnd: "",
    dateEndToConvert: "",
    private: false,
  });
  // gérer les inputs qui ne correspondent pas
  const [errors, setErrors] = useState({
    title: "",
    text: "",
  });

  const handleClickButtonCancel = () => {
    // On réinitialise le formulaire de création
    setDataEvent({
      title: "",
      text: "",
      dateStart: "",
      dateStartToConvert: "",
      dateEnd: "",
      dateEndToConvert: "",
      private: false,
    });
    // On réinitialise les erreurs d'input
    setErrors({
      title: "",
      text: "",
    });
    // On ferme le formulaire
    setFormIsOpen((prev) => !prev);
  };

  // au handleChange, exécute cette fonction pour formater les dates en timestamp pour le backend
  const handleChangeAndConvertDate = (value, name) => {
    const formattedDate = `${value.replace("T", " ")}:00`;
    setDataEvent((prevData) => ({
      ...prevData,
      [name === "dateStartToConvert" ? "dateStart" : "dateEnd"]: formattedDate,
    }));
  };

  const handleChange = (e) => {
    // on destructure notre target
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
    const fetchCreateEvent = async () => {
      const currentGroup = JSON.parse(localStorage.getItem("group"));
      try {
        const response = await fetch(
          `http://localhost:3310/api/events/groups/${currentGroup.ug_group_id}`,
          {
            method: "POST",
            headers: {
              // eslint-disable-next-line prettier/prettier
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
            body: JSON.stringify(dataEvent),
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
        notify("success", message);
        // On réutilise le nettoyage effectué en fermant la boîte
        handleClickButtonCancel();
        setEventUpdated((prev) => !prev);
        // eslint-disable-next-line no-alert
      } catch (error) {
        console.info("Erreur pour créer la recette >>", error);
      }
    };
    // Contrôle des inputs
    if (errors.title || errors.text) {
      notify("errorCreation", "Vérifiez vos données");
      setErrors((prevErrors) => ({
        ...prevErrors,
      }));
    } else if (!validateDates(dataEvent.dateStart, dataEvent.dateEnd)) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      fetchCreateEvent();
    }
  };

  return (
    formIsOpen && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 lg:w-1/2 max-w-[600px]">
        <FormEvent
          handleSubmit={handleSubmit}
          dataEvent={dataEvent}
          handleChange={handleChange}
          errors={errors}
          handleClickButtonCancel={handleClickButtonCancel}
        />
      </div>
    )
  );
}
