/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
import notify from "../Notify/Notify";

export default function ProfilForm() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    userName: user.data.u_name,
    email: user.data.u_email,
  });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
  });

  const handleProfileErrors = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "userName":
        newErrors.userName = /^[A-Za-zÀ-ÖØ-öø-ÿ]*$/.test(value)
          ? ""
          : "Le prénom ne doit contenir que des lettres.";
        break;
      case "email":
        newErrors.email = /^[A-Za-z0-9_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
          value
        )
          ? ""
          : "Adresse e-mail non valide.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleProfileErrors(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      try {
        const response = await fetch("http://localhost:3310/api/users/update", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({
            name: formData.userName,
            email: formData.email,
          }),
        });

        if (!response.ok) {
          // throw new Error(`Erreur Status: ${response.status}`);
          notify("errorCreation", "Vérifiez vos données");
        }
        notify("success", "Profil mis à jour");
      } catch (error) {
        console.error("Erreur lors de la mise à jour", error);
      }
    } else {
      notify("errorCreation", "Vérifiez vos données");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="pt-8">
        <label htmlFor="userName" className="font-semibold">
          Prénom
        </label>
        <RedStarForRequiredInput />
        <div>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="John"
            onChange={handleChange}
            value={formData.userName}
            required
            className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
              errors.userName
                ? "border-red-default text-red-default"
                : "border-dark-default"
            }`}
          />
          {errors.userName && (
            <p className="text-red-default">{errors.userName}</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="font-semibold">
            Adresse e-mail
          </label>
          <RedStarForRequiredInput />
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              placeholder="johndoe@email.com"
              className={`border focus:outline-none h-12 w-80 rounded-lg pl-2 ${
                errors.email
                  ? "border-red-default text-red-default"
                  : "border-dark-default"
              }`}
            />
            {errors.email && <p className="text-red-default">{errors.email}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-default w-80 py-1 rounded-lg text-cream shadow-lg mt-4 hover:bg-green-default hover:animate-scaleUp"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
