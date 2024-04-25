/* eslint-disable react/prop-types */
import React from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

export default function FormRecipe({
  handleSubmit,
  dataRecipe,
  errors,
  handlChange,
  handleClickCat,
  categorySelected,
  isOpen,
  filteredCategories,
  handleClicNewCat,
}) {
  return (
    <form
      className="flex flex-col text-dark-default text-xl m-5"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="font-bold">
        Nom de la recette <RedStarForRequiredInput />
      </label>

      <input
        type="text"
        name="name"
        value={dataRecipe.name}
        placeholder={dataRecipe.name !== "" ? dataRecipe.name : "Ma recette..."}
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
        <p className="font-bold mt-4">
          Catégorie <RedStarForRequiredInput />
        </p>
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
        Nombre de personnes <RedStarForRequiredInput />
      </label>
      <input
        type="text"
        name="nb_persons"
        value={dataRecipe.nb_persons}
        placeholder={
          dataRecipe.nb_persons !== "" ? dataRecipe.nb_persons : "Exemple : 3"
        }
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
        Temps de préparation <RedStarForRequiredInput />
      </label>
      <input
        type="text"
        name="time_preparation"
        value={dataRecipe.time_preparation}
        placeholder={
          dataRecipe.time_preparation !== ""
            ? dataRecipe.time_preparation
            : "Exemple : 3h"
        }
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
        Ingrédients <RedStarForRequiredInput />
      </label>
      <textarea
        type="text"
        name="list_ingredients"
        value={dataRecipe.list_ingredients}
        placeholder={
          dataRecipe.list_ingredients !== ""
            ? dataRecipe.list_ingredients
            : "Exemple : farine, oeufs, etc."
        }
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
        Instructions <RedStarForRequiredInput />
      </label>
      <textarea
        name="description"
        value={dataRecipe.description}
        placeholder={
          dataRecipe.description !== ""
            ? dataRecipe.description
            : "Mélanger les oeufs et le sucre, ajouter la levure..."
        }
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
