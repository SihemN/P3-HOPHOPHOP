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
      className={`${bgColour} ${hoverColour} ${activeColour} text-cream text-2xl mt-2 text-center rounded-full`}
      onClick={onClick}
    />
  );
}
