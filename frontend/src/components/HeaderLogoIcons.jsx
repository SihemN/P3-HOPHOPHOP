import React from "react";
import LogoBackground from "../assets/icons-functionnalities/landing-pc.svg";
import LogoBackgroundMobile from "../assets/icons-functionnalities/landing-mobile.svg";

function Header() {
  return (
    <header className=" bg-blue-default md:p-5">
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
    </header>
  );
}

export default Header;
