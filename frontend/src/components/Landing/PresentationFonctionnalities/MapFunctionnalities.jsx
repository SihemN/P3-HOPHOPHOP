/* eslint-disable react/prop-types */
import { useState } from "react";
import FunctionnalitiesPC from "./FunctionnalitiesPC";
import FunctionnalitiesMobile from "./FunctionnalitiesMobile";
import iconCalendar from "../../../assets/icons-functionnalities/calendar.svg";
import iconBudget from "../../../assets/icons-functionnalities/budget.svg";
import iconList from "../../../assets/icons-functionnalities/todolist.svg";
import iconContact from "../../../assets/icons-functionnalities/contact.svg";
import iconDocument from "../../../assets/icons-functionnalities/document.svg";
import iconChat from "../../../assets/icons-functionnalities/chat.svg";
import iconRecipe from "../../../assets/icons-functionnalities/recipe.svg";

export default function MapFunctionnalities() {
  const functionnalities = [
    {
      id: 1,
      title: "AGENDA",
      description:
        "Un agenda pour vous et votre famille, votre colocation, groupe d’amis... Comme ça, pas d’excuse, on est au courant de l’anniversaire d’Hoppy !",
      icon: iconCalendar,
      iconDescription: "Icon Agenda",
      color: "blue-default",
    },

    {
      id: 2,
      title: "BUDGET",
      description:
        "Un budget pour regrouper vos dépenses et recettes, ordonner vos dépenses par catégorie, etc.",
      icon: iconBudget,
      iconDescription: "Icon Budget",
      color: "green-default",
    },
    {
      id: 3,
      title: "TO DO LIST",
      description:
        "Entre les amis, la famille, les colocs, le travail, c’est facile d’oublier quelque chose ! Allez hop une to do list !",
      icon: iconList,
      iconDescription: "Icon To Do List",
      color: "orange-default",
    },
    {
      id: 4,
      title: "CONTACTS",
      description:
        "Fini le post-it qui disparaît au mauvais moment, un répertoire ça change la vie !",
      icon: iconContact,
      iconDescription: "Icon Contacts",
      color: "red-default",
    },
    {
      id: 5,
      title: "DOCUMENTS",
      description:
        " Ordonnance, documents d’identité, attestation... retrouvez au même endroit les documents qu’il vous faut.",
      icon: iconDocument,
      iconDescription: "Icon Documents",
      color: "blue-lighter",
      colorFont: "dark-default",
    },
    {
      id: 6,
      title: "MESSAGES",
      description:
        "Echanger des messages avec les membres de votre groupe pour planifier votre prochaine sortie ou encore jouer au loup-garou avec Hoppy.",
      icon: iconChat,
      iconDescription: "Icon Messages",
      color: "green-lighter",
      colorFont: "dark-default",
    },
    {
      id: 7,
      title: "RECETTES",
      description:
        "Avec tout ce temps gagné, quoi de mieux qu’un bon petit plat à savourer tous ensemble ? Et puis cette fois, on a vraiment la recette !",
      icon: iconRecipe,
      iconDescription: "Icon Recettes",
      color: "orange-lighter",
      colorFont: "dark-default",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (clickedIndex) => {
    setOpenIndex((prevIndex) =>
      prevIndex === clickedIndex ? null : clickedIndex
    );
  };

  return (
    <div className="flex justify-center p-5">
      {/* Version PC */}
      <div className="hidden w-3/4 max-w-4xl h-80 tall:flex flex-wrap justify-center">
        {/* On map le tableau functionnalities
          On crée un composant Functionnalities par élément */}
        {functionnalities.map(
          ({ id, title, description, icon, iconDescription }) => {
            return (
              <FunctionnalitiesPC
                key={id}
                title={title}
                description={description}
                icon={icon}
                iconDescription={iconDescription}
              />
            );
          }
        )}
      </div>
      {/* Version Mobile */}
      <div className="flex flex-col justify-center p-5 tall:hidden">
        {functionnalities.map(
          ({ id, title, description, color, colorFont }, index) => (
            <FunctionnalitiesMobile
              key={id}
              title={title}
              description={description}
              color={color}
              colorFont={colorFont}
              isOpen={index === openIndex}
              onToggle={() => handleToggle(index)}
            />
          )
        )}
      </div>
    </div>
  );
}
