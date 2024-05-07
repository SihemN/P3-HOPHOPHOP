/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

// Options du menu
const options = ["Renommer", "Supprimer"];

export default function HiDotsMenu({ catId, setListUpdated }) {
  // Déclaration de l'état de l'élément d'ancrage du menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Calcul de l'état d'ouverture du menu
  const open = Boolean(anchorEl);

  // Fonction pour supprimer la liste avec cta_id
  const handleDeleteList = async () => {
    console.info("catId", catId);
    if (!catId) {
      console.error("cta_id n'est pas défini !");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3310/api/tasks-categories/${catId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.info("response", response);
      // Vérification de la réussite de la suppression
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Problème pour supprimer la liste"
        );
      }
      const message = await response.json();
      console.info("message", message);
      setListUpdated((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste :", error);
    }
  };

  // Fonction pour gérer le clic sur le bouton de points de suspension
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Mise à jour de l'état de l'élément d'ancrage
  };

  // Fonction pour gérer la fermeture du menu
  const handleClose = () => {
    setAnchorEl(null); // Réinitialisation de l'état de l'élément d'ancrage pour fermer le menu
  };

  // Rendu du composant
  return (
    <div className="flex justify-center">
      {/* Bouton de points de suspension */}
      <button
        type="button"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="text-orange-default text-lg"
      >
        <HiDotsVertical />
      </button>

      {/* Menu déroulant des options */}
      {open && (
        <div
          id="long-menu"
          className="absolute z-10 mt-2 bg-cream rounded-xl shadow-lg text-left max-h-48"
          role="menu"
          aria-labelledby="long-button"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={option === "Supprimer" ? handleDeleteList : handleClose}
              className="block px-4 p-2 text-sm text-dark-default w-full"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
