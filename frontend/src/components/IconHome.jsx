import React from "react";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function IconHome({ color }) {
  return (
    <Link to="/home">
      <div className="bg-cream rounded-full w-8 h-8 flex justify-center items-center transition-transform transform-gpu hover:scale-110">
        <GoHomeFill className={`${color} w-5 h-5`} />
      </div>
    </Link>
  );
}
