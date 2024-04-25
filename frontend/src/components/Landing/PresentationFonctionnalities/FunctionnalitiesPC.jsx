/* eslint-disable react/prop-types */
export default function Functionnalities({
  title,
  description,
  icon,
  iconDescription,
}) {
  return (
    <>
      {/* container box */}
      <div className="font-Neue-Kabel text-dark-default m-10 relative flex flex-col w-48 min-w-48 transition-transform transform-gpu hover:scale-110">
        {/* bandeau rouge avec le titre de la fonctionnalité */}
        <div className="z-10 flex justify-center items-center bg-red-default w-full h-9 rounded-t-2xl border-solid border border-dark">
          {/* titre de la fonctionnalité */}
          <h2 className="text-cream font-bold pl-8">{title}</h2>
        </div>
        {/* zone avec description de la fonctionnalité */}
        <div className="z-10 h-52 bg-white border-solid border border-t-0 border-dark rounded-b-2xl">
          <p className="p-5 font-medium leading-5 w-100%">{description}</p>
        </div>
        <div className="absolute top-2 left-1 bg-green-lighter w-48 h-60 rounded-2xl border-solid border border-dark">
          {" "}
        </div>
        {/* Icon fonctionnalité (en à gauche du visuel) */}
        <img
          src={icon}
          alt={iconDescription}
          className="absolute z-10 -top-7 -left-7 w-20 h-20 -rotate-12"
        />
      </div>
    </>
  );
}

// Logo
// Div
// **** div
// ******** titre
// **** paragraphe
