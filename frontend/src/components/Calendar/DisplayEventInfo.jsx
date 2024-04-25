/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ButtonPenModify from "../Recipes/ButtonPenModify";
import CloseBox from "../Recipes/CloseBox";
import ButtonDeleteEvent from "./ButtonDeleteEvent";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import InfosEvent from "./InfosEvent";

export default function DisplayEventInfo({
  selectedEvent,
  setSelectedEvent,
  setEventUpdated,
  eventUpdated,
}) {
  // Affichage de Delete ou Update Event
  const [deleteOrUpdateToShow, setDeleteOrUpdateToShow] = useState(null);
  const [eventToDisplay, setEventToDisplay] = useState(null);
  // Pour fermer la box de détails de l'event
  const handleCloseModal = () => {
    setDeleteOrUpdateToShow(null);
    setSelectedEvent(null);
  };

  // clic sur l'icon Pen
  const handleClickPenButton = () => {
    if (deleteOrUpdateToShow === "update") {
      setDeleteOrUpdateToShow(null);
    } else {
      setDeleteOrUpdateToShow("update");
    }
  };

  // clic sur l'icon Poubelle
  const handleClickButtonDelete = () => {
    if (deleteOrUpdateToShow === "delete") {
      setDeleteOrUpdateToShow(null);
    } else {
      setDeleteOrUpdateToShow("delete");
    }
  };

  // on récupère l'event par id
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/events/${selectedEvent.eventId}`,
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

        const {
          e_id: eventId,
          e_title: title,
          e_text: description,
          e_date_start: start,
          e_date_end: end,
          e_private,
          e_user_id: userId,
          e_group_id: groupId,
        } = result[0];
        setEventToDisplay({
          eventId,
          title,
          description,
          start: new Date(start),
          end: new Date(end),
          e_private,
          userId,
          groupId,
        });
      } catch (error) {
        console.info("Erreur pour récupérer l'événement:", error);
      }
    };
    if (selectedEvent && selectedEvent.eventId) {
      fetchEventById();
    }
    return () => {
      // Nettoyage avant de recevoir le nouvel événement à afficher
      // évite d'apercevoir l'ancien événement cliqué (brièvement)
      setEventToDisplay(null);
    };
  }, [eventUpdated, selectedEvent]);

  return (
    selectedEvent &&
    eventToDisplay && (
      <div className="fixed z-50 top-1/2 left-1/2 w-[95%] md:w-8/12 lg:w-4/12 transform -translate-x-1/2 -translate-y-1/2 bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl">
        <div className="flex justify-between my-2">
          <div className="flex gap-2">
            <ButtonPenModify
              aria-label="ouvrir le formulaire pour modifier l'événement"
              className={
                deleteOrUpdateToShow === "update"
                  ? "bg-green-default h-7 w-7 rounded-full hover:bg-blue-default active:bg-blue-lighter flex justify-center items-center"
                  : "bg-blue-default h-7 w-7 rounded-full hover:bg-green-default active:bg-green-lighter flex justify-center items-center"
              }
              iconSize="text-md"
              onClick={handleClickPenButton}
            />
            <ButtonDeleteEvent
              deleteOrUpdateToShow={deleteOrUpdateToShow}
              setDeleteOrUpdateToShow={setDeleteOrUpdateToShow}
              handleClickButtonDelete={handleClickButtonDelete}
            />
          </div>
          <CloseBox
            onClick={handleCloseModal}
            bgColor="red-default"
            hoverColor="green-default"
            activeColor="green-lighter"
            type="button"
            aria-label="fermer la boîte sur les infos de l'événément"
          />
        </div>
        {deleteOrUpdateToShow === "update" && (
          <UpdateEvent
            setDeleteOrUpdateToShow={setDeleteOrUpdateToShow}
            eventToDisplay={eventToDisplay}
            setEventUpdated={setEventUpdated}
          />
        )}
        {deleteOrUpdateToShow === "delete" && (
          <DeleteEvent
            setEventUpdated={setEventUpdated}
            handleClickButtonDelete={handleClickButtonDelete}
            eventId={selectedEvent.eventId}
            handleCloseModal={handleCloseModal}
          />
        )}
        {deleteOrUpdateToShow !== "update" && (
          <InfosEvent eventToDisplay={eventToDisplay} />
        )}
      </div>
    )
  );
}
