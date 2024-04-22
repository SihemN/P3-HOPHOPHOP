import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

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
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [newList, setNewList] = useState({
    title: "",
    isPrivate: false,
  });

  const handleCreateList = () => {
    setIsCreatingList(true);
  };

  const handleClosePopup = () => {
    setIsCreatingList(false);
  };

  const handleTitleChange = (e) => {
    setNewList({ ...newList, title: e.target.value });
  };

  const handlePrivacyChange = () => {
    setNewList({ ...newList, isPrivate: !newList.isPrivate });
  };

  const handleSubmitList = (e) => {
    e.preventDefault();

    console.info("Nouvelle liste de tâches:", newList);
    // Réinitialise l'input
    setNewList({ ...newList, title: "" });

    setIsCreatingList(false);
  };

  return (
    <footer className="fixed z-10 flex justify-end w-full lg:mx-0 lg:w-[50%] lg:max-w-[800px] bottom-0 shadow-top bg-cream pr-5 py-3">
      <button
        aria-label="Boutton pour créer une liste"
        type="button"
        id="createListButton"
        onClick={handleCreateList}
        className="focus:outline-none"
      >
        <FaCirclePlus className="text-4xl text-orange-default" />
      </button>
      {isCreatingList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-cream p-4 rounded-xl shadow-xl border-2 border-orange-lighter w-72">
            <div className="flex flex-wrap">
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
              <div>
                <h2 className="text-md font-bold mb-4 ml-12">
                  Ajouter une liste
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmitList} className="space-y-4">
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
