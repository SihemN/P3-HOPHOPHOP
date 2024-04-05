import React from "react";

// eslint-disable-next-line react/prop-types
function HomeNavigComp({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={icon}
        alt={title}
        className="w-28 lg:w-36 md:w-40 h-28 lg:h-36 md:h-40"
      />
      <span>{title}</span>
    </div>
  );
}

export default HomeNavigComp;
