/* eslint-disable react/prop-types */
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function FooterRecipe({ handleClicCreateRecipe }) {
  return (
    <footer className="fixed z-10 flex justify-end w-full lg:mx-0 lg:w-[50%] lg:max-w-[800px] bottom-0 shadow-top bg-cream text-red-default lg:pr-5 py-3">
      <Link to="/recipes/create" className="lg:hidden">
        <FaCirclePlus className="text-4xl text-red-default" />
      </Link>
      <button
        type="button"
        className="hidden lg:block"
        aria-label="bouton pour créer une recette"
        onClick={handleClicCreateRecipe}
      >
        <FaCirclePlus className="text-4xl text-red-default" />
      </button>
    </footer>
  );
}
