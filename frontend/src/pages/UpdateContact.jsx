/* eslint-disable radix */
/* eslint-disable no-shadow */
import { useParams } from "react-router-dom";

import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import FooterContact from "../components/Contact_page/FooterContact";
import UpdateContactForm from "../components/Contact_page/UpdateContactForm";

export default function UpdateContact() {
  const { contactId } = useParams();
  const contacts = [
    {
      id: 1,
      name: "Anaïs Glorennec",
      email: "anais@gmail.com",
      phone: "0625459875",
      address: "1 rue du frontend 69000 hophophop city",
      category: "Ecole",
    },
    {
      id: 2,
      name: "Sihem Nasri",
      email: "sihem@gmail.com",
      phone: "0652455622",
      address: "2 rue du frontend 69000 hophophop city",
      category: "Medecin",
    },
    {
      id: 3,
      name: "Arthur Vincent-Silvestrini",
      email: "arthur@gmail.com",
      phone: "0652366951",
      address: "3 rue du frontend 69000 hophophop city",
      category: "Les fantômes",
    },
    {
      id: 4,
      name: "Soumia Amar",
      email: "soumia@gmail.com",
      phone: "0656221445",
      address: "4 rue du frontend 69000 hophophop city",
      category: "Travail",
    },
  ];
  const contactToUpdata = contacts.find(
    (contact) => contact.id === parseInt(contactId)
  );
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
        {contactToUpdata ? (
          <UpdateContactForm contact={contactToUpdata} />
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
