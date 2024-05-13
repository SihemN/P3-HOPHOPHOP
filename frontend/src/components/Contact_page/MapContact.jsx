/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DivContactPc from "./DivContactPc";
import DivContactMobile from "./DivContactMobile";

export default function MapContact({
  filterSelected,
  contacts,
  setContacts,
  setCategoryUpdated,
  onSelectContact,
  setComponentToShow,
  handleUpdateContactClick,
}) {
  const [openMenuContactId, setOpenMenuContactId] = useState(null);

  const handleClick = (contact) => {
    onSelectContact(contact);
    setComponentToShow("contact details");
  };

  const filterContacts = () => {
    if (!filterSelected) {
      return contacts;
    }
    if (filterSelected === "Toutes") {
      return contacts;
    }
    return contacts.filter(
      ({ c_cat_contact_id }) => c_cat_contact_id === filterSelected
    );
  };

  return (
    <div className="overflow-y-auto no-scrollbar h-full">
      {contacts &&
        contacts.length > 0 &&
        filterContacts().map((contact) => (
          <React.Fragment key={contact.c_id}>
            <div className="hidden lg:block">
              <div
                type="button"
                aria-label="Afficher les détails du contact"
                className="w-full"
              >
                <DivContactPc
                  contact={contact}
                  openMenuContactId={openMenuContactId}
                  setOpenMenuContactId={setOpenMenuContactId}
                  setContacts={setContacts}
                  setCategoryUpdated={setCategoryUpdated}
                  handleUpdateContactClick={handleUpdateContactClick}
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="block lg:hidden">
              <DivContactMobile
                contact={contact}
                openMenuContactId={openMenuContactId}
                setOpenMenuContactId={setOpenMenuContactId}
                setContacts={setContacts}
                setCategoryUpdated={setCategoryUpdated}
              />
            </div>
          </React.Fragment>
        ))}
      {!contacts ||
        (contacts.length === 0 && (
          <p className="pl-6 mt-4 font-semibold text-lg">
            Vous n'avez pas de contact
          </p>
        ))}
    </div>
  );
}
