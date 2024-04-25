import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icons-functionnalities/not-found.svg";

function NotFoundPage() {
  return (
    <div className="font-Neue-Kabel text-blue-default flex flex-col items-center justify-center min-h-screen">
      <img
        src={icon}
        alt="mascotte avec erreur 404"
        className="max-w-full h-auto mb-8"
      />
      <h1 className="text-3xl font-bold text-center mb-4">
        {" "}
        Oops ! La page que vous cherchez n’existe pas
      </h1>
      <p className="text-lg text-center">
        <Link
          to="/"
          className="text-blue-500 hover:underline inline-block border-transparent hover:border-blue-500"
        >
          Retourner à la page d'accueil
        </Link>
      </p>
      <p className="text-lg text-center">
        <Link
          to="/home"
          className="text-blue-500 hover:underline inline-block border-transparent hover:border-blue-500"
        >
          Retourner dans mon groupe
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
