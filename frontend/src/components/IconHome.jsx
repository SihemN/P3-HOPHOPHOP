import React from "react";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function IconHome({ color }) {
  return (
    <div className="bg-cream rounded-full w-8 h-8 flex justify-center items-center">
      <Link to="/home">
        <GoHomeFill className={`${color} w-5 h-5`} />
      </Link>
    </div>
  );
}
