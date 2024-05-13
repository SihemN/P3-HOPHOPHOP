import React from "react";

export default function ChangePassword() {
  return (
    <div>
      <form className="pt-8">
        <label htmlFor="password" className="font-semibold">
          Mot de passe actuel
        </label>
        <div>
          <input
            type="password"
            placeholder="Mot de passe actuel"
            className="border h-12 w-80 rounded-lg pl-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Nouveau mot de passe
          </label>
          <div>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="border h-12 w-80 rounded-lg pl-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="font-semibold">
            Confirmez le mot de passe
          </label>
          <div>
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              className="border h-12 w-80 rounded-lg pl-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-default w-80 py-1 rounded-lg text-cream shadow-lg mt-4"
        >
          Enregistrer
        </button>
      </form>
      {/* <button
        type="submit"
        className="bg-red-default w-80 rounded-lg text-cream shadow-lg mt-4 py-1"
      >
        Quitter le groupe
      </button> */}
    </div>
  );
}
