import { Link } from "react-router-dom";
import recipesIndex from "virtual:recipes-index";

interface Recipe {
  id: string;
  title: string;
  prepTime?: string;
  cookTime?: string;
}

export default function RecipeList() {
  return (
    <>
      <h1>My Recipes</h1>
      <ul>
        {recipesIndex.map((recipe: Recipe) => (
          <li key={recipe.id}>
            <Link to={`/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
