/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DotsUpdateRecipe from "./DotsUpdateRecipe";

export default function MapRecipes({
  filterSelected,
  recipesGroup,
  setRecipeUpdated,
}) {
  // On stocke l'id de la recette cliquée
  // const [recipeSelected, setRecipeSelected] = useState();
  const navigate = useNavigate();

  //
  const [showDotsUpdateRecipe, setShowDotsUpdateRecipe] = useState(null);

  // Obtenir une liste des noms de catégories uniques
  const uniqueRecipesCategories = [
    ...new Set(recipesGroup.map((recipe) => recipe.r_category)),
  ];

  //
  const storeUniqueRecipesCategories = () => {
    localStorage.setItem(
      "uniqueRecipesCategories",
      JSON.stringify(uniqueRecipesCategories)
    );
  };
  storeUniqueRecipesCategories();

  const storeClickedRecipe = (recipeId) => {
    localStorage.setItem("recipeId", JSON.stringify(recipeId));
  };

  const handleClicRecipe = (recipeId) => {
    storeClickedRecipe(recipeId);
    navigate("/recipes/detail");
  };

  const handleClickDots = (recipeId) => {
    setShowDotsUpdateRecipe(recipeId);
  };

  console.info("showDotsUpdateRecipe", showDotsUpdateRecipe);

  return (
    <div className="flex flex-col gap-5 px-5 w-full">
      {/* Parcourir les recettes par catégorie
      / Par défaut, on affiche toutes les catégories de recettes
      / Si clic, On filtre les catégories par la catégorie cliquée
      */}
      {uniqueRecipesCategories
        .filter(
          (category) =>
            filterSelected === "Toutes" || category === filterSelected
        )
        .map((category) => (
          // On crée une div pour chaque catégorie
          <div key={category}>
            <h1 className="text-xl font-bold mb-2">{category.toUpperCase()}</h1>
            {/* Afficher les recettes de la catégorie */}
            {recipesGroup
              // on filtre les recettes correspondantes et on map pour créer un button chacune
              .filter(
                ({ r_category }) =>
                  category === "Toutes" || r_category === category
              )
              .map(({ r_id, r_name, r_category, u_name }) => (
                <div className="flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3 pr-0">
                  <button
                    type="button"
                    key={r_id}
                    name={r_category}
                    onClick={() => handleClicRecipe(r_id)}
                    className="flex w-full mr-4 flex-col items-start"
                  >
                    <h2 className="font-bold">{r_name}</h2>
                    <h3 className="font-light">{`Ajoutée par ${u_name}`}</h3>
                  </button>
                  <div className="relative flex items-center ">
                    <HiOutlineDotsVertical
                      className="text-3xl w-fit text-red-default mt-0 pr-3"
                      onClick={() => handleClickDots(r_id)}
                    />
                    <DotsUpdateRecipe
                      showDotsUpdateRecipe={showDotsUpdateRecipe}
                      setShowDotsUpdateRecipe={setShowDotsUpdateRecipe}
                      recipeId={r_id}
                      recipeName={r_name}
                      setRecipeUpdated={setRecipeUpdated}
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
