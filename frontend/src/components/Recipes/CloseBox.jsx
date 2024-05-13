/* eslint-disable react/prop-types */
import { IoCloseOutline } from "react-icons/io5";

export default function CloseBox({
  onClick,
  bgColor,
  hoverColor,
  activeColor,
}) {
  const bgColour = `bg-${bgColor}`;
  const hoverColour = `hover:bg-${hoverColor}`;
  const activeColour = `active:bg-${activeColor}`;
  return (
    <IoCloseOutline
      className={`${bgColour} ${hoverColour} ${activeColour} text-cream text-2xl h-7 w-7 text-center rounded-full transition-transform transform-gpu hover:scale-110`}
      onClick={onClick}
    />
  );
}
