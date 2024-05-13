import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderHome from "../components/Header_home/HeaderHome";
import HomeNavigComp from "../components/HomeNavigComp";

import iconCalendar from "../assets/icons-functionnalities/calendar.svg";
import iconBudget from "../assets/icons-functionnalities/budget.svg";
import iconList from "../assets/icons-functionnalities/todolist.svg";
import iconContact from "../assets/icons-functionnalities/contact.svg";
import iconDocument from "../assets/icons-functionnalities/document.svg";
import iconChat from "../assets/icons-functionnalities/chat.svg";
import iconRecipe from "../assets/icons-functionnalities/recipe.svg";
import iconLogout from "../assets/icons-functionnalities/logout.svg";
import Logout from "../components/Log_Out/Logout";

export default function Home() {
  // State qui gère l'affichage du composant Logout
  const [iconLogoutClicked, setIconLogoutClicked] = useState(false);
  // on gère le clic sur l'icon Déconnexion
  const handleClick = () => {
    setIconLogoutClicked(!iconLogoutClicked);
  };

  // Définir les fonctionnalités avec les titres et les icônes correspondantes
  const functionnalities = [
    {
      id: 1,
      title: "Calendrier",
      icon: iconCalendar,
      to: "/calendar",
    },
    {
      id: 2,
      title: "Budget",
      icon: iconBudget,
      to: "/budget",
    },
    {
      id: 3,
      title: "To Do List",
      icon: iconList,
      to: "/todolist",
    },
    {
      id: 4,
      title: "Recettes",
      icon: iconRecipe,
      to: "/recipes",
    },
    {
      id: 5,
      title: "Contacts",
      icon: iconContact,
      to: "/contacts",
    },
    {
      id: 6,
      title: "Documents",
      icon: iconDocument,
      to: "/documents",
    },
    {
      id: 7,
      title: "Messagerie",
      icon: iconChat,
      to: "/chat",
    },
    // {
    //   id: 8,
    //   title: "Déconnexion",
    //   icon: iconLogout,
    //   Link: "/",
    // },
  ];

  return (
    <div className="bg-blue-default">
      <header>
        <HeaderHome />
      </header>
      <div className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom flex justify-center items-center">
        <div className="h-custom md:h-[80%] lg:h-[75%] lg:max-h-[500px] grid grid-cols-2 grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 place-items-center gap-8 md:gap-16 lg:gap-12 py-16 md:py-0 px-2 lg:py-5 ">
          {functionnalities.map(({ id, title, icon, to }) => (
            <Link to={to} key={id}>
              <HomeNavigComp title={title} icon={icon} />
            </Link>
          ))}
          <div className="relative">
            {" "}
            <button
              type="button"
              aria-label="icon déconnexion"
              onClick={handleClick}
            >
              <HomeNavigComp title="Déconnexion" icon={iconLogout} />
            </button>
            {iconLogoutClicked && <Logout handleClick={handleClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}
