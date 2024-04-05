import React from "react";
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

export default function Home() {
  // Définir les fonctionnalités avec les titres et les icônes correspondantes
  const functionnalities = [
    {
      id: 1,
      title: "Calendrier",
      icon: iconCalendar,
    },
    {
      id: 2,
      title: "Budget",
      icon: iconBudget,
    },
    {
      id: 3,
      title: "To Do List",
      icon: iconList,
    },
    {
      id: 4,
      title: "Recettes",
      icon: iconRecipe,
    },
    {
      id: 5,
      title: "Contacts",
      icon: iconContact,
    },
    {
      id: 6,
      title: "Documents",
      icon: iconDocument,
    },
    {
      id: 7,
      title: "Messagerie",
      icon: iconChat,
    },
    {
      id: 8,
      title: "Déconnexion",
      icon: iconLogout,
    },
  ];

  return (
    <>
      <header>
        <HeaderHome />
      </header>
      <div className="grid grid-cols-2  md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-2 m-5 ">
        {functionnalities.map(({ id, title, icon }) => (
          <HomeNavigComp key={id} title={title} icon={icon} />
        ))}
      </div>
    </>
  );
}
