/* eslint-disable react/prop-types */
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
import { useState } from "react";

export default function MapRecipes({ filterSelected }) {
  // On stocke l'id de la recette cliquée
  const [recipeSelected, setRecipeSelected] = useState();

  // onClick sur une recette
  const handleClick = (id) => {
    if (id === recipeSelected) {
      return setRecipeSelected();
    }
    return setRecipeSelected(id);
  };

  // fake data de recettes
  const recipes = [
    {
      id: 1,
      name: "Tarte aux citrons",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      time: "2h",
      persons: 6,
      ingredients: "farine, sel, beurre, citrons, jus de citron, oeufs",
      category: "Desserts",
      user: "Arthur",
    },
    {
      id: 2,
      name: "Gâteau aux pommes",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      time: "1h",
      persons: 8,
      ingredients: "farine, sel, beurre, pommes, oeufs",
      category: "Desserts",
      user: "Soumia",
    },
    {
      id: 3,
      name: "Pizza aux légumes du soleil",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      time: "1h",
      persons: 4,
      ingredients:
        "farine, sel, levure, huile d'olives, aubergine, courgette, poivrons, oignons, oeufs",
      category: "Salés",
      user: "Anaïs",
    },
  ];

  // Regrouper les recettes par catégorie
  // on parcourt notre tableau de recettes

  // Obtenir une liste des noms de catégories uniques
  const uniqueCategories = [
    ...new Set(recipes.map((recipe) => recipe.category)),
  ];

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
            {recipes
              // on filtre les recettes correspondantes et on map pour créer un button chacune
              .filter(
                (recipe) =>
                  category === "Toutes" || recipe.category === category
              )
              .map(({ id, name, user }) => (
                <button
                  type="button"
                  key={id}
                  name={category}
                  onClick={() => handleClick(id)}
                  className={
                    recipeSelected === id
                      ? "flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3 shadow-inner shadow-dark-shadow"
                      : "flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3"
                  }
                >
                  <div className="flex flex-col items-start">
                    <h2 className="font-bold">{name}</h2>
                    <h3 className="font-light">{`Ajoutée par ${user}`}</h3>
                  </div>
                  <HiOutlineDotsVertical
                    className="text-3xl text-red-default"
                    onClick={() => handleClick(id)}
                  />
                </button>
              ))}
          </div>
        ))}
      <FaCirclePlus className="fixed bottom-5 right-5 text-4xl text-red-default" />
    </div>
  );
}
