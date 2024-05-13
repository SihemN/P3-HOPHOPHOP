/* eslint-disable react/prop-types */
import { Checkbox } from "@mui/material";
import AddEventFormButton from "./AddEventFormButton";
import RedStarForRequiredInput from "../to-reuse/RedStarForRequiredInput";
import ErrorInputForm from "./ErrorInputForm";

export default function FormEvent({
  handleSubmit,
  dataEvent,
  handleChange,
  errors,
  handleClickButtonCancel,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-dark-default text-xl m-5  bg-cream p-5 pt-2 border-[1px] border-blue-default rounded-2xl shadow-2xl"
    >
      <label htmlFor="name" className="font-bold mt-4">
        Nom de l'événement <RedStarForRequiredInput />
      </label>
      <input
        type="text"
        name="title"
        value={dataEvent.title}
        placeholder={
          dataEvent.title !== "" ? dataEvent.title : "Ex : anniv chez Jojo"
        }
        required
        className={`border ${
          errors.title &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handleChange}
      />
      <ErrorInputForm error={errors.title} />
      <label htmlFor="name" className="font-bold mt-4">
        Description
      </label>
      <textarea
        name="text"
        value={dataEvent.text}
        placeholder={
          dataEvent.text !== ""
            ? dataEvent.text
            : "Lieu de l'événement, description, etc."
        }
        className={`border ${
          errors.text &&
          "border-red-default text-red-default focus:border-red-default"
        } border-solid border-dark-default h-12 my-1 py-2 px-5 rounded-lg placeholder:text-dark-default  focus:border-blue-default focus:border-2 focus:outline-none`}
        onChange={handleChange}
      />
      <ErrorInputForm error={errors.text} />

      <label htmlFor="dateStart" className="font-bold mt-4">
        Date de début <RedStarForRequiredInput />
      </label>
      <input
        type="datetime-local"
        name="dateStartToConvert"
        value={dataEvent.dateStartToConvert}
        required
        className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
        onChange={handleChange}
      />
      <label htmlFor="dateEnd" className="font-bold mt-4">
        Date de fin <RedStarForRequiredInput />
      </label>
      <input
        type="datetime-local"
        name="dateEndToConvert"
        value={dataEvent.dateEndToConvert}
        required
        className="w-full border border-solid border-dark-default h-12 mt-1 mr-1 py-2 px-5 rounded-lg placeholder:text-dark-default"
        onChange={handleChange}
      />
      <label
        htmlFor="isPrivate"
        aria-label="Checkbox pour masquer ou rendre visible un événement"
        className="flex items-center gap-5 font-bold mt-4"
      >
        <div>
          <p>Masquer aux membres du groupe ?</p>
          <p className="font-normal italic text-base ">Cocher pour masquer</p>
        </div>
        <Checkbox
          name="private"
          checked={dataEvent.isPrivate || dataEvent.private}
          onChange={handleChange}
          color="success"
        />
      </label>
      <div className="flex justify-center items-center pt-5  gap-2">
        <AddEventFormButton
          onClick={handleClickButtonCancel}
          type="button"
          label="Annuler"
          bgColor="cream"
          borderColor="blue-default"
          textColor="blue-default"
          hoverColor="orange-default"
          activeBgColor="orange-lighter"
        />

        <AddEventFormButton
          label="Enregistrer"
          type="submit"
          bgColor="blue-default"
          borderColor="blue-default"
          textColor="cream"
          hoverColor="green-default"
          activeBgColor="green-lighter"
        />
      </div>
    </form>
  );
}
