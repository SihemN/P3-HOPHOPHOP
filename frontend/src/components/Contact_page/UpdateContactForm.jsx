/* eslint-disable camelcase */

import { useState } from "react";

/* eslint-disable react/prop-types */
export default function UpdateContactForm({ contact }) {
  const storedCategory = JSON.parse(localStorage.getItem("category"));

  const [dataForm, setDataForm] = useState({
    name: contact.c_name,
    phone: contact.c_phone,
    email: contact.c_email,
    address: contact.c_address,
    category: storedCategory,
  });

  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3310/api/contacts/${contact.c_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(dataForm),
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
          Nom et prénom
        </label>
        <div>
          <input
            type="text"
            name="name"
            defaultValue={contact.c_name}
            className="border h-12 w-80 rounded-lg pl-2"
            onChange={handlChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-semibold">
            Adresse e-mail
          </label>
          <div>
            <input
              type="email"
              name="email"
              defaultValue={contact.c_email}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
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
              name="phone"
              defaultValue={contact.c_phone}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
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
              name="address"
              defaultValue={contact.c_address}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
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
              defaultValue={contact.cc_name}
              className="border h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
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
