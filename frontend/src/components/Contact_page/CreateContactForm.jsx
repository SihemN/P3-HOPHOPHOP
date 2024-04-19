/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function CreateContactForm() {
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
        throw new Error("Erreur lors de la crétion du contact");
      }
      navigate("/contacts");
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
        <div className="pt-1 pb-4">
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Phone" className="font-bold">
            Téléphone
          </label>
          <div className="pt-1 pb-4">
            <input
              type="tel"
              name="phone"
              placeholder="06 12 34 56 78"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="Email" className="font-bold">
            Adresse e-mail
          </label>
          <div className="pt-1 pb-4">
            <input
              type="text"
              name="email"
              placeholder="johndoe@email.com"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="Address" className="font-bold">
            Adresse
          </label>
          <div className="pt-1 pb-4">
            <input
              type="text"
              name="address"
              placeholder="123 Route des Algo 01010 Map"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <label htmlFor="Category" className="relative font-bold">
          Catégorie
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
