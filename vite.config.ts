import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { recipesIndexPlugin } from "./plugins/recipes-index-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), recipesIndexPlugin()],
  base: "/recettes/",
});
