---
name: commitAndPush
description: Commit and push changes to the GitHub repository
argument-hint: commit message
---

Please commit the current changes to the GitHub repository with and appropriate commit message based on the changes made. Follow these guidelines:

1. **Pre-commit Checks**: Before committing, run the following checks:

   - `npm run lint` to check for linting errors
   - `npm run build` to run TypeScript type checks and ensure the project builds successfully
   - If either check fails, stop and report the errors to the user

2. **Use Conventional Commits**: Format the commit message as `<type>: <description>`, where `type` is one of `feat`, `fix`, `docs`, `refactor`, `style`, `test`, or `chore`. The description should be a concise summary of the changes.

   - Add a commit body with a bulleted list describing the specific changes made
   - Leave a blank line between the commit subject and body
   - Use bullet points starting with `-` for each change

3. **Atomic Commits**: Ensure each commit represents a single logical change. If multiple unrelated changes were made, create separate commits for each.

4. **Push Changes**: After committing, push the changes to the main branch of the GitHub repository.

5. **Review Before Committing**: Double-check the changes to ensure they are correct and complete before committing.

Here are some examples of well-formed commit messages:

- `feat: add recipe search component`
- `fix: resolve type error in App component`
- `docs: update README with setup instructions`
- `refactor: simplify useState logic in form`
- `style: format code with Prettier`
- `test: add unit tests for recipe parser`
- `chore: update dependencies to latest versions`

Example with commit body:

```
feat: add GitHub Actions workflow for deployment

- Add deploy.yml workflow for automated GitHub Pages deployment
- Configure Vite base path for GitHub Pages
- Set up build and deploy jobs with proper permissions
```
