import ButtonLanding from "../ButtonLanding";
import LogoBackground from "../../assets/icons-functionnalities/landing-pc.svg";

export default function HeaderPc() {
  return (
    <div
      className="hidden lg:block h-screen bg-center bg-no-repeat bg-contain"
      style={{
        backgroundImage: `url(${LogoBackground})`,
      }}
    >
      <div className="text-center md:flex md:flex-col md:justify-end h-full md:pb-12 tall:pb-3 tall:mt-5 overflow-hidden my-4">
        <h2 className="hidden text-cream font-bold text-2xl md:text-2xl py-8 lg:pb-0 mb-3 md:flex justify-center">
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
