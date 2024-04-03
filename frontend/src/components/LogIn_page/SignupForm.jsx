export default function SignupForm() {
  return (
    <form className="flex flex-col text-blue-default text-xl mx-5 ">
      <label htmlFor="name" className="font-bold">
        Nom
      </label>
      <input
        id="name"
        type="text"
        placeholder="Quel est votre prénom ?"
        className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
      />
      <label htmlFor="email" className="font-bold mt-5">
        Adresse e-mail
      </label>
      <input
        id="email"
        type="text"
        placeholder="nom@exemple.com"
        className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
      />
      <label htmlFor="password" className="font-bold mt-5">
        Mot de passe
      </label>
      <input
        id="password"
        type="password"
        placeholder="Top secret"
        className="border border-solid border-blue-default h-12 mt-1 py-2 px-5 rounded-lg placeholder:text-blue-default"
      />
      <button
        type="submit"
        className="bg-blue-default h-12 mt-10 mb-7 py-2 px-5 rounded-lg text-cream font-semibold shadow-md shadow-dark-shadow"
      >
        CONTINUER
      </button>
      <p className="text-center">J'ai déjà un compte : me connecter</p>
    </form>
  );
}
