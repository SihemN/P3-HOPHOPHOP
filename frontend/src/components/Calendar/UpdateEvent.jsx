import ButtonPenModify from "../Recipes/ButtonPenModify";

export default function UpdateEvent() {
  return (
    <div className="text-sm">
      <ButtonPenModify
        label="ouvrir le formulaire pour modifier l'événement"
        colorBg="bg-blue-default"
        className="text-md p-1 h-6 w-6 text-center rounded-full hover:bg-green-default active:bg-green-lighter"
      />
    </div>
  );
}
