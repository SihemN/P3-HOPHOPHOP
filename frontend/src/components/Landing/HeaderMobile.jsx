import LogoBackgroundMobile from "../../assets/icons-functionnalities/landing-mobile.svg";
import ButtonLanding from "../ButtonLanding";

export default function HeaderMobile() {
  return (
    <div className="lg:hidden flex flex-col justify-center items-center">
      <img
        src={LogoBackgroundMobile}
        alt="Logo fantôme"
        className="block p-5 max-w-[380px] md:max-w-[600px] lg:hidden"
      />

      <div className="tall:hidden flex flex-col justify-center items-center lg:mt-5">
        <h2 className="text-cream text-center font-bold text-2xl md:text-2xl my-5">
          Le site qui vous facilite la vie !
        </h2>
        <ButtonLanding
          text="Se connecter"
          color="bg-green-default"
          to="/login"
        />
        <ButtonLanding
          text="S'inscrire"
          color="bg-orange-default"
          to="/signup"
        />
      </div>
    </div>
  );
}
