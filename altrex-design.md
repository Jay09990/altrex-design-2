# Altrex Design Specification v2.0 — "Brave" Implementation Edition

> **Status:** Implementation-Ready  
> **Replaces:** altrex-design.md (Gemini Draft)  
> **Reference:** composites.archi, character.md, current codebase analysis  

---

## 0. Foundational Decisions (Resolve Before Building)

These were left ambiguous in v1. They must be answered first because everything downstream depends on them.

### 0.1 — Page Architecture Decision: Hybrid Model

The site will use a **Hybrid Architecture**:

- **`/` (Home):** Full scrollytelling immersive experience. Single canvas, chapter-based, GSAP-orchestrated. This is where the "brave" design lives.
- **`/about`:** Already built. Retrofit with the new dark palette and typography. No scrollytelling needed — it's content-heavy and linear.
- **`/product`, `/solutions`, `/company`, `/pricing`:** Traditional page layout with the new visual system (dark palette, Geist, monospaced metadata). Build these as standard dark-theme pages, NOT scrollytelling canvases. Scrollytelling is reserved for the Home page — the entry point.

**Why:** A scrollytelling canvas across all routes is architecturally expensive and UX-inappropriate for documentation-style content. The Home page is the "wow" moment. Inner pages are where users do work.

### 0.2 — Scroll Architecture Decision: Lenis + GSAP Contract

This is the most critical wiring decision. **Every developer on this project must follow this exact pattern:**

```js
// main.tsx — Initialize ONCE at the root level
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  smoothWheel: true,
})

// Feed Lenis into GSAP — this is the contract
function raf(time: number) {
  lenis.raf(time)
  ScrollTrigger.update()
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)
```

**Rules:**
- Never call `window.scrollTo()` directly — always use `lenis.scrollTo()`
- Never initialize multiple Lenis instances
- All GSAP ScrollTrigger instances read from Lenis, not native scroll
- Framer Motion `useScroll` must be configured with `layoutEffect: false` to avoid conflicts

---

## 1. Vision & Identity

**Theme:** "Visible Infrastructure" — We don't hide complexity. We make it beautiful.  
**Character:** Mission Control meets Digital Architectural Monograph.  
**Feeling:** The user should feel like they are being *initiated into a system*, not browsing a marketing page.

The transformation is not cosmetic. It is structural. The current site *describes* Altrex. The new site *demonstrates* Altrex — through its own behavior.

---

## 2. Visual System

### 2.1 — Color Palette (The "Blueprint" System)

| Role | Token | Value |
|---|---|---|
| Background | `--bg-void` | `#080808` |
| Surface | `--bg-surface` | `#111111` |
| Surface raised | `--bg-raised` | `#1a1a1a` |
| Border | `--border-subtle` | `rgba(255,255,255,0.07)` |
| Border active | `--border-active` | `rgba(255,255,255,0.18)` |
| Text primary | `--text-primary` | `#f5f5f5` |
| Text secondary | `--text-secondary` | `#737373` |
| Text muted | `--text-muted` | `#404040` |
| Accent violet | `--accent-violet` | `#8b5cf6` |
| Accent fuchsia | `--accent-fuchsia` | `#d946ef` |
| Accent glow | `--accent-glow` | `rgba(139,92,246,0.15)` |
| Data green | `--data-green` | `#22c55e` |
| Data amber | `--data-amber` | `#f59e0b` |

**The rule:** Backgrounds are void-dark. Content floats. Violet/fuchsia are *data highlights*, not primary fills. Use them sparingly — they should feel like live signals, not decoration.

### 2.2 — Background Grid

A persistent, subtle grid sits behind all content on the Home page. It appears more sharply during 3D transitions.

