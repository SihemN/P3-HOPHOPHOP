/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function SendMessages({ socket }) {
  // Stocke le message à envoyer et le role du user connecté
  const [newMessage, setNewMessage] = useState({
    message: "",
    role: "",
  });

  // Récupère les infos du user connecté et du groupe en cours
  const { user } = useContext(UserContext);
  const { u_id: currentUserId, u_name: currentUserName } = user.data;
  const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

  // Gère si rédaction de message
  const handleChangeMessage = (e) => {
    const { value } = e.target;
    setNewMessage((prevMessage) => ({
      ...prevMessage,
      message: value,
    }));
  };

  // Au submit du form sendMessage
  const sendMessage = async (e) => {
    e.preventDefault();
    // On vérifie si message n'est pas vide
    if (newMessage.message.trim() !== "") {
      // on récupère le token du user connecté
      const token = JSON.parse(localStorage.getItem("token"));
      // on émet à l'événement socket "sendMessage"
      try {
        await socket.emit("sendMessage", {
          ug_group_id,
          token,
          newMessage,
          currentUserId,
          currentUserName,
        });

        setNewMessage({ message: "", role: "" });
      } catch (error) {
        console.error("erreur pour envoyer le message >>", error);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("Votre message est vide");
    }
  };

  // On récupère les membres du groupe pour stocker le role du user connecté (admin ou membre)
  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/groups/${ug_group_id}/users`,
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
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage ||
              "Erreur lors de la récupération des membres du groupe"
          );
        }
        const { results } = await response.json();
        // On filtre les membres du group pour ne garder que les infos de notre user
        const resultsFilter = results.filter(
          (member) => member.ug_user_id === currentUserId
        );
        // On maj notre message à envoyer
        setNewMessage({
          ...newMessage,
          role: resultsFilter[0].ug_user_role,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchGroupMembers();
  }, []);

  return (
    <form
      onSubmit={sendMessage}
      className="rounded-b-xl w-full md:w-8/12 lg:w-5/12 h-12 flex shadow-top"
    >
      <input
        type="text"
        value={newMessage.message}
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
