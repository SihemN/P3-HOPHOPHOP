/* eslint-disable react/prop-types */
import { useState } from "react";
import AddEventFormButton from "./AddEventFormButton";

export default function AddEventForm({ formIsOpen, setFormIsOpen }) {
  const [dataEvent] = useState({
    title: "",
    text: "",
    dateStart: "",
    dateEnd: "",
    isPrivate: "",
  });

  const handleClickButtonCancel = () => {
    setFormIsOpen((prev) => !prev);
  };

  return (
    formIsOpen && (
      <form className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col text-dark-default text-xl m-5 lg:w-1/2 bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl">
        <label htmlFor="name" className="font-bold mt-4">
          Nom de l'événement
        </label>
        <input
          type="text"
          name="title"
          value={dataEvent.title}
          placeholder="Ex : anniv chez Jojo"
          required
          className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
          //   onChange={handlChange}
        />
        <label htmlFor="name" className="font-bold mt-4">
          Description
        </label>
        <textarea
          name="text"
          value={dataEvent.text}
          placeholder="Lieu de l'événement, description, etc."
          required
          className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
          //   onChange={handlChange}
        />
        <label htmlFor="name" className="font-bold mt-4">
          Date de début
        </label>
        <input
          type="date"
          name="dateStart"
          value={dataEvent.dateStart}
          required
          className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
          //   onChange={handlChange}
        />
        <label htmlFor="name" className="font-bold mt-4">
          Date de fin
        </label>
        <input
          type="date"
          name="dateStart"
          value={dataEvent.dateStart}
          required
          className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
          //   onChange={handlChange}
        />
        <label htmlFor="name" className="font-bold mt-4">
          Visibilité dans le calendrier
        </label>
        <input
          type="date"
          name="dateStart"
          value={dataEvent.dateStart}
          required
          className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
          //   onChange={handlChange}
        />
        <div className="flex justify-center items-center pt-5 gap-5">
          <AddEventFormButton
            onClick={handleClickButtonCancel}
            label="Annuler"
            bgColor="cream"
            borderColor="blue-default"
            textColor="blue-default"
            hoverBgColor="orange-default"
            hoverBorderColor="orange-default"
            hoverTextColor="cream"
            activeBgColor="orange-lighter"
          />
          <AddEventFormButton
            label="Enregistrer"
            type="submit"
            bgColor="blue-default"
            borderColor="blue-default"
            textColor="cream"
            hoverBgColor="green-default"
            hoverBorderColor="green-default"
            hoverTextColor="cream"
            activeBgColor="green-lighter"
          />
        </div>
      </form>
    )
  );
}
