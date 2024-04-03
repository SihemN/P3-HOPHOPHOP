import SignupForm from "../components/LogIn_page/SignupForm";
import Logo from "../assets/logo/ghost-pink.svg";

export default function Login() {
  return (
    <div className="lg:bg-red-lighter h-screen font-Neue-Kabel text-dark-default ">
      {/* version PC */}
      <div className="bg-green-lighter h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default lg:block hidden">
        <div className="bg-orange-lighter h-screen w-custom rounded-r-2xl  shadow-lg shadow-dark-default">
          <div className="bg-blue-default h-screen w-custom rounded-r-2xl shadow-lg shadow-dark-default flex justify-center items-center py-10">
            <div className="flex justify-center items-center">
              <div className="relative h-full">
                {/* div background vert en arrière-plan */}
                <div className="absolute top-[8px] left-[8px] bg-green-lighter w-10/12 h-full max-h-[650px] rounded-2xl border-solid border border-dark" />
                {/* div 1er plan avec form et logo */}
                <div className="relative flex flex-col justify-center bg-cream rounded-2xl  p-5 w-10/12 h-full max-h-[650px] border-solid border-[1px] border-dark-default">
                  <SignupForm />
                  <img
                    src={Logo}
                    alt="Logo fantôme Hop Hop Hop version fond rose"
                    className="w-28 my-7 block mx-auto absolute -bottom-12 -right-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* version Mobile */}
      <div className="lg:hidden p-5 flex flex-col items-center justify-center">
        <SignupForm />
        <img
          src={Logo}
          alt="Logo fantôme Hop Hop Hop version fond rose"
          className="max-w-60 my-7 m-auto"
        />
      </div>
    </div>
  );
}
