# GEMINI.md

## Project Overview

**Altrex** is a high-performance, visually rich landing page for a modern realtime infrastructure platform. It is designed to showcase the capabilities of a scalable messaging and IoT communication system with a focus on developer experience and enterprise-grade reliability.

### Core Technologies
- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4, Framer Motion, GSAP
- **3D & Graphics:** Three.js, @react-three/fiber, OGL
- **UI Components:** Shadcn UI, Radix UI, Lucide React
- **Routing:** React Router DOM 7
- **Data Visualization:** @xyflow/react

### Architecture
The project follows a standard React application structure:
- `src/components`: Reusable UI components and page sections.
  - `src/components/ui`: Base UI components (buttons, inputs, etc.) often powered by Shadcn/Radix.
  - `src/components/sections`: Large, page-specific sections (Hero, Features, Pricing, etc.).
- `src/pages`: Top-level page components corresponding to routes.
- `src/layout`: Layout components (e.g., `MainLayout`) that wrap page content.
- `src/lib`: Utility functions and shared logic.
- `src/router.tsx`: Centralized routing configuration.

## Building and Running

### Development
To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` directory.

### Linting
To check for linting errors:
```bash
npm run lint
```

### Preview
To preview the production build locally:
```bash
npm run preview
```

## Development Conventions

### Coding Style
- **TypeScript:** Use strict typing for all components, props, and functions.
- **Functional Components:** Prefer functional components with hooks over class components.
- **Styling:** Use Tailwind CSS utility classes for styling. Avoid writing custom CSS unless necessary (use `src/index.css` or `src/App.css` for global styles).
- **Animations:** Leverage `framer-motion` for UI transitions and `gsap` for complex timeline-based animations.
- **Imports:** Use the `@` alias to refer to the `src` directory (e.g., `import { Button } from "@/components/ui/button"`).

### Component Guidelines
- Place reusable base components in `src/components/ui`.
- Organize large page sections in `src/components/sections`.
- Ensure components are responsive and accessible.

### State Management
- Use React's built-in `useState` and `useContext` for local and shared state.
- For complex routing state, leverage `react-router-dom` hooks.

### Graphics & 3D
- Use `@react-three/fiber` for integrating 3D elements.
- Use `ogl` for lightweight WebGL interactions (like the `SoftAurora` background).
