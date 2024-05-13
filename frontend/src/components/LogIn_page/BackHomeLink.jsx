import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function BackHomeLink() {
  return (
    <Link to="/">
      <FaCircleArrowLeft className="text-3xl mt-5 text-blue-default hover:text-green-default active:text-green-lighter" />
    </Link>
  );
}
