/* eslint-disable react/prop-types */
import CloseBox from "../Recipes/CloseBox";
import DeleteEvent from "./DeleteEvent";
import UpdateEvent from "./UpdateEvent";

export default function DisplayEventInfo({ selectedEvent, setSelectedEvent }) {
  // Pour fermer la box de détails de l'event
  const handleCloseModal = () => setSelectedEvent(null);

  // convertir au bon format d'affichage les dates des événéments
  // afficher le jour et le mois sous forme de nom et les heures et minutes en nombres
  const formatDate = (startDate, endDate) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };

    // On convertit en string les objets Dates avec les options ci-dessus
    const startFormatted = startDate.toLocaleDateString("fr-FR", options);
    const endFormatted = endDate.toLocaleDateString("fr-FR", options);

    // Idem, on convertit les heures et minutes en string. On ajoute à si les minutes < 10
    // pour voir 18h09 et pas 18h9
    const endHour = endDate.getHours().toString().padStart(2, "0");
    const endMinute = endDate.getMinutes().toString().padStart(2, "0");

    // On veut éviter d'afficher deux fois le même jour si le jour de début et de fin est le même
    const isSameDay =
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear();

    if (isSameDay) {
      // si le jour est identique, on affiche la date start puis les heures et minutes de fin
      return `${startFormatted} - ${endHour}:${endMinute}`;
    }
    // si différent, on affiche date start et date end
    return `${startFormatted} au ${endFormatted}`;
  };
  return (
    selectedEvent && (
      <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl w-fit modal-container">
        <div className="flex justify-between my-2">
          <div className="flex justify-center items-center gap-1">
            <UpdateEvent />
            <DeleteEvent />
          </div>
          <CloseBox
            onClick={handleCloseModal}
            bgColor="blue-default"
            hoverColor="green-default"
            activeColor="green-lighter"
            type="button"
            aria-label="fermer la boîte sur les infos de l'événément"
          />
        </div>

        <section name="infos-event">
          <label className="bg-blue-default w-fit px-2 rounded-lg text-cream">
            {selectedEvent.private ? "Personnel" : "Groupe"}
          </label>
          <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
          <p className="border-b-[1px] border-bluedefault mb-2 pb-2">
            {formatDate(selectedEvent.start, selectedEvent.end)}
          </p>
          <p>{selectedEvent.description}</p>
        </section>
      </div>
    )
  );
}
