# Partner Concept B — "Cinematic Community"

A photo-and-video-driven, dark cinematic landing page for a city partner program. Same content + wireframe as Concept A; different visual direction.

**Positioning:** "You're being invited into an inner circle."

**Reference points:** Linear marketing pages, Stripe Sessions, Apple editorial product launches, modern fashion brand sites (Aimé Leon Dore, Aesop).

**Best for:** Applicants who respond to community / belonging signals — people moved by photography of real events, real faces.

---

## 1. Brand DNA (concept-specific)

| Token | Value |
|---|---|
| Background | `#0A0A0B` (near-black, slight warmth) |
| Surface | `#121214` |
| Text | `#FAFAF7` |
| Text muted | `#8A8A85` |
| Accent | `#0EA5E9` (network blue — used sparingly, never as background) |
| Grain | 2–3% opacity film-grain overlay on all photography |
| Display | Fraunces or Tiempos Headline (italic accent variant) |
| Body | General Sans or Inter |
| Mono | JetBrains Mono (for stat labels) |

**Tone:** prestige, hushed, "inside the room."

---

## 2. Stack (shared with Concept A)

Same Next.js 15 + Tailwind + Framer Motion + GSAP + Lenis. What's different:
- **No glass-transmission 3D** (which dominates Concept A)
- Minimal R3F — exactly one 3D object on the page
- **Heavy use of `next/image` and `<video>` loops**
- Add `framer-motion` `LayoutGroup` for shared-element transitions between photos
- Route: `/ambassador-b`

---

## 3. Section-by-section

### Section 1 — Hero (Cinematic Open)

- **Full-bleed background video loop** of community moments (cut from existing reels — `dumb_hackathon_web.mp4`, founder dinners, NeurIPS clips)
- Overlay: subtle vignette + light film grain SVG filter
- H1 set in editorial serif: **"Be in the room."**
- Sub-copy small, justified, near the bottom
- "Apply" CTA = underline link, not a button (editorial style)
- Sticky nav: minimal, white-on-transparent

**Movement principle:** the video carries the motion. Don't add competing animations. Subtle parallax on the H1 only.

### Section 2 — Quick Overview (Magazine Spread)

Layout: asymmetric 2-column.
- **Left 60%:** large rectangular photo of a community event (16:9 or 4:5)
- **Right 40%:**
  - Stats stacked vertically — number huge, label small caps below
  - Pull quote in italic serif underneath
  - Four core values as numbered list (`01` `02` `03` `04`)
- White gutter ~120px between columns
- Scroll behavior: photo slow zoom (kenburns), text static — classic spread effect

### Section 3 — Become a Partner (Portrait Moment)

- **Full-screen portrait photo** — single ambassador-type figure (silhouette OK if no real photo)
- Editorial pull-quote treatment: **"Lead the network in your region."**
- Commitment chips as elegant inline list with em-dashes (`5–8 hrs/week — 6-month term — Quarterly summit`)
- CTA: ghost button only

**Only place 3D appears:** a subtle floating 3D ambassador medal layered on the photo, slowly rotating. Otherwise: pure photography.

### Section 4 — Perks (Moneda Scroll-Lock, photo edition)

Same GSAP pin/scrub/snap framework as Concept A. Visually:
- Each perk = **full-bleed photo background**
- Minimal text overlay: one sentence + perk counter (`01 / 04`)
- Crossfade between perks (no slide motion — pure dissolve with slight zoom)
- Looping animation = the photo/video itself (use video loops where you can)

**Suggested photo + perk pairings:**

| # | Perk | Visual |
|---|---|---|
| 01 | Access to founders & investors | Tight crop of a conversation at a founder dinner |
| 02 | Speaker & host opportunities | Wide shot of someone presenting on stage |
| 03 | Travel & summit stipend | Airport / city skyline / event arrival |
| 04 | Network of 2,000+ builders | Group photo, slightly overhead |

**Progress indicator:** thin horizontal line at top of viewport that fills as the user scrolls through perks.

### Section 5 — Final CTA (Cinematic Close)

- Centered serif H2
- Underlined-link CTA (no button)
- Bottom row: small thumbnail strip of upcoming events (photos with hover names)
- Footer: minimal, single line

---

## 4. 3D treatment (deliberately restrained)

**One 3D element across the entire page:** rotating ambassador medal in Section 3.
- Built in R3F, baked lighting, low-poly
- Gold-anodized PBR finish
- Lights subtle, no bloom

Everything else is photo, video, and type. The restraint is the concept.

---

## 5. Photography pipeline

- Pull from the existing photo library (dumb-hackathon, holidai-dinner, neurips, female-founder-brunch, demo-day, ROTA, etc.)
- Apply consistent treatment via a shared CSS filter chain or pre-export:
  - Slight desaturation (~−15%)
  - Lifted shadows
  - +5% grain via SVG filter overlay
  - Subtle vignette
- Use `next/image` with `priority` on above-the-fold images
- Pre-encode video loops to AV1 + H.264 fallback, max 1.5MB each

---

## 6. Build order (~5–6 days)

| Day | Work |
|---|---|
| 1 | Brand tokens for Concept B, route at `/ambassador-b`, photo treatment pipeline |
| 2 | Hero (background video, type overlay, nav) |
| 3 | Section 2 magazine spread + Section 3 portrait |
| 4 | Section 4 scroll-lock with photo crossfades |
| 5 | Section 5 + footer + Section 3 medal 3D |
| 6 | Polish, mobile QA, video performance pass |

---

## 7. Why this concept might win

- Strongest emotional pull — real faces beat geometry for community pitches
- Lightest 3D footprint of the three concepts (only one 3D object)
- Communicates the program's actual strength: it already has outstanding event photography
- Mature, prestigious, "Stripe-Press-level" production value
- Differentiates from Concept A's futurism by leaning into the human side

---

## 8. Risk

- Quality is entirely a function of photo selection — bad/inconsistent photos kill it
- Lower instant "wow" — premium-but-quiet vs premium-and-loud
- Hardest to differentiate visually from an existing network homepage
- Video files mean larger initial payload — needs careful preload/lazy strategy

---

## 9. Open decisions

- Which event reels can be cut for the hero loop
- Whether to commission/select a specific "ambassador portrait" photo for Section 3, or use a silhouette
- Type pairing: Fraunces vs Tiempos vs Migra for the display face
