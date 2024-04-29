/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function ChatMessages({ socket }) {
  // Stocke les messages du groupe
  const [messagesGroup, setMessagesGroup] = useState([]);
  // Récupère les infos du user connecté et du groupe en cours
  const { user } = useContext(UserContext);
  const { u_id: currentUserId } = user.data;
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

  //   console.info("messagesGroup >>>", messagesGroup);

  // S'exécute quand un événement Socket est reçu du backend
  useEffect(() => {
    // console.info("useeffect SOCKET OFF");
    // On récupère le message
    // On ajoute .off pour ne pas recevoir le message en double
    socket.on("receive_message", (message) => {
      //   console.info("SOCKET >>> MESSAGE >>>", message);
      setMessagesGroup((prevMessages) => [message, ...prevMessages]);
    });

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => socket.off("receive_message");
  }, [socket]);

  useEffect(() => {
    console.info("USEFFECT FETCH DATA");
    // Join la chat room du groupe au montage du composant
    const token = JSON.parse(localStorage.getItem("token"));
    socket.emit("joinGroup", ug_group_id, token);
    socket.on("get_messages_of_group", (messagesStoredFiltered) => {
      console.info("messagesStoredFiltered", messagesStoredFiltered);
      setMessagesGroup(messagesStoredFiltered);
    });
  }, []);

  return (
    <div className="rounded-t-lg  w-full md:w-8/12 lg:w-5/12 h-[90%] shadow-2xl bg-cream-default ">
      <div className="flex flex-col-reverse justify-start h-full py-8 pb-5 overflow-y-auto overflow-x-hidden scrollbar-track-orange-lighter scrollbar-thumb-orange-default scrollbar-thin">
        {messagesGroup &&
          messagesGroup.length > 0 &&
          messagesGroup.map(({ ug_user_id, u_name, ug_message }, index) => {
            // console.info("ug_message", ug_message); // Ajout du console.log
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
                  className={`w-fit max-w-48 text-cream rounded-lg px-5 py-2 mt-[3px] ${
                    currentUserId === ug_user_id
                      ? "bg-green-default"
                      : "bg-blue-default"
                  }`}
                >
                  {ug_message}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
