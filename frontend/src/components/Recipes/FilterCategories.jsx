/* eslint-disable react/prop-types */

export default function FilterCategories({
  filterSelected,
  setFilterSelected,
}) {
  const filters = [
    { name: "Toutes", id: 1 },
    { name: "Desserts", id: 2 },
    { name: "Salés", id: 3 },
    { name: "Apéro", id: 4 },
    { name: "Cocktails", id: 5 },
    { name: "Confitures", id: 6 },
  ];

  // Au clic sur le bouton catégorie, on récupère son id
  // on met à jour le state filterSelected avec l'id récupéré
  const handleClick = (name) => {
    return setFilterSelected(name);
  };

  console.info("filterSelected", filterSelected);

  return (
    <div className="flex gap-2 flex-wrap p-6">
      {filters.map(({ name, id }) => (
        <button
          key={id}
          aria-label={name}
          type="button"
          name={name}
          onClick={() => handleClick(name)}
          className={
            filterSelected === name // vérifie si filterSelected correspond à l'id du filtre
              ? "bg-cream border-2 border-red-default active:bg-red-lighter text-red-default font-semibold rounded-[11px] h-full px-4" // Si oui, on lui applique la classe border rouge et fond cream
              : "bg-red-default border-2 border-red-default hover:bg-blue-default hover:border-blue-default active:bg-red-lighter text-cream rounded-[11px] h-full px-4" // Si non, classe normale fond rouge
          }
        >
          {name}
        </button>
      ))}
    </div>
  );
}
