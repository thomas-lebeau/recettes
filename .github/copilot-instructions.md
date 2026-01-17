# Copilot Instructions for Recettes

## Project Overview

**Recettes** is a React 19 + TypeScript + Vite project with a minimal setup focused on fast refresh development and modern tooling.

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.2 with Hot Module Replacement (HMR)
- **Linting**: ESLint 9 with TypeScript plugin and React Hooks plugin
- **Package Manager**: npm (see package.json for dependencies)

## Essential Architecture & Patterns

### Entry Point
- **main.tsx** - Renders the React app into the root DOM element with React StrictMode for development warnings
- **App.tsx** - Root component; currently a template demonstrating React hooks (useState) and Vite HMR capabilities
- **index.css** - Global styles; **App.css** contains component-specific styling

### Build & Dev Commands

```bash
npm run dev      # Start Vite dev server with HMR (localhost:5173)
npm run build    # TypeScript type-check + production build to dist/
npm run lint     # Run ESLint across all .ts/.tsx files
npm run preview  # Preview production build locally
```

**Key workflow**: Code changes in `src/` trigger HMR in the dev server—components re-render without full page reload, preserving component state.

## TypeScript Configuration

Two separate tsconfig files:
- **tsconfig.app.json** - For application code (src/)
- **tsconfig.node.json** - For build tooling (vite.config.ts, eslint.config.js)

Main **tsconfig.json** references both. When adding build-time code or modifying Vite config, ensure it's included in tsconfig.node.json.

## ESLint Rules & Conventions

Current rules enforced:
- ESLint recommended rules (js.configs.recommended)
- TypeScript ESLint recommended (tseslint.configs.recommended)
- React Hooks rules (reactHooks.configs.flat.recommended) - enforces hooks dependencies, exhaustive deps
- React Refresh (reactRefresh.configs.vite) - prevents invalid React Refresh boundaries

**Linting**: `npm run lint` before committing to catch type and hook violations early.

## Development Patterns to Follow

1. **React Hooks**: Use hooks (useState, useEffect, etc.) in functional components; avoid class components
2. **HMR-Safe Code**: The Vite React plugin uses Babel for Fast Refresh—avoid default exports of non-component values to prevent HMR issues
3. **TypeScript**: Always specify types for props, component parameters, and state; leverage strict typing
4. **Styling**: Use CSS modules or inline CSS (currently using .css files alongside components)

## File Organization

```
src/
  ├── App.tsx       # Root component
  ├── App.css       # Component styles
  ├── main.tsx      # Entry point
  ├── index.css     # Global styles
  └── assets/       # Static assets (images, SVGs)
public/            # Public static files served as-is
```

When adding features, co-locate styles with components (e.g., Feature.tsx + Feature.css).

## Common AI Agent Tasks

### Adding a New Component
1. Create `.tsx` file in `src/` following React hook conventions
2. Add corresponding `.css` file for styling
3. Export as default: `export default ComponentName`
4. Import in App.tsx or parent component
5. Run `npm run lint` to validate

### Modifying Build Config
1. Edit `vite.config.ts` if changing Vite plugins or output settings
2. Update `tsconfig.node.json` if the config needs type checking
3. Rebuild: `npm run build`

### Fixing Type Errors
- Run `npm run build` to trigger `tsc -b` type checking
- Review error messages; ESLint also catches some during `npm run lint`
- Ensure imports, exports, and function signatures are fully typed

## Notes

- React Compiler is **not enabled** in this template (commented in README) due to dev/build performance impact—can be added if needed
- The project uses modern ES2020+ syntax; targeting browsers with modern JS support
- No state management library (Redux, Zustand) currently—use React context or props for global state if needed
