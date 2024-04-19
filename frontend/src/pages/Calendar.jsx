/* eslint-disable camelcase */
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import frFR from "date-fns/locale/fr";
import { useState, useEffect } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/calendar.svg";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DisplayEventInfo from "../components/Calendar/DisplayEventInfo";
import AddEvent from "../components/Calendar/AddEvent";

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

  // Convertir les dates format timestamp en objet Date
  const eventsGroup = events.map(
    ({
      e_id,
      e_title,
      e_date_start,
      e_date_end,
      e_text,
      e_private,
      e_user_id,
      e_group_id,
    }) => ({
      eventId: e_id,
      title: e_title,
      start: new Date(e_date_start),
      end: new Date(e_date_end),
      description: e_text,
      private: e_private,
      userId: e_user_id,
      groupId: e_group_id,
    })
  );

  // Pour récupérer les infos de l'event cliqué
  const handleEventClick = (event) => {
    if (!selectedEvent) {
      setSelectedEvent(event);
    } else if (event.eventId === selectedEvent.eventId) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="font-Neue-Kabel bg-blue-default">
      <HeaderFunctionnalities
        title="Votre calendrier"
        color="text-blue-default"
        icon={icon}
      />
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-10">
        {/* Ajouter un événement */}
        <AddEvent />
        <Calendar
          localizer={localizer}
          events={eventsGroup}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventClick}
          views={["month", "week", "day"]}
          defaultView="month"
          // className={selectedEvent ? "blur-2xl" : ""}
        />
        <DisplayEventInfo
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </main>
    </div>
  );
}
