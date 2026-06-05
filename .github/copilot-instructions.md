# Copilot instructions for this repository

Build / Test / Lint
- Dev server: npm run dev
- Production build: npm run build (runs `tsc -b` then `vite build`)
  - Note: `tsc -b` uses local project references; run `npm run build` to perform type-check + Vite build.
- Preview: npm run preview
- Lint: npm run lint (runs `eslint .`)
  - Lint a single file: npx eslint <path/to/file>
  - Fix issues automatically: npx eslint --fix <path/to/file>
- Tests: No test runner or `test` script present. (Add vitest/jest if you need unit tests.)

TypeScript / Aliases
- Paths alias: `@/*` → `src/*` (configured in tsconfig.json / tsconfig.app.json). Use `@/` imports across the codebase.

High-level architecture
- Modern React 19 + TypeScript app bootstrapped with Vite.
- Entry: src/main.tsx. Routing configured in src/router.tsx which maps pages under src/pages.
- Component structure:
  - src/components/ui: base primitives and shadcn/Radix wrappers
  - src/components/sections: large, page-specific sections (Hero, WhyChooseUs, Pricing, etc.) — many are data-driven
  - src/pages: route-level pages that compose sections
  - src/layout, src/theme: global layout and theme tokens
  - src/lib, src/hooks: utilities and reusable logic
- Graphics & realtime demos: components use @react-three/fiber, three, and ogl for WebGL; Framer Motion + GSAP used for animations.

Key conventions (project-specific)
- Styling
  - Tailwind CSS utilities everywhere. Many components rely on CSS variables (design tokens) such as --bg-surface, --bg-raised, --text-primary, --text-secondary.
  - Use the `@/` alias for imports (e.g., import X from "@/components/...").
  - Scoped inline <style> blocks are occasionally used for small animations (see WhyChooseUs.tsx).
- Component patterns
  - Data-driven UI: arrays of metadata (icon, title, description, gradient, glow) map to repeated card components.
  - Bento grid: several sections (WhyChooseUs) use a "hero + metric + bottom cards" grid: hero spans multiple columns/rows, a live metric card occupies a tall column, then smaller cards fill remaining cells.
  - Motion: framer-motion `Variants` are declared per-component (fadeUpVariants, containerVariants) and used with staggered children. Keep timing values consistent when adding new animated sections.
- Accessibility
  - Use semantic HTML (h2/h3 for headings inside sections). Keep visual-only decorative elements aria-hidden when added.
- Utility patterns
  - Small utility classes for glows/shadows (e.g., shadow-amber-900/40) and hover border variants are used to create `item.borderHover` behavior in section data objects.

Repository-level notes for Copilot sessions
- Look at tsconfig paths (`@/`) early — many imports rely on it.
- For layout and sizing bugs, check section grid classes (col-span / row-span) and repeated card markup — many layout inconsistencies stem from differing padding/margins or unbounded content heights. Example: benefit card descriptions can be clamped with `max-h-12 overflow-hidden` or `line-clamp-2` if tailwind/line-clamp is enabled.
- Search for shared motion variants when adding animations to remain consistent (grep for `Variants` or `fadeUpVariants`).
- When editing UI, verify builds with `npm run dev` and visually test pages; many visual rules depend on Tailwind config and CSS variables in src/theme.

AI assistant / other configs
- No CLAUDE.md, AGENTS.md, or other AI assistant configs found. If adding assistant rules, place them at repo root (.cursorrules, AGENTS.md, etc.) and mention them here.

MCP Servers
- Would you like configuration for MCP servers relevant to this web project (Playwright, Lighthouse, or Storybook)?

Summary
- Created/updated .github/copilot-instructions.md with build/lint commands, TypeScript alias info, high-level architecture, and repository-specific conventions. Want adjustments or extra coverage (CI, testing, or Storybook/Playwright setup)?