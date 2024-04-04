import React from "react";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

function Connect() {
  return (
    <div className="flex justify-center ">
      <div className="relative h-full font-Neue-Kabel ">
        <div className="absolute top-[8px] left-[8px] bg-green-lighter w-full h-full max-h-[650px] rounded-2xl border-solid border border-dark">
          {}
        </div>
        <div className="relative bg-cream rounded-2xl  p-5 w-full h-full max-h-[650px] border-solid border-[1px] border-dark-default">
          <div>
            <Link to="/index">
              <FaCircleArrowLeft className="text-blue-default  text-3xl mt-2" />
            </Link>
          </div>
          <div className="flex flex-col items-center my-5">
            <h1 className="text-2xl font-bold text-center px-10">
              Bonjour,👋 <br />
              content de vous revoir !
            </h1>
          </div>
          <form className="flex flex-col text-blue-default text-xl mx-5">
            <label htmlFor="email" className="font-bold mt-4">
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="nom@exemple.com"
              className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default font-normal"
            />
            <label
              htmlFor="password"
              className="font-bold mt-4 flex justify-between"
            >
              Mot de passe
              <Link
                to="/"
                className="font-normal underline hover:text-green-default
            "
              >
                Mot de passe oublié ?
              </Link>
            </label>

            <input
              type="password"
              name="password"
              placeholder="Mon mot de passe top secret"
              className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
            />
            <button
              type="submit"
              className="bg-blue-default h-12 mt-10 mb-7 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
            >
              CONTINUER
            </button>
            <p className="text-center underline py-2 hover:text-green-default">
              Je veux créer un compte
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connect;
