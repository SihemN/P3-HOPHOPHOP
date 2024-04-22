import React, { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

const options = ["Renommer", "Supprimer"];

export default function HiDotsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex justify-center">
      {" "}
      <button
        type="button"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="text-orange-default text-lg"
      >
        <HiDotsVertical />
      </button>
      {open && (
        <div
          id="long-menu"
          className="absolute z-10 mt-2 bg-cream rounded-xl shadow-lg text-left max-h-48"
          role="menu"
          aria-labelledby="long-button"
        >
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={handleClose}
              className="block px-4 p-2 text-sm text-dark-default w-full"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
