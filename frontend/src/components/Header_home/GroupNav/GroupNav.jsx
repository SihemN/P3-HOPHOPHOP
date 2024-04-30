/* eslint-disable camelcase */
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
  const [groups, setGroups] = useState([]);
  // console.info("groups dans GroupNav >>", groups);
  const [currentGroup, setCurrentGroup] = useState();
  // console.info("currentGroup - GroupNav >>>", currentGroup);

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
    <div className="fixed inset-x-0 top-6 z-50">
      <div className="text-cream flex justify-center">
        <button
          type="button"
          aria-label="Cliquez pour changer de groupe"
          onClick={toggleMenu}
          // key={currentGroup.ug_group_id}
          className="pr-2 flex items-center font-Puffin-Display-Soft font-bold text-lg"
        >
          {/* On va utiliser le storage pour afficher le groupe */}
          {currentGroup && <h1>{currentGroup.g_name}</h1>}
          <GoTriangleDown size={25} />
        </button>
      </div>
      <div
        className={`absolute top-20 w-full bg-cream overflow-hidden transition-all duration-500 ease-in-out, ${
          isOpen ? "max-h-500" : "max-h-0"
        } ${animationClass} rounded-xl shadow-lg`}
        style={{ top: "200%" }}
      >
        <ParametersButton />
        <div className="flex flex-col items-center py-5 font-Neue-Kabel">
          <GroupList
            groups={groups}
            setGroups={setGroups}
            currentGroup={currentGroup}
            setCurrentGroup={setCurrentGroup}
          />
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
