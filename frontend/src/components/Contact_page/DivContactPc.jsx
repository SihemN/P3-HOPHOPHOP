/* eslint-disable react/prop-types */
import ghost from "../../assets/logo/ghost-orange.svg";
// import MenuKebabContact from "./MenuKebabContact";

export default function DivContactPc({ contact }) {
  return (
    <div className="h-20 mx-20 rounded-lg bg-blue-lightest flex mt-4 shadow-lg">
      <div className="flex items-center gap-4 font-semibold text-lg">
        <img src={ghost} alt="" className="h-12 pl-3" />
        <p>{contact.c_name}</p>
      </div>
    </div>
  );
}
