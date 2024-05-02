/* eslint-disable camelcase */

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/chat.svg";
import SendMessages from "../components/Chat/SendMessages";
import ChatMessages from "../components/Chat/ChatMessages";

export default function Chat() {
  // Connecte le front au server Socket backend;

  return (
    <div className="font-Neue-Kabel bg-orange-lighter ove">
      <HeaderFunctionnalities
        title="Votre messagerie"
        color="text-orange-lighter"
        icon={icon}
      />
      <main className="flex flex-col items-center justify-center rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-5">
        <div className="flex flex-col items-end overflow-clip h-full w-full lg:w-6/12 shadow-2xl shadow-blue-lighter rounded-3xl">
          <ChatMessages />
          <SendMessages />
        </div>
      </main>
    </div>
  );
}
