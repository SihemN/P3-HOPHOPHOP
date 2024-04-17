export default function CreateContactForm() {
  return (
    <div className="flex flex-col items-center text-blue-default">
      <form className="pt-10">
        <label htmlFor="Name" className="font-bold">
          Nom et prénom
        </label>
        <div className="pt-1 pb-4">
          <input
            type="text"
            placeholder="John Doe"
            className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
          />
        </div>
        <div>
          <label htmlFor="Phone" className="font-bold">
            Téléphone
          </label>
          <div className="pt-1 pb-4">
            <input
              type="tel"
              placeholder="06 12 34 56 78"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
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
              placeholder="johndoe@email.com"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
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
              placeholder="123 Route des Algo 01010 Map"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
            />
          </div>
        </div>
        <div>
          <label htmlFor="Category" className="font-bold">
            Catégorie
          </label>
          <div className="pt-1 pb-4">
            <input
              type="text"
              placeholder="Ecole"
              className="border border-blue-medium rounded-lg h-12 pl-2 w-72"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-lighter shadow-lg w-72 rounded-lg text-dark-default font-bold h-9 hover:bg-green-lighter border-dark-shadow"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
