/* eslint-disable react/prop-types */
export default function ShowRecipeDivInfo({ title, text }) {
  return (
    <>
      <div className="bg-red-default text-cream text-center text-xl rounded-[12px] h-fit px-4 my-5 w-full">
        {title}
      </div>
      <p>{text}</p>
    </>
  );
}
