/* eslint-disable react/prop-types */
import ghost from "../../assets/logo/ghost-orange.svg";

export default function DivContactPc({ contact }) {
  return (
    <div className="h-20 mx-20 rounded-lg bg-blue-lighter flex items-center mt-4 shadow-lg">
      <div className="flex items-center gap-4 font-semibold text-lg">
        <img src={ghost} alt="" className="h-12 pl-3" />
        <p>{contact.c_name}</p>
      </div>
    </div>
  );
}
