/* eslint-disable radix */
/* eslint-disable no-shadow */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import FooterContact from "../components/Contact_page/FooterContact";
import UpdateContactForm from "../components/Contact_page/UpdateContactForm";

export default function UpdateContact() {
  const { contactId } = useParams();
  const [contactToUpdate, setContactToUpdate] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/contacts/${contactId}`,
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
          throw new Error(
            "Erreur lors de la récupération des données du contact"
          );
        }
        const { results } = await response.json();
        setContactToUpdate(results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContactData();
  }, [contactId]);

  return (
    <div className="bg-blue-lighter font-Neue-Kabel">
      <header>
        <HeaderFunctionnalities
          title="Modifier un contact"
          color="text-blue-medium"
          colorTitle="text-dark-default"
          icon={contact}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        {contactToUpdate ? (
          <UpdateContactForm contact={contactToUpdate} />
        ) : (
          <p>Contact non trouvé</p>
        )}
      </main>
      <footer>
        <FooterContact to="/contacts" color="text-blue-medium" />
      </footer>
    </div>
  );
}
