/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { HiOutlineDotsVertical } from "react-icons/hi";
import ghost from "../../assets/logo/ghost-orange.svg";
import MenuKebabContact from "./MenuKebabContact";
// import MenuKebabContact from "./MenuKebabContact";

export default function DivContactPc({
  contact,
  setCategoryUpdated,
  setOpenMenuContactId,
  openMenuContactId,
  setContacts,
  handleUpdateContactClick,
  onClick,
}) {
  const handleClickDots = () => {
    setOpenMenuContactId(
      openMenuContactId === contact.c_id ? null : contact.c_id
    );
  };

  return (
    <div className="h-20 mx-20 rounded-lg bg-blue-lightest flex mt-4 shadow-lg justify-between">
      <button
        type="button"
        aria-label="Nom du contact"
        className="flex items-center gap-4 font-semibold text-lg"
        onClick={() => onClick(contact)}
      >
        <img src={ghost} alt="" className="h-12 pl-3" />
        <p>{contact.c_name}</p>
      </button>
      <div className="flex items-center">
        <button
          type="button"
          aria-label="Modifier ou supprimer un contact"
          onClick={handleClickDots}
        >
          <HiOutlineDotsVertical className="text-blue-medium cursor-pointer text-3xl" />
        </button>

        {openMenuContactId === contact.c_id && (
          <MenuKebabContact
            contact={contact}
            setContacts={setContacts}
            setCategoryUpdated={setCategoryUpdated}
            handleUpdateContactClick={handleUpdateContactClick}
          />
        )}
      </div>
    </div>
  );
}
