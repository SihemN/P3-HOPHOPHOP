/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../../context/UserContext";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/chat.svg";

export default function Chat() {
  // Récupère notre user connecté via UserContext
  const { user } = useContext(UserContext);
  // Récupère son id
  const { u_id: currentUserId, u_name: currentUserName } = user.data;
  // Stocker le message en cours de rédaction
  const [currentMessage, setCurrentMessage] = useState({
    message: "",
    role: "admin",
  });
  // Stocke les messages du groupe
  const [messagesGroup, setMessagesGroup] = useState([]);
  // TEST
  // const [messagesSession, setMessagesSession] = useState([]);
  // Connecte le front au server Socket backend;
  const socket = io.connect("http://localhost:4000");
  // Récupère le groupe en cours
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
  // On met à jour notre le CurrentMessage quand le user écrit
  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setCurrentMessage((prevMessage) => ({
      ...prevMessage,
      message: value,
    }));
  };
  // console.info("currentMessage", currentMessage);
  console.info("messagesGroup", messagesGroup);

  const sendMessage = (e) => {
    e.preventDefault();

    if (currentMessage.message.trim() !== "") {
      const token = JSON.parse(localStorage.getItem("token"));
      socket.emit("sendMessage", {
        ug_group_id,
        token,
        currentMessage,
        currentUserId,
        currentUserName,
      });
      // Trouver le plus grand ug_id actuellement présent dans messagesGroup
      const maxUgId = Math.max(...messagesGroup.map((msg) => msg.ug_id), 0);
      // Incrémenter cette valeur de 1 pour obtenir une nouvelle valeur ug_id
      const newUgId = maxUgId + 1;
      setMessagesGroup((messages) => [
        ...messages,
        {
          ug_id: newUgId,
          u_name: currentUserName,
          ug_user_id: currentUserId,
          ug_message: currentMessage.message,
        },
      ]);
      setMessagesGroup(messagesGroup.sort((a, b) => b.ug_id - a.ug_id));
      setCurrentMessage({ ...currentMessage, message: "" });
    }
  };

  const addNewMessage = (message) => {
    // Trouver le plus grand ug_id actuellement présent dans messagesGroup
    const maxUgId = Math.max(...messagesGroup.map((msg) => msg.ug_id), 0);
    // Incrémenter cette valeur de 1 pour obtenir une nouvelle valeur ug_id
    const newUgId = maxUgId + 1;
    // Mettre à jour l'état avec le nouveau message
    setMessagesGroup((prevMessages) => [
      ...prevMessages,
      { ...message, ug_id: newUgId }, // Assurez-vous que chaque message a un ug_id
    ]);
  };

  useEffect(() => {
    // Join la chat room du groupe au montage du composant
    socket.emit("joinGroup", ug_group_id);
    // On récupère le message
    // On ajoute .off pour ne pas recevoir le message en double
    socket.off("receive_message").on("receive_message", (message) => {
      console.info("SOCKET >>> MESSAGE >>>", message);
      addNewMessage(message);
    });

    // Nettoyer l'écouteur d'événements lors du démontage du composant
    return () => {
      socket.off("receive_message");
    };
  }, [socket]); // Exécuter cette fonction à chaque fois que 'ug_group_id' change

  useEffect(() => {
    console.info("USEFFECT FETCH DATA");
    const fetchMessagesOfGroup = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/messages/groups/${ug_group_id}`,
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
        const { messages } = await results.json();
        // Ordonner les messages du plus ancien au plus récent
        messages.sort((a, b) => b.ug_id - a.ug_id);
        setMessagesGroup(messages);
      } catch (error) {
        console.info("Erreur pour récupérer les événements:", error);
      }
    };
    fetchMessagesOfGroup();

    // return () => {
    //   second;
    // };
  }, []);

  return (
    <div className="font-Neue-Kabel bg-orange-lighter">
      <HeaderFunctionnalities
        title="Votre messagerie"
        color="text-orange-lighter"
        icon={icon}
      />
      <main className="flex flex-col items-center justify-center rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-5">
        <div className="rounded-t-lg overflow-y-auto h-custom w-full md:w-8/12 lg:w-5/12 max-h-full shadow-2xl bg-cream-default overflow-x-auto scrollbar-track-orange-lighter scrollbar-thumb-orange-default scrollbar-thin">
          <div className="flex flex-col-reverse justify-start h-full my-5">
            {messagesGroup &&
              messagesGroup.length > 0 &&
              messagesGroup
                .filter(({ ug_message }) => ug_message && ug_message)
                .map(({ ug_id, ug_user_id, u_name, ug_message }, index) => {
                  // console.info("ug_message", ug_message); // Ajout du console.log
                  return (
                    <div
                      key={ug_id || `message_${Date.now()}_${index}`} // ug_id s'il est disponible, sinon utilisez une clé basée sur le temps
                      className={`flex flex-col mx-3 my-2 ${
                        currentUserId === ug_user_id
                          ? "items-end"
                          : "items-start"
                      }`}
                    >
                      {currentUserId !== ug_user_id && (
                        <p className="italic text-[0.6rem]">
                          Envoyé par {u_name}
                        </p>
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
        <form
          onSubmit={sendMessage}
          className="rounded-b-xl w-full md:w-8/12 lg:w-5/12 h-12 flex shadow-top"
        >
          <input
            type="text"
            value={currentMessage.message}
            onChange={handleChangeMessage}
            placeholder="Mon message..."
            className="bg-cream px-3 w-full rounded-bl-xl focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-br-xl bg-blue-default text-cream px-3 py-1 hover:bg-green-default active:bg-blue-lightest"
          >
            Envoyer
          </button>
        </form>
      </main>
    </div>
  );
}
