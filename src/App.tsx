import { HashRouter, Routes, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/:slug" element={<Recipe />} />
      </Routes>
    </HashRouter>
  );
}
