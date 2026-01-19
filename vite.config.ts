import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { recipesIndexPlugin } from "./plugins/recipes-index-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    recipesIndexPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["vite.svg"],
      manifest: {
        name: "Recettes",
        short_name: "Recettes",
        description: "A personal collection of recipes",
        theme_color: "#0d1117",
        background_color: "#0d1117",
        display: "standalone",
        start_url: "/recettes/#/",
        icons: [
          {
            src: "/recettes/vite.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,md}"],
      },
    }),
  ],
  base: "/recettes/",
});
