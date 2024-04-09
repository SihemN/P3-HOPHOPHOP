import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { VscKebabVertical } from "react-icons/vsc";
import UpdateCategory from "./UpdateCategory";

export default function SelectCategory() {
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

  const contacts = [
    {
      id: 1,
      name: "Anaïs",
      email: "anais@gmail.com",
      phone: "0625459875",
      adress: "1 rue du frontend 69000 hophophop city",
      category: "Ecole",
    },
    {
      id: 2,
      name: "Sihem",
      email: "sihem@gmail.com",
      phone: "0652455622",
      adress: "2 rue du frontend 69000 hophophop city",
      category: "Medecin",
    },
    {
      id: 3,
      name: "Arthur",
      email: "arthur@gmail.com",
      phone: "0652366951",
      adress: "3 rue du frontend 69000 hophophop city",
      category: "Les fantômes",
    },
    {
      id: 4,
      name: "Soumia",
      email: "soumia@gmail.com",
      phone: "0656221445",
      adress: "4 rue du frontend 69000 hophophop city",
      category: "Travail",
    },
  ];
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
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between hover:bg-blue-lighter rounded-lg pt-2 px-1"
            >
              {contact.category}
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
      {showPopup && <UpdateCategory contacts={contacts} />}
    </div>
  );
}
