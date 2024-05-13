/* eslint-disable react/prop-types */

import FilterCategoriesButton from "./FilterCategoriesButton";

export default function FilterCategories({
  filterSelected,
  setFilterSelected,
  recipesCategories,
}) {
  const filters = recipesCategories;

  // on met à jour le state filterSelected avec le nom récupéré
  const handleClick = (name) => {
    return setFilterSelected(name);
  };

  return (
    <div className="flex gap-2 flex-wrap p-6 lg:pl-10">
      {filters.map(({ id, name }) => (
        <FilterCategoriesButton
          key={id}
          id={id}
          name={name}
          onClick={() => handleClick(name)}
          filterSelected={filterSelected}
        />
      ))}
    </div>
  );
}
