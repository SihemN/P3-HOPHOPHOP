import { AiFillTool } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ParametersButton() {
  return (
    <div className="flex justify-center pt-3">
      <Link to="/group">
        <button type="button">
          <div className="font-Neue-Kabel flex gap-1 pb-4">
            <p className="bg-blue-default rounded-xl px-3 text-cream">
              Paramètres
            </p>
            <div className="bg-blue-default rounded-full h-6 w-6 flex justify-center items-center">
              <AiFillTool className="text-cream" />
            </div>
          </div>
        </button>
        <p className="bg-blue-default rounded-xl px-3 text-cream font-Neue-Kabel text-center">
          Mes groupes
        </p>
      </Link>
    </div>
  );
}
