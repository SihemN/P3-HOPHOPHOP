/* eslint-disable react/prop-types */
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import ghost from "../../assets/logo/ghost-orange.svg";

export default function ContactDetails({ contact }) {
  return (
    <div className="relative inline-block bg-blue-lightest p-5 rounded-xl text-xl w-96 lg:mt-28">
      <div className="absolute h-32 w-32 -top-16 -right-5 bg-blue-lighter rounded-full p-3 flex">
        <img src={ghost} alt="Hoppy" />
      </div>
      <h1 className="font-bold text-xl pb-3">{contact.c_name}</h1>
      <div className="flex items-center gap-2  pb-3">
        <IoIosMail className="text-blue-default" /> {contact.c_email}
      </div>
      <div className="flex items-center gap-2 pb-3">
        <FaPhone className="text-blue-default" /> {contact.c_phone}
      </div>
      <div className="flex items-center gap-2">
        <ImLocation2 className="text-blue-default" />
        {contact.c_address}
      </div>
    </div>
  );
}
