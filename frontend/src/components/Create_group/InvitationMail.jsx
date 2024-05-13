/* slint-disable no-alert */
import { IoIosMail } from "react-icons/io";

export default function InvitationMail() {
  return (
    <div className="flex justify-center pt-10 gap-2">
      <form>
        <div className="flex gap-2">
          <IoIosMail
            size={15}
            className="bg-blue-default text-cream rounded-full p-1 h-6 w-6 flex justify-center"
          />
          <label htmlFor="inviter par email" className="font-bold mb-4">
            Inviter par e-mail
          </label>
        </div>
        <div className="flex flex-col items-center gap-4">
          <input
            type="email"
            placeholder="Saisir l'e-mail de l'invité"
            className="w-72 border rounded-lg h-10 pl-2"
          />
          <button
            type="submit"
            className="bg-blue-default w-72 py-1 rounded-lg text-cream shadow-lg"
          >
            Envoyer l'invitation
          </button>
        </div>
      </form>
    </div>
  );
}
