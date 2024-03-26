/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Link } from "react-router-dom";

const ButtonLanding = ({ text, color, to }) => {
  return (
    <Link to={to}>
      <button
        className={`mx-auto w-3/4 h-8 border-2 border-dark-default rounded-xl ${color} text-cream font-bold text-lg flex items-center justify-center font-Neue-Kabel shadow-lg md:max-w-80`}
      >
        {text}
      </button>
    </Link>
  );
};

export default ButtonLanding;
