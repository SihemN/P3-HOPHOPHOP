/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function MenuKebabContact({
  contact,
  setCategoryUpdated,
  handleUpdateContactClick,
}) {
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
      <div className="absolute right-7 -bottom-16 rounded-md z-10 border  border-dark-default font-light">
        <div className="bg-blue-lighter rounded shadow-lg">
          <Link to={`/update-contact/${contact.c_id}`}>
            <button
              type="button"
              aria-label="Modifier un contact"
              className=" hover:bg-green-lighter px-6 py-1 w-full lg:hidden"
            >
              Modifier
            </button>
          </Link>
          <button
            type="button"
            onClick={() => handleUpdateContactClick(contact.c_id)}
            aria-label="Modifier un contact"
            className="hidden lg:block hover:bg-green-lighter px-6 py-1 w-full"
          >
            Modifier
          </button>
          <button
            type="button"
            aria-label="Supprimer un contact"
            className="hover:bg-red-default px-4 py-1  w-full border-t-2"
            onClick={() => deleteContact(contact.c_id)}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
