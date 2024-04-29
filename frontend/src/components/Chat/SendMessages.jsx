/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function SendMessages({ socket }) {
  const [currentMessage, setCurrentMessage] = useState({
    message: "",
    role: "admin",
  });
  // Récupère les infos du user connecté et du groupe en cours
  const { user } = useContext(UserContext);
  const { u_id: currentUserId, u_name: currentUserName } = user.data;
  const { ug_group_id } = JSON.parse(localStorage.getItem("group")); // On met à jour notre le CurrentMessage quand le user écrit

  // Gère si rédaction de message
  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setCurrentMessage((prevMessage) => ({
      ...prevMessage,
      message: value,
    }));
  };

  // Au submit du form sendMessage
  const sendMessage = async (e) => {
    e.preventDefault();
    // On vérifie si message n'est pas vide
    if (currentMessage.message.trim() !== "") {
      // on récupère le token du user connecté
      const token = JSON.parse(localStorage.getItem("token"));
      // on émet à l'événement socket "sendMessage"
      try {
        await socket.emit("sendMessage", {
          ug_group_id,
          token,
          currentMessage,
          currentUserId,
          currentUserName,
        });

        setCurrentMessage({ ...currentMessage, message: "" });
      } catch (error) {
        console.error("erreur pour envoyer le message >>", error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("Votre message est vide");
    }
  };

  return (
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
  );
}
