/* eslint-disable react/prop-types */
import { IoAddSharp } from "react-icons/io5";

export default function AddEventButtonOpen({ setFormIsOpen }) {
  const handleClickButtonAddEvent = () => {
    setFormIsOpen((prev) => !prev);
  };
  return (
    <div className="flex justify-center items-center">
      {/* bouton pour afficher le formulaire d'ajout d'événement */}
      <button
        onClick={handleClickButtonAddEvent}
        type="button"
        className="flex justify-around rounded-md bg-blue-default text-cream px-10 py-2  hover:bg-green-default active:bg-green-lighter"
      >
        <label aria-label="ouvrir le formulaire pour créer un contact">
          Ajouter un événement{" "}
        </label>
        <IoAddSharp className="text-2xl" />
      </button>
    </div>
  );
}
