import React, { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";
import MapRecipes from "../components/Recipes/MapRecipes";

export default function Recipe() {
  // On gère le state du filtre de catégorie sélectionné
  // Par défaut : filtre "Toutes"
  const [filterSelected, setFilterSelected] = useState("Toutes");

  // State pour gérer les recettes du groupe
  const [recipesGroup, setRecipesGroup] = useState([]);
  // console.info("recipesGroup>>", recipesGroup);

  // State pour récupérer le group en cours
  const [group] = useState(JSON.parse(localStorage.getItem("group")));

  // state pour re-render si recipe updated
  const [recipeUpdated, setRecipeUpdated] = useState(false);

  // On récupère les recettes du groupe côté backend
  useEffect(() => {
    const fetchDataRecipesOfGroup = async () => {
      try {
        const results = await fetch(
          `http://localhost:3310/api/recipes/groups/${group.ug_group_id}`,
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
        if (!results.ok) {
          const errorResponse = await results.json();
          throw new Error(
            errorResponse.message || "Echec pour récupérer les données"
          );
        }
        const { result } = await results.json();
        setRecipesGroup(result);
        setRecipeUpdated(false);
      } catch (error) {
        console.info("Error fetching recipes data:", error);
      }
    };
    fetchDataRecipesOfGroup();
  }, [recipeUpdated === true]);

  console.info("recipesGroup", recipesGroup);

  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <FilterCategories
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
          recipesGroup={recipesGroup}
        />
        <MapRecipes
          recipesGroup={recipesGroup}
          filterSelected={filterSelected}
          setRecipeUpdated={setRecipeUpdated}
        />
        <footer className="fixed flex justify-end w-full bottom-0 shadow-top bg-cream text-red-default pr-5 py-3">
          <FaCirclePlus className="text-4xl text-red-default" />
        </footer>
      </main>
    </div>
  );
}
