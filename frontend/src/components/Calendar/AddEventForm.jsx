/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import AddEventFormButton from "./AddEventFormButton";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

export default function AddEventForm({
  formIsOpen,
  setFormIsOpen,
  setEventUpdated,
}) {
  const [dataEvent, setDataEvent] = useState({
    title: "",
    text: "",
    dateStart: "",
    timeStart: "",
    dateEnd: "",
    timeEnd: "",
    isPrivate: false,
  });

  const concatenateDateTime = () => {
    // Concaténer date et time au bon format
    // "2024-04-22" et "18:00" >> "2024-04-22 18:00:00"
    // Concaténer la date et l'heure de début
    const startDate = `${dataEvent.dateStart} ${dataEvent.timeStart}:00`;

    // Concaténer la date et l'heure de fin
    const endDate = `${dataEvent.dateEnd} ${dataEvent.timeEnd}:00`;

    // Mettre à jour les valeurs de dateStart et dateEnd dans dataEvent
    setDataEvent((prevData) => ({
      ...prevData,
      dateStart: startDate,
      dateEnd: endDate,
    }));
  };

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
  };

  const handleCheckboxChange = (e) => {
    setDataEvent((prevData) => ({
      ...prevData,
      isPrivate: e.target.checked, // Met à jour isPrivate en fonction de si la case à cocher est cochée ou non
    }));
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
          timeStart: "",
          dateEndToConvert: "",
          dateEnd: "",
          timeEnd: "",
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
    concatenateDateTime();
    // Gestion d'inputs inattendus :
    if (dataEvent.title.length > 50) {
      alert("Titre de l'événement : limite de caractères dépassée");
    } else if (dataEvent.text.length > 250) {
      alert("Description de l'événement : limite de caractères dépassée");
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
          <div className="flex">
            <input
              type="date"
              name="dateStart"
              value={dataEvent.dateStart}
              required
              className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
              onChange={handleChange}
            />
            <input
              type="time"
              name="timeStart"
              value={dataEvent.timeStart}
              required
              className="w-fit border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="dateEnd" className="font-bold mt-4">
            Date de fin <RedStarForRequiredInput />
          </label>
          <div className="flex">
            <input
              type="date"
              name="dateEnd"
              value={dataEvent.dateEnd}
              required
              className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
              onChange={handleChange}
            />
            <input
              type="time"
              name="timeEnd"
              value={dataEvent.timeEnd}
              required
              className="w-fit border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
              onChange={handleChange}
            />
          </div>
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
              onChange={handleCheckboxChange}
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
              hoverBorderColor="orange-default"
              activeBgColor="orange-lighter"
            />

            <AddEventFormButton
              label="Enregistrer"
              type="submit"
              bgColor="blue-default"
              borderColor="blue-default"
              textColor="cream"
              hoverColor="green-default"
              hoverBorderColor="green-default"
              activeBgColor="green-lighter"
            />
          </div>
        </form>
      </div>
    )
  );
}
