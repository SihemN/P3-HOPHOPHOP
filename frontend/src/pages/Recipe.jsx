import React from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/recipe.svg";
import FilterCategories from "../components/Recipes/FilterCategories";

export default function Recipe() {
  return (
    <div className="bg-red-default">
      <header>
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        {/* MOBILE */}
        <FilterCategories />
      </main>
    </div>
  );
}

// composant Filtres par catégorie
// Composant Map les recettes existantes
// Composant ajouter une recette
