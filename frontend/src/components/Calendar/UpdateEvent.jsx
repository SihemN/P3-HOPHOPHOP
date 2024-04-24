/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Checkbox } from "@mui/material";
import AddEventFormButton from "./AddEventFormButton";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
import { validateDates } from "./AddEventForm";

export default function UpdateEvent({
  setDeleteOrUpdateToShow,
  eventToDisplay,
  setEventUpdated,
}) {
  const handleClickCancelButton = () => {
    setDeleteOrUpdateToShow(null);
  };

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
  console.info("dataEvent.private", dataEvent.private);

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
          throw new Error(errorResponse.message || "Vérifiez vos données");
        }
        const message = await response.json();
        console.info("message", message);
        setDataEvent({
          title: "",
          text: "",
          dateStartToConvert: "",
          dateStart: "",
          dateEndToConvert: "",
          dateEnd: "",
          isPrivate: false,
        });
        alert(message);
        setEventUpdated((prev) => !prev);
        setDeleteOrUpdateToShow(null);

        // eslint-disable-next-line no-alert
      } catch (error) {
        console.info("Erreur pour mettre à jour l'événement >>", error);
      }
    };
    // Gestion d'inputs inattendus :
    if (dataEvent.title.length > 50) {
      alert("Titre de l'événement : limite de caractères dépassée");
    } else if (dataEvent.text.length > 250) {
      alert("Description de l'événement : limite de caractères dépassée");
    } else if (!validateDates(dataEvent.date_start, dataEvent.date_end)) {
      // eslint-disable-next-line no-useless-return
      return;
    } else {
      fetchUpdateEvent();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-dark-default text-xl my-5 w-full  bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl"
    >
      <label htmlFor="name" className="font-bold mt-4">
        Nom de l'événement <RedStarForRequiredInput />
      </label>
      <input
        type="text"
        name="title"
        value={dataEvent.title}
        required
        className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default "
        onChange={handleChange}
      />
      <label htmlFor="name" className="font-bold mt-4">
        Description
      </label>
      <textarea
        name="text"
        value={dataEvent.text}
        placeholder="Ajouter des infos utiles"
        className="border border-solid border-dark-default h-fit mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
        onChange={handleChange}
      />
      <label htmlFor="dateStart" className="font-bold mt-4">
        Date de début <RedStarForRequiredInput />
      </label>
      <input
        type="datetime-local"
        name="dateStartToConvert"
        value={dataEvent.dateStartToConvert}
        required
        className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
        onChange={handleChange}
      />

      <label htmlFor="dateEnd" className="font-bold mt-4">
        Date de fin <RedStarForRequiredInput />
      </label>

      <input
        type="datetime-local"
        name="dateEndToConvert"
        value={dataEvent.dateEndToConvert}
        required
        className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
        onChange={handleChange}
      />

      <label
        htmlFor="isPrivate"
        aria-label="Checkbox pour masquer ou rendre visible un événement"
        className="flex items-center gap-5 font-bold mt-4"
      >
        <div>
          <p>Masquer aux membres du groupe ?</p>
          <p className="font-normal italic text-base ">Cocher pour masquer</p>
        </div>
        <Checkbox
          name="private"
          checked={dataEvent.private}
          onChange={handleChange}
          color="success"
        />
      </label>

      <div className="flex justify-center items-center pt-5  gap-2">
        <AddEventFormButton
          onClick={handleClickCancelButton}
          type="button"
          label="Annuler"
          bgColor="cream"
          borderColor="blue-default"
          textColor="blue-default"
          hoverColor="orange-default"
          activeBgColor="orange-lighter"
        />

        <AddEventFormButton
          label="Enregistrer"
          type="submit"
          bgColor="blue-default"
          borderColor="blue-default"
          textColor="cream"
          hoverColor="green-default"
          activeBgColor="green-lighter"
        />
      </div>
    </form>
  );
}
