# CONTEXT.md — what this repo is for

A **landing-page template gallery** built as a Next.js 15 static site. It's the deck I show to freelance prospects: every card in the showcase grid is a complete, reusable layout I can re-skin for a real client in under a day.

Each template is intentionally **generic** in the gallery (e.g. "Modern Steakhouse", "Editorial Neighborhood Restaurant", "Fast-Casual / Mediterranean") even though the underlying spec/build-plan was written against a specific original brand. The original brand naming is preserved inside each template's preview content so a prospect can see what a finished site reads like, but the *category-level* framing on the card is the pitch.

## How to use the repo

```bash
npm install
npm run dev    # http://localhost:3000 — the gallery
npm run build  # static export → ./out (GitHub Pages friendly)
```

Open `/` and click any template card (a HeroThemes-style grid of live previews) to open it full-bleed.

## How the gallery is wired

- `src/app/page.tsx` is a server-component showcase grid. It groups entries from `templateEntries` into sections and renders a `<GalleryCard>` per entry, each linking to `/t/<id>/`.
- `src/components/templates/GalleryCard.tsx` is the `"use client"` card: a browser-chrome frame wrapping a **live, scaled-down `<iframe>`** of the template's `/p/<id>/` preview route. The iframe is only mounted when the card nears the viewport and is unmounted once it scrolls far away (an `IntersectionObserver`), which keeps the number of simultaneous WebGL contexts low — several templates are r3f scenes and browsers cap active contexts at ~16. A `ResizeObserver` keeps the `transform: scale(...)` in sync with the card width.
- `src/app/t/[slug]/page.tsx` is the per-template static route (uses `generateStaticParams` + `dynamicParams = false`). It renders `<TemplateViewer slug={slug} />`.
- `src/app/p/[slug]/page.tsx` is the matching **preview** route. It renders `<TemplateViewer slug={slug} preview />`, which hides the "← Gallery" pill and makes the render non-interactive (`pointer-events: none`) so the iframe thumbnail reads as a poster. It's noindex and only consumed by `GalleryCard` iframes, never linked directly.
- `src/components/templates/TemplateViewer.tsx` is a `"use client"` component that looks up the entry by slug and renders the correct template via `next/dynamic` with `ssr: false`. All dynamic imports are declared at module level so each template's JS is code-split per route. A floating "← Gallery" pill links back to the index (hidden in `preview` mode).
- `src/config/template-gallery.ts` is the source of truth for every template entry. To add a template, append to `templateEntries`. To change a display name, edit `genericName` / `genericLabel` (restaurants) or the top-level `name` / `label` fields.
- Each restaurant template is **data-driven** by `restaurantTemplates` in the same file. One component (`RestaurantTemplate.tsx`) renders all of them.

## How the templates are organized

```
src/components/
  templates/
    PravahTemplate.tsx        — composes the existing Pravah sections
    RestaurantTemplate.tsx    — data-driven restaurant layout
    GalleryCard.tsx           — showcase card with a live, lazy-mounted iframe preview
    TemplateViewer.tsx        — client viewer: dynamic-imports the template for /t/[slug] (+ /p/[slug] preview)
  ambassador/                 — visual concepts (no more re-export wrappers)
    ConceptA / B / C.tsx        Glass, Cinematic, Editorial concept pages
    cornsite/                   Corn / agriculture WebGL site
    heliossite/                 HELIOS particle-system site
    ngpessite/                  Fintech / payments site
    bercosite/                  Holding-company site
    main/                       Dark-3D + Warm-3D narrative scene
  sections/                   Pravah page sections
  ui/                         Nav, Button, ThemeToggle, etc.
  viz/                        D3-driven viz used by Pravah
```

## Documentation

All the long spec sheets + build plans live in `/docs`:

- `docs/specs/` — original brand spec sheets (Westside Grill, The Shelby, Lazeez, Stuffed To The Grills, Berco, NGPES, Pravah, Cinematic/Editorial concepts).
- `docs/build-plans/` — engineering build plans paired with the specs.

Both are reference material — the gallery does not import them at runtime.

## Performance notes (read before touching 3D)

- **Dark 3D** (`src/components/ambassador/main/Scene.tsx`) is the heaviest template. The chain that used to lag was `EffectComposer → Bloom → Vignette → Noise` running on transmission-material renders at DPR 1.5. I removed the EffectComposer entirely, dropped DPR cap to 1.25, cut the particle field from 1600 → 480, dropped sphere segments, and reduced `MeshTransmissionMaterial samples` to 1 / `resolution` to 64. The visual loss is mostly a softer emissive glow, which the CSS `radial-gradient` glow layer in `MainConcept.tsx` already approximates.
- **Helios** + **Corn** still use `@react-three/postprocessing`. If those start to lag, repeat the same recipe (drop the composer, lower DPR, halve geometry detail).
- **Lenis smooth scroll** respects `prefers-reduced-motion` automatically (see `src/lib/smooth-scroll.tsx`).

## Re-skinning for a real client (the freelance flow)

1. Pick the template card that matches the prospect's category.
2. Open `src/config/template-gallery.ts`. For a restaurant template, copy the matching `restaurantTemplates` entry into a new entry with their `id`, hero copy, menu, location, theme colors. For the Pravah-style template, edit `src/config/content.config.ts` + `src/config/site.config.ts`.
3. Drop their photography in `/public/images/<client>/` and point `HERO_PHOTOS` / `FEATURED_PHOTOS` in `RestaurantTemplate.tsx` at the local files (or swap the Unsplash URLs).
4. Update the theme tokens (`src/config/theme.tokens.ts` + `:root` block in `src/app/globals.css`) for the brand palette.
5. `npm run build` → ship `./out` to the client's host (GitHub Pages, Netlify, Vercel — any static host works).

## Deploy target

`next.config.mjs` is set up for GitHub Pages at `/testui`. For any other host either remove `basePath` / `assetPrefix` or change `repo` to match the deploy path.

---

**Repo identity:** `UI_landing_pages` lives under `Code/active/` because the templates are part of the active freelance pitch flow. It's the front-end equivalent of a portfolio set, not a single client deliverable.
