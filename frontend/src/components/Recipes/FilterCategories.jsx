import { useState } from "react";

export default function FilterCategories() {
  const [filterSelected, setFilterSelected] = useState(1);
  const filters = [
    { name: "Toutes", id: 1 },
    { name: "Desserts", id: 2 },
    { name: "Salés", id: 3 },
    { name: "Apéro", id: 4 },
    { name: "Cocktails", id: 5 },
    { name: "Confitures", id: 6 },
  ];

  //
  const handleClick = (id) => {
    return setFilterSelected(id);
  };

  console.info("filterSelected", filterSelected);

  return (
    <div className="flex gap-2 flex-wrap border p-6">
      {filters.map(({ name, id }) => (
        <button
          key={id}
          aria-label={name}
          type="button"
          onClick={() => handleClick(id)}
          className={
            filterSelected === id // vérifie si filterSelected correspond à l'id du filtre
              ? "bg-cream border-2 border-red-default active:bg-red-lighter text-red-default font-semibold rounded-[11px] h-full  w-fit px-4" // Si oui, on lui applique la classe border rouge et fond cream
              : "bg-red-default border-2 border-red-default hover:bg-blue-default active:bg-red-lighter text-cream rounded-[11px] h-full px-5" // Si non, classe normale fond rouge
          }
        >
          {name}
        </button>
      ))}
    </div>
  );
}
