/* eslint-disable camelcase */

import { useState } from "react";

/* eslint-disable react/prop-types */
export default function UpdateContactForm({ contactToUpdate }) {
  const [name, setName] = useState(contactToUpdate.name);
  const [email, setEmail] = useState(contactToUpdate.email);
  const [phone, setPhone] = useState(contactToUpdate.phone);
  const [address, setAddress] = useState(contactToUpdate.address);
  const [category, setCategory] = useState(contactToUpdate.category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { name, email, phone, address, category };
      const response = await fetch(
        `http://localhost:3310/api/contacts/${contactToUpdate}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du contact");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form className="pt-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-semibold">
          Nom entier
        </label>
        <div>
          <input
            type="text"
            defaultValue={name}
            className="border h-12 w-80 rounded-lg pl-2"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-semibold">
            Adresse e-mail
          </label>
          <div>
            <input
              type="email"
              defaultValue={email}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="Téléphone" className="font-semibold">
            Téléphone
          </label>
          <div className="mt-4">
            <input
              type="text"
              defaultValue={phone}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="font-semibold">
            Adresse
          </label>
          <div>
            <input
              type="text"
              defaultValue={address}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="category" className="font-semibold">
            Catégorie
          </label>
          <div>
            <input
              type="text"
              defaultValue={category}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-medium w-80 py-1 rounded-lg text-dark-default shadow-lg mt-4"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
