/* eslint-disable camelcase */
import io from "socket.io-client";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/chat.svg";
import SendMessages from "../components/Chat/SendMessages";
import ChatMessages from "../components/Chat/ChatMessages";

export default function Chat() {
  // Connecte le front au server Socket backend;
  const socket = io.connect("http://localhost:4000");

  return (
    <div className="font-Neue-Kabel bg-orange-lighter">
      <HeaderFunctionnalities
        title="Votre messagerie"
        color="text-orange-lighter"
        icon={icon}
      />
      <main className="flex flex-col items-center justify-center rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-5">
        <ChatMessages socket={socket} />
        <SendMessages socket={socket} />
      </main>
    </div>
  );
}
