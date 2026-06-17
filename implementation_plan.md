# Visual Upgrades for Solution Page

The goal is to enhance `src/pages/SolutionPage.tsx` and its related components to be more visually communicative, reducing reliance on text blocks. The changes will dynamically adapt to all 11 solutions defined in `solutionsData.ts` without requiring structural changes to the data format.

## Proposed Changes

### src/components/sections/LiveSystemPanel.tsx
#### [NEW] [LiveSystemPanel.tsx](file:///e:/altrex-design-2/src/components/sections/LiveSystemPanel.tsx)
- Create a new reusable component taking `solution` as a prop.
- Render a live-system-style panel with a terminal header (traffic light dots + "ALTREX PLATFORM — LIVE").
- Extract 2-3 metrics from `solution.metrics` for stat tiles with status dots.
- Implement a small animated visual element (e.g., pulsing activity bar) based on the first metric.
- Include a bottom strip of technology chips derived from `solution.capabilities` items, with a continuous subtle glow/pulse animation cycling through them.

### src/pages/SolutionPage.tsx
#### [MODIFY] [SolutionPage.tsx](file:///e:/altrex-design-2/src/pages/SolutionPage.tsx)
- **Hero Section**: Replace the existing "Executive Overview" panel with the new `<LiveSystemPanel solution={solution} />`.
- **Platform Capabilities Section**:
  - Replace the bento grid with a horizontal flow visualization.
  - Render a flex row (desktop) / column (mobile) of capability stages.
  - Add SVG or CSS-based connector lines between stages, featuring a looping pulse animation triggered `whileInView`.
  - Stagger the rendering of capability items (chips) within each stage.
- **Industries & Applications Section**:
  - Replace the vertical stacked list with a responsive grid (`grid-cols-2` mobile, `grid-cols-4` desktop).
  - Add an industry-to-icon mapping function (using `lucide-react`) to dynamically assign distinct icons based on keywords in the industry name (e.g., Gas, Renewable, Manufacturing, generic fallback).
  - Truncate tags to show 2-3 with a "+N more" badge.
- **Business Value Section**:
  - Programmatically determine the visual treatment based on keywords in the benefit title/description (e.g., "reduce", "accelerate", "increase", "speed", "efficiency" → metric visual).
  - Add a small inline visual (like a progress bar or simple before/after) for metric-focused benefits.
  - Provide a distinct icon-led layout for abstract benefits.

### src/components/sections/DynamicArchitecture.tsx
#### [MODIFY] [DynamicArchitecture.tsx](file:///e:/altrex-design-2/src/components/sections/DynamicArchitecture.tsx)
- Modify `VerticalConnector` to include an animated pulsing dot or gradient that travels along the vertical line continuously.
- Ensure the animation loops indefinitely but is only triggered when the component is in view to preserve performance.

## User Review Required

> [!WARNING]
> Please review the keyword matching approach for Industries (mapping industry names to icons) and Business Value (mapping benefits to visual styles). I will provide sensible defaults, but if there are specific industry names or benefit keywords you want strictly mapped, let me know.

## Verification Plan

### Automated Tests
- Run `npm run lint` and `npm run build` to ensure type safety and build integrity.

### Manual Verification
- Review the `SolutionPage` for multiple different solutions (e.g., `/solutions/connectivity`, `/solutions/iiot-platform`, `/solutions/web-scada`) to verify the dynamic visual mappings work correctly across diverse data sets.
- Ensure responsive layouts stack gracefully on mobile viewports.
- Confirm that `framer-motion` animations trigger on scroll and loop correctly where required.
