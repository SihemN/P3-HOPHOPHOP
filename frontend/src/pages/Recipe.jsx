import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";
import MapRecipes from "../components/Recipes/MapRecipes";
import ShowRecipeDetails from "../components/Recipes/ShowRecipeDetails";
import CreateRecipe from "../components/Recipes/CreateRecipe";
import FooterRecipe from "../components/Recipes/FooterRecipe";
import ModifyRecipe from "../components/Recipes/ModifyRecipe";

export default function Recipe() {
  // On gère le state du filtre de catégorie sélectionné
  // Par défaut : filtre "Toutes"
  const [filterSelected, setFilterSelected] = useState("Toutes");

  // State pour gérer les recettes du groupe
  const [recipesGroup, setRecipesGroup] = useState(null);

  // State pour récupérer le group en cours
  const [group] = useState(JSON.parse(localStorage.getItem("group")));

  // state pour re-render si recipe updated
  const [recipeUpdated, setRecipeUpdated] = useState(false);

  // state pour gérer l'id de la recette cliquée
  const [recipeId, setRecipeId] = useState(
    localStorage.getItem("recipeId") || null
  );

  // state pour gérer si on affiche les composents afficher la recette, modifier la recette ou créer une recette
  const currentRecipe = JSON.parse(localStorage.getItem("recipeSelected"));
  const [componentToShow, setComponentToShow] = useState(
    currentRecipe ? "details recipe" : null
  );

  const recipesCategories = [
    { id: 0, name: "Toutes" },
    { id: 1, name: "Apéritifs" },
    { id: 2, name: "Entrées" },
    { id: 3, name: "Plats" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Boissons" },
    { id: 6, name: "Petits-déjeuners" },
  ];

  const handleClicCreateRecipe = () => {
    if (componentToShow !== "create recipe") {
      setComponentToShow("create recipe");
    } else if (currentRecipe) {
      setComponentToShow("details recipe");
    } else {
      setComponentToShow(null);
    }
  };

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
      } catch (error) {
        console.info("Error fetching recipes data:", error);
      }
    };
    fetchDataRecipesOfGroup();
  }, [recipeUpdated]);

  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <main className=" md:flex rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top overflow-y-auto no-scrollbar">
        <ToastContainer />
        <div className="md:flex-1 z-10 md:shadow-lg lg:rounded-t-[4rem] lg:pt-5 lg:max-w-[800px] md:overflow-y-auto md:no-scrollbar ">
          <FilterCategories
            filterSelected={filterSelected}
            recipesCategories={recipesCategories}
            setFilterSelected={setFilterSelected}
          />
          <MapRecipes
            recipesGroup={recipesGroup}
            filterSelected={filterSelected}
            recipesCategories={recipesCategories}
            setRecipeUpdated={setRecipeUpdated}
            setComponentToShow={setComponentToShow}
            setRecipeId={setRecipeId}
            recipeId={recipeId}
          />
        </div>
        {/* Version PC et Tablette */}
        <div className="hidden z-0 md:block md:flex-1 md:overflow-y-auto">
          {componentToShow === "details recipe" && (
            <ShowRecipeDetails
              recipeId={recipeId}
              setComponentToShow={setComponentToShow}
              recipeUpdated={recipeUpdated}
            />
          )}
          {componentToShow === "create recipe" && (
            <CreateRecipe
              setRecipeUpdated={setRecipeUpdated}
              setComponentToShow={setComponentToShow}
              pc="pc"
            />
          )}
          {componentToShow === "modify recipe" && (
            <ModifyRecipe
              setRecipeUpdated={setRecipeUpdated}
              setComponentToShow={setComponentToShow}
            />
          )}
        </div>
      </main>
      <FooterRecipe handleClicCreateRecipe={handleClicCreateRecipe} />
    </div>
  );
}
