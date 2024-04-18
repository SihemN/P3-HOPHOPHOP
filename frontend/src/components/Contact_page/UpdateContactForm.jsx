/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */

export default function UpdateContactForm({ contact }) {
  const storedCategory = JSON.parse(localStorage.getItem("category"));
  const [categorySelected, setCategorySelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filteredCategories, setFilteredCategories] = useState([]);

  // stocker les données du contact à modifier dans un state pour préremplir le formulaire
  const [dataForm, setDataForm] = useState({
    name: contact.c_name,
    phone: contact.c_phone,
    email: contact.c_email,
    address: contact.c_address,
    category: storedCategory,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { ug_group_id } = JSON.parse(localStorage.getItem("group"));
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token manquant");
        }
        const response = await fetch(
          `http://localhost:3310/api/contacts-categories/groups/${ug_group_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des catégories de contacts"
          );
        }
        const { results } = await response.json();
        setCategory(results);
        setFilteredCategories(results);

        const contactCategory = results.find(
          (cat) => cat.cc_id === contact.c_cat_contact_id
        );
        if (contactCategory) {
          setCategorySelected({
            name: contactCategory.cc_name,
            id: contactCategory.cc_id,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [contact]);

  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categorySelected) {
      // eslint-disable-next-line no-alert
      alert("Veuillez sélectionner une catégorie");
      return;
    }

    const updatedDataForm = {
      ...dataForm,
      cat_contact_id: categorySelected.id,
    };
    delete updatedDataForm.category;

    try {
      const response = await fetch(
        `http://localhost:3310/api/contacts/${contact.c_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(updatedDataForm),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du contact");
      }
      navigate("/contacts");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickNewCat = ({ name, id }) => {
    setCategorySelected({ name, id });
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col items-center text-dark-default">
      <form className="pt-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="font-bold">
          Nom et prénom
        </label>
        <div>
          <input
            type="text"
            name="name"
            defaultValue={contact.c_name}
            className="border border-blue-medium h-12 w-80 rounded-lg pl-2"
            onChange={handlChange}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-bold">
            Adresse e-mail
          </label>
          <div>
            <input
              type="email"
              name="email"
              defaultValue={contact.c_email}
              className="border border-blue-medium h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="Téléphone" className="font-bold">
            Téléphone
          </label>
          <div>
            <input
              type="text"
              name="phone"
              defaultValue={contact.c_phone}
              className="border border-blue-medium h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="address" className="font-bold">
            Adresse
          </label>
          <div>
            <input
              type="text"
              name="address"
              defaultValue={contact.c_address}
              className="border border-blue-medium h-12 w-80 rounded-lg pl-2"
              onChange={handlChange}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="Category" className="relative font-bold">
            Catégorie
            <button
              type="button"
              className="w-full border border-solid border-blue-medium h-12 mt-1 py-2 px-5 rounded-lg flex justify-start"
              onClick={handleClick}
            >
              {categorySelected === null
                ? storedCategory
                : categorySelected.name}
              <IoChevronDownSharp className="absolute left-64 mt-1 text-dark-default" />
            </button>
            <div>
              {isOpen && (
                <div className=" flex flex-col justify-start  border border-dark-default rounded-lg ">
                  {category.map(({ cc_id, cc_name }) => (
                    <button
                      type="button"
                      key={cc_id}
                      name="category"
                      value={cc_name}
                      onClick={() =>
                        handleClickNewCat({ name: cc_name, id: cc_id })
                      }
                      className="h-12 py-2 px-5 hover:bg-blue-lighter text-left rounded-lg hover:font-semibold border border-blue-lighter"
                    >
                      {cc_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-medium w-80 py-1 rounded-lg text-dark-default shadow-lg mt-4 font-bold hover:bg-green-lighter"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
