import { useState } from "react";

/* eslint-disable react/prop-types */
export default function UpdateContactForm({ contact }) {
  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [address, setAddress] = useState(contact.address);
  const [category, setCategory] = useState(contact.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName();
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
