import "./App.css";
import recipesIndex from "virtual:recipes-index";

interface Recipe {
  id: string;
  title: string;
  prepTime?: string;
  cookTime?: string;
}

function App() {
  return (
    <>
      <h1>My Recipes</h1>
      <div className="recipes-list">
        {recipesIndex.map((recipe: Recipe) => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.title}</h2>
            {(recipe.prepTime || recipe.cookTime) && (
              <p className="recipe-meta">
                {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
                {recipe.prepTime && recipe.cookTime && <span> / </span>}
                {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
