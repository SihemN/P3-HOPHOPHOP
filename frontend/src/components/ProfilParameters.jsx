/* eslint-disable react/prop-types */
import { PiUserFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function ProfilParameters() {
  return (
    <Link to="/profile">
      <PiUserFill
        size={20}
        className="text-blue-default bg-cream rounded-full w-10 h-10  flex justify-center items-center p-1 mr-4 my-5"
      />
    </Link>
  );
}
