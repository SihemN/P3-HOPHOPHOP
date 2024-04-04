import React from "react";
import { GrDown } from "react-icons/gr";
import LogoBackground from "../assets/icons-functionnalities/landing-pc.svg";
import LogoBackgroundMobile from "../assets/icons-functionnalities/landing-mobile.svg";
import MenuBurgerAnchor from "./MenuBurgerAnchor";

import ButtonLanding from "./ButtonLanding";

function Header() {
  return (
    <header className=" bg-blue-default md:p-5 font-Neue-Kabel">
      <MenuBurgerAnchor />
      <img
        src={LogoBackground}
        alt="Logo fantôme"
        className="hidden md:block"
      />
      <img
        src={LogoBackgroundMobile}
        alt="Logo fantôme"
        className="md:hidden"
      />
      <h2 className="text-cream font-bold text-2xl md:text-5xl py-5 mb-5 flex justify-center">
        Le site qui vous facilite la vie !
      </h2>
      <ButtonLanding text="Se connecter" color="bg-green-default" to="/login" />
      <ButtonLanding text="S'inscrire" color="bg-orange-default" to="/signup" />
      <div className="flex flex-col items-center text-cream py-5">
        <p>en savoir +</p>
        <GrDown />
      </div>
    </header>
  );
}

export default Header;