```css
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

The grid fades in and out using a GSAP timeline synced to chapter transitions — more visible during "Blueprint" (Architecture) chapter, almost invisible during "Gateway" (Hero).

### 2.3 — Typography System

**Display Font:** Geist Bold — All-Caps, `tracking-tighter`  
**Mono Font:** Geist Mono — For all metadata, labels, coordinates, status strings  
**Body Font:** Geist Regular — For descriptions, cards, prose

| Scale | Usage | Tailwind |
|---|---|---|
| Chapter Titles | Hero headline, chapter openers | `text-7xl lg:text-9xl` |
| Section Titles | Within-chapter headings | `text-4xl lg:text-6xl` |
| Card Titles | Feature/use-case titles | `text-xl` |
| Body | Descriptions, prose | `text-base lg:text-lg` |
| Metadata | System labels, coordinates | `text-xs font-mono` |
| Micro | Copyright, fine print | `text-[10px] font-mono` |

**Metadata Label Pattern — Use Everywhere:**
```tsx
// System status indicators that live around components
<span className="font-mono text-xs text-[--text-muted] tracking-widest uppercase">
  [SYS_LOAD: 0.042]
</span>

<span className="font-mono text-xs text-[--data-green]">
  ● LIVE
</span>

<span className="font-mono text-xs text-[--text-secondary]">
  REG: EU-WEST-02 / LAT: 11ms
</span>
```

These labels appear at corners of cards, near chapter numbers, and inside the architecture diagram. They are purely decorative but create the "engineering dashboard" atmosphere that is core to Altrex character.

---

## 3. Chapter Architecture (Home Page)

The Home page is a single scrolling canvas divided into 6 chapters. GSAP ScrollTrigger maps scroll position to chapter state. Each chapter has a defined `start` and `end` scroll percentage.

```
Chapter 01 — THE GATEWAY      (0% – 18%)    → Hero
Chapter 02 — CORE PULSE       (18% – 36%)   → Features + TrustedBy
Chapter 03 — THE BLUEPRINT    (36% – 52%)   → Architecture + ProductShowcase
Chapter 04 — VELOCITY         (52% – 68%)   → DeveloperExperience
Chapter 05 — SCALE            (68% – 85%)   → UseCases + Statistics
Chapter 06 — THE CONTRACT     (85% – 100%)  → Testimonials + Pricing + CTA
```

### 3.1 — Persistent Chapter Navigation UI

Two persistent UI elements overlay the entire scroll experience:

**Bottom-Left: Chapter Indicator**
```
01        ← large monospaced number, `text-6xl`, color: --text-muted
THE GATEWAY  ← small caps, font-mono, --text-secondary
```
On chapter transition: the number blurs out (`filter: blur(8px)`, `opacity: 0`) and the new number blurs in. Transition duration: 600ms.

**Right Edge: Progress Line**
- A `2px` wide vertical line, full viewport height, fixed position
- Fill: gradient from `--accent-violet` to `--accent-fuchsia`
- Height driven by `scaleY` transform, `transform-origin: top`
- GSAP animates `scaleY` from `0` to `1` as scroll goes `0%` to `100%`

```tsx
// Pseudocode for Progress Line
gsap.to(progressLineRef.current, {
  scaleY: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  }
})
```

---

## 4. Loading Sequence (Pre-Experience)

**This section did not exist in v1. It is non-negotiable.**

Before the 3D scene and GSAP orchestration initialize, the user sees a loading screen. This signals "high-fidelity experience incoming" and prevents a janky first paint.

### Loading Screen Anatomy
```
[Full-screen black]

     A                    ← Logo mark, centered, appears first (200ms fade)

  ALTREX                  ← Wordmark, decrypts in using DecryptedText component

  INITIALIZING SYSTEMS    ← font-mono, text-xs, --text-muted

  [████████████░░░]  67%  ← Progress bar, width animated via JS

  REG: CONNECTING...      ← Status string, cycles through fake system messages
```

### Loading Logic
```ts
const loadingMessages = [
  'CONNECTING TO EDGE NETWORK...',
  'CALIBRATING LATENCY SENSORS...',
  'INITIALIZING NODE WEB...',
  'MOUNTING REALTIME INTERFACE...',
  'SYSTEMS NOMINAL.',
]

