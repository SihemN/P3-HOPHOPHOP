/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { VscKebabVertical } from "react-icons/vsc";
import UpdateCategory from "./UpdateCategory";

export default function SelectCategory({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowPopup(false);
    }
  };

  const handleKebabClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="pt-4 px-6">
      <button
        type="button"
        className="flex items-center gap-2 font-semibold text-lg"
        onClick={handleClick}
      >
        Afficher par catégories
        <IoChevronDownSharp className="mt-1" />
      </button>
      <div className="border border-blue-lighter rounded-lg">
        {isOpen &&
          categories.map(({ cc_id, cc_name }) => (
            <div
              key={cc_id}
              className="flex items-center justify-between hover:bg-blue-lighter rounded-lg pt-2 px-1"
            >
              {cc_name}
              <button
                type="button"
                aria-label="Modifier ou supprimer la catégorie"
                onClick={handleKebabClick}
              >
                <VscKebabVertical className="text-blue-medium" />
              </button>
            </div>
          ))}
      </div>
      {showPopup && <UpdateCategory categories={categories} />}
    </div>
  );
}
