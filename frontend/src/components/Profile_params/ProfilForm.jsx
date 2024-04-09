import React from "react";

export default function ProfilForm() {
  return (
    <div>
      <form className="pt-8">
        <label htmlFor="firstname" className="font-semibold">
          Prénom
        </label>
        <div>
          <input
            type="text"
            placeholder="John"
            className="border h-12 w-80 rounded-lg pl-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-semibold">
            Adresse e-mail
          </label>
          <div>
            <input
              type="email"
              placeholder="johndoe@email.com"
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
    </div>
  );
}
