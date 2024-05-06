/* eslint-disable react/prop-types */

import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AddContact({ handleAddContactClick }) {
  return (
    <div className="fixed z-3000 flex justify-end w-full lg:mx-0 lg:max-w-[50%] bottom-0 shadow-top bg-cream text-blue-medium pr-5 py-3 rounded-t-xl">
      <Link to="/add-contact" className="md:hidden">
        <FaCirclePlus className="text-4xl text-red-medium" />
      </Link>
      <button
        type="button"
        className="hidden md:block"
        aria-label="bouton pour créer une contact"
        onClick={handleAddContactClick}
      >
        <FaCirclePlus className="text-4xl text-medium-default" />
      </button>
    </div>
  );
}
