import { useLocation } from "react-router-dom";

export default function ShowRecipeMobile() {
  const location = useLocation();
  const { recipe } = location.state;

  return <div>{recipe && recipe.name}</div>;
}
