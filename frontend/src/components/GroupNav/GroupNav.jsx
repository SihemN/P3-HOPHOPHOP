/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { GoTriangleDown } from "react-icons/go";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

import ParametersButton from "./ParametersButton";
import GroupList from "./GroupList";

export default function GroupNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const groupes = [
    { id: 1, name: "groupe 1" },
    { id: 2, name: "group 2" },
  ];

  function toggleMenu() {
    if (!playAnimation) {
      setPlayAnimation(true);
    }
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (playAnimation) {
      const timer = setTimeout(() => {
        setPlayAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, playAnimation]);

  let animationClass = "";
  if (playAnimation) {
    animationClass = isOpen
      ? "animate-menu-slide-down"
      : "animate-menu-slide-up";
  }

  return (
    <div className="relative bg-blue-default h-20 flex items-center justify-center ">
      <div className="text-cream">
        <button
          type="button"
          aria-label="Cliquez pour changer de groupe"
          onClick={toggleMenu}
          className="pr-2 flex items-center font-Puffin-Display-Soft"
        >
          HOP HOP HOP
          <GoTriangleDown size={25} />
        </button>
      </div>
      <div
        className={`absolute top-20 left-0 w-full bg-cream overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-500" : "max-h-0"
        } ${animationClass} rounded-xl shadow-lg`}
      >
        <ParametersButton />
        <div className="flex flex-col items-center py-5 font-Neue-Kabel">
          <GroupList />
          <ul className="pb-3">
            {groupes.map(({ name, id }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
          <div className="flex justify-center items-center bg-blue-default text-cream w-8 h-8 rounded-full">
            <Link to="/create-group">
              <FaPlus />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
