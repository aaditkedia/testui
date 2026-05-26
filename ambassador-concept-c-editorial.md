# Partner Concept C — "Editorial Manifesto"

A type-driven, high-contrast, Swiss-minimal landing page for a city partner program. Same content + wireframe as Concepts A and B; different visual direction.

**Positioning:** "We're serious. The work is serious. Are you?"

**Reference points:** Vercel marketing, Arc browser site, Framer ship pages, Pentagram studio site, Werner Aisslinger's portfolio, Linear's docs.

**Best for:** Applicants who respect substance, design literacy, and confidence without gimmicks.

---

## 1. Brand DNA

| Token | Value |
|---|---|
| Background | `#FAFAF7` (warm off-white) |
| Surface | `#FFFFFF` |
| Text | `#0A0A0B` (near-black) |
| Text muted | `#6E6E68` |
| Accent | `#0EA5E9` used as large color blocks (not just text) |
| Display | Söhne Breit / Migra / General Sans Bold (set xxxl) |
| Body | Inter |
| Mono | JetBrains Mono / Berkeley Mono (for labels, numbers) |

**Tone:** confident, declarative, manifesto-like. Short sentences. Active voice. No exclamation marks.

---

## 2. Stack (lightest of the three concepts)

Same Next.js 15 + Tailwind + Framer Motion + GSAP + Lenis. What's different:
- **No R3F. No 3D at all.**
- No background video
- No photography in primary view (maybe small inset photos in one section)
- Pure CSS / SVG / animated typography
- Route: `/ambassador-c`

This concept ships fastest and scores highest on Lighthouse by a wide margin.

---

## 3. Section-by-section

### Section 1 — Hero (Manifesto Statement)

Layout: 12-column grid with subtle visible hairlines (the grid is the design).
- **Massive H1** at ~240–320px desktop: **"PARTNERS."** in display, tight tracking, one character optionally set in network blue as a single color highlight
- Right column: short paragraph in body sans + inline "Apply" link with underline
- A single sky-blue horizontal rule (4px tall) as composition anchor
- Section label in monospace small caps top-left: `01 — INTRODUCTION`

**Movement:** when H1 enters viewport, letters animate in with stagger (each letter `y: 100% → 0`, `opacity: 0 → 1`, total ~0.6s). After landing, no further motion in this section.

### Section 2 — Quick Overview (Numbered Manifest)

Layout: 4-row stack, each row a stat or value.
- **Left column** (monospace): row number + label (`01 — MEMBERS`)
- **Center**: massive number (`2,000+`)
- **Right column** (small body): one-sentence elaboration
- Hairline divider between rows
- Numbers count up on scroll-in (`useMotionValue` + `animate`)
- Small geometric SVG charts inline where useful (e.g., a 5-bar bar chart next to the growth stat, a tiny line for trajectory)

### Section 3 — Become a Partner (Color Block Moment)

- **Full-bleed sky-blue (`#0EA5E9`) section** — full viewport height
- White text overlaid: huge `LEAD.` in display (~280px desktop)
- Body copy below, max-width 60ch
- Commitment chips as inline numbered list (`01 — 5–8 hrs/week · 02 — 6-month term · 03 — Summit invite`)
- Strong rectangular **APPLY** button (sharp corners, no radius) in white-on-blue

**This is the page's visual punch.** The only place network blue dominates. Massive contrast against the off-white surrounding sections.

### Section 4 — Perks (Moneda Scroll-Lock, manifesto edition)

Same GSAP pin/scrub/snap framework. Visually:
- Each perk = **type-only composition**:
  - Massive perk number top-left in display (`01`)
  - Perk title center-set in serif italic display
  - One sentence of supporting body
  - One bold geometric SVG composition (4–5s loop, monochrome with sky-blue accent)
- Background color subtly shifts between perks: white → off-white → very pale blue → white

**Suggested perks + SVG compositions:**

| # | Perk | SVG idea |
|---|---|---|
| 01 | Access to founders & investors | Concentric circles pulsing outward |
| 02 | Speaker & host opportunities | A single line that draws into a podium / triangle |
| 03 | Travel & summit stipend | Two arcs connecting to form a globe outline |
| 04 | Network of 2,000+ builders | Grid of dots; one node lights up, propagates connections |

**Progress indicator:** `01 / 04` type counter in upper right, ticks as you progress. Clickable to jump.

### Section 5 — Final CTA (Closing Statement)

- Pull-quote-style closing line in display italic
- Application deadline + timeline as ordered list (`01 Apply · 02 Interview · 03 Onboard · 04 Launch`)
- Single rectangular APPLY button
- Footer: minimal text, hairline rule, small program mark

---

## 4. 3D treatment

**None.** Replaced entirely with:
- Animated SVG compositions (lightweight, sharp, infinitely scalable)
- CSS-driven geometric shapes
- Typographic transitions (letter-by-letter reveals, word swaps via `AnimatePresence`)
- Hairline rule animations

This is the deliberate choice. The page's confidence comes from saying NO to 3D when every competitor uses it.

---

## 5. Typography is the design system

This concept lives or dies on type. Spend more time on:
- **Font pairing** (recommend: Söhne Breit + JetBrains Mono + Inter, or Migra + Berkeley Mono + Inter)
- **Tracking and leading** — tighten display, open body
- **Drop caps** in long-form copy
- **Pull quotes** with em-dashes and italic
- **Consistent vertical rhythm** — baseline grid (8px or 12px) — every element snaps to it

Build a type-tester page in Storybook or a `/typography` route before touching the sections.

---

## 6. Build order (~4–5 days — fastest concept)

| Day | Work |
|---|---|
| 1 | Brand tokens, type system, route at `/ambassador-c`, baseline grid utilities |
| 2 | Sections 1 + 2 (hero + numbered overview) |
| 3 | Section 3 color block + Section 5 closing |
| 4 | Section 4 scroll-lock + the 4 SVG compositions |
| 5 | Polish, mobile QA, a11y pass |

---

## 7. Why this concept might win

- **Most distinctive from a conventional network site** — clearest "design upgrade"
- **Fastest performance** by far (no 3D, no video, minimal images) — Lighthouse 100s easy
- **Most accessible** (a11y-friendly, `prefers-reduced-motion` trivial to implement)
- **Communicates seriousness** — matters for a leadership role
- **Easiest to maintain** long-term (no asset pipeline, no 3D updates)
- **Ages well** — Swiss minimal doesn't get dated

---

## 8. Risk

- Lower instant "wow" — needs design-literate viewers to appreciate
- The photo-rich brand is under-represented (could feel disconnected from main site)
- Type discipline required throughout — small inconsistencies are very visible
- Sky-blue Section 3 must feel earned, not arbitrary

---

## 9. Open decisions

- Final type pairing — strongly recommend prototyping 2–3 combinations side-by-side first
- Whether to include any photography at all, or commit fully to type-only
- How much "winking" allowed — Swiss minimal sometimes lets one piece of personality through (an emoji, a small mascot illustration). For this concept, a small mark could be that single allowed deviation
