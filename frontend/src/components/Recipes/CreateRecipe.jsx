import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FormUpdateRecipe from "./FormCreateRecipe";
import FooterBack from "./FooterBack";

export default function CreateRecipe() {
  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <main className="flex flex-col rounded-t-3xl lg:rounded-t-[4rem] bg-cream h-custom shadow-top">
        <h1 className="text-center my-5 font-bold text-2xl">
          Ajouter une nouvelle recette
        </h1>
        <FormUpdateRecipe />
      </main>
      <FooterBack text="Retourner aux recettes" to="/recipes" />
    </div>
  );
}
