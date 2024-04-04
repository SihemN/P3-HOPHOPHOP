import React from "react";
import LoginForm from "./LoginForm";
import Logo from "../../assets/logo/ghost-pink.svg";

function LoginPC() {
  return (
    <div className="flex justify-center ">
      <div className="relative h-full font-Neue-Kabel">
        {/* div bg */}
        <div className="absolute top-[8px] left-[8px] bg-green-lighter w-full h-full max-h-[650px] rounded-2xl border-solid border border-dark" />
        {/* div front */}
        <div className="relative bg-cream rounded-2xl  p-5 w-full h-full max-h-[650px] border-solid border-[1px] border-dark-default">
          <LoginForm />
          <img
            src={Logo}
            alt="Logo fantôme Hop Hop Hop version fond rose"
            className="w-28 my-7 block mx-auto absolute -bottom-12 -right-10"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPC;
