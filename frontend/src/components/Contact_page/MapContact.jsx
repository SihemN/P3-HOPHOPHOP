/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImLocation2 } from "react-icons/im";
import MenuKebabContact from "./MenuKebabContact";

export default function MapContact({
  filterSelected,
  contacts,
  setContacts,
  setCategoryUpdated,
}) {
  const [openMenuContactId, setOpenMenuContactId] = useState(null);

  // ouvrir le menu du contact sur lequel on clique
  const handleClick = (id) => {
    setOpenMenuContactId(openMenuContactId === id ? null : id);
  };

  // Fonction pour filtrer les contacts en fonction de la catégorie sélectionnée
  const filterContacts = () => {
    if (!filterSelected) {
      return contacts; // Si aucune catégorie n'est sélectionnée, renvoyer tous les contacts
    }
    if (filterSelected === "Toutes") {
      return contacts; // Si la catégorie sélectionnée est "Toutes", renvoyer tous les contacts
    }
    return contacts.filter(
      ({ c_cat_contact_id }) => c_cat_contact_id === filterSelected
    ); // Filtrer les contacts pour n'afficher que ceux qui appartiennent à la catégorie sélectionnée
  };

  return (
    <>
      {filterContacts().map(({ c_name, c_phone, c_email, c_address, c_id }) => (
        <div
          key={c_id}
          className="flex items-center justify-between p-4 border-b border-blue-lighter"
        >
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
              onClick={() => handleClick(c_id)}
            >
              <HiOutlineDotsVertical className="text-blue-medium cursor-pointer text-3xl" />
            </button>
            {openMenuContactId === c_id && (
              <div>
                <MenuKebabContact
                  contact={{
                    id: c_id,
                    name: c_name,
                    phone: c_phone,
                    email: c_email,
                    address: c_address,
                  }}
                  setContacts={setContacts}
                  setCategoryUpdated={setCategoryUpdated}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
