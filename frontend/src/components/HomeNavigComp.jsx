import React from "react";

// eslint-disable-next-line react/prop-types
function HomeNavigComp({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center bg-cream">
      <img src={icon} alt={title} className="w-28 h-28" />
      <span>{title}</span>
    </div>
  );
}

export default HomeNavigComp;
