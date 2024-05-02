/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-alert */
import { useState } from "react";
import { TiPlus } from "react-icons/ti";

export default function AddUser() {
  const [showForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const getUserIdByEmail = async (email) => {
    try {
      console.log("Fetching user ID for email:", email);
      const response = await fetch(
        `http://localhost:3310/api/users/email?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const userEmail = e.target.elements.email.value;
    const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
    try {
      const userIdToSet = await getUserIdByEmail(userEmail);
      const response = await fetch(
        `http://localhost:3310/api/groups/${ug_group_id}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({ userEmail, userIdToSet }),
        }
      );
      if (!response.ok) {
        throw new Error("Échec de la requête");
      }

      const data = await response.json();
      console.log(data);
      alert("Utilisateur ajouté au groupe!");

      window.dispatchEvent(new CustomEvent("user-added"));

      closeForm();
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de l'ajout de l'utilisateur.");
    }
  }

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="border rounded-lg h-10 pl-2"
                required
              />
              <div className="flex gap-5 py-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="bg-red-default rounded-xl px-3 py-1 w-20 text-cream hover:bg-orange-default"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-green-default rounded-xl px-2 w-20 text-cream hover:bg-orange-default"
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
