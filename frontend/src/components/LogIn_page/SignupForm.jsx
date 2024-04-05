import { useState } from "react";
import { FaRegHandPointDown } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SignupForm() {
  // Gérer les données rentrées dans le formulaire
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // quand le user rentre des données dans le formulaire, on update notre state dataForm
  const handlChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  // console.info("dataForm", dataForm);

  // au submit du formulaire, on envoie dataForm au backend pour créer le user
  const handlSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3310/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("SignUp res :>> ", res);
        // alert(res);
      })
      .catch((err) => console.info("err :>> ", err));
  };

  return (
    <div>
      {/* Bouton flèche retour à la landing page */}
      <Link to="/">
        <FaCircleArrowLeft className="text-blue-default text-3xl mt-2" />
      </Link>
      <div className="flex flex-col items-center my-5">
        <h1 className=" text-3xl font-bold text-center px-10">
          Facilitez-vous la vie et inscrivez-vous !
        </h1>
        <FaRegHandPointDown className="m-3 text-3xl text-green-default" />
      </div>

      {/* Formulaire d'inscription */}
      <form
        className="flex flex-col text-blue-default text-xl mx-5"
        onSubmit={handlSubmit}
      >
        <label htmlFor="name" className="font-bold">
          Prénom
        </label>
        <input
          id="name"
          name="name"
          value={dataForm.name}
          type="text"
          placeholder="Quel est votre prénom ?"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
          onChange={handlChange}
        />
        <label htmlFor="email" className="font-bold mt-4">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="text"
          name="email"
          value={dataForm.email}
          placeholder="nom@exemple.com"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
          onChange={handlChange}
        />
        <label htmlFor="password" className="font-bold mt-4">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={dataForm.password}
          placeholder="Top secret"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
          onChange={handlChange}
        />
        <button
          type="submit"
          className="bg-blue-default h-12 mt-10 mb-7 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        >
          CONTINUER
        </button>
        <p className="text-center">J'ai déjà un compte : me connecter</p>
      </form>
    </div>
  );
}