// Progress is artificial — minimum 1.8s, maximum until assets ready
// On complete: loading screen slides up (Y: 0 → -100vh), revealing the canvas
```

Transition out: GSAP `y: '-100%'`, duration 0.8s, ease `power3.inOut`. The 3D scene should already be initialized underneath during the load.

---

## 5. 3D Environment — "The Infrastructure Web"

### 5.1 — What It Is

A Three.js scene rendered via `@react-three/fiber` that serves as the persistent background of the Home page. It is not a decorative element — it is the visual metaphor for Altrex itself: a live network of connected nodes.

### 5.2 — Scene Composition

```
Nodes:        ~80–120 small spheres (radius 0.05–0.15)
              Positioned quasi-randomly in a 20×20×10 unit bounding box
              Base color: rgba(255,255,255,0.4)
              Pulse color: #8b5cf6 (violet) and #d946ef (fuchsia) when active

Edges:        Lines connecting nearby nodes (distance threshold: ~3 units)
              Base opacity: 0.08
              Active opacity: 0.4 (when adjacent node pulses)

Camera:       Positioned at z: 12, looking at origin
              Idle: very slow drift (0.0003 rad/frame on X and Y)
              Scroll-linked: camera Z moves from 12 → 6 as user scrolls
              (creates "flying into the network" sensation)

Lighting:     Ambient light, intensity 0.3
              Point light at violet position, intensity 2, color #8b5cf6
              Point light at fuchsia position, intensity 1.5, color #d946ef
```

### 5.3 — Interaction Behavior

- **On user click:** nearest 3–5 nodes pulse (scale up 1.4x, emit light briefly)
- **On scroll chapter change:** a "wave" pulse propagates across the network (staggered node activation from left to right)
- **Depth of Field:** Use `@react-three/postprocessing` DepthOfField — foreground nodes blur, content plane sharp

### 5.4 — Performance Contract

- Target: 60fps on mid-range laptops (M1 MacBook Air, equivalent)
- Max draw calls: 200
- Use `instancedMesh` for all nodes (single draw call for all spheres)
- Use `BufferGeometry` for all edges
- If `window.devicePixelRatio > 1.5`, cap renderer at `1.5`
- Provide a `reduced-motion` fallback: static gradient background, no Three.js

```tsx
// Reduced motion fallback
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) {
  // Render static dark gradient, skip Three.js entirely
}
```

---

## 6. Chapter-Specific Design

### Chapter 01 — THE GATEWAY (Hero)

**Concept:** The user enters the system. The headline assembles itself.

- Background: 3D node web at full opacity, camera at z: 12
- Headline: `"BUILD POWERFUL REALTIME APPLICATIONS WITHOUT COMPLEXITY"` — characters animate in one-by-one using a custom character assembly effect (not BlurText — staggered `y: 40 → 0`, `opacity: 0 → 1`, per character, 20ms stagger)
- Below headline: two lines of monospaced metadata animate in after the headline completes:
  ```
  [NODE_COUNT: 847,291]     [LATENCY: 11ms]     [UPTIME: 99.99%]
  ```
- CTA buttons use magnetic effect (see Section 7.2)
- Badge: `● MODERN REALTIME INFRASTRUCTURE PLATFORM` — the dot is a pulsing `data-green` color

**GSAP trigger:** On load, not on scroll. Headline assembles on `DOMContentLoaded` after loading screen exits.

---

### Chapter 02 — CORE PULSE (Features)

**Concept:** The heartbeat of the infrastructure. Features arrive like signal pulses.

- Section enters: camera slowly drifts forward (z: 12 → 10)
- Feature cards: arranged in the existing 4-column grid, but each card has:
  - A thin top border that "fills" from left to right on scroll-enter (GSAP `scaleX: 0 → 1`)
  - A monospaced status label in the top-right corner of each card: `[MODULE: ACTIVE]`
  - Icon container: subtle violet radial glow on hover
- TrustedBy (LogoLoop) sits below as a "signal strip" — label it `TRUSTED_BY: 847 ENTERPRISES` in mono text above it

---

### Chapter 03 — THE BLUEPRINT (Architecture + ProductShowcase)

**Concept:** Deep dive into the mechanics. The grid becomes more visible here.

- Background grid opacity increases to `0.08` (from `0.03`) as this chapter enters
- Architecture section: **Keep React Flow** — do NOT convert to 3D.
  - Instead: dark theme the React Flow canvas (`background: transparent`, node/edge colors from the new palette)
  - Animate edges with moving dot particles to show "live data flow"
  - Add coordinate labels to each node: `[NODE: IND-01]`, `[STATUS: ACTIVE]`
  - Surround the diagram with a "terminal window" frame — monospaced header bar with `ALTREX_ARCH v2.4.1 ● LIVE`

- ProductShowcase: the dashboard mockup gets a dark theme treatment and a scanline overlay texture for that CRT/mission-control feel

---

### Chapter 04 — VELOCITY (Developer Experience)

**Concept:** Speed of integration. Code is the hero.

- Entry: camera accelerates forward briefly (z: 10 → 8, fast ease, then settles)
- Code snippets: use a terminal-style component with:
  - Dark background `#0d0d0d`
  - Syntax highlighting using CSS custom properties
  - A blinking cursor at the end of the last line
  - Characters type in one-by-one when the section enters viewport
