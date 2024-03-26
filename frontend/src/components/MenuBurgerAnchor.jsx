import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { IoCloseSharp } from "react-icons/io5";


const MenuBurgerAnchor = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    return (
        <div className='flex justify-end p-4 font-Neue-Kabel'>
            {!isOpen && (
                <button onClick={toggleMenu}>
                    <TiThMenu size={40} className="text-dark-default" />
                </button>
            )}
            {isOpen && (
                <div className="border rounded-xl animate-burgerDown">
                    <div className="flex justify-end bg-red-default h-10 rounded-t-xl">
                        <button onClick={closeMenu}>
                            <IoCloseSharp size={30} className='text-cream w-10' />
                        </button>
                    </div>
                    <div className="rounded-b-xl p-5 flex flex-col bg-cream text-xl ">
                        <a className="hover:text-green-default" href="#about">A propos</a>
                        <a className="hover:text-green-default" href="#functionality">Les fonctionnalités</a>
                        <a className="hover:text-green-default" href="#team">La team</a>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MenuBurgerAnchor;