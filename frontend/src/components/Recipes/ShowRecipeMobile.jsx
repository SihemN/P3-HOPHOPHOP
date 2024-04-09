import { Link, useLocation } from "react-router-dom";
import { GoPeople } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";

export default function ShowRecipeMobile() {
  const location = useLocation();
  const { recipe } = location.state;
  const { name, description, time, persons, ingredients, category } = recipe;
  return (
    <div className="font-Neue-Kabel bg-red-default">
      <header>
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </header>
      <main className="relative rounded-t-3xl lg:rounded-t-[4rem] bg-cream shadow-top flex flex-col items-center">
        {recipe && (
          <>
            <div className="bg-red-default text-cream text-xl rounded-[12px] h-fit px-4 my-5">
              {category}
            </div>
            <button
              type="button"
              aria-label="bouton modifier la recette"
              className="bg-red-default p-2 rounded-full absolute top-0 right-0 mt-5 mr-5 "
            >
              <FaPen className="text-cream text-xl " />
            </button>
            <h1 className="text-2xl font-bold text-center">{name}</h1>

            {/* section sur le nombre de persons et le temps requis */}
            <section className="bg-red-clear w-full flex justify-center my-4 py-4 gap-10">
              <div className="flex flex-col items-center justify-center">
                <GoPeople className="text-red-default text-3xl" />
                {`${persons} pers`}
              </div>
              <div className="flex flex-col items-center justify-center">
                {" "}
                <IoTimeOutline className="text-red-default text-3xl" />
                {time}
              </div>
            </section>
            {/* section sur les ingrédients et instructions */}
            <section className="px-10 w-full text-lg">
              <div className="bg-red-default text-cream text-center text-xl rounded-[12px] h-fit px-4 my-5 w-full">
                Ingrédients
              </div>
              <p>{ingredients}</p>
              <div className="bg-red-default text-cream text-center text-xl rounded-[12px] h-fit px-4 my-5 w-full">
                Instructions
              </div>
              <p>{description}</p>
              <p>{description}</p>
              <p>{description}</p>
            </section>
          </>
        )}
      </main>
      <footer className="fixed w-full bottom-0 shadow-top bg-cream text-red-default pl-5 py-3">
        {" "}
        <Link to="/recipes" className="flex items-center gap-3 ">
          <FaCircleArrowLeft className=" text-3xl" />
          <p>Retourner aux recettes</p>
        </Link>
      </footer>
    </div>
  );
}