- Feature chips (SDK list): rendered as "system status badges" — `[SDK: REACT ● READY]`

---

### Chapter 05 — SCALE (Use Cases + Statistics)

**Concept:** Reaching the horizon. The network expands.

- Camera pulls back (z: 8 → 11) — the node web feels vast and expansive
- Statistics: `CountUp` component triggers on scroll enter (already exists in codebase)
- Each stat card gets a real-time "sparkline" — a tiny SVG polyline that animates from flat to the data shape when entering viewport
- Use Cases: the tab-based layout is kept, but inactive tabs render with `opacity: 0.4` and a `[STANDBY]` label. Active tab shows `[ACTIVE ●]` in data-green

---

### Chapter 06 — THE CONTRACT (Testimonials + Pricing + CTA)

**Concept:** The moment of decision. The system awaits your connection.

- Camera settles back to z: 12, node web pulses gently
- Testimonials: keep the asymmetric layout from current code, but style as "system log entries":
  ```
  [LOG_001] Rajesh Patel / CTO, Nexora Systems
  "The infrastructure performance and realtime scalability completely transformed our IoT platform."
  TIMESTAMP: 2024-11-14T09:23:41Z
  ```
- Pricing cards: the Pro card gets a `border: 1px solid --accent-violet` with a slow pulsing glow animation (not a shimmer — a smooth `box-shadow` pulse)
- CTA section: the gradient background is replaced with a node-web "close-up" — camera zooms to z: 4, nodes fill the frame, headline glows

---

## 7. Interaction System

### 7.1 — Smooth Scrolling (Lenis)

Already covered in Section 0.2. Configuration summary:
- `duration: 1.4`
- `easing: expo-out`
- `smoothWheel: true`
- `smoothTouch: false` (mobile gets native scroll for performance)

### 7.2 — Magnetic Buttons

Applied to all primary CTA buttons (`Get Started`, `Start Building`).

```tsx
// useMagneticButton hook
const useMagneticButton = (ref: RefObject<HTMLElement>, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    gsap.to(ref.current, { x: deltaX, y: deltaY, duration: 0.3, ease: 'power2.out' })
  }
  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }
  // attach to parent element, not the button itself, for the "pull" radius
}
```

### 7.3 — ClickSpark Enhancement

The existing `ClickSpark` component gets upgraded:
- Sparks are replaced with short line segments radiating outward (not dots)
- Color: random pick from `--accent-violet` or `--accent-fuchsia` per spark
- 6–8 lines per click, `length: 12–20px`, fade in 80ms, fade out 300ms
- Add a brief "data residue" — a single faint circle that expands and fades at click point

### 7.4 — Custom Cursor

