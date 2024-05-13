/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MapRecipesByCategory from "./MapRecipesByCategory";

export default function MapRecipes({
  filterSelected,
  recipesGroup,
  setRecipeUpdated,
  recipesCategories,
  setComponentToShow,
  setRecipeId,
  recipeId,
}) {
  const [isLoading, setIsLoading] = useState(true);
  // On récupère les catégories qui ont des recettes
  // const categoriesNotEmpty = [
  //   ...new Set(recipesGroup.map((recipe) => recipe.r_category)),
  // ];
  const categoriesNotEmpty = recipesGroup
    ? [...new Set(recipesGroup.map((recipe) => recipe.r_category))]
    : [];

  const customOrder = [
    "Apéritifs",
    "Entrées",
    "Plats",
    "Desserts",
    "Boissons",
    "Petits-déjeuners",
  ];

  const categoriesNotEmptyAndSorted = categoriesNotEmpty.sort((a, b) => {
    return customOrder.indexOf(a) - customOrder.indexOf(b);
  });

  const storeRecipesCategories = () => {
    localStorage.setItem(
      "recipesCategories",
      JSON.stringify(recipesCategories)
    );
  };

  storeRecipesCategories();

  // Au chargement du composant, on simule une attente de données pendant quelques secondes
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Une fois que les données sont chargées, on met isLoading à false
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col gap-5 px-5 pb-20 lg:px-10 w-full">
      {/* Parcourir les recettes par catégorie
      / Par défaut, on affiche toutes les catégories de recettes
      / Si clic, On filtre les catégories par la catégorie cliquée
      */}
      {categoriesNotEmptyAndSorted
        .filter(
          (category) =>
            filterSelected === "Toutes" || category === filterSelected
        )
        .map((category) => (
          <div key={category}>
            <h1 className="text-xl font-bold mb-2">{category.toUpperCase()}</h1>
            <MapRecipesByCategory
              recipesGroup={recipesGroup}
              category={category}
              setRecipeUpdated={setRecipeUpdated}
              setComponentToShow={setComponentToShow}
              setRecipeId={setRecipeId}
              recipeId={recipeId}
            />
          </div>
        ))}
      {!recipesGroup && isLoading && (
        <div className="italic">
          <p>Chargement des recettes...</p>
        </div>
      )}

      {recipesGroup && recipesGroup.length === 0 && !isLoading && (
        <div className="italic">
          <p>Aucune recette à afficher.</p>
          <p>Cliquez sur le bouton "+" pour ajouter une recette.</p>
        </div>
      )}
    </div>
  );
}
