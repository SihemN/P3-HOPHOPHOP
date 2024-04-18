import React from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/calendar.svg";

export default function Calendar() {
  // eslint-disable-next-line camelcase
  const { ug_group_id } = localStorage.getItem("group");
  console.info("ug_group_id >>", ug_group_id);
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
