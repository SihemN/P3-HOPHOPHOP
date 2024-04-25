/* eslint-disable react/prop-types */
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function ToggleTask({ taskDone, onToggle }) {
  // Fonction pour basculer l'état de la tâche
  const toggleTask = () => {
    // Envoi d'un signal au composant parent pour mettre à jour les tâches
    onToggle((prev) => !prev);
  };

  return (
    <IoMdCheckmarkCircleOutline
      onClick={toggleTask}
      className={`mr-3 cursor-pointer ${
        taskDone ? "text-green-default" : "text-orange-lighter"
      }`}
    />
  );
}

export default ToggleTask;
