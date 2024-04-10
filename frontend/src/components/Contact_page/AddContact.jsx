/* eslint-disable react/prop-types */
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function AddContact() {
  return (
    <div className="fixed bottom-5 right-8 bg-blue-medium rounded-full w-8 h-8 flex justify-center items-center text-cream ">
      <Link to="/add-contact">
        <TiPlus size={30} />
      </Link>
    </div>
  );
}
