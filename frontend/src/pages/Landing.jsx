import Footer from "../components/Footer";
import ButtonLanding from "../components/ButtonLanding";

export default function Landing() {
  return (
    <>
      <ButtonLanding text="Se connecter" color='bg-green-default' to="/login" />
      <ButtonLanding text="S'inscrire" color='bg-orange-default' to="/signup" />
      <ButtonLanding text="Je m'inscris" color='bg-green-default' to="/signup" />
      <Footer />
    </>
  );

}
