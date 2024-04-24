/* eslint-disable react/prop-types */
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
// import { LuContact2 } from "react-icons/lu";

export default function ContactDetails({ contact }) {
  if (!contact) {
    return <div>Sélectionnez un contact</div>;
  }
  return (
    <div className="inline-block bg-blue-lightest p-5 rounded-xl text-xl w-96">
      <h1 className="font-bold text-xl pb-3">{contact.c_name}</h1>
      <div className="flex gap-2  pb-3">
        <IoIosMail className="text-blue-default" /> {contact.c_email}
      </div>
      <div className="flex gap-2 pb-3">
        <FaPhone className="text-blue-default" /> {contact.c_phone}
      </div>
      <div className="flex gap-2">
        <ImLocation2 className="text-blue-default" />
        {contact.c_address}
      </div>
      {/* <div className="flex gap-2">
        <LuContact2 /> {contact.cc_name}
      </div> */}
    </div>
  );
}
