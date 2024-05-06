/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function LinkToLoginOrSignup({ to, text }) {
  return (
    <Link to={to}>
      <p className="text-center text-blue-default text-lg underline py-2 hover:text-green-default mb-2">
        {text}
      </p>
    </Link>
  );
}
