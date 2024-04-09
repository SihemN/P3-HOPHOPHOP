import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { VscKebabVertical } from "react-icons/vsc";

export default function MapContact() {
  const contacts = [
    {
      id: 1,
      name: "Anaïs Glorennec",
      email: "anais@gmail.com",
      phone: "0625459875",
      adress: "1 rue du frontend 69000 hophophop city",
      category: "Ecole",
    },
    {
      id: 2,
      name: "Sihem Nasri",
      email: "sihem@gmail.com",
      phone: "0652455622",
      adress: "2 rue du frontend 69000 hophophop city",
      category: "Medecin",
    },
    {
      id: 3,
      name: "Arthur Vincent-Silvestrini",
      email: "arthur@gmail.com",
      phone: "0652366951",
      adress: "3 rue du frontend 69000 hophophop city",
      category: "Les fantômes",
    },
    {
      id: 4,
      name: "Soumia Amar",
      email: "soumia@gmail.com",
      phone: "0656221445",
      adress: "4 rue du frontend 69000 hophophop city",
      category: "Travail",
    },
  ];
  return (
    <>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center justify-between p-4 border-b border-blue-lighter"
        >
          <div>
            <div className="font-bold pb-2">{contact.name}</div>
            <div className="text-sm text-gray-600">
              <a href={`tel:${contact.phone}`} className="flex">
                <FaPhone className="mr-2 text-blue-medium" />
                {contact.phone}
              </a>
            </div>
            <div className="text-sm text-gray-600">
              <a href={`mailto:${contact.email}`} className="flex">
                <IoIosMail className="mr-2 text-blue-medium" />
                {contact.email}
              </a>
            </div>
          </div>
          <div>
            <VscKebabVertical className="text-blue-medium cursor-pointer" />
          </div>
        </div>
      ))}
    </>
  );
}
