import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Logout({ handleClick }) {
  const navigate = useNavigate();
  // au click sur le bouton "Oui, je me déconnecte",
  // on fetch la route backend log out
  // on update le token avec un token à durée "0h"
  // on navigate vers la page d'accueil
  const handleClickLogOut = () => {
    fetch("http://localhost:3310/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((res) => res.json())
      .then(({ message, token }) => {
        console.info("Logout, message >> ", message);
        // console.info("Logout, token >> ", token);
        localStorage.setItem("token", JSON.stringify(token));
        handleClick();
        navigate("/");
      })
      .catch((err) => console.info("Error fetching user data:", err));
  };

  return (
    <div className="absolute -left-52 -top-36 md:-left-32 bg-cream shadow-md shadow-dark-shadow min-w-96 min-h-28 flex flex-col justify-center items-center rounded-lg border-[1px] border-dark-default">
      <button
        type="button"
        className="bg-blue-default hover:bg-orange-default active:bg-orange-lighter h-12 m-2 py-2
         px-10 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow w-3/4"
        onClick={handleClickLogOut}
      >
        Oui, je me déconnecte
      </button>
      <button
        type="button"
        className="bg-orange-default hover:bg-green-default active:bg-green-lighter h-12 m-2 py-2
         px-10 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow w-3/4"
        onClick={handleClick}
      >
        Annuler
      </button>
    </div>
  );
}

// composant Log Out
// S'affiche au clic sur l'icon Déconnexion
// Bouton pour confirmer la déconnexion et fetch Backend + redirection page d'accueil
