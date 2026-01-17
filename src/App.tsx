import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import recipesIndex from "virtual:recipes-index";
import Recipe from "./Recipe";

interface Recipe {
  id: string;
  title: string;
  prepTime?: string;
  cookTime?: string;
}

function RecipeList() {
  return (
    <>
      <h1>My Recipes</h1>
      <div className="recipes-list">
        {recipesIndex.map((recipe: Recipe) => (
          <Link key={recipe.id} to={`/${recipe.id}`} className="recipe-card">
            <h2>{recipe.title}</h2>
            {(recipe.prepTime || recipe.cookTime) && (
              <p className="recipe-meta">
                {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
                {recipe.prepTime && recipe.cookTime && <span> / </span>}
                {recipe.cookTime && <span>Cook: {recipe.cookTime}</span>}
              </p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/recettes/">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/:slug" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
