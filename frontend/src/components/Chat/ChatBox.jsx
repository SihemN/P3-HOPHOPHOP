/* eslint-disable react/prop-types */
// import io from "socket.io-client";
import { useState } from "react";
import ChatMessages from "./ChatMessages";
import SendMessages from "./SendMessages";
import OpenChatBox from "./OpenChatBox";

export default function ChatBox() {
  // Afficher / Masquer la Messagerie instantanée
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="relative z-2000">
      <div className="lg:block hidden absolute z-2000">
        <OpenChatBox showChat={showChat} setShowChat={setShowChat} />
        <div
          className={`bg-blue-lightest rounded-2xl flex flex-col justify-end w-96 bottom-20 right-0 fixed h-[84%] z-2000 shadow-2xl pt-4 ${
            showChat
              ? "transition-transform translate-x-0 right-2"
              : "translate-x-full"
          }`}
          style={{
            // Décalage initial pour cacher le chat
            transform: showChat ? "translateX(0)" : "translateX(100%)",
            // Transition douce
            transition: "transform 0.3s ease-in-out",
            // Afficher ou masquer le débordement pour éviter de montrer le contenu lorsque le composant est masqué
            overflow: showChat ? "visible" : "hidden",
          }}
        >
          <ChatMessages />
          {/* Conteneur avec hauteur fixe */}
          <SendMessages />
        </div>
      </div>
    </div>
  );
}
