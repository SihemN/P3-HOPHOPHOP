/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import MapRecipeDiv from "./MapRecipeDiv";

export default function MapRecipesByCategory({
  recipesGroup,
  category,
  setRecipeUpdated,
}) {
  return (
    <>
      {recipesGroup
        // on filtre les recettes correspondantes et on map pour créer un button chacune
        .filter(
          ({ r_category }) => category === "Toutes" || r_category === category
        )
        .map(({ r_id, r_name, r_category, u_name }) => (
          <MapRecipeDiv
            key={r_id}
            r_id={r_id}
            r_name={r_name}
            r_category={r_category}
            u_name={u_name}
            setRecipeUpdated={setRecipeUpdated}
          />
        ))}
    </>
  );
}
