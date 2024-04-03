// import SignupForm from "../components/LogIn_page/SignupForm";
// import Logo from "../assets/logo/ghost-pink.svg";
import SignupPC from "../components/LogIn_page/SignupPC";
import SignupMobile from "../components/LogIn_page/SignupMobile";

export default function Login() {
  return (
    <div className="lg:bg-red-lighter h-screen font-Neue-Kabel text-dark-default ">
      <SignupPC />
      <SignupMobile />
    </div>
  );
}
