/* eslint-disable react/prop-types */
export default function AddEventFormButton({
  onClick,
  type = "button",
  label,
  bgColor,
  borderColor,
  textColor,
  hoverBgColor,
  hoverBorderColor,
  hoverTextColor,
  activeBgColor,
}) {
  const bgColour = `bg-${bgColor}`;
  const borderColour = `border-${borderColor}`;
  const textColour = `text-${textColor}`;
  const hoverColour = `hover:bg-${hoverBgColor}`;
  const hoverBorderColour = `hover:border-${hoverBorderColor}`;
  const hoverTextColour = `hover:text-${hoverTextColor}`;
  const activeBgColour = `active:bg-${activeBgColor}`;

  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`flex  w-[50%] justify-around rounded-md ${bgColour} ${textColour} border-[1px] ${borderColour} px-10 py-2  ${hoverColour} ${hoverBorderColour} ${hoverTextColour} ${activeBgColour} `}
    >
      {label}
    </button>
  );
}
