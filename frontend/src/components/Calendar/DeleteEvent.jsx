/* eslint-disable react/prop-types */
import notify from "../Notify/Notify";

export default function DeleteEvent({
  setEventUpdated,
  handleClickButtonDelete,
  eventId,
  handleCloseModal,
}) {
  const handleConfirmDelete = () => {
    const fetchDeleteEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/events/${eventId}`,
          {
            method: "DELETE",
            headers: {
              // eslint-disable-next-line prettier/prettier
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          notify(
            "errorCreation",
            errorResponse || "problème pour supprimer l'événement"
          );
        }
        const message = await response.json();
        // console.info("message", message);
        // eslint-disable-next-line no-alert
        notify("success", message);
        handleCloseModal();
        setEventUpdated((prev) => !prev);
      } catch (error) {
        console.info("Erreur pour créer la recette >>", error);
      }
    };
    if (eventId) {
      fetchDeleteEvent();
    }
  };
  return (
    <div className="flex flex-col gap-3 mt-5">
      <button
        type="button"
        name="confirm-delete"
        className="border border-red-default  hover:border-blue-default active:text-red-lighter active:border-red-lighter h-12 w-full py-2 px-5 rounded-lg text-red-default hover:text-blue-default font-semibold shadow-md shadow-dark-shadow"
        onClick={handleClickButtonDelete}
      >
        Annuler
      </button>
      <button
        type="button"
        name="confirm-delete"
        className="bg-red-default  hover:bg-blue-default  active:bg-red-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        onClick={handleConfirmDelete}
      >
        Confirmer
      </button>
    </div>
  );
}
