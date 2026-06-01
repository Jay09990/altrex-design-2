# Design Rules

Purpose
-	Establish a single source of truth for visual styles across the site so components are consistent and predictable. Follow these rules strictly: size and shape are fixed; only color and content vary per use-case.

Tokens
- Colors (examples — use these tokens in code):
  - `--color-primary`: #0EA5A4 (teal)
  - `--color-primary-contrast`: #FFFFFF
  - `--color-secondary`: #7C3AED (purple)
  - `--color-success`: #16A34A (green)
  - `--color-danger`: #DC2626 (red)
  - `--color-warning`: #F59E0B (amber)
  - `--color-muted`: #94A3B8 (muted slate)
  - `--color-bg`: #0F172A (dark) and `--color-surface`: #0B1220
  - `--color-text`: #E6EEF8 (primary text)

- Spacing scale (base = 8px): 4, 8, 12, 16, 24, 32, 40

- Typography tokens:
  - Font stack: `Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`
  - Base font-size: 16px (`--font-size-base`)
  - Line-height scale: compact for UI, normal for body
  - Sizes: `--fs-h1`: 48px, `--fs-h2`: 36px, `--fs-h3`: 28px, `--fs-h4`: 20px, `--fs-body`: 16px, `--fs-small`: 14px
  - Weights: `--fw-regular`: 400, `--fw-medium`: 500, `--fw-bold`: 700

Component rules (global principle: fixed size & shape)
- Buttons
  - Single canonical size: height 40px, horizontal padding 16px, border-radius 8px, font-size 16px, line-height 1
  - Use color variants only (primary, secondary, ghost, danger, success). Do NOT change size, border-radius, or font-size between variants.
  - Disabled: opacity 0.5, pointer-events none, maintain same size.
  - Focus: 2px solid outline using `--color-primary` with 8px spread (or an accessible alternative).
  - Example CSS (use variables):

    .btn { height:40px; padding:0 16px; border-radius:8px; font-size:16px; display:inline-flex; align-items:center; gap:8px; }
    .btn--primary { background:var(--color-primary); color:var(--color-primary-contrast); }
    .btn--secondary { background:var(--color-secondary); color:var(--color-primary-contrast); }
    .btn--ghost { background:transparent; color:var(--color-primary); border:1px solid rgba(255,255,255,0.06); }

- Badges
  - Fixed pill shape: height 20px, padding: 0 8px, border-radius:999px, font-size 12px, font-weight 500
  - Variants by color only (info, success, warning, danger, neutral)
  - Example:

    .badge { height:20px; padding:0 8px; border-radius:999px; font-size:12px; display:inline-flex; align-items:center; gap:6px; }
    .badge--neutral { background: rgba(255,255,255,0.04); color: var(--color-text); }

- Icons
  - Fixed visual scale: use 20px for inline icons, 24px for primary actions, 16px for micro usage
  - Icon color should use token values: `--color-text`, `--color-muted`, `--color-primary` depending on emphasis
  - Do not vary icon stroke-width or bounding box between usages; scale by the defined sizes only.

- Inputs, Cards, Chips
  - Inputs: consistent height 40px, border-radius 8px, padding 0 12px; font-size 16px
  - Cards: use surface token for background, consistent padding 16px or 24px, border-radius 12px
  - Chips: similar to badges but optionally square with 8px radius for selected UI patterns

Accessibility & contrast
- Ensure text-on-color contrast meets WCAG AA at minimum. When using colored buttons or badges, prefer `--color-primary-contrast` or white/near-white text.
- Use focus-visible styles for keyboard users and ensure hit targets are at least 40x40px.

How to adopt
1. Centralize tokens as CSS variables in `:root` or in `src/lib/theme.ts` and import into components.
2. Update `Button` and `Badge` components to read from tokens and expose only `variant` and `children` props (content and color variant only).
3. Replace inline/local styles across the repo with token-based classes or components.
4. Audit the UI: list non-conforming components and update them to the canonical component.

Example token block (CSS variables)

:root {
  --color-primary: #0EA5A4;
  --color-primary-contrast: #FFFFFF;
  --color-secondary: #7C3AED;
  --color-success: #16A34A;
  --color-danger: #DC2626;
  --color-warning: #F59E0B;
  --color-muted: #94A3B8;
  --color-bg: #0F172A;
  --color-surface: #0B1220;
  --color-text: #E6EEF8;
  --font-family-base: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  --font-size-base: 16px;
}

Example React API (recommended)

 - `Button` props: `{ variant: 'primary'|'secondary'|'ghost'|'danger'|'success', children: ReactNode, onClick?: fn }`
 - `Badge` props: `{ variant: 'neutral'|'info'|'success'|'warning'|'danger', children: ReactNode }`

Enforcement rules
- Only allow color and content changes for buttons and badges.
- If a new visual pattern is needed, add it to this file and discuss before implementation.

Next steps
- Implement tokens in `src/lib/theme.ts` and refactor `src/components/ui/button.tsx` and `src/components/ui/badge.tsx` to use tokens.
