import { FaCircleArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div>
      <Link to="/index">
        <FaCircleArrowLeft className="text-blue-default text-3xl mt-2" />
      </Link>

      <div className="flex flex-col items-center my-5">
        <h1 className="text-2xl font-bold text-center px-10">
          Bonjour,👋 <br />
          content de vous revoir !
        </h1>
      </div>

      {/* Formulaire d'inscription */}
      <form className="flex flex-col text-blue-default text-xl mx-5">
        <label htmlFor="email" className="font-bold mt-4">
          Adresse e-mail
        </label>
        <input
          type="email"
          name="email"
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
          placeholder="Mon mot de passe top secret"
          className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
        />
        <button
          type="submit"
          className="bg-blue-default h-12 mt-10 mb-7 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
        >
          CONTINUER
        </button>
        <p className="text-center underline py-2 hover:text-green-default">
          Je veux créer un compte
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
