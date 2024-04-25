import Header from "../components/HeaderLogoIcons";
import Bandeau from "../components/Bandeau";
import PresentationFunctionnalities from "../components/Landing/PresentationFonctionnalities/PresentationFunctionnalities";
import TeamComponant from "../components/TeamComponant";
import Footer from "../components/Footer";
import ButtonLanding from "../components/ButtonLanding";

import Presentation from "../components/Presentation";

export default function Landing() {
  return (
    <>
      <Header />
      <Bandeau />
      <Presentation />
      <PresentationFunctionnalities />
      <TeamComponant />
      <ButtonLanding
        text="Je m'inscris"
        color="bg-green-default"
        to="/signup"
      />
      <Footer />
    </>
  );
}
