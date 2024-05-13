import { useState } from "react";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  // on gère le useNavigate
  const navigate = useNavigate();
  // Gérer les données rentrées dans le formulaire
  const [dataForm, setDataForm] = useState({
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
    fetch("http://localhost:3310/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForm),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.info("Login res :>> ", res);
        localStorage.clear();
        localStorage.setItem("token", JSON.stringify(res.token));
        // stocke le role dans le localstorage
        // localStorage.setItem("role", JSON.stringify(res.role));
        if (res.token) {
          navigate("/home");
        }
      })
      .catch((err) => console.info("err :>> ", err));
  };

  return (
    <div>
      <Link to="/">
        <FaCircleArrowLeft className="text-blue-default text-3xl mt-2" />
      </Link>

      <div className="flex flex-col items-center my-5">
        <h1 className="text-2xl font-bold text-center px-10">
          Bonjour,👋 <br />
          content de vous revoir !
        </h1>
      </div>

      {/* Formulaire d'inscription */}
      <form
        onSubmit={handlSubmit}
        className="flex flex-col text-blue-default text-xl mx-5"
      >
        <label htmlFor="email" className="font-bold mt-4">
          Adresse e-mail
        </label>
        <input
          type="email"
          name="email"
          value={dataForm.email}
          onChange={handlChange}
          placeholder="nom@exemple.com"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default font-normal"
        />
        <label
          htmlFor="password"
          className="font-bold mt-4 flex justify-between"
        >
          Mot de passe
          <Link
            to="/"
            className="font-normal underline hover:text-green-default
            "
          >
            Mot de passe oublié ?
          </Link>
        </label>

        <input
          type="password"
          name="password"
          value={dataForm.password}
          onChange={handlChange}
          placeholder="Mon mot de passe top secret"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
        />
        <button
          type="submit"
          className="bg-blue-default h-12 mt-10 mb-7 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow  hover:bg-green-default active:bg-green-lighter"
        >
          CONTINUER
        </button>
        <Link to="/signup">
          <p className="text-center underline py-2 hover:text-green-default">
            Je veux créer un compte
          </p>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
