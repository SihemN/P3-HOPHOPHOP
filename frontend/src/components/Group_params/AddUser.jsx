import { useState } from "react";
import { TiPlus } from "react-icons/ti";

export default function AddUser() {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (
    <div className="flex flex-col items-center pb-10">
      <button
        type="button"
        aria-label="Ajouter un utilisateur"
        onClick={openForm}
      >
        <TiPlus className="bg-blue-default text-cream rounded-full w-8 h-8 p-1" />
      </button>
      <p>Ajouter un utilisateur</p>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-cream p-5 rounded-lg border">
            <h2 className="text-lg font-semibold py-4">
              Ajouter un utilisateur
            </h2>
            <form className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Prénom"
                className="border rounded-lg h-10 pl-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg h-10 pl-2"
                required
              />
              <div className="flex gap-10 py-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="bg-red-default rounded-xl px-2 text-cream hover:bg-orange-default"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-default rounded-xl px-2 text-cream hover:bg-orange-default"
                >
                  Inviter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
