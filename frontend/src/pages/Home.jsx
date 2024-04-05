import React from "react";
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

export default function Home() {
  // Définir les fonctionnalités avec les titres et les icônes correspondantes
  const functionnalities = [
    {
      id: 1,
      title: "Calendrier",
      icon: iconCalendar,
      Link: "/",
    },
    {
      id: 2,
      title: "Budget",
      icon: iconBudget,
      Link: "/",
    },
    {
      id: 3,
      title: "To Do List",
      icon: iconList,
      Link: "/",
    },
    {
      id: 4,
      title: "Recettes",
      icon: iconRecipe,
      Link: "/",
    },
    {
      id: 5,
      title: "Contacts",
      icon: iconContact,
      Link: "/",
    },
    {
      id: 6,
      title: "Documents",
      icon: iconDocument,
      Link: "/",
    },
    {
      id: 7,
      title: "Messagerie",
      icon: iconChat,
      Link: "/",
    },
    {
      id: 8,
      title: "Déconnexion",
      icon: iconLogout,
      Link: "/",
    },
  ];

  return (
    <div className="bg-blue-default">
      <header>
        <HeaderHome />
      </header>
      <div className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom flex justify-center items-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 gap-8 lg:gap-16 md:gap-20 max-w-[75%] py-3 px-2 lg:p-10">
          {functionnalities.map(({ id, title, icon }) => (
            <Link to={Link} key={id}>
              <HomeNavigComp title={title} icon={icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
