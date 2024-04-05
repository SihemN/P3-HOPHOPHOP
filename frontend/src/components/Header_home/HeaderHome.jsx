import React from "react";
import GroupNav from "./GroupNav/GroupNav";
import logo from "../../assets/logo/ghost-orange.svg";
import ProfilParameters from "../ProfilParameters";

export default function HeaderHome() {
  return (
    <div className="bg-blue-default flex items-center justify-between h-20">
      <div className="pl-4">
        <img src={logo} alt="Logo de Hoppy" className="w-12 h-12" />
      </div>
      <GroupNav />
      <div>
        <ProfilParameters />
      </div>
    </div>
  );
}
