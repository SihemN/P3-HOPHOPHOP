/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";

export default function ModifyRecipe() {
  // on destructure l'objet recipe stocké dans localStorage
  const { id, name, description, time, persons, ingredients, category } =
    JSON.parse(localStorage.getItem("recipe"));

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
          //   onSubmit={handlSubmit}
        >
          <label htmlFor="name" className="font-bold">
            Nom de la recette
          </label>
          <input
            name="name"
            // value={dataForm.name}
            type="text"
            placeholder="Tarte aux citrons"
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            // onChange={handlChange}
          />
          <label htmlFor="persons" className="font-bold mt-4">
            Nombre de personnes
          </label>
          <input
            type="text"
            name="persons"
            // value={dataForm.email}
            required
            placeholder="8"
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            // onChange={handlChange}
          />
          <label htmlFor="time" className="font-bold mt-4">
            Temps de préparation
          </label>
          <input
            type="text"
            name="time"
            // value={dataForm.password}
            placeholder="2h"
            required
            className="border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            // onChange={handlChange}
          />
          <label htmlFor="ingredients" className="font-bold mt-4">
            Ingrédients
          </label>
          <textarea
            type="text"
            name="ingredients"
            // value={dataForm.password}
            placeholder="Indiquer les ingrédients nécessaires"
            required
            className="border border-solid border-dark-default h-fit resize-y mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
            // onChange={handlChange}
          >
            farine, sel, beurre, citrons, jus de citron, oeufs
          </textarea>
          <label htmlFor="description" className="font-bold mt-4">
            Instructions
          </label>
          <textarea
            name="description"
            // value={dataForm.password} //onInput
            placeholder="Détailler les inscriptions"
            required
            className="border border-solid border-dark-default mt-1 py-2 px-5 rounded-lg placeholder:text-dark-default min-h-96 resize-y overflow-auto"
            // onChange={handlChange}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </textarea>
          {/* <p className="text-dark-default text-xs italic">
          Please choose a password.
        </p> */}
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
