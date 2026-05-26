# Template Lab — landing page and website template gallery

A pixel-cloned, **reusable** Next.js template built from `pravah-rebuild-plan.md`. Dark, restrained, "expensive-feeling" lab site with **real interactive D3 data visualizations** (not images).

Built with Next.js 15 (App Router) + TypeScript, Tailwind, Framer Motion, D3 v7, and Lenis smooth scroll.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

## What is on the page

A single composed landing page (`src/app/page.tsx`) plus `/get-in-touch` and `/our-team`:

- **Hero** with floating alert cards (the signature detail)
- **Problem** 2x2 grid
- **Technology**: 4 alternating blocks, each paired with a live viz
- **Deployments**: real world map with pulsing markers + the 1000 / 102 / 82 stats
- **Research** list, **investor** row, **final CTA**, footer

### The visualizations (`src/components/viz/`)

| Component | Tech | What it shows |
|---|---|---|
| `ForecastChart` | D3 scale/shape + Framer | Actual vs forecast load with an animated confidence band and a "now" marker |
| `GraphNetwork` | D3 force | 40+ node grid graph, status-colored, pulsing stressed edges, hover-to-trace neighborhood |
| `AssetMapping` | SVG + Framer | Stylized satellite tile with detection bounding boxes drawing in |
| `RLTree` | D3 hierarchy/tree | Branching "possible grid futures" tree, leaves colored by outcome |
| `WorldMap` | d3-geo + topojson | Natural-earth projection (topojson from CDN) with pulsing deployment markers |

All viz use **deterministic** mock data (seeded), so SSR and client render identically. Each accepts data so consumers can wire real numbers later.

## Reuse it in ~5 minutes

Everything brand- and copy-related lives in `src/config/`. Components are dumb and read from config.

1. **`src/config/site.config.ts`** — brand name, nav, CTA, email, socials.
2. **`src/config/content.config.ts`** — every section's copy, in order (hero lines, cards, problem grid, technology blocks, deployment markers + stats, research papers, investors, final CTA).
3. **`src/config/theme.tokens.ts`** + the `:root` / `.dark` blocks in **`src/app/globals.css`** — colors and fonts, one block per theme. These mirror each other (Tailwind reads the CSS vars and flips on the `.dark` class; D3 viz read the JS `palettes` via `useThemeColors()`), so change both when re-skinning.
4. Drop a new mark in **`src/app/icon.svg`**.

**Light/dark toggle:** lives in the nav. Light is the default for first-time visitors; the choice persists to `localStorage` and an inline script in `layout.tsx` applies it before paint (no flash). Theme state comes from `src/lib/theme.tsx` (`ThemeProvider`, `useTheme`, `useThemeColors`).

> The original pravah.com copy is here as a structural reference. Swap the verbatim wording, logo, and branding before deploying for a real product.

## Project structure

```
src/
  app/            page.tsx (composition), layout, globals.css, get-in-touch, our-team, icon.svg
  components/
    sections/     Hero, ProblemGrid, Technology, VisionBlock, DeploymentMap, ResearchList, InvestorRow, FinalCTA, Footer
    viz/          ForecastChart, GraphNetwork, AssetMapping, RLTree, WorldMap
    ui/           Nav, FloatingCard, Button, Pill, Reveal
  config/         site.config, content.config, theme.tokens
  lib/            motion (shared Framer variants), smooth-scroll (Lenis provider)
```

## Deploy

Push to a Git repo and import into **Vercel**, or `npm run build` and host the output. No env vars required. The world map fetches its topojson from `cdn.jsdelivr.net` at runtime (already allowlisted in `next.config.mjs`).

## Notes / deviations from the plan

- The plan listed React Three Fiber for a 3D globe and asset plane. To keep the dependency tree light and the build reliable, both took the plan's own "cheap" recommendations: the deployment map is a real `d3-geo` 2D projection, and asset mapping is SVG. Swapping in R3F later is isolated to those two viz files.
- Smooth scroll respects `prefers-reduced-motion` (Lenis is skipped and all animations are near-instant).
