/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import SelectCategory from "../components/Contact_page/SelectCategory";
import MapContact from "../components/Contact_page/MapContact";
import AddContact from "../components/Contact_page/AddContact";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token manquant");
        }

        const response = await fetch(
          `http://localhost:3310/api/contacts/groups/${ug_group_id}`,
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
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des contacts");
        }
        const { results } = await response.json();
        setContacts(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="bg-blue-lighter font-Neue-Kabel">
      <header>
        <HeaderFunctionnalities
          title="Contacts"
          color="text-blue-medium"
          colorTitle="text-dark-default"
          icon={contact}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <section>
          <SelectCategory />
          <MapContact contacts={contacts} />
        </section>
        <footer className="fixed w-full bottom-0 shadow-top bg-cream text-red-default pl-5 py-3">
          <AddContact />
        </footer>
      </main>
    </div>
  );
}
