/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/calendar.svg";

export default function Calendar() {
  // state pour stocker les events du group
  const [events, setEvents] = useState([]);
  console.info("events >>", events);
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

  return (
    <div className="font-Neue-Kabel bg-blue-default">
      <HeaderFunctionnalities
        title="Votre calendrier"
        color="text-blue-default"
        icon={icon}
      />
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <p className="text-center">Hello</p>
      </main>
    </div>
  );
}

/* 
 import { Calendar, momentLocalizer } from 'react-big-calendar';
 import moment from 'moment';
 import 'react-big-calendar/lib/css/react-big-calendar.css';

 const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {

const [selectedEvent, setSelectedEvent] = useState(null); 

 const handleEventClick = (event) => 
setSelectedEvent(event); };

 const handleCloseModal = () =>
   setSelectedEvent(null);
 };
    Convertir les dates au format timestamp en objet Date
   const events = props.events.map(event => ({
    title: event.title,
    description: event.text,
    start: new Date(event.date_start),
    end: new Date(event.date_end),
    private: event.private,
    user_id: event.user_id,
    group_id: event.group_id
  }));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events} // Liste des événements à afficher
        startAccessor="start" // Nom de la clé pour la date de début
        endAccessor="end" // Nom de la clé pour la date de fin
        onSelectEvent={handleEventClick} // Gestionnaire de clic sur un événement
        views={['month', 'week', 'day']} // Types de vue disponibles
        defaultView="month" // Vue par défaut au chargement
      />
{
Modal pour afficher les détails de l'événement
}
{
  selectedEvent && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>{selectedEvent.title}</h2>
        <p>{selectedEvent.text}</p>
        <p>Date de début: {selectedEvent.date_start}</p>
        <p>Date de fin: {selectedEvent.date_end}</p>
        <p>{selectedEvent.private ? "Privé" : "Public"}</p>
      </div>
    </div>
  );
}
    </div>
  );
};

export default MyCalendar; */
