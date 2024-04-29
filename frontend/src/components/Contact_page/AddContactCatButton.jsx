/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

export default function AddContactCatButton({ onAddCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCreate = async (e) => {
    try {
      e.preventDefault();
      const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
      const categoryName = e.target.elements[0].value;
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        throw new Error("Token manquant");
      }
      const response = await fetch(
        `http://localhost:3310/api/contacts-categories/groups/${ug_group_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );
      // console.log("response", response);
      if (!response.ok) {
        console.error("Erreur lors de la création de la catégorie");
        return;
      }
      // console.log("response", response);
      const newCategory = await response.json();
      onAddCategory(newCategory);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-2 pr-3 py-3 font-semibold">
        <h1>Créer une catégorie</h1>
        <button
          type="button"
          onClick={handleClick}
          aria-label="Créer une nouvelle catégorie de contact"
        >
          <FaCirclePlus size={25} className="text-blue-medium" />
        </button>
      </div>
      {isOpen && (
        <form onSubmit={handleCreate} className="w-60 flex">
          <div className="flex items-end gap-2 ml-2 mb-2">
            <label
              htmlFor="nom de la catégorie"
              className="flex flex-col gap-1 font-semibold"
            >
              Nom de la catégorie :
              <input
                type="text"
                name="categoryName"
                className="border w-52 rounded-lg"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-lighter px-5 h-7 rounded-lg shadow-lg"
            >
              Créer
            </button>
          </div>
        </form>
      )}
    </>
  );
}
