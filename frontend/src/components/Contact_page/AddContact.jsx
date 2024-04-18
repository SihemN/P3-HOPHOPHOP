/* eslint-disable react/prop-types */

import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AddContact() {
  return (
    <footer className="fixed z-10 flex justify-end w-full lg:mx-0 lg:w-[50%] lg:max-w-[800px]  bottom-0 shadow-top bg-cream text-blue-medium pr-5 py-3">
      <Link to="/add-contact" className="lg:hidden">
        <FaCirclePlus className="text-4xl text-blue-medium" />
      </Link>
    </footer>
  );
}
