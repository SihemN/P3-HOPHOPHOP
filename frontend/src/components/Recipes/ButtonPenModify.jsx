/* eslint-disable react/prop-types */
import { FaPen } from "react-icons/fa6";

export default function ButtonPenModify({
  label,
  colorBg,
  onClick,
  className = "text-xl absolute top-0 right-0 lg:mr-10 mt-5 mr-5  p-2",
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${colorBg} rounded-full ${className}`}
      onClick={onClick}
    >
      <FaPen className="text-cream" />
    </button>
  );
}
