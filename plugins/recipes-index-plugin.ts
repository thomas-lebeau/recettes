import { readdir, readFile } from "fs/promises";
import { join } from "path";
import type { Plugin } from "vite";

interface RecipeIndex {
  id: string;
  title: string;
  prepTime?: string;
  cookTime?: string;
}

export function recipesIndexPlugin(): Plugin {
  const RECIPES_DIR = "src/recipes";
  const VIRTUAL_MODULE_ID = "virtual:recipes-index";
  const RESOLVED_VIRTUAL_MODULE_ID = "\0" + VIRTUAL_MODULE_ID;

  let recipesCache: RecipeIndex[] = [];

  async function generateIndex() {
    try {
      const files = await readdir(RECIPES_DIR);
      const markdownFiles = files.filter((file) => file.endsWith(".md"));

      const recipes: RecipeIndex[] = [];

      for (const file of markdownFiles) {
        const filePath = join(RECIPES_DIR, file);
        const content = await readFile(filePath, "utf-8");

        // Extract title from first # heading
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : file.replace(".md", "");

        // Extract prep/cook time if present (optional total is excluded)
        const metaMatch = content.match(
          /\*\*Prep:\*\*\s+([^/]+)\/\s*\*\*Cook:\*\*\s+([^\n/]+)(?:\s*\/\s*\*\*Total:\*\*\s+[^\n]+)?/
        );

        const recipe: RecipeIndex = {
          id: file.replace(".md", ""),
          title,
        };

        // Only add prepTime and cookTime if they exist
        if (metaMatch) {
          const prepTime = metaMatch[1].trim();
          const cookTime = metaMatch[2].trim();
          if (prepTime) recipe.prepTime = prepTime;
          if (cookTime) recipe.cookTime = cookTime;
        }

        recipes.push(recipe);
      }

      // Sort recipes alphabetically by title
      recipes.sort((a, b) => a.title.localeCompare(b.title));

      recipesCache = recipes;
      console.log(`✓ Generated recipes index with ${recipes.length} recipes`);

      return recipes;
    } catch (error) {
      console.error("Error generating recipes index:", error);
      throw error;
    }
  }

  return {
    name: "recipes-index",

    async buildStart() {
      // Generate index at the start of the build
      await generateIndex();
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return `export default ${JSON.stringify(recipesCache, null, 2)}`;
      }
    },

    async handleHotUpdate({ file, server }) {
      // Regenerate index when recipe files change in dev mode
      if (file.includes("src/recipes") && file.endsWith(".md")) {
        await generateIndex();

        // Invalidate the virtual module
        const module = server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_MODULE_ID
        );
        if (module) {
          server.moduleGraph.invalidateModule(module);
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      }
    },
  };
}
