/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MenuKebabContact({ contact, setCategoryUpdated }) {
  const deleteContact = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token manquant");
      }
      const response = await fetch(`http://localhost:3310/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du contact");
      }
      setCategoryUpdated((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <div className="absolute right-4 -bottom-5 rounded-md z-10 border  border-dark-default font-light">
        <div className="bg-blue-lighter rounded shadow-lg">
          <Link to={`/update-contact/${contact.id}`}>
            <button
              type="button"
              className=" hover:bg-green-lighter px-6 py-1 w-full"
            >
              Modifier
            </button>
          </Link>

          <button
            type="button"
            className="  hover:bg-red-default px-4 py-1  w-full border-t-2"
            onClick={() => deleteContact(contact.id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
