/* eslint-disable react/prop-types */
import { IoAddSharp } from "react-icons/io5";

export default function AddEventButtonOpen({ setFormIsOpen }) {
  const handleClickButtonAddEvent = () => {
    setFormIsOpen((prev) => !prev);
  };
  return (
    /* bouton pour afficher le formulaire d'ajout d'événement */
    <button
      onClick={handleClickButtonAddEvent}
      type="button"
      className="flex justify-center gap-7 w-60 rounded-md bg-blue-default text-cream px-5 py-2 mb-5 hover:bg-green-default active:bg-green-lighter"
    >
      <p>Ajouter un événement </p>
      <div>
        <IoAddSharp className="text-2xl" />
      </div>
    </button>
  );
}
