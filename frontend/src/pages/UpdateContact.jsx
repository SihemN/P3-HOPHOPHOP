/* eslint-disable radix */
/* eslint-disable no-shadow */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import UpdateContactForm from "../components/Contact_page/UpdateContactForm";
import FooterBack from "../components/Recipes/FooterBack";

export default function UpdateContact() {
  const { id } = useParams();
  const [contactToUpdate, setContactToUpdate] = useState(null);

  // récupérer les données du contact
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/contacts/${id}`,
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
        const data = await response.json();
        setContactToUpdate(data.result[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContactData();
  }, [id]);

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
        <FooterBack
          to="/contacts"
          color="text-blue-medium"
          text="Retourner aux contacts"
        />
      </footer>
    </div>
  );
}
