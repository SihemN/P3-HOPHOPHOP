import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaRegHandPointDown } from "react-icons/fa";
import SignupForm from "../components/LogIn_page/SignupForm";

export default function Login() {
  return (
    <div className="md:bg-red-lighter h-screen font-Neue-Kabel text-dark-default">
      {/* version PC */}
      <div className="bg-green-lighter h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default md:block hidden">
        <div className="bg-orange-lighter h-screen w-custom rounded-r-2xl  shadow-lg shadow-dark-default">
          <div className="bg-blue-default h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default">
            {/* <SignupForm /> */}
          </div>
        </div>
      </div>

      {/* version Mobile */}
      <div className="sm:hidden p-5">
        {" "}
        <FaCircleArrowLeft className="text-blue-default text-3xl" />
        <div className="flex flex-col items-center my-5">
          <h1 className=" text-3xl font-bold text-center">
            Facilitez-vous la vie et inscrivez-vous !
          </h1>
          <FaRegHandPointDown className="m-5 text-3xl text-green-default" />
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
