import React from "react";
import { GrDown } from "react-icons/gr";
import LogoBackground from "../assets/icons-functionnalities/landing-pc.svg";
import LogoBackgroundMobile from "../assets/icons-functionnalities/landing-mobile.svg";
import MenuBurgerAnchor from "./MenuBurgerAnchor";

import ButtonLanding from "./ButtonLanding";

function Header() {
  return (
    <header className="lg:relative font-Neue-Kabel bg-blue-default lg:p-5 h-screen md:h-auto">
      <MenuBurgerAnchor />
      <div className="flex justify-center items-center w-full">
        <img
          src={LogoBackground}
          alt="Logo fantôme"
          className="hidden md:block lg:mx-10"
        />
      </div>
      <div>
        <img
          src={LogoBackgroundMobile}
          alt="Logo fantôme"
          className="md:hidden"
        />
      </div>
      <div className="lg:relative lg:bottom-36 text-center">
        <h2 className="text-cream font-bold text-2xl md:text-3xl py-8 lg:py-2 mb-5 flex justify-center">
          Le site qui vous facilite la vie !
        </h2>
        <ButtonLanding
          text="Se connecter"
          color="bg-green-default"
          to="/login"
        />
        <ButtonLanding
          text="S'inscrire"
          color="bg-orange-default"
          to="/signup"
        />
        <div className="flex flex-col items-center text-cream py-5">
          <p>en savoir +</p>
          <GrDown />
        </div>
      </div>
    </header>
  );
}

export default Header;
