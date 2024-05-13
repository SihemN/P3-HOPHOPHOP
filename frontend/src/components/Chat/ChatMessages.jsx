/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";

export default function ChatMessages() {
  // Stocke les messages du groupe
  const [messagesGroup, setMessagesGroup] = useState([]);
  const { socket } = useContext(SocketContext);
  const messagesColumnRef = useRef(null);
  // Récupère les infos du user connecté et du groupe en cours
  const { user } = useContext(UserContext);
  const { u_id: currentUserId } = user.data;

  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

  useEffect(() => {
    // On récupère le message envoyé par un user de la room
    socket.on("receive_message", (message) => {
      // On ajoute ce message à notre state messagesGroup
      setMessagesGroup((prevMessages) => [message, ...prevMessages]);
    });

    // Nettoye l'écouteur d'événements lors du démontage du composant
    return () => {
      socket.off("receive_message");
    };
    // S'exécute quand un événement Socket est reçu du backend
  }, [socket]);

  useEffect(() => {
    // const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
    const token = JSON.parse(localStorage.getItem("token"));
    // On connecte le user à la room adéquate (numéro de room = id du groupe)
    socket.emit("joinGroup", ug_group_id, token);
    // On récupère les messages existants stockés dans la BDD
    socket.on("get_messages_of_group", (messagesStoredFiltered) => {
      // On met à jour le state messagesGroup
      setMessagesGroup(messagesStoredFiltered);
    });
  }, [ug_group_id]);

  // Scroll en bas si nouveau message
  // scrollTop définit un défilement vertical
  // scrollHeight entraîne un défilement en bas de l'élément
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesGroup]);

  return (
    <div className="bg-cream w-full h-[89%] shadow-2xl rounded-t-2xl">
      <div
        ref={messagesColumnRef}
        className="flex flex-col-reverse justify-start h-full md:py-8 pb-5 overflow-y-auto overflow-x-hidden scrollbar-track-orange-lighter scrollbar-thumb-orange-default scrollbar-thin"
      >
        {messagesGroup &&
          messagesGroup.length > 0 &&
          messagesGroup.map(({ ug_user_id, u_name, ug_message }, index) => {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index} // ug_id s'il est disponible, sinon utilisez une clé basée sur le temps
                className={`flex flex-col mx-3 my-2 ${
                  currentUserId === ug_user_id ? "items-end" : "items-start"
                }`}
              >
                {currentUserId !== ug_user_id && (
                  <p className="italic text-[0.6rem]">Envoyé par {u_name}</p>
                )}
                <div
                  className={`w-fit max-w-48 text-cream rounded-2xl px-5 py-2 mt-[3px] ${
                    currentUserId === ug_user_id
                      ? "bg-green-default"
                      : "bg-blue-default"
                  }`}
                  // Gestion du débordement du texte
                  style={{ overflowWrap: "break-word" }}
                >
                  <p>{ug_message}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
