import { PiUserFill } from "react-icons/pi";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import ProfilForm from "../components/Profile_params/ProfilForm";
import ChatNotification from "../components/Profile_params/ChatNotification";

export default function ProfileParams() {
  return (
    <div className="bg-blue-default h-screen font-Neue-Kabel">
      <header>
        <HeaderFunctionnalities title="Mon profil" color="text-blue-default" />
      </header>
      <main className="bg-cream h-screen shadow-top rounded-t-xl font-Neue-Kabel">
        <section className="flex flex-col py-9 items-center">
          <PiUserFill className="bg-blue-default text-cream w-14 h-14 rounded-full p-2" />
          <ProfilForm />
        </section>
        <section className="flex flex-col items-center w-84">
          <ChatNotification />
        </section>
      </main>
    </div>
  );
}
