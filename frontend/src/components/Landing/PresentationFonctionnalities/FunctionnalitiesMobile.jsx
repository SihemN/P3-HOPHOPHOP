/* eslint-disable react/prop-types */
import { useState } from "react";

export default function FunctionnalitiesMobile({
  title,
  description,
  color,
  colorFont = "cream",
}) {
  // EventListener sur le clic de la div
  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div className="font-Neue-Kabel my-2 bg-transparent rounded-xl w-80 ">
      <button
        type="button"
        className={`h-8 rounded-xl bg-${color} text-${colorFont}
         font-bold text-lg flex items-center justify-center font-Neue-Kabel w-full`}
        onClick={handleClick}
      >
        {title}
      </button>
      <div
        className={
          toggle
            ? "hidden"
            : "rounded-xl p-5 font-medium bg-cream shadow-lg shadow-dark"
        }
      >
        <p>{description}</p>
      </div>
    </div>
  );
}

// BOX 1 : titre + icon toggle
// BOX 2 : OnClick : Description fonctionnalité
//
