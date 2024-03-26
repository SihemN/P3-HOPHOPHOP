import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ButtonLanding({ text, color, to }) {
  return (
    <Link to={to}>
      <button
        type="button"
        className={`mx-auto w-3/4 h-8 border-[1px] border-dark-default rounded-xl ${color} text-cream font-bold text-lg flex items-center justify-center font-Neue-Kabel shadow-lg md:max-w-80 my-3`}

      >
        {text}
      </button>
    </Link>
  );

}


export default ButtonLanding;