On desktop, replace default cursor with a custom cursor:
- **Default state:** Small circle `8px`, border `1px solid rgba(255,255,255,0.6)`, no fill
- **Hover state (links/buttons):** Expands to `32px`, fills with `--accent-glow`, blends with backdrop
- **Click state:** Scales to `4px` briefly (snap), then back
- Implementation: absolutely positioned div, `pointer-events: none`, follows mouse via GSAP `quickTo`

---

## 8. Component Retrofit Map

| Component | Current State | v2 Change |
|---|---|---|
| `HeroSection` | White bg, fade-up | Black bg, char-by-char assembly, magnetic CTAs |
| `CoreFeatures` | White bg, card grid | Dark bg, border-fill animation, status labels |
| `Architecture` | Light React Flow | Dark React Flow + animated edges + terminal frame |
| `ProductShowcase` | White bg, mockup | Dark bg, scanline overlay, dark dashboard |
| `WhyChooseUs` | Dark already (`gray-950`) | Refine with new tokens, add dot-grid |
| `DeveloperExperience` | Light bg, feature chips | Dark bg, typewriter code, system-status chips |
| `StatisticsSection` | Dark already (`gray-950`) | Refine tokens, add sparklines |
| `UseCases` | Light bg, tabs | Dark bg, active/standby labels |
| `Testimonials` | White bg, cards | Dark bg, system-log format |
| `Pricing` | Light bg, cards | Dark bg, violet-glow Pro card |
| `CTA` | Violet gradient | Node-web close-up + glowing headline |
| `Header` | Transparent/blur | Stays — dark bg on scroll is now `--bg-surface/80` |
| `Footer` | White | Dark — `--bg-void`, white text |
| `SoftAurora` | OGL aurora | **Remove** — replaced by Three.js node web |

---

## 9. Mobile Strategy

Scrollytelling and Three.js are desktop-first. On mobile:

