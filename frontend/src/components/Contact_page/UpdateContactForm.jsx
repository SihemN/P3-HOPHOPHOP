/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
import notify from "../Notify/Notify";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";

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

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleErrors = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/.test(value)
          ? ""
          : "Le nom ne doit contenir que des lettres.";
        break;
      case "phone":
        newErrors.phone = /^\d{10}$/.test(value)
          ? ""
          : "Le numéro de téléphone doit contenir 10 chiffres.";
        break;
      case "email":
        newErrors.email = /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          value
        )
          ? ""
          : "Adresse e-mail non valide.";
        break;
      case "address":
        newErrors.address =
          value.trim() !== "" ? "" : "L'adresse ne peut pas être vide.";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

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
          notify("errorCreation", "Veuillez sélectionner une catégorie");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
    handleErrors(name, value);
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
        const errorResponse = await response.json();
        notify(
          "errorCreation",
          errorResponse.message || "Vérifiez vos données"
        );
      }
      notify("success", "Contact mis à jour");
      setTimeout(() => {
        navigate("/contacts");
      }, 2000);
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
        <RedStarForRequiredInput />
        <div>
          <input
            type="text"
            name="name"
            defaultValue={contact.c_name}
            className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
              errors.name
                ? "border-red-default text-red-default"
                : "border-dark-default"
            }`}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-default">{errors.name}</p>}
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-bold">
            Adresse e-mail
          </label>
          <RedStarForRequiredInput />

          <div>
            <input
              type="email"
              name="email"
              defaultValue={contact.c_email}
              className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
                errors.email
                  ? "border-red-default text-red-default"
                  : "border-dark-default"
              }`}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-default">{errors.email}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="Téléphone" className="font-bold">
            Téléphone
          </label>
          <RedStarForRequiredInput />
          <div>
            <input
              type="text"
              name="phone"
              defaultValue={contact.c_phone}
              className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
                errors.phone
                  ? "border-red-default text-red-default"
                  : "border-dark-default"
              }`}
              onChange={handleChange}
              required
            />
            {errors.phone && <p className="text-red-default">{errors.phone}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="font-bold">
            Adresse
          </label>
          <RedStarForRequiredInput />
          <div>
            <input
              type="text"
              name="address"
              defaultValue={contact.c_address}
              className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
                errors.address
                  ? "border-red-default text-red-default"
                  : "border-dark-default"
              }`}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <p className="text-red-default">{errors.address}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="Category" className="relative font-bold">
            Catégorie
            <RedStarForRequiredInput />
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
          className="bg-blue-medium w-80 py-1 rounded-lg text-dark-default shadow-lg mt-4 font-bold hover:bg-green-lighter hover:animate-scaleUp"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
