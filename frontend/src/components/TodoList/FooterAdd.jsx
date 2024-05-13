import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

// Style personnalisé pour le composant Switch de MUI
const OrangeSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: orange[600],
    "&:hover": {
      backgroundColor: alpha(orange[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: orange[600],
  },
}));

export default function FooterAdd() {
  const [isCreatingList, setIsCreatingList] = useState(false); // État pour gérer l'ouverture du formulaire de création de liste
  const [newList, setNewList] = useState({
    name: "",
    isPrivate: false,
  }); // État pour stocker les données de la nouvelle liste

  const navigate = useNavigate(); // Hook useNavigate pour la navigation

  // Fonction pour ouvrir le formulaire de création de liste
  const handleCreateList = () => {
    setIsCreatingList(true);
  };

  // Fonction pour fermer le formulaire de création de liste
  const handleClosePopup = () => {
    setIsCreatingList(false);
  };

  // Fonction pour mettre à jour le nom de la nouvelle liste
  const handleTitleChange = (e) => {
    setNewList({ ...newList, name: e.target.value });
  };

  // Fonction pour basculer la visibilité de la nouvelle liste (privée/publique)
  const handlePrivacyChange = () => {
    setNewList({ ...newList, isPrivate: !newList.isPrivate });
  };

  // Fonction pour soumettre le formulaire de création de liste
  const handleSubmitList = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut lors de la soumission du formulaire
    console.info("newList", newList);

    const currentGroup = JSON.parse(localStorage.getItem("group"));

    console.info("currentGroup", currentGroup);

    try {
      // Envoi des données au backend via une requête POST
      const response = await fetch(
        `http://localhost:3310/api/tasks-categories/groups/${currentGroup.ug_group_id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(newList),
        }
      );
      // console.info("response", response);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse || "erreur pour créer la tasklist");
      }
      // créer une alerte pour voir l'action réussie
      const { message, insertId } = await response.json();

      // on stock l'id category task dans le local storage
      localStorage.setItem("categoryTaskId", JSON.stringify(insertId));

      // on stock le nom de la category task dans le local storage
      localStorage.setItem("categoryName", JSON.stringify(newList.name));
      // eslint-disable-next-line no-alert
      alert(message);

      // Réinitialisation des données du formulaire après soumission réussie
      setNewList({ ...newList, name: "" });
      setIsCreatingList(false);

      // Navigation vers une autre page après la soumission réussie
      navigate("/todolist/edittask");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <footer className="fixed z-10 flex justify-end w-full lg:mx-0 lg:w-[50%] lg:max-w-[800px] bottom-0 shadow-top bg-cream pr-5 py-3">
      {/* Bouton pour ouvrir le formulaire de création de liste */}
      <button
        aria-label="Boutton pour créer une liste"
        type="button"
        id="createListButton"
        onClick={handleCreateList}
        className="focus:outline-none"
      >
        <FaCirclePlus className="text-4xl text-orange-default" />
      </button>
      {/* Formulaire de création de liste */}
      {isCreatingList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-cream p-4 rounded-xl shadow-xl border-2 border-orange-lighter w-72">
            <div className="flex flex-wrap">
              {/* Bouton pour fermer le formulaire de création de liste */}
              <div>
                <button
                  aria-label="Boutton pour annuler la création de liste"
                  type="button"
                  id="closePopupButton"
                  onClick={handleClosePopup}
                >
                  <IoCloseCircle className="text-orange-default text-2xl" />
                </button>
              </div>
              {/* Titre du formulaire */}
              <div>
                <h2 className="text-md font-bold mb-4 ml-12">
                  Ajouter une liste
                </h2>
              </div>
            </div>
            {/* Formulaire */}
            <form onSubmit={handleSubmitList} className="space-y-4">
              {/* Champ pour le nom de la liste */}
              <div>
                <label htmlFor="nameList" className="block mb-1">
                  Nom de la liste
                </label>
                <input
                  type="text"
                  value={newList.title}
                  onChange={handleTitleChange}
                  className="w-full border-orange-lighter border-2 rounded-md px-3 py-1 outline-none"
                />
              </div>
              {/* Sélecteur de visibilité de la liste */}
              <div className="flex items-center">
                <label htmlFor="privacySwitch" className="block mb-1 mr-2">
                  Liste partagée{" "}
                </label>
                <OrangeSwitch
                  checked={newList.isPrivate}
                  onChange={handlePrivacyChange}
                />
                <span className="ml-2">
                  {newList.isPrivate ? "Privée" : "Public"}
                </span>
              </div>
              {/* Bouton pour soumettre le formulaire */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-default text-cream px-4 py-1 rounded-md w-full"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
}
