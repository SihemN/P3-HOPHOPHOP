/* eslint-disable react/prop-types */

export default function FilterCategories({
  filterSelected,
  setFilterSelected,
  recipesGroup,
}) {
  // on crée un nouveau tableau à partir du tableau de recettes
  // on récupère chaque catégorie
  const filters = [...new Set(recipesGroup.map((recipe) => recipe.r_category))];
  filters.unshift("Toutes");

  // console.info("filters  >>", filters);

  // Au clic sur le bouton catégorie, on récupère son id
  // on met à jour le state filterSelected avec l'id récupéré
  const handleClick = (name) => {
    return setFilterSelected(name);
  };

  // console.info("filterSelected", filterSelected);

  return (
    <div className="flex gap-2 flex-wrap p-6">
      {filters.map((filter) => (
        <button
          key={filter}
          aria-label={filter}
          type="button"
          name={filter}
          onClick={() => handleClick(filter)}
          className={
            filterSelected === filter // vérifie si filterSelected correspond à l'id du filtre
              ? "bg-cream border-2 border-red-default active:bg-red-lighter text-red-default font-semibold rounded-[11px] h-full px-4" // Si oui, on lui applique la classe border rouge et fond cream
              : "bg-red-default border-2 border-red-default hover:bg-blue-default hover:border-blue-default active:bg-red-lighter text-cream rounded-[11px] h-full px-4" // Si non, classe normale fond rouge
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
