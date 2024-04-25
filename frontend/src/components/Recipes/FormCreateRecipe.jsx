/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function FormCreateRecipe({
  setRecipeUpdated,
  setComponentToShow,
}) {
  const navigate = useNavigate();
  // Ouverture de l'input catégorie
  const [isOpen, setIsOpen] = useState(false);

  // Par défaut, la catégorie de la recette est celle existante
  const [categorySelected, setCategorySelected] = useState(null);

  // on initialise les propriétés avec les valeurs de la recette cliquée
  const [dataRecipe, setDataRecipe] = useState({
    name: "",
    description: "",
    nb_persons: "",
    list_ingredients: "",
    category: "",
    time_preparation: "",
  });

  // Gérer les erreurs d'inputs
  const [errors, setErrors] = useState({
    name: "",
    time_preparation: "",
    list_ingredients: "",
    nb_persons: "",
  });

  const recipesCategories = [
    { id: 0, name: "Toutes" },
    { id: 1, name: "Apéritifs" },
    { id: 2, name: "Entrées" },
    { id: 3, name: "Plats" },
    { id: 4, name: "Desserts" },
    { id: 5, name: "Boissons" },
    { id: 6, name: "Petits-déjeuners" },
  ];

  const currentGroup = JSON.parse(localStorage.getItem("group"));

  const filteredCategories = recipesCategories.filter(
    (category) => category.name !== "Toutes"
  );

  // au clic du bouton des catégories
  const handleClickCat = () => {
    setIsOpen(!isOpen);
  };

  // au choix d'une autre catégorie
  const handleClicNewCat = (newCatName) => {
    if (newCatName === categorySelected) {
      setCategorySelected(null);
      setIsOpen(!isOpen);
    } else {
      setCategorySelected(newCatName);
      setDataRecipe({ ...dataRecipe, category: newCatName });
      setIsOpen(!isOpen);
    }
  };

  // quand le user change les données des inputs, on update dataRecipe
  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataRecipe({ ...dataRecipe, [name]: value });
    // Validation des données
    // On initialise un objet avec l'état actuel des errors
    // On met à jours les erreurs si besoin
    const newErrors = { ...errors };
    switch (name) {
      case "name":
        newErrors.name =
          value.length > 50 ? "Limite de caractères dépassée" : "";
        break;
      case "time_preparation":
        if (!/^(?:(\d{1,2})h(?:([0-5]\d|min))?)$/.test(value)) {
          newErrors.time_preparation =
            "Format invalide. (Préférer: 0h30, 2h, 1h30)";
        } else {
          newErrors.time_preparation =
            value.length > 20 ? "Limite de caractères dépassée" : "";
        }
        break;
      case "list_ingredients":
        newErrors.list_ingredients =
          value.length > 255 ? "Limite de caractères dépassée" : "";
        break;
      case "nb_persons":
        if (Number.isNaN(Number(value)) || value < 1 || value > 999) {
          newErrors.nb_persons = "Entre un nombre entre 1 et 999";
        } else {
          newErrors.nb_persons = "";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // Au submit du form, on envoie dataRecipe avec la route PATCH
  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchCreateRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/recipes/groups/${currentGroup.ug_group_id}`,
          {
            method: "POST",
            headers: {
              // eslint-disable-next-line prettier/prettier
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
            body: JSON.stringify(dataRecipe),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "Vérifiez vos données");
        }

        const message = await response.json();
        console.info("message", message);
        setRecipeUpdated((prev) => !prev);
        setComponentToShow("details recipe");
        setDataRecipe({
          name: "",
          description: "",
          nb_persons: "",
          list_ingredients: "",
          category: "",
          time_preparation: "",
        });
        setCategorySelected(null);
        navigate("/recipes");
      } catch (error) {
        console.info("Erreur pour créer la recette >>", error);
      }
    };
    // Vérification des erreurs
    const newErrors = {};

    if (categorySelected === null) {
      newErrors.category = "Choisissez une catégorie";
    }

    if (
      errors.name ||
      errors.time_preparation ||
      errors.list_ingredients ||
      errors.nb_persons ||
      newErrors.category
    ) {
      alert("Vérifier vos données");
      // Au moins un champ contient une erreur
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
    } else {
      fetchCreateRecipe();
    }
  };

  return (
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
        placeholder="Ma recette..."
        required
        className={`border ${
          errors.name &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handlChange}
      />
      {errors.name && (
        <p className="text-red-default text-[1rem] italic">{errors.name}</p>
      )}
      <label htmlFor="category" className="relative w-full bg-white">
        <p className="font-bold mt-4">Catégorie</p>
        <button
          type="button"
          className={` ${
            errors.category &&
            "border-red-default text-red-default focus:border-red-default"
          } w-full border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg flex justify-start`}
          value={dataRecipe.category}
          onClick={handleClickCat}
        >
          {categorySelected === null
            ? "-- Choisir une catégorie --"
            : categorySelected}
          <IoChevronDownSharp
            className={`${
              errors.category && "text-red-default"
            } absolute top-15 right-3 mt-1 text-dark-default`}
          />
        </button>
        {isOpen && (
          <div className="flex flex-col justify-start  border border-dark-default rounded-lg">
            {filteredCategories.map(({ id, name }) => (
              <button
                type="button"
                key={id}
                name="category"
                value={name}
                onClick={() => handleClicNewCat(name)}
                className="h-12 py-2 px-5 hover:bg-red-clear text-left rounded-lg hover:font-semibold"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </label>
      {errors.category && (
        <p className="text-red-default text-[1rem] italic">{errors.category}</p>
      )}

      <label htmlFor="nb_persons" className="font-bold mt-4">
        Nombre de personnes
      </label>
      <input
        type="text"
        name="nb_persons"
        value={dataRecipe.nb_persons}
        placeholder="Exemple : 3"
        required
        className={`border ${
          errors.nb_persons &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handlChange}
      />
      {errors.nb_persons && (
        <p className="text-red-default text-[1rem] italic">
          {errors.nb_persons}
        </p>
      )}
      <label htmlFor="time_preparation" className="font-bold mt-4">
        Temps de préparation
      </label>
      <input
        type="text"
        name="time_preparation"
        value={dataRecipe.time_preparation}
        placeholder="Exemple : 3h"
        required
        className={`border ${
          errors.time_preparation &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handlChange}
      />
      {errors.time_preparation && (
        <p className="text-red-default text-[1rem] italic">
          {errors.time_preparation}
        </p>
      )}
      <label htmlFor="list_ingredients" className="font-bold mt-4">
        Ingrédients
      </label>
      <textarea
        type="text"
        name="list_ingredients"
        value={dataRecipe.list_ingredients}
        placeholder="Exemple : farine, oeufs, etc."
        required
        className={`border ${
          errors.list_ingredients &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handlChange}
      />
      {errors.list_ingredients && (
        <p className="text-red-default text-[1rem] italic">
          {errors.list_ingredients}
        </p>
      )}

      <label htmlFor="description" className="font-bold mt-4">
        Instructions
      </label>
      <textarea
        name="description"
        value={dataRecipe.description}
        placeholder="Mélanger les oeufs et le sucre, ajouter la levure..."
        required
        className="border border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none"
        onChange={handlChange}
      />

      <button
        type="submit"
        className="bg-red-default  hover:bg-green-default active:bg-green-lighter h-12 mt-10 mb-16 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
      >
        ENREGISTRER
      </button>
    </form>
  );
}
