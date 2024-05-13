/* eslint-disable react/prop-types */
import { FaPen } from "react-icons/fa6";

export default function ButtonPenModify({
  label,
  colorBg,
  onClick,
  className = "rounded-full absolute top-0 right-0 lg:mr-10 mt-5 mr-5  p-2 ",
  iconSize = "text-xl",
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${colorBg} ${className} transition-transform transform-gpu hover:scale-110`}
      onClick={onClick}
    >
      <FaPen className={`text-cream ${iconSize}`} />
    </button>
  );
}
