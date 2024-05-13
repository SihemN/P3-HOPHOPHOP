import { FaLink } from "react-icons/fa";
import { PiCopySimpleFill } from "react-icons/pi";

export default function InvitationLink() {
  return (
    <div className="flex justify-center pt-10 gap-2">
      <form>
        <div className="flex gap-2">
          <FaLink
            size={13}
            className="bg-blue-default text-cream rounded-full p-1 h-6 w-6 flex justify-center items-center"
          />
          <label htmlFor="inviter par email" className="font-bold mb-4">
            Inviter avec un lien
          </label>
        </div>
        <div className="relative flex justify-center gap-4">
          <input
            type="email"
            placeholder="Saisir l'e-mail de l'invité"
            className="w-72 border rounded-lg h-10 pl-2"
          />
          <PiCopySimpleFill size={23} className="absolute top-2 right-2" />
        </div>
      </form>
    </div>
  );
}
