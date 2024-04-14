/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function DotsUpdateRecipe({
  showDotsUpdateRecipe,
  setShowDotsUpdateRecipe,
  recipeId,
  recipeName,
  setRecipeUpdated,
}) {
  const [newRecipeName, setNewRecipeName] = useState({ name: recipeName });

  const handleClicClose = () => {
    setShowDotsUpdateRecipe(null);
    setNewRecipeName({ name: recipeName });
  };

  const handleChangeRecipeName = (e) => {
    setNewRecipeName({ name: e.target.value });
  };

  const handleSubmitFormRename = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3310/api/recipes/${recipeId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(newRecipeName),
    })
      .then((res) => res.json())
      .then((data) => {
        console.info("data", data);
        setShowDotsUpdateRecipe(null);
        setRecipeUpdated(true);
      })
      .catch((err) => console.error("Erreur : ", err));
  };

  return (
    showDotsUpdateRecipe === recipeId && (
      <div className="absolute right-0 -top-5 z-10 flex flex-col items-end h-fit w-80 px-5 pt-2 pb-5 bg-cream border-[1px] border-red-default text-cream gap-3 shadow-md rounded-xl rounded-tr-none">
        <IoCloseOutline
          className="bg-red-default hover:bg-orange-default active:bg-orange-default text-cream text-2xl mt-2 rounded-full"
          onClick={handleClicClose}
        />
        <form
          className="w-full flex flex-col"
          onSubmit={handleSubmitFormRename}
        >
          <label
            htmlFor="rename"
            className="text-dark-default text-lg font-bold mb-3 w-full t text-center"
          >
            Renommer la recette
          </label>
          <input
            type="text"
            placeholder={newRecipeName.name}
            value={newRecipeName.name}
            className="text-dark-default border border-solid border-red-default h-fit resize-y mb-4 py-2 px-5 placeholder:text-dark-default"
            onChange={handleChangeRecipeName}
          />
          <button
            type="submit"
            name="rename"
            className="bg-red-default  hover:bg-green-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
          >
            Enregistrer
          </button>
        </form>
        <label
          htmlFor="delete"
          className="text-dark-default text-lg font-bold mt-2 w-full text-center"
        >
          Supprimer la recette
        </label>
        <button
          type="button"
          name="delete"
          className="bg-orange-default  hover:bg-green-default active:bg-green-lighter h-12 w-full py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        >
          Supprimer
        </button>
      </div>
    )
  );
}
