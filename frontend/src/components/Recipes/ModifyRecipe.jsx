/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FooterBack from "./FooterBack";
import FormUpdateRecipe from "./FormRecipe";
import ButtonAccessRefused from "../Not-Connected/ButtonAccessRefused";

export default function ModifyRecipe() {
  const recipe = JSON.parse(localStorage.getItem("recipeSelected"));

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
        {recipe && <FormUpdateRecipe />}
        {!recipe && (
          <div className="flex flex-col justify-center items-center my-20">
            <p>Vous n'avez pas sélectionné de recette</p>
            <ButtonAccessRefused
              to="/recipes"
              text="Retourner aux recettes"
              colorBg="bg-red-default"
            />
          </div>
        )}
      </main>
      <FooterBack text="Retour" to="/recipes/detail" />
    </div>
  );
}
