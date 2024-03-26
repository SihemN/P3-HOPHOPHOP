import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

function MenuBurgerAnchor() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-end p-4 font-Neue-Kabel">
      {!isOpen && (
        <button type="button" label="cliquer" onClick={toggleMenu}>
          <TiThMenu size={40} className="text-dark-default" />
        </button>
      )}
      {isOpen && (
        <div className="border rounded-xl animate-burgerDown">
          <div className="flex justify-end bg-red-default h-10 rounded-t-xl">
            <button type="button" label="cliquer" onClick={closeMenu}>
              <IoCloseSharp size={30} className="text-cream w-10" />
            </button>
          </div>
          <div className="rounded-b-xl p-5 flex flex-col bg-cream text-xl">
            <a href="#about" className="hover:text-green-default">
              A propos
            </a>
            <a className="hover:text-green-default" href="#functionality">
              Les fonctionnalités
            </a>
            <a className="hover:text-green-default" href="#team">
              La team
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBurgerAnchor;