- Three.js scene: **disabled entirely** — replaced with a CSS animated gradient mesh background
- Chapter indicators: **hidden** — too much visual noise on small screens
- Progress line: **hidden**
- Magnetic buttons: **disabled** (`touch` doesn't have hover)
- Lenis: `smoothTouch: false` — native scroll on mobile
- Custom cursor: **disabled** — mobile has no cursor
- All content sections: standard fade-up entrance (Framer Motion, same as current)
- Breakpoint: `md` (768px) — below this, mobile mode activates

---

## 10. Technical Stack (Locked)

| Dependency | Version | Purpose | Status |
|---|---|---|---|
| `react` | `^19` | Framework | ✅ Installed |
| `framer-motion` | `^12` | Micro-interactions, parallax | ✅ Installed |
| `gsap` | `^3.15` | ScrollTrigger, timelines | ✅ Installed |
| `three` | `^0.167` | 3D scene | ✅ Installed |
| `@react-three/fiber` | `^9` | React bindings for Three.js | ✅ Installed |
| `@react-three/postprocessing` | `^3` | Depth of field | ⬜ Add |
| `@xyflow/react` | `^12` | Architecture diagram | ✅ Installed |
| `lenis` | `^1` | Smooth scroll | ⬜ Add |
| `tailwindcss` | `^4` | Styling | ✅ Installed |
| `@fontsource-variable/geist` | `^5` | Typography | ✅ Installed |

**To install:**
```bash
npm install lenis @react-three/postprocessing
```

---

## 11. Implementation Order

Build in this sequence to avoid rework:

```
Phase 1 — Foundation (Do First)
  ├── Install lenis + @react-three/postprocessing
  ├── Wire Lenis + GSAP in main.tsx (Section 0.2)
  ├── Apply CSS variable system globally in index.css
  ├── Dark-theme the Header and Footer
  └── Build the Loading Screen component

Phase 2 — The Shell
  ├── Build the Three.js NodeWeb scene (instancedMesh)
  ├── Wire camera to scroll position
  ├── Build ChapterIndicator component (bottom-left)
  └── Build ProgressLine component (right edge)

Phase 3 — Chapter by Chapter
  ├── Chapter 01: Hero (char assembly, magnetic CTA)
  ├── Chapter 02: CoreFeatures (border-fill, status labels)
  ├── Chapter 03: Architecture (dark React Flow, terminal frame)
  ├── Chapter 04: DeveloperExperience (typewriter code)
  ├── Chapter 05: UseCases + Stats (sparklines, active/standby)
  └── Chapter 06: Testimonials + Pricing + CTA

Phase 4 — Polish
  ├── Custom cursor
  ├── ClickSpark enhancement
  ├── Mobile fallbacks
  ├── Performance audit (60fps check)
  └── Reduced-motion accessibility pass
```

---

## 12. Quality Gates

Before any chapter ships, it must pass these checks:

- [ ] 60fps on scroll (Chrome DevTools Performance tab, no red frames)
- [ ] `prefers-reduced-motion` respected — animations disabled, content readable
- [ ] Mobile layout correct at 375px width
- [ ] Chapter indicator updates correctly on scroll
- [ ] No Lenis / ScrollTrigger console conflicts
- [ ] Loading screen exits cleanly into the hero
- [ ] Three.js scene disposed properly on component unmount

---

*This document is the single source of truth for the Altrex v2 design transformation.*  
*Any design decision not covered here should be resolved against `character.md` before implementation.*

---

## Implementation Status (as of 2026-05-28)

Summary of what is already implemented in the repository and notable deviations from this specification.

- **Lenis + GSAP wiring:** Implemented in `src/main.tsx` (Lenis configured with `duration: 1.4`, `expo-out` easing, `smoothWheel: true`, `smoothTouch: false`; GSAP `ScrollTrigger` registered and fed by a root RAF loop).
- **Home page scrollytelling shell:** Implemented at `src/pages/Home.tsx` — includes `LoadingScreen`, `NodeWeb`, `HomeChapterNav`, and `ProgressLine` and maps the chapter layout described in this doc.
- **Three.js Node Web:** Implemented at `src/components/NodeWeb.tsx`. The scene uses a `points` geometry and `lineSegments` for edges with ~80 nodes and color pulses. Note: the implementation currently uses GPU points rather than `instancedMesh` for spheres — behavior and performance are satisfactory but differs from the instanced-mesh recommendation in Section 5.4.
- **Loading screen:** Implemented at `src/components/LoadingScreen.tsx` (progress simulation, cycling messages, safe force-exit after ~3.5s, slide-up exit animation).
- **Hero and chapter content:** `src/components/sections/HeroSection.tsx` implements headline assembly (word/character animation), metadata labels, and magnetic CTAs via `src/hooks/useMagneticButton.ts`.
- **Chapter navigation & progress UI:** `src/components/HomeChapterNav.tsx` and `src/components/ProgressLine.tsx` implement the persistent chapter panel and right-edge progress line governed by GSAP ScrollTrigger and Lenis-aware scrolling.
- **Interaction components:** `src/components/ClickSpark.tsx` and `src/components/CustomCursor.tsx` implement the enhanced click sparks and custom cursor behaviors (with mobile/reduced-motion fallbacks).
- **Reduced-motion & mobile fallbacks:** Present in `NodeWeb` and other components: Three.js falls back to a CSS gradient on mobile or `prefers-reduced-motion`.
- **Postprocessing:** `@react-three/postprocessing` (DepthOfField) is not yet integrated — this remains an outstanding enhancement for the 3D polish.
- **Small divergences:** The scene uses `points` for node rendering (fast and compact) rather than instanced meshes; node count is ~80 (matches current implementation). Some visual polish items (scanlines, terminal frame around React Flow) exist partially across sections and can be iterated.

Action items (repo-aligned)
- Add `@react-three/postprocessing` only if the performance audit allows postprocessing without dropping below 60fps.
- Consider switching `NodeWeb` to `instancedMesh` if we need per-node geometry (for clickable scaling) while keeping draw calls low.
- Add a short `PERFORMANCE.md` checklist and a CI smoke test that runs a local Lighthouse/perf snapshot for the Home page.
- Mark this `Implementation Status` section as the living record — update when components move from "partial" → "complete".