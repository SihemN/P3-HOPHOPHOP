/* eslint-disable react/prop-types */
import { BsTrashFill } from "react-icons/bs";

export default function ButtonDeleteEvent({
  deleteOrUpdateToShow,
  handleClickButtonDelete,
}) {
  return (
    <button
      type="button"
      aria-label="ouvrir la boîte pour l'événénement"
      className={
        deleteOrUpdateToShow === "delete"
          ? "bg-orange-default hover:bg-blue-default active:bg-blue-lighter h-7 w-7 rounded-full flex justify-center items-center transition-transform transform-gpu hover:scale-110"
          : "bg-blue-default hover:bg-orange-default active:bg-orange-lighter h-7 w-7 rounded-full flex justify-center items-center transition-transform transform-gpu hover:scale-110"
      }
      onClick={handleClickButtonDelete}
    >
      <BsTrashFill className="text-cream text-md" />
    </button>
    /* <div>
        <button
          type="button"
          aria-label="supprimer l'événénement"
          className="bg-red-default hover:bg-orange-default active:bg-orange-lighter h-12 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        >
          Confirmer la suppression
        </button>
      </div> */
  );
}
