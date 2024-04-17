import HeaderFunctionnalities from "../HeaderFunctionnalities";
import icon from "../../assets/icons-functionnalities/recipe.svg";
import FooterBack from "./FooterBack";
import ShowRecipeDetails from "./ShowRecipeDetails";

export default function ShowRecipeMobile() {
  return (
    <div className="font-Neue-Kabel bg-red-default">
      <HeaderFunctionnalities
        title="Vos recettes"
        color="text-red-default"
        icon={icon}
      />
      <ShowRecipeDetails />
      <FooterBack text="Retourner aux recettes" to="/recipes" />
    </div>
  );
}
