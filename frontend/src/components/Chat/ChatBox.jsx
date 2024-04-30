/* eslint-disable react/prop-types */
// import io from "socket.io-client";
import { useState } from "react";
import ChatMessages from "./ChatMessages";
import SendMessages from "./SendMessages";
import OpenChatBox from "./OpenChatBox";

export default function ChatBox({ socket }) {
  // Afficher / Masquer la Messagerie instantanée
  const [showChat, setShowChat] = useState(false);
  // Connecte le front au server Socket backend;
  return (
    <>
      <OpenChatBox showChat={showChat} setShowChat={setShowChat} />
      <div
        className={`bg-cream rounded-lg flex flex-col justify-end w-96 bottom-20 right-2 fixed h-[75%] z-1000 shadow-2xl ${
          showChat ? "transition-transform translate-x-0" : "translate-x-full"
        }`}
        style={{
          // Décalage initial pour cacher le chat
          transform: showChat ? "translateX(0)" : "translateX(100%)",
          // Transition douce
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <ChatMessages socket={socket} />
        <SendMessages socket={socket} />
      </div>
    </>
  );
}
