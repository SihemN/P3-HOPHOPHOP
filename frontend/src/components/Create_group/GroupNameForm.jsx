import React from "react";
import { MdGroups2 } from "react-icons/md";

export default function GroupNameForm() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center py-9">
        <div className="bg-blue-default text-cream w-16 h-16 rounded-full flex justify-center items-center">
          <MdGroups2 size={40} />
        </div>
      </div>
      <form className="w-72 flex flex-col">
        <label htmlFor="nom du groupe" className="font-bold text-start">
          Nom du groupe
        </label>
        <div className="flex flex-col items-center gap-4 mt-3">
          <input
            type="text"
            placeholder="Nom du groupe"
            required
            className="w-72 border rounded-lg h-10 pl-2"
          />
          <button
            type="submit"
            className="bg-blue-default w-72 py-1 rounded-lg text-cream shadow-lg"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
