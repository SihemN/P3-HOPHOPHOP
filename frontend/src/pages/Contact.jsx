/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import SelectCategory from "../components/Contact_page/SelectCategory";
import MapContact from "../components/Contact_page/MapContact";
import AddContact from "../components/Contact_page/AddContact";

export default function Contact() {
  // stocke la liste de contact et la met à jour
  const [contacts, setContacts] = useState([]);
  // stocke liste de catégories et la met à jour
  const [categories, setCategories] = useState([]);
  // suit si les catégories ont été modifiées et passe a true si c'est le cas
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  // liste filtrées de contacts et la met à jour
  const [filteredContacts, setFilteredContacts] = useState([]);
  // stocke catégorie et met à jour si une catégorie est sélectionnée
  const [filterSelected, setFilterSelected] = useState(null);

  // récupérer les contacts depuis l'api
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
  }, [categoryUpdated]);

  // récupérer les catégories de contact depuis l'api
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token manquant");
        }

        const response = await fetch(
          `http://localhost:3310/api/contacts-categories/groups/${ug_group_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des catégories de contacts"
          );
        }
        const { results } = await response.json();
        setCategories(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [categoryUpdated]);

  // màj des carégories quand il y a des modifications
  const handleCategoriesChange = (newCategories) => {
    setCategories(newCategories);
  };
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
          <div className="pb-24">
            <SelectCategory
              categories={categories}
              onCategoriesChange={handleCategoriesChange}
              setCategoryUpdated={setCategoryUpdated}
              contacts={contacts}
              setFilteredContacts={setFilteredContacts}
              setFilterSelected={setFilterSelected}
            />
            <MapContact
              filteredContacts={filteredContacts}
              setContacts={setContacts}
              contacts={contacts}
              filterSelected={filterSelected}
              setCategoryUpdated={setCategoryUpdated}
            />
          </div>
        </section>
        <footer>
          <AddContact />
        </footer>
      </main>
    </div>
  );
}
