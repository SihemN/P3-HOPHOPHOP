import HeaderFunctionnalities from "../components/HeaderFunctionnalities";
import contact from "../assets/icons-functionnalities/contact.svg";
import CreateContactForm from "../components/Contact_page/CreateContactForm";
import FooterBack from "../components/Recipes/FooterBack";

export default function CreateContact() {
  return (
    <div className="bg-blue-lighter font-Neue-Kabel">
      <header>
        <HeaderFunctionnalities
          title="Créer un contact"
          color="text-blue-medium"
          colorTitle="text-dark-default"
          icon={contact}
        />
      </header>
      <main className="rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <CreateContactForm />
      </main>
      <footer>
        <FooterBack
          text="Retourner à la page contacts"
          to="/contacts"
          // eslint-disable-next-line react/jsx-curly-brace-presence
          color={`blue-medium`}
        />
      </footer>
    </div>
  );
}
