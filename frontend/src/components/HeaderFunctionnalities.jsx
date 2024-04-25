/* eslint-disable react/prop-types */
import React from "react";
import IconHome from "./IconHome";

// eslint-disable-next-line react/prop-types
export default function HeaderFunctionnalities({
  color,
  title,
  icon,
  colorTitle = "text-cream",
}) {
  return (
    <div>
      {icon && (
        <div className="flex justify-between items-center p-4  ">
          <IconHome color={color} />

          <h1 className={`${colorTitle} font-Neue-Kabel font-bold text-2xl`}>
            {title}
          </h1>
          <img src={icon} alt="" className="w-10 h-10" />
        </div>
      )}
      {!icon && (
        <div className="flex items-center p-4">
          <div className="flex justify-start flex-grow-0">
            <IconHome color={color} />
          </div>
          <h1 className="text-cream font-Neue-Kabel font-bold text-2xl flex-grow text-center">
            {title}
          </h1>
          <div className="flex-grow-0" />
        </div>
      )}
    </div>
  );
}
