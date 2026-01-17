import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

export default function App() {
  return (
    <BrowserRouter basename="/recettes/">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/:slug" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
}
