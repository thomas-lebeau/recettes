---
name: convertRecipe
description: Convert recipe text into standardized English markdown format
argument-hint: recipe text to convert
---

Please translate the provided recipe into English and create a markdown file in the specified recipes folder. Keep the original recipe name as the title. Use a slugified version of the recipe title for the filename (lowercase, hyphens instead of spaces, remove special characters).

Format the recipe with the following structure:

- Title: `# [Original Recipe Name]`
- If timing information is available: `**Prep:** X min / **Cook:** X min / **Total:** X min`
- If servings information is available: `**Serves:** X`
- Ingredients section: `## Ingredients` with bulleted list
- Directions section: `## Directions` with numbered list

Requirements:

- Keep measurements consistent and clear
- Translate ingredient names and cooking instructions accurately
- Remove any website navigation, ads, or unrelated content
- Focus only on the recipe title, ingredients, and cooking instructions
- Keep the original recipe name (don't translate it) as the title
- Ensure the filename is fully slugified
