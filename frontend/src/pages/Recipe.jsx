import React, { useEffect, useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";
import MapRecipes from "../components/Recipes/MapRecipes";
import ShowRecipeDetails from "../components/Recipes/ShowRecipeDetails";
import CreateRecipe from "../components/Recipes/CreateRecipe";
import FooterRecipe from "../components/Recipes/FooterRecipe";

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

  // state pour gérer si on affiche les composents afficher la recette, modifier la recette ou créer une recette
  const currentRecipe = JSON.parse(localStorage.getItem("recipeSelected"));
  const [componentToShow, setComponentToShow] = useState(
    currentRecipe ? "details recipe" : null
  );
  console.info("currentRecipe", currentRecipe);
  console.info("componentToShow", componentToShow);

  // console.info("componentToShow", componentToShow);
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
        if (recipeUpdated) {
          setRecipeUpdated(false);
          // console.info("if recipeUpdated");
        }
      } catch (error) {
        console.info("Error fetching recipes data:", error);
      }
    };
    fetchDataRecipesOfGroup();
    // console.info("useEffect render");
  }, [recipeUpdated]);

  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <main className=" lg:flex rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <div className="lg:flex-1 z-10 lg:shadow-lg lg:rounded-t-[4rem] lg:pt-5 lg:max-w-[800px] lg:overflow-auto lg:pr-10">
          <FilterCategories
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            recipesCategories={recipesCategories}
          />
          <MapRecipes
            recipesGroup={recipesGroup}
            filterSelected={filterSelected}
            setRecipeUpdated={setRecipeUpdated}
            recipesCategories={recipesCategories}
          />
        </div>
        {/* Version PC: ajouter le composant d'affichage Recette */}
        <div className="hidden z-0 lg:block lg:flex-1 lg:overflow-auto">
          {componentToShow === "details recipe" && <ShowRecipeDetails />}
          {componentToShow === "create recipe" && (
            <CreateRecipe
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
