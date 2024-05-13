// import SignupPC from "../components/LogIn_page/SignupPC";
// import SignupMobile from "../components/LogIn_page/SignupMobile";

import LoginMobile from "../components/LogIn_page/LoginMobile";
import LoginPC from "../components/LogIn_page/LogInPcComp";

export default function Login() {
  return (
    <div className="lg:bg-red-lighter h-screen font-Neue-Kabel text-dark-default ">
      <div className="bg-green-lighter h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default lg:block hidden">
        <div className="bg-orange-lighter h-screen w-custom rounded-r-2xl  shadow-lg shadow-dark-default">
          <div className="bg-blue-default h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default flex justify-center items-center py-10">
            <LoginPC />
          </div>
        </div>
      </div>

      <LoginMobile />
    </div>
  );
}
