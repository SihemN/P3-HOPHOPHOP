import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FooterBack from "./FooterBack";
import FormCreateRecipe from "./FormCreateRecipe";

export default function CreateRecipe() {
  return (
    <div className="font-Neue-Kabel bg-red-default lg:bg-opacity-0">
      <div className="lg:hidden">
        <HeaderFunctionnalities
          title="Vos recettes"
          color="text-red-default"
          icon={icon}
        />
      </div>
      <main className="rounded-t-3xl lg:mt-5 bg-cream lg:bg-opacity-0 shadow-top lg:shadow-none flex flex-col lg:w-3/4 mx-auto">
        <h1 className="bg-red-default mx-auto text-cream text-xl rounded-[12px] h-fit w-fit px-4 my-5">
          Ajouter une nouvelle recette
        </h1>
        <FormCreateRecipe />
      </main>
      <div className="lg:hidden">
        <FooterBack text="Retourner aux recettes" to="/recipes" />
      </div>
    </div>
  );
}
