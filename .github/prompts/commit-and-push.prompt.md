---
name: commitAndPush
description: Commit and push changes to the GitHub repository
argument-hint: commit message
---

Please commit the current changes to the GitHub repository with and appropriate commit message based on the changes made. Follow these guidelines:

1. **Use Conventional Commits**: Format the commit message as `<type>: <description>`, where `type` is one of `feat`, `fix`, `docs`, `refactor`, `style`, `test`, or `chore`. The description should be a concise summary of the changes.

2. **Atomic Commits**: Ensure each commit represents a single logical change. If multiple unrelated changes were made, create separate commits for each.

3. **Push Changes**: After committing, push the changes to the main branch of the GitHub repository.

4. **Review Before Committing**: Double-check the changes to ensure they are correct and complete before committing.

Here are some examples of well-formed commit messages:

- `feat: add recipe search component`
- `fix: resolve type error in App component`
- `docs: update README with setup instructions`
- `refactor: simplify useState logic in form`
- `style: format code with Prettier`
- `test: add unit tests for recipe parser`
- `chore: update dependencies to latest versions`
