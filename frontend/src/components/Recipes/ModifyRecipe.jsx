/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";

export default function ModifyRecipe() {
  // on destructure l'objet recipe stocké dans localStorage
  const location = useLocation();
  const { recipe } = location.state;
  const navigate = useNavigate();
  // console.log("recipe.r_id:", recipe);
  const [recipeId] = useState(recipe.r_id);
  console.info("recipe", recipe);

  // on gère les données de la recipe
  const [dataRecipe, setDataRecipe] = useState(() => {
    if (recipe) {
      return {
        name: recipe.r_name || "",
        description: recipe.r_description || "",
        nb_persons: recipe.r_nb_persons || "",
        list_ingredients: recipe.r_list_ingredients || "",
        category: recipe.r_category || "",
        time_preparation: recipe.r_time_preparation || "",
      };
    }
    return {
      name: "",
      description: "",
      nb_persons: "",
      list_ingredients: "",
      category: "",
      time_preparation: "",
    };
  });

  // quand le user change les données des inputs, on update dataRecipe
  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataRecipe({ ...dataRecipe, [name]: value });
  };
  // console.info("dataRecipe", dataRecipe);

  // Au submit du form, on envoie dataUserUpdate avec la route PATCH
  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch route PATCH profile
    fetch(`http://localhost:3310/api/recipes/${recipeId}`, {
      method: "PATCH",
      headers: {
        // eslint-disable-next-line prettier/prettier
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(dataRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        console.info("res :>> ", data);
        console.info("recipe useEffect >>", recipe);
        navigate("/recipes/detail");
      })
      .catch((err) => console.error("Erreur : ", err));
  };

  return (
    <div className="font-Neue-Kabel bg-red-default">
      <header>
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream shadow-top flex flex-col items-center min-h-screen">
        <form
          className="flex flex-col text-dark-default text-xl m-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="font-bold">
            Nom de la recette
          </label>
          <input
            type="text"
            name="name"
            value={dataRecipe.name}
            placeholder={dataRecipe.name}
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            onChange={handlChange}
          />
          <label htmlFor="category" className="font-bold mt-4">
            Catégorie
          </label>
          <input
            type="text"
            name="category"
            value={dataRecipe.category}
            placeholder={dataRecipe.category}
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            onChange={handlChange}
          />
          <label htmlFor="nb_persons" className="font-bold mt-4">
            Nombre de personnes
          </label>
          <input
            type="text"
            name="nb_persons"
            value={dataRecipe.nb_persons}
            placeholder={dataRecipe.nb_persons}
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            onChange={handlChange}
          />
          <label htmlFor="time_preparation" className="font-bold mt-4">
            Temps de préparation
          </label>
          <input
            type="text"
            name="time_preparation"
            value={dataRecipe.time_preparation}
            placeholder={dataRecipe.time_preparation}
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            onChange={handlChange}
          />
          <label htmlFor="list_ingredients" className="font-bold mt-4">
            Ingrédients
          </label>
          <textarea
            type="text"
            name="list_ingredients"
            value={dataRecipe.list_ingredients}
            placeholder={dataRecipe.list_ingredients}
            required
            className="border border-solid border-dark-default h-fit resize-y mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            onChange={handlChange}
          />

          <label htmlFor="description" className="font-bold mt-4">
            Instructions
          </label>
          <textarea
            name="description"
            value={dataRecipe.description}
            placeholder={dataRecipe.description}
            required
            className="border border-solid border-dark-default mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default min-h-96 resize-y overflow-auto"
            onChange={handlChange}
          />

          <button
            type="submit"
            className="bg-red-default  hover:bg-green-default active:bg-green-lighter h-12 mt-10 mb-16 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
          >
            ENREGISTRER
          </button>
        </form>
      </main>
      <footer className="fixed w-full bottom-0 shadow-top bg-cream text-red-default pl-5 py-3">
        {" "}
        <Link to="/recipes/detail" className="flex items-center gap-3">
          <FaCircleArrowLeft className=" text-3xl" />
          <p>Retourner aux recettes</p>
        </Link>
      </footer>
    </div>
  );
}
