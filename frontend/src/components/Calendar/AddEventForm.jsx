/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import AddEventFormButton from "./AddEventFormButton";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

export const handleChangeAndConvertDate = (value, name, setDataEvent) => {
  // Gérer les dates start et end et les convertir au bon format
  // "2024-05-04T18:00" >> "2024-05-04 18:00:00"
  const formattedDate = `${value.replace("T", " ")}:00`;
  if (name === "dateStartToConvert") {
    // Mettre à jour la date de début
    setDataEvent((prevData) => {
      const updatedData = {
        ...prevData,
        dateStart: formattedDate,
      };
      if (prevData.date_start) {
        updatedData.date_start = formattedDate;
      }
      return updatedData;
    });
  } else if (name === "dateEndToConvert") {
    // Mettre à jour la date de fin
    setDataEvent((prevData) => {
      const updatedData = {
        ...prevData,
        dateEnd: formattedDate,
      };
      if (prevData.date_end) {
        updatedData.date_end = formattedDate;
      }
      return updatedData;
    });
  }
};

export const validateDates = (dateStart, dateEnd) => {
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
    isPrivate: false,
  });

  const handleClickButtonCancel = () => {
    setFormIsOpen((prev) => !prev);
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
        setEventUpdated((prev) => !prev);
        setFormIsOpen((prev) => !prev);
        // eslint-disable-next-line no-alert
        alert(message);
      } catch (error) {
        console.info("Erreur pour créer la recette >>", error);
      }
      // Envoyer les données à votre backend avec les timestamps
      console.info(dataEvent);
    };
    // ICI AJOUTER CONTROLE FORM
    console.info("dataEvent dans useEffect", dataEvent);
    // Gestion d'inputs inattendus :
    if (dataEvent.title.length > 50) {
      alert("Titre de l'événement : limite de caractères dépassée");
    } else if (dataEvent.text.length > 250) {
      alert("Description de l'événement : limite de caractères dépassée");
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-dark-default text-xl m-5  bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl"
        >
          <label htmlFor="name" className="font-bold mt-4">
            Nom de l'événement <RedStarForRequiredInput />
          </label>
          <input
            type="text"
            name="title"
            value={dataEvent.title}
            placeholder="Ex : anniv chez Jojo"
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
            placeholder="Lieu de l'événement, description, etc."
            // required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
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
              <p className="font-normal italic text-base ">
                Cocher pour masquer
              </p>
            </div>
            <Checkbox
              name="isPrivate"
              checked={dataEvent.isPrivate}
              onChange={handleChange}
              color="success"
            />
          </label>

          <div className="flex justify-center items-center pt-5  gap-2">
            <AddEventFormButton
              onClick={handleClickButtonCancel}
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
      </div>
    )
  );
}
