/* eslint-disable react/prop-types */
export default function AddEventFormButton({
  onClick,
  type = "button",
  label,
  bgColor,
  borderColor,
  textColor,
  hoverColor,
  activeBgColor,
}) {
  const stringBgColor = `bg-${bgColor}`;
  const stringBorderColor = `border-${borderColor}`;
  const stringTextColor = `text-${textColor}`;
  const stringHoverColor = `hover:bg-${hoverColor}`;
  const stringHoverBorderColor = `hover:border-${hoverColor}`;
  const stringActiveBgColor = `active:bg-${activeBgColor}`;

  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`flex w-[50%] justify-around rounded-md ${stringBgColor} ${stringTextColor} border-[1px] ${stringBorderColor} ${stringHoverBorderColor} 
    px-10 py-2 ${stringHoverColor}  hover:text-cream ${stringActiveBgColor}`}
    >
      {label}
    </button>
  );
}
