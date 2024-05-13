/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext } from "react";
// Importez io depuis "socket.io-client"
import io from "socket.io-client";

// On crée le contexte qui contiendra les données du user connecté
export const SocketContext = createContext();

export default function SocketProvider({ children }) {
  // Créez le socket au niveau du point d'entrée de votre application
  const socket = io.connect("http://localhost:4000");
  return (
    // On fournit le state user aux composants enfants
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
