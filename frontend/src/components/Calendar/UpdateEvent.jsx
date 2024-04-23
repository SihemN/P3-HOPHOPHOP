import ButtonPenModify from "../Recipes/ButtonPenModify";

export default function UpdateEvent() {
  return (
    <ButtonPenModify
      label="ouvrir le formulaire pour modifier l'événement"
      className="bg-blue-default h-7 w-7 rounded-full hover:bg-green-default active:bg-green-lighter flex justify-center items-center"
      iconSize="text-md"
    />
  );
}
