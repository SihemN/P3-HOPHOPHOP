/* eslint-disable react/prop-types */
import { FaPen } from "react-icons/fa6";

export default function ButtonPenModify({ label, colorBg, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`${colorBg} rounded-full absolute top-0 right-0 mt-5 mr-5 lg:mr-10 p-2`}
      onClick={onClick}
    >
      <FaPen className="text-cream text-xl" />
    </button>
  );
}
