/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MapRecipes({ filterSelected, recipesGroup }) {
  // On stocke l'id de la recette cliquée
  // const [recipeSelected, setRecipeSelected] = useState();
  const navigate = useNavigate();

  // Obtenir une liste des noms de catégories uniques
  const uniqueCategories = [
    ...new Set(recipesGroup.map((recipe) => recipe.r_category)),
  ];
  // onClick sur une recette
  const handleClickButton = (recipeId) => {
    localStorage.setItem("recipeId", JSON.stringify(recipeId));
    localStorage.setItem("uniqueCategories", JSON.stringify(uniqueCategories));
    // on navigate vers la page Détails de la recette
    navigate("/recipes/detail");
  };

  // const handleClickDots = (id) => {
  //   if (id === recipeSelected) {
  //     return setRecipeSelected();
  //   }
  //   return setRecipeSelected(id);
  // };

  // console.info("recipeSelected ", recipeSelected);
  // fake data de recettes

  // console.info("uniqueCategories", uniqueCategories);

  return (
    <div className="flex flex-col gap-5 px-5 w-full">
      {/* Parcourir les recettes par catégorie
      / Par défaut, on affiche toutes les catégories de recettes
      / Si clic, On filtre les catégories par la catégorie cliquée
      */}
      {uniqueCategories
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
                <button
                  type="button"
                  key={r_id}
                  name={r_category}
                  onClick={() => handleClickButton(r_id)}
                  className="flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3"
                >
                  <div className="flex flex-col items-start">
                    <h2 className="font-bold">{r_name}</h2>
                    <h3 className="font-light">{`Ajoutée par ${u_name}`}</h3>
                  </div>
                  <HiOutlineDotsVertical
                    className="text-3xl text-red-default"
                    // onClick={() => handleClickDots(id)}
                  />
                </button>
              ))}
          </div>
        ))}
      <FaCirclePlus className="fixed bottom-5 right-5 text-4xl text-red-default" />
    </div>
  );
}
