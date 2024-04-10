/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function FooterContact({ to, color }) {
  return (
    <footer className="fixed w-full bottom-0 shadow-top bg-cream  pl-5 py-3">
      <div className="flex justify-between">
        <Link to={to} className="flex items-center gap-3 ">
          <FaCircleArrowLeft className={`${color} text-3xl`} />
          <p>Retourner aux contacts</p>
        </Link>
      </div>
    </footer>
  );
}
