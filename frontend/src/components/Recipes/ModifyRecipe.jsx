/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";

export default function ModifyRecipe() {
  // on destructure l'objet recipe stocké dans localStorage
  const location = useLocation();
  // on récupère l'objet recette transmis par le navigate
  const recipe = JSON.parse(localStorage.getItem("recipeSelected"));
  // on récupère les catégories existantes dans le localStorage
  const [categories] = useState(
    JSON.parse(localStorage.getItem("uniqueCategories"))
  );
  // On initialise le navigate
  const navigate = useNavigate();

  // Ouverture de l'input catégorie
  const [isOpen, setIsOpen] = useState(false);
  // au clic du bouton des catégories
  const handleClickCat = () => {
    setIsOpen(!isOpen);
  };
  // state sur l'id de la recette sélectionnée
  const [recipeId] = useState(localStorage.getItem("recipeId"));
  // state sur la catégorie de la recette
  const [categorySelected, setCategorySelected] = useState(
    recipe.r_category || ""
  );
  // on gère les données de la recipe
  // on initialise les propriétés avec les valeurs de la recette cliquée
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

  // au choix d'une autre catégorie
  const handleClicNewCat = (newCatName) => {
    setCategorySelected(newCatName);
    setDataRecipe({ ...dataRecipe, category: newCatName });
    setIsOpen(!isOpen);
  };

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
        // console.info("res :>> ", data);
        // console.info("recipe useEffect >>", recipe);
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
        {recipe && (
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
            <label htmlFor="category" className="relative w-full">
              <p className="font-bold mt-4">Catégorie</p>
              <button
                type="button"
                className="w-full border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg flex justify-start"
                value={dataRecipe.category}
                onClick={handleClickCat}
              >
                {categorySelected}
                <IoChevronDownSharp className="absolute top-15 right-3 mt-1 text-dark-default" />
              </button>
              {isOpen && (
                <div className="border border-dark-default rounded-lg ">
                  {categories.map((category) => (
                    <div
                      key={category}
                      name="category"
                      value={category}
                      onClick={() => handleClicNewCat(category)}
                      className="h-12 py-2 px-5 hover:bg-red-clear "
                    >
                      {category}
                    </div>
                  ))}
                </div>
              )}
            </label>

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
        )}

        {!recipe && <p>Vous n'avez sélectionné de recette</p>}
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
