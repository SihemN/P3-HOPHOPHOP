/* eslint-disable react/prop-types */

export default function UpdateCategory() {
  return (
    <div className="border border-blue-lighter mt-2 rounded-lg py-4">
      <h1 className="text-center font-semibold pb-4">Modifier la catégorie</h1>
      <form className="flex flex-col gap-2 px-4">
        <label htmlFor="category">Nom de la catégorie</label>
        <input
          type="text"
          placeholder="Nom de la catégorie"
          className="border border-gray pl-2 rounded-lg"
          required
        />
        <div className="flex justify-center flex-col font-semibold">
          <button
            type="submit"
            className="bg-blue-lighter py-1 rounded-lg text-dark-default shadow-lg mt-4 hover:bg-green-lighter"
          >
            Enregistrer
          </button>
          <button
            type="submit"
            className="bg-orange-lighter py-1 rounded-lg text-dark-default shadow-lg mt-4 hover:bg-red-default"
          >
            Supprimer la catégorie
          </button>
        </div>
      </form>
    </div>
  );
}
