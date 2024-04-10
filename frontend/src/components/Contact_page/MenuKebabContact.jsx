/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MenuKebabContact({ contact }) {
  return (
    <div className="relative">
      <div className="absolute right-4 -bottom-5 rounded-md z-10 border  border-dark-default font-light">
        <div className="bg-blue-lighter rounded shadow-lg">
          <Link to={`/update-contact/${contact.id}`}>
            <button
              type="button"
              className=" hover:bg-green-lighter px-6 w-full"
            >
              Modifier
            </button>
          </Link>

          <button
            type="button"
            className="  hover:bg-red-default px-4  w-full border-t-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
