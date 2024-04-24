import React from "react";

// eslint-disable-next-line react/prop-types
function HomeNavigComp({ title, icon }) {
  return (
    <div className="font-Neue-Kabel flex flex-col items-center justify-center transition-transform transform-gpu hover:scale-110">
      <img
        src={icon}
        alt={title}
        className="w-28 h-28 md:w-36 md:h-36 lg:w-36 lg:h-36  "
      />
      <span className="text-lg mt-1">{title}</span>
    </div>
  );
}

export default HomeNavigComp;
