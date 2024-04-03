import { PiUserFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function ParametersButton() {
  return (
    <div className="bg-blue-default h-20 pr-4 py-4 flex justify-end">
      <div className="bg-cream rounded-full w-9 h-9  flex justify-center items-center">
        <Link to="/profile">
          <PiUserFill size={23} className="text-blue-default" />
        </Link>
      </div>
    </div>
  );
}
