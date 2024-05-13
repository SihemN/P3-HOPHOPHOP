/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
export default function InfosEvent({
  eventToDisplay: { e_private, title, description, start, end },
}) {
  // convertir au bon format d'affichage les dates des événéments
  // afficher le jour et le mois sous forme de nom et les heures et minutes en nombres
  // On reçoit >> Mon Apr 01 2024 18:00:00 GMT+0200 (heure d’été d’Europe centrale)
  // On veut >> lundi 1 avril à 18:00 - 23:30
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
    <section name="infos-event" className="mt-4">
      <label
        className={
          e_private
            ? "bg-green-default w-fit px-2 rounded-lg text-cream"
            : "bg-blue-default w-fit px-2 rounded-lg text-cream"
        }
      >
        {e_private ? "Personnel" : "Groupe"}
      </label>

      <h2 className="text-xl mt-1 font-bold">{title}</h2>
      <p className="border-b-[1px] border-bluedefault mb-2 pb-2">
        {formatDate(start, end)}
      </p>
      <p>{description}</p>
    </section>
  );
}
