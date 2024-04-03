import SignupForm from "./SignupForm";
import Logo from "../../assets/logo/ghost-pink.svg";

export default function SignupMobile() {
  return (
    <div className="lg:hidden p-5 flex flex-col items-center justify-center">
      <SignupForm />
      <img
        src={Logo}
        alt="Logo fantôme Hop Hop Hop version fond rose"
        className="max-w-60 my-7 m-auto"
      />
    </div>
  );
}
