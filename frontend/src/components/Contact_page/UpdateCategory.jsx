/* eslint-disable react/prop-types */

import { useState } from "react";

export default function UpdateCategory({
  category,
  onClose,
  onDelete,
  onUpdate,
}) {
  const [categoryName, setCategoryName] = useState(category.cc_name || "");

  // mise à jour du nom de la catégorie avec le formulaire et le ferme
  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(category.cc_id, categoryName);
    onClose();
  };
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(category.cc_id);
    onClose();
  };

  return (
    <div className="border border-blue-lighter mt-2 rounded-lg py-4">
      <h1 className="text-center font-semibold pb-4">Modifier la catégorie</h1>
      <form className="flex flex-col gap-2 px-4" onSubmit={handleUpdate}>
        <label htmlFor="category">Nom de la catégorie</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray pl-2 rounded-lg"
          required
        />
        <div className="flex justify-center flex-col font-semibold">
          <button
            type="submit"
            className="bg-blue-lighter py-1 rounded-lg text-dark-default shadow-lg mt-4 hover:bg-green-lighter"
          >
            Enregistrer
          </button>
          <button
            type="button"
            className="bg-orange-lighter py-1 rounded-lg text-dark-default shadow-lg mt-4 hover:bg-red-default"
            onClick={handleDelete}
          >
            Supprimer la catégorie
          </button>
          <button
            type="button"
            className="bg-blue-lighter py-1 rounded-lg text-dark-default shadow-lg mt-4 hover:bg-green-lighter"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </form>
    </div>
  );
}
