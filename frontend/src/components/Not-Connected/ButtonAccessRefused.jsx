/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function ButtonAccessRefused({ to, text, colorBg }) {
  return (
    <Link to={to} className="w-full flex justify-center items-center">
      <button
        type="button"
        className={`${colorBg} hover:bg-orange-default active:bg-orange-lighter h-12 max-w-96 w-full my-2 py-2 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow`}
      >
        {text}
      </button>
    </Link>
  );
}
