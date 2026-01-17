/// <reference types="vite/client" />

declare module "virtual:recipes-index" {
  interface Recipe {
    id: string;
    title: string;
    prepTime?: string;
    cookTime?: string;
  }

  const recipes: Recipe[];
  export default recipes;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}
