/* eslint-disable react/prop-types */
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MapRecipes({ filterSelected }) {
  // On stocke l'id de la recette cliquée
  // const [recipeSelected, setRecipeSelected] = useState();
  const navigate = useNavigate();

  // State pour gérer les recettes du groupe
  const [recipesGroup, setRecipesGroup] = useState([]);
  const [group] = useState(JSON.parse(localStorage.getItem("group")));

  // console.info("group", group);
  console.info("recipesGroup", recipesGroup);

  useEffect(() => {
    fetch(`http://localhost:3310/api/recipes/groups/${group.ug_group_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        // alert(res);
        // console.info("MapRecipes, res >> ", res.result);
        setRecipesGroup(res.result);
      })
      .catch((err) => console.info("Error fetching recipes data:", err));
  }, []);

  // onClick sur une recette
  const handleClickButton = (recipe) => {
    localStorage.setItem("recipe", JSON.stringify(recipe));
    // au clic sur le bouton de la recette, on navigate vers la page qui montre le détail de la recette
    navigate("/recipes/detail");
  };

  // const handleClickDots = (id) => {
  //   if (id === recipeSelected) {
  //     return setRecipeSelected();
  //   }
  //   return setRecipeSelected(id);
  // };

  // console.log("recipeSelected ", recipeSelected);
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
              .map((recipe) => (
                <button
                  type="button"
                  key={recipe.id}
                  name={recipe.category}
                  onClick={() => handleClickButton(recipe)}
                  className="flex justify-between items-center bg-red-clear hover:border hover:border-red-default border border-red-clear text-dark-default w-full p-3 rounded-xl mb-3"
                >
                  <div className="flex flex-col items-start">
                    <h2 className="font-bold">{recipe.name}</h2>
                    <h3 className="font-light">{`Ajoutée par ${recipe.user}`}</h3>
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
