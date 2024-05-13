import LoginForm from "./LoginForm";
import Logo from "../../assets/logo/ghost-pink.svg";

function LoginMobile() {
  return (
    <div>
      <div className="lg:hidden p5 flex flex-col items-center justify-center">
        <LoginForm />
        <img
          src={Logo}
          alt="Logo hop hop hop"
          className="max-w-60 my-7 m-auto"
        />
      </div>
    </div>
  );
}

export default LoginMobile;
