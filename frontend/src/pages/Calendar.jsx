/* eslint-disable camelcase */
// Importez Calendar sous un nom différent, par exemple MyCalendar
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import frFR from "date-fns/locale/fr";
import { useState, useEffect } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/calendar.svg";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Initialisez localizer avec date-fns
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: frFR,
});

export default function MyCalendar() {
  // state pour stocker les events du group
  const [events, setEvents] = useState([]);
  // state pour gérer l'event cliqué à afficher
  const [selectedEvent, setSelectedEvent] = useState(null);

  // On récupère le groupe en cours
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

  // on récupère les events du group
  useEffect(() => {
    const fetchEventsOfGroup = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/events/groups/${ug_group_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        if (!results.ok) {
          const errorResponse = await results.json();
          throw new Error(
            errorResponse.message || "Echec pour récupérer les données"
          );
        }
        const { result } = await results.json();
        setEvents(result);
      } catch (error) {
        console.info("Error fetching recipes data:", error);
      }
    };
    fetchEventsOfGroup();
  }, []);

  const handleEventClick = (event) => setSelectedEvent(event);
  console.info("selectedEvent >>", selectedEvent);

  const handleCloseModal = () => setSelectedEvent(null);

  // Convertir les dates au format timestamp en objet Date
  const eventsGroup = events.map((event) => ({
    title: event.e_title,
    start: new Date(event.e_date_start),
    end: new Date(event.e_date_end),
    description: event.e_text,
    private: event.e_private,
    userId: event.e_user_id,
    groupId: event.e_group_id,
  }));
  console.info("eventsGroup >>", eventsGroup);
  return (
    <div className="font-Neue-Kabel bg-blue-default">
      <HeaderFunctionnalities
        title="Votre calendrier"
        color="text-blue-default"
        icon={icon}
      />
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-10">
        <Calendar
          localizer={localizer}
          events={eventsGroup}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
          views={["month", "week", "day"]}
          defaultView="month"
        />
        {selectedEvent && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-cream p-5 border-[1px] border-blue-default rounded-2xl shadow-2xl w-fit">
            <div>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <section name="infos-event">
                <div className="bg-blue-default w-fit px-2 rounded-lg text-cream">
                  {selectedEvent.private ? "Personnel" : "Groupe"}
                </div>
                <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                <p>{selectedEvent.description}</p>
                <p>Du {selectedEvent.start.toLocaleString()}</p>
                <p>Au {selectedEvent.end.toLocaleString()}</p>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// title
// start: Date
// end: Date
// description
// private
// userId
// groupId
