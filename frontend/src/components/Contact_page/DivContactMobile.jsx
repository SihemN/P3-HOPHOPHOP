/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImLocation2 } from "react-icons/im";
import MenuKebabContact from "./MenuKebabContact";

export default function DivContactMobile({
  contact,
  openMenuContactId,
  setOpenMenuContactId,
  setContacts,
  setCategoryUpdated,
}) {
  const { c_name, c_phone, c_email, c_address, c_id } = contact;
  const handleClick = () => {
    setOpenMenuContactId(openMenuContactId === c_id ? null : c_id);
  };
  return (
    <div className="flex items-center justify-between p-4 border-b border-blue-lighter">
      <div>
        <div className="font-bold pb-2">{c_name}</div>
        <div>
          <a href={`tel:${c_phone}`} className="flex">
            <FaPhone className="mr-2 text-blue-medium" />
            {c_phone}
          </a>
        </div>
        <div>
          <a href={`mailto:${c_email}`} className="flex">
            <IoIosMail className="mr-2 mt-1 text-blue-medium" />
            {c_email}
          </a>
          <div className="flex">
            <ImLocation2 className="mr-2 text-blue-medium mt-1" />
            <p>{c_address}</p>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          aria-label="Modifier ou supprimer un contact"
          onClick={handleClick}
        >
          <HiOutlineDotsVertical className="text-blue-medium cursor-pointer text-3xl" />
        </button>
        {openMenuContactId === c_id && (
          <MenuKebabContact
            contact={contact}
            setContacts={setContacts}
            setCategoryUpdated={setCategoryUpdated}
          />
        )}
      </div>
    </div>
  );
}
