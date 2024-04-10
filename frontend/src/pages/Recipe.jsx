import React, { useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";
import MapRecipes from "../components/Recipes/MapRecipes";

export default function Recipe() {
  // On gère le state du filtre de catégorie sélectionné
  // Par défaut : filtre "Toutes"
  const [filterSelected, setFilterSelected] = useState("Toutes");

  //  ingredients, category, id, userId;
  return (
    <div className="font-Neue-Kabel bg-red-default">
      <header>
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        {/* MOBILE */}
        {/* Composant pour filtrer les recettes par catégorie */}
        <FilterCategories
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
        />
        {/* Composant pour maper les recettes, ordonnées par catégorie */}
        <MapRecipes filterSelected={filterSelected} />
      </main>
    </div>
  );
}
