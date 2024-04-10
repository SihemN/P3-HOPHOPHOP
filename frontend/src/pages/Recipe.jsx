import React, { useEffect, useState } from "react";
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
  const [group] = useState(JSON.parse(localStorage.getItem("group")));

  // console.info("group", group);
  console.info("recipesGroup", recipesGroup);

  // On récupère les recettes du groupe côté backend
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
          recipesGroup={recipesGroup}
        />
        {/* Composant pour maper les recettes, ordonnées par catégorie */}
        <MapRecipes
          recipesGroup={recipesGroup}
          filterSelected={filterSelected}
        />
      </main>
    </div>
  );
}
