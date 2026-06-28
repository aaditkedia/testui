# Template Lab — landing-page gallery

A Next.js 15 static-export gallery of reusable landing-page templates. Pitch-ready: every card in the live-preview showcase grid is a layout I can re-skin for a freelance client.

See **[CONTEXT.md](./CONTEXT.md)** for the full repo guide. Quick reference below.

## Quick start

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export → ./out
npm start      # serve the production build
```

## What is in the gallery

| Category | Templates |
|---|---|
| Restaurant / Hospitality | Modern Steakhouse, Editorial Neighborhood Restaurant, Fast-Casual / Mediterranean, Cafe / Catering |
| Community / Program | Glass, Cinematic, Editorial |
| Fintech / SaaS | Fintech / Payments SaaS |
| Agency / Holding | Holding Company / Portfolio |
| Experimental / 3D | Agriculture / Field Tech, 3D Intelligence Narrative, Particle System Landing |
| AI / Infrastructure | AI Lab / Infrastructure (with live D3 visualizations) |

Each restaurant template is data-driven by `src/config/template-gallery.ts`. The others are bespoke components under `src/components/ambassador/`.

## Project structure

```
CONTEXT.md          repo-level guide (read first)
README.md           this file
docs/
  build-plans/      engineering plans per template
  specs/            original spec sheets per template
src/
  app/              page.tsx (gallery index), t/[slug]/ (template routes), p/[slug]/ (iframe previews), layout, globals.css
  components/
    templates/      GalleryCard, TemplateViewer, PravahTemplate, RestaurantTemplate
    ambassador/     ConceptA/B/C and the bespoke sites (corn/helios/ngpes/berco/main)
    sections/       Pravah-template sections
    ui/             Nav, Button, ThemeToggle, etc.
    viz/            D3 visualizations used by the Pravah template
  config/           site.config, content.config, template-gallery, theme.tokens
  lib/              motion variants, Lenis smooth scroll, theme provider
public/             static images
```

## Re-skinning for a client

1. Pick the closest template card from the gallery.
2. Edit `src/config/template-gallery.ts` (or `content.config.ts` / `site.config.ts` for the Pravah-style one) with the client's copy, theme tokens, and photos.
3. `npm run build` and ship `./out` to any static host.

Full walkthrough in **[CONTEXT.md](./CONTEXT.md)**.

## Notes

- Output is `next export`-style static HTML. No env vars, no server runtime.
- `next.config.mjs` is configured for GitHub Pages at `/testui`. Edit `repo` (or strip the basePath) for other hosts.
- Smooth scroll respects `prefers-reduced-motion`.
- The world map fetches its topojson from `cdn.jsdelivr.net` at runtime (already allowlisted).
