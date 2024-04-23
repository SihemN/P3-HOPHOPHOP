import { BsTrashFill } from "react-icons/bs";

export default function DeleteEvent() {
  return (
    <button
      type="button"
      aria-label="supprimer l'événénement"
      className="bg-blue-default hover:bg-orange-default active:bg-orange-lighter h-7 w-7 rounded-full flex justify-center items-center"
    >
      <BsTrashFill className="text-cream text-md" />
    </button>
  );
}
