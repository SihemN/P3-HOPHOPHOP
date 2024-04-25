/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import UpdateCategory from "./UpdateCategory";
import AddContactCatButton from "./AddContactCatButton";

export default function SelectCategory({
  categories,
  onCategoriesChange,
  setCategoryUpdated,
  setFilterSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // récupèrer la catégorie selectionnée pour la modifier
  const handleKebabClick = (category) => {
    setSelectedCategory(category);
  };
  // filtrer les contacts par leur catégorie + màj des contacts filtrés + refermer la fenêtre
  const handleCategoryClick = (categoryId) => {
    setFilterSelected(categoryId);
    setIsOpen(!isOpen);
  };

  const onAddCategory = (newCategory) => {
    onCategoriesChange(newCategory);
  };

  // màj des catégories de contact
  const handleUpdateCategory = async (categoryId, categoryName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token manquant");
      }
      const response = await fetch(
        `http://localhost:3310/api/contacts-categories/${categoryId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify({
            cc_name: categoryName,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la catégorie");
      }
      setCategoryUpdated((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  // supprimer une catégorie de contact
  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token manquant");
      }

      // eslint-disable-next-line no-alert
      const confirmation = window.confirm(
        "Tous les contacts liés à cette catégorie vont être supprimés. Êtes-vous sûr de vouloir continuer ?"
      );
      if (!confirmation) {
        return;
      }
      const response = await fetch(
        `http://localhost:3310/api/contacts-categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la catégorie");
      }

      setCategoryUpdated((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="pt-4 px-6">
      <button
        type="button"
        className="flex items-center gap-2 font-semibold text-xl pb-2"
        onClick={handleClick}
      >
        Afficher par catégories
        <IoChevronDownSharp className="mt-1" />
      </button>
      <div className="border border-blue-lighter rounded-lg">
        {isOpen && (
          <>
            <div className="flex items-center justify-between hover:bg-blue-lighter rounded-lg pt-2 px-1">
              <button type="button" onClick={() => handleCategoryClick(null)}>
                Toutes
              </button>
            </div>
            {categories.map((category) => (
              <div
                key={category.cc_id}
                className="flex items-center justify-between hover:bg-blue-lighter rounded-lg pt-2 px-1"
              >
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.cc_id)}
                >
                  {category.cc_name}
                </button>
                <button
                  type="button"
                  aria-label="Modifier ou supprimer la catégorie"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleKebabClick(category);
                  }}
                >
                  <HiOutlineDotsVertical
                    size={25}
                    className="text-blue-medium"
                  />
                </button>
              </div>
            ))}
            <div>
              <AddContactCatButton onAddCategory={onAddCategory} />
            </div>
          </>
        )}
      </div>
      {selectedCategory && (
        <UpdateCategory
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onDelete={() => handleDeleteCategory(selectedCategory.cc_id)}
          onUpdate={handleUpdateCategory}
          setCategoryUpdated={setCategoryUpdated}
        />
      )}
    </div>
  );
}
