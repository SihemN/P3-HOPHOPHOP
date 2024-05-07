/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
import notify from "../Notify/Notify";

export default function CreateContactForm({
  setComponentToShow,
  setCategoryUpdated,
}) {
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [category, setCategory] = useState([]);
  // stocke id de catégorie et la met à jour si une est sélectionnée
  const [categorySelected, setCategorySelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // stocke une liste filtrée de catégories et met à jour si le filtre est appliqué
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickNewCat = ({ name, id }) => {
    setCategorySelected({ name, id });
    setIsOpen(false);
  };

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
    }
    try {
      const { ug_group_id } = JSON.parse(localStorage.getItem("group"));

      const response = await fetch(
        `http://localhost:3310/api/contacts/groups/${ug_group_id}/category/${categorySelected.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify(dataForm),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        notify(
          "errorCreation",
          errorResponse.message || "Vérifiez vos données"
        );
      }
      notify("success", "Contact créé");
      setTimeout(() => {
        navigate("/contacts");
      }, 2000);
      setDataForm({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
      setCategoryUpdated((prev) => !prev);
      setComponentToShow(null);
    } catch (error) {
      console.error("Erreur lors de la création du contact:", error);
    }
  };

  return (
    <div className="flex flex-col items-center text-blue-default">
      <form className="pt-10" onSubmit={handleSubmit}>
        <label htmlFor="Name" className="font-bold">
          Nom et prénom
        </label>
        <RedStarForRequiredInput />
        <div className="pt-1 pb-4">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className={`border focus:outline-none h-12 w-72 rounded-lg pl-2 ${
              errors.name
                ? "border-red-default text-red-default"
                : "border-dark-default"
            }`}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="text-red-default">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="Phone" className="font-bold">
            Téléphone
          </label>
          <RedStarForRequiredInput />
          <div className="pt-1 pb-4">
            <input
              type="tel"
              name="phone"
              placeholder="06 12 34 56 78"
              className={`border focus:outline-none h-12 w-72 rounded-lg pl-2 ${
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
        <div>
          <label htmlFor="Email" className="font-bold">
            Adresse e-mail
          </label>
          <RedStarForRequiredInput />
          <div className="pt-1 pb-4">
            <input
              type="text"
              name="email"
              placeholder="johndoe@email.com"
              className={`border focus:outline-none h-12 w-72 rounded-lg pl-2 ${
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
        <div>
          <label htmlFor="Address" className="font-bold">
            Adresse
          </label>
          <RedStarForRequiredInput />
          <div className="pt-1 pb-4">
            <input
              type="text"
              name="address"
              placeholder="123 Route des Algo 01010 Map"
              className={`border focus:outline-none h-12 w-72 rounded-lg pl-2 ${
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
        <label htmlFor="Category" className="relative font-bold">
          Catégorie
          <RedStarForRequiredInput />
          <button
            type="button"
            className="w-full border border-solid border-dark-default h-12 mt-1 py-2 px-5 rounded-lg flex justify-start"
            onClick={handleClick}
          >
            {categorySelected === null
              ? "-- Choisir une catégorie --"
              : categorySelected.name}
            <IoChevronDownSharp className="absolute top-15 left-60 mt-1 text-dark-default" />
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
                    className="h-12 py-2 px-5 hover:bg-blue-lighter text-left rounded-lg hover:font-semibold"
                  >
                    {cc_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </label>
        <button
          type="submit"
          className="bg-blue-lighter shadow-lg w-72 rounded-lg text-dark-default font-bold h-9 hover:bg-green-lighter border-dark-shadow my-3"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

// setDataRecipe({
//   name: "",
//   description: "",
//   nb_persons: "",
//   list_ingredients: "",
//   category: "",
//   time_preparation: "",
// });
