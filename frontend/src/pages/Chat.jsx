import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import icon from "../assets/icons-functionnalities/chat.svg";

export default function Chat() {
  const { user } = useContext(UserContext);
  const currentUserId = user.data.u_id;

  const fakeMessages = [
    {
      id: 1,
      user: 1,
      text: "Hello ça va ?",
    },
    {
      id: 2,
      user: 2,
      text: "Bien, et toi ?",
    },
    {
      id: 3,
      user: 1,
      text: "Dispo ce soir ?",
    },
    {
      id: 4,
      user: 1,
      text: "Je suis avec Bob",
    },
    {
      id: 5,
      user: 2,
      text: "Vous avez prévu quoi ?",
    },
    {
      id: 6,
      user: 1,
      text: "y a un concert à 20h",
    },
    {
      id: 7,
      user: 1,
      text: "au Périscope",
    },
    {
      id: 8,
      user: 2,
      text: "ok cool ! On se capte avant ? Je finis à 18h",
    },
    {
      id: 9,
      user: 1,
      text: "cool ! on est sur les quais de Saône",
    },
    {
      id: 10,
      user: 2,
      text: "Ok à tt !",
    },
  ];

  return (
    <div className="font-Neue-Kabel bg-orange-lighter">
      <HeaderFunctionnalities
        title="Votre messagerie"
        color="text-orange-lighter"
        icon={icon}
      />
      <main className="flex flex-col items-center justify-center rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top p-5">
        <div className="overflow-y-auto h-custom w-5/12 max-h-full shadow-2xl bg-cream-default scrollbar-track-orange-lighter scrollbar-thumb-orange-default scrollbar-thin">
          <div className="flex flex-col-reverse justify-start h-full my-5">
            {fakeMessages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col mx-3 my-2 ${
                  currentUserId === message.user ? "items-end" : "items-start"
                }`}
              >
                {currentUserId !== message.user && (
                  <p className="italic text-[0.6rem]">
                    Envoyé par {message.user}
                  </p>
                )}
                <div
                  className={`w-fit max-w-48 text-cream rounded-lg px-5 py-2 mt-[3px] ${
                    currentUserId === message.user
                      ? "bg-green-default"
                      : "bg-blue-default"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
