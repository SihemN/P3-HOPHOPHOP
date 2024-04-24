/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import SelectCategory from "../components/Contact_page/SelectCategory";
import MapContact from "../components/Contact_page/MapContact";
import AddContact from "../components/Contact_page/AddContact";
import ContactDetails from "../components/Contact_page/ContactDetails";
import CreateContactForm from "../components/Contact_page/CreateContactForm";

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
  const [selectedContact, setSelectedContact] = useState(null);

  const [componentToShow, setComponentToShow] = useState(null);

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
          const errorResponse = await response.json();
          throw new Error(
            errorResponse || "Erreur lors de la récupération des contacts"
          );
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
  const handleCategoriesChange = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setCategoryUpdated((prev) => !prev);
  };

  const handleAddContactClick = () => {
    setComponentToShow((prevComponent) =>
      prevComponent !== "create contact" ? "create contact" : null
    );
  };

  return (
    <div className="bg-blue-lighter font-Neue-Kabel text-lg">
      <header>
        <HeaderFunctionnalities
          title="Contacts"
          color="text-blue-medium"
          colorTitle="text-dark-default"
          icon={contact}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] h-custom bg-cream shadow-top flex overflow-y-auto no-scrollbar ">
        <div className="flex-1 rounded-xl lg:rounded-t-[4rem] shadow-2xl z-100 overflow-y-auto no-scrollbar">
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
            onSelectContact={setSelectedContact}
            setComponentToShow={setComponentToShow}
          />
        </div>
        <div className="flex-1 hidden lg:flex justify-center h-fit mt-10 py-4 overflow-y-auto no-scrollbar">
          {componentToShow === "create contact" && (
            <CreateContactForm
              setComponentToShow={setComponentToShow}
              setCategoryUpdated={setCategoryUpdated}
            />
          )}
          {componentToShow === "contact details" && (
            <ContactDetails contact={selectedContact} />
          )}
        </div>
      </main>
      <footer>
        <AddContact
          onAddCategory={handleCategoriesChange}
          handleAddContactClick={handleAddContactClick}
        />
      </footer>
    </div>
  );
}
