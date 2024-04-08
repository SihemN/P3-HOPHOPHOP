import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";

function MenuBurgerAnchor() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="absolute top-0 right-0 p-4 font-Neue-Kabel">
      <button type="button" onClick={toggleMenu} aria-label="Toggle menu">
        <TiThMenu size={40} className="text-cream" />
      </button>
      {isOpen && (
        <div className="absolute right-0 -top-8 mt-12 mr-4 border rounded-xl animate-burgerDown z-10">
          <div className="flex justify-end bg-red-default h-10 rounded-t-xl w-52">
            <button type="button" onClick={toggleMenu} aria-label="Close menu">
              <IoCloseSharp size={30} className="text-cream w-10" />
            </button>
          </div>
          <div className="rounded-b-xl p-5 flex flex-col bg-cream text-xl">
            <a href="#about" className="hover:text-green-default">
              A propos
            </a>
            <a href="#functionality" className="hover:text-green-default">
              Les fonctionnalités
            </a>
            <a href="#team" className="hover:text-green-default">
              La team
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBurgerAnchor;
