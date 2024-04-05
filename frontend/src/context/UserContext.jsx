/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

// On crée le contexte qui contiendra les données du user connecté
export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  return (
    // On fournit le state user aux composants enfants
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
