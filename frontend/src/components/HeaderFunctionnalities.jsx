import React from "react";
import IconHome from "./IconHome";

// eslint-disable-next-line react/prop-types
export default function HeaderFunctionnalities({ color, title, icon }) {
  return (
    <div className="flex justify-between items-center p-4  ">
      <IconHome color={color} />
      <h1 className="text-cream font-Neue-Kabel font-bold text-2xl">{title}</h1>
      <img src={icon} alt="" className="w-10 h-10" />
    </div>
  );
}
