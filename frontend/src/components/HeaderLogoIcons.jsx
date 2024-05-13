import React from "react";

import MenuBurgerAnchor from "./MenuBurgerAnchor";
import HeaderPc from "./Landing/HeaderPc";
import HeaderMobile from "./Landing/HeaderMobile";

function Header() {
  return (
    <header className="font-Neue-Kabel bg-blue-default lg:p-5 tall:pt-2 h-screen tall:flex tall:flex-col tall:max-h-screen overflow-hidden">
      <MenuBurgerAnchor />
      <HeaderPc />
      <HeaderMobile />
    </header>
  );
}

export default Header;
