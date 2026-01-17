# Recipe Conversion Prompt

Use this prompt when you want to convert a recipe to the standard markdown format:

---

**Prompt:**

Please translate this recipe into English and create a markdown file in the `src/receipes` folder. Keep the original recipe name as the title. Use a slugified version of the recipe title for the filename (lowercase, hyphens instead of spaces, remove special characters).

Format the recipe as follows:
- Title: `# [Original Recipe Name]`
- If timing info is available: `**Prep:** X min / **Cook:** X min / **Total:** X min`
- If servings info is available: `**Serves:** X`
- Ingredients section: `## Ingredients` with bulleted list
- Directions section: `## Directions` with numbered list

Keep measurements consistent and clear. Translate ingredient names and cooking instructions accurately.

**[Paste recipe content here]**

---

## Example Output Structure

```markdown
# Recipe Name

**Prep:** 15 min / **Cook:** 30 min

**Serves:** 4

## Ingredients

- Item 1
- Item 2
- etc.

## Directions

1. Step 1
2. Step 2
3. etc.
```

## Tips

- Remove any website navigation, ads, or unrelated content
- Focus only on the recipe title, ingredients, and cooking instructions
- Timing and serving information should be included if present in the source
- Keep the original recipe name (don't translate it) as the title
- Filename should be fully slugified: `recipe-name.md`
