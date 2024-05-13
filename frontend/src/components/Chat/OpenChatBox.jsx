/* eslint-disable react/prop-types */
import icon from "../../assets/icons-functionnalities/chat.svg";

export default function OpenChatBox({ setShowChat }) {
  // Fonction pour gérer la perte de focus
  //   const handleBlur = () => {
  //     if (showChat) {
  //       setShowChat(false); // Si le chat est déjà visible, le cacher
  //     }
  //   };

  // Fonction pour basculer l'état du chat
  const toggleChat = () => {
    setShowChat((prev) => !prev); // Inversion de l'état de showChat
  };

  return (
    <button
      type="button"
      className="fixed z-1500 right-2 bottom-2 bg-green-lighter h-16 w-16 rounded-3xl overflow-hidden transform transition-transform
 hover:rotate-180"
      onClick={toggleChat}
      //   onBlur={handleBlur}
      style={{ transitionDuration: "0.2s" }}
    >
      <img src={icon} alt="logo messagerie" className="h-3/6 m-auto" />
    </button>
  );
}
