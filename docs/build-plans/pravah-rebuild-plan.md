# Pravāh Rebuild Plan

A detailed build plan for recreating [pravah.com](https://www.pravah.com/) as a **pixel-cloned, reusable Next.js template** with real interactive D3/Three.js data visualizations.

**Scope decisions:**
- Faithfulness: pixel-clone the layout
- Viz fidelity: real interactive (D3 / Three.js)
- Purpose: reusable template

> Note: since this is a template to reuse, swap the copy / branding / logo when actually deploying it for any other product. Layout, structure, and components are fair game; verbatim copy isn't.

---

## 1. Stack

- **Next.js 15 (App Router) + TypeScript** — better for a reusable template (SEO, image optimization, easy content via MDX/JSON)
- **Tailwind CSS** with a fully tokenized theme
- **Framer Motion** for reveal/UI animations
- **D3 v7** for charts (forecasting, GNN, RL tree)
- **React Three Fiber + drei** for 3D scenes (globe, satellite plane)
- **Lenis** for smooth scroll
- **next-themes** if you want light/dark variants
- **Content as TypeScript config** (not hardcoded JSX) — critical for reuse
- Deploy on **Vercel**

---

## 2. Folder structure (template-first)

```
src/
  app/
    page.tsx                 // composes sections from config
    layout.tsx
    get-in-touch/page.tsx
    our-team/page.tsx
  components/
    sections/
      Hero.tsx
      ProblemGrid.tsx
      VisionBlock.tsx        // generic alternating block, takes a viz slot
      DeploymentMap.tsx
      ResearchList.tsx
      FinalCTA.tsx
    viz/
      ForecastChart.tsx      // D3
      GraphNetwork.tsx       // D3 force / react-force-graph
      AssetMapping.tsx       // R3F + image planes
      RLTree.tsx             // D3 tree or R3F branching
    ui/
      Nav.tsx
      FloatingCard.tsx
      Button.tsx
      Pill.tsx
  config/
    site.config.ts           // brand name, nav, links, colors
    content.config.ts        // all section copy, ordered
    theme.tokens.ts          // colors, spacing, fonts
  lib/
    motion.ts                // shared variants
    smooth-scroll.tsx        // Lenis provider
```

**The win:** to repurpose this template, you only edit `config/`. Sections read from config; components are dumb.

---

## 3. Design tokens (pixel-clone targets)

Inspect the live site in DevTools to lock these — best read from the markup:

```ts
// theme.tokens.ts
export const tokens = {
  color: {
    bg: '#0A0A0B',        // near-black, slight warm
    bgElevated: '#121214',
    text: '#F5F5F0',      // off-white, slight warm
    textMuted: '#8A8A85',
    border: 'rgba(255,255,255,0.08)',
    accent: '#9FFFB0',    // verify — could be teal/lime
    critical: '#FF5C5C',
    advisory: '#FFC857',
  },
  font: {
    display: 'GeneralSans, Inter, sans-serif',  // verify via DevTools Computed
    body: 'Inter, system-ui, sans-serif',
  },
  // Display H1 ~88px desktop / 48px mobile, line-height 0.95, letter-spacing -0.02em
}
```

Use **CSS Peeper** (Chrome extension) or DevTools on `cdn.prod.website-files.com` assets to grab exact hexes.

**Spacing scale:** 4 / 8 / 16 / 24 / 48 / 96. Section padding ~120–160px vertical.

**Motion tokens:** ease `[0.25, 0.1, 0.25, 1]`, durations 0.4s / 0.8s / 1.2s.

---

## 4. Section-by-section breakdown

### Nav
Sticky, semi-transparent w/ backdrop-blur. Logo left, anchor links center, "Get In Touch" pill right. Mobile: hamburger → full-screen overlay.

### Hero
Two stacked H1 lines ("The grid is at its limits." / "We are an AI lab..."). Floating alert cards in the negative space (`Critical: Transformer T-17 overload in 42 min`, `70°F Clear skies...`). Build cards as absolutely-positioned with subtle float animation (Framer `y: [0, -8, 0]` loop). CTA button below.

### Problem section
2×2 grid of cards, each with a short heading + body. Subtle border, hover lift. Stagger reveal on scroll with `whileInView`.

### Vision / Technology
Alternating left/right layout of 4 capability blocks. Each pairs with a stylized data viz mock — see §5.

### Deployment map
World map with pulsing dots on India, Germany, US. Country labels animate in. Either `react-simple-maps` + TopoJSON, or port the BoilerNet R3F globe.

### Research
Simple paper list with arxiv links, hover underline.

### Investor logos
Grayscale row.

### Final CTA + Footer
Big H2, button, minimal footer.

---

## 5. The 4 viz components (the real work)

### ForecastChart (D3)
- Multi-line chart: actual vs predicted vs confidence band
- `d3-shape` `line` + `area` for the band, `d3-scale` for axes
- Animate path drawing via `stroke-dasharray` + `stroke-dashoffset` on `whileInView`
- Moving "current time" vertical marker
- **~150 lines. Time: 4–6 hrs.**

### GraphNetwork (D3 force or react-force-graph-2d)
- 30–50 nodes, force simulation, edges pulse when stressed
- Color nodes by status (Normal / Advisory / Critical) — matches the `1000 / 102 / 82` counts in their copy
- Hover: highlight neighborhood
- `d3-force` with `forceManyBody`, `forceLink`, `forceCenter`
- **Time: 6–8 hrs.** Pulsing edges + hover eat the most time.

### AssetMapping (R3F or Canvas2D)
- Satellite tile (static image, or Mapbox static API) with animated bounding boxes detecting transformers / solar panels
- Cheap version: PNG + SVG overlay with Framer Motion box draw-in
- Fancy version: R3F with a textured plane + animated 3D markers
- **Recommend cheap. Time: 3–4 hrs cheap / 8 hrs fancy.**

### RLTree (D3 tree layout)
- Branching tree where each branch represents a possible grid future
- Animate branches drawing outward sequentially
- Color leaves by outcome (safe / risk / failure)
- `d3-hierarchy` `tree()` layout
- **Time: 4–5 hrs.**

### Bonus: DeploymentMap
- `react-simple-maps` with world TopoJSON + 3 pulsing markers
- Or a low-poly 3D globe via R3F (reuse the BoilerNet approach)
- **Recommend reusing the BoilerNet globe — ties the template together. Time: 2–3 hrs.**

---

## 6. Hero floating cards (the signature detail)

These are what make the hero feel alive. Build as a reusable component:

```tsx
<FloatingCard
  variant="critical"
  badge="Critical"
  title="Transformer T-17 overload in 42 min"
  body="Feeder 12 load exceeds thermal limit before system peak."
  position={{ top: '20%', right: '8%' }}
  delay={0.4}
/>
```

Internally: Framer Motion with infinite y-float (`animate={{ y: [0, -6, 0] }}`, 6s ease-in-out loop), entrance fade+scale, subtle border glow matching variant color.

---

## 7. Animation priorities

The original feels expensive because animations are *restrained*. Stick to:
- Fade + slight Y translate on scroll-in (`opacity 0 → 1`, `y: 20 → 0`)
- One subtle ambient animation per section max (floating cards, pulsing nodes)
- Smooth scroll (Lenis) ties it all together

---

## 8. Pixel-clone QA workflow

1. Take a full-page screenshot of pravah.com at 1440px width
2. Drop it as an overlay layer in DevTools (Chrome extension: **PerfectPixel**)
3. Toggle opacity to spot-check spacing/sizing as you build
4. Repeat at 768px and 375px

---

## 9. Build order (10–12 day estimate, solo)

| Day | Work |
|---|---|
| 1 | Scaffold Next.js, Tailwind, tokens, Lenis, config files |
| 2 | Nav + Hero layout + FloatingCard component |
| 3 | Problem grid + Vision section shell (alternating block) |
| 4 | ForecastChart (D3) |
| 5 | GraphNetwork (D3 force) |
| 6 | AssetMapping + RLTree |
| 7 | DeploymentMap (port BoilerNet globe) |
| 8 | Research list, investor row, CTA, footer, Team + Contact pages |
| 9 | Scroll reveals (Framer `whileInView`), Lenis polish, hover states |
| 10 | Responsive pass (1440 → 1024 → 768 → 375) |
| 11 | Lighthouse, a11y, OG tags, deploy to Vercel |
| 12 | Buffer / template documentation (README for swapping config) |

---

## 10. Reusability patterns to bake in

- Every section accepts a `theme` prop override so one page can have a different accent color
- Viz components accept `data` as props with sensible defaults — ship the template with mock data, let consumers wire real data later
- Export a `<PravahTemplate config={...} />` composition component as a one-line entry point
- README with a "swap in 5 minutes" guide: change `site.config.ts`, drop new logo, update content array

---

## 11. Where to start

Spin up the repo, lock tokens, build `FloatingCard` and the hero. That single component sells the whole template — if it feels right, the rest follows.
