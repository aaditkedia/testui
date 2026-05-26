# BUILD PLAN — "NGPES" French fintech payments landing page

> **For:** Claude Code. Work through this **phase by phase, top to bottom.** Each phase has
> an **acceptance gate** — do not start the next phase until the current one passes. Commit
> at the end of every phase.
>
> **Reference file in this repo (read it first):**
> - `ngpes-spec.md` — design system, color/type tokens, per-section breakdown, code
>   patterns for every effect. **Source of truth for *what it looks like* and *how the
>   effects behave*.**
>
> This plan is the source of truth for **architecture, file layout, and sequencing.**

---

## 0. Goal & scope

Build a **light-mode B2B fintech marketing site** for **NGPES** (next generation Payment
Electronic Services), a French infrastructure company for global fiat + digital asset
payments. **6 sections** stacked vertically: hero with 3D globe → Our Solution (4-step
flow with mock UI per step) → The NGPES Difference (4-card row) → Built in Paris,
Built For The World (Eiffel Tower + orange torus) → News & Updates (3 article cards) →
footer.

Two scoped 3D scenes (hero globe + Eiffel scene). The bulk of the work is **mock product
UIs in the Our Solution section** — payment timeline, IBAN network diagram, crypto swap
card, custody vault icon. These sell the actual product, not abstract benefits.

**Non-goals:** CMS, blog detail pages, auth, multi-page routing, dashboard. Single page.
The `News & Updates` cards are static. The `En` language pill is a non-functional UI
element with a `TODO: i18n` comment. Anchor scroll between sections.

---

## 1. Stack (locked — do not substitute)

```bash
npm create vite@latest . -- --template react-ts
npm i three @react-three/fiber @react-three/drei
npm i framer-motion gsap @studio-freight/lenis split-type
npm i lucide-react
npm i -D @types/three
```

| Concern | Library |
|---|---|
| Smooth scroll | `@studio-freight/lenis` |
| Scroll triggers (step dot tracking, nav state, mock UI reveals) | `gsap` + `ScrollTrigger` |
| Component-level animation (card hover, pill press, viewport reveals) | `framer-motion` |
| WebGL (two scoped scenes only) | `three`, `@react-three/fiber`, `@react-three/drei` |
| Per-line headline splitting (if needed for reveals) | `split-type` |
| Step icons + mock UI icons | `lucide-react` |

**Do NOT add:** `@react-three/postprocessing` (no bloom on this brand), any UI kit, Lottie,
react-spring. Stick to the locked stack.

Node 18+. Pin versions in `package.json` after install.

---

## 2. Final file structure

```
src/
  main.tsx
  App.tsx
  styles/
    global.css                   # tokens, base type, layout primitives
    nav.css
    footer.css
  lib/
    smoothScroll.ts              # Lenis + GSAP ticker wiring
    useNavScrollState.ts         # toggle .frosted on nav after hero
    useActiveStep.ts             # track current step (0–3) in Our Solution
  components/
    nav/Nav.tsx
    sections/Hero.tsx              # §3-1: split layout + 3D globe + trust strip
    sections/Solution.tsx          # §3-2: 4 steps with mock UI right column
    sections/Difference.tsx        # §3-3: 4-card row of differentiators
    sections/Paris.tsx             # §3-4: Eiffel + orange torus scene
    sections/News.tsx              # §3-5: 3 article cards + Explore All
    sections/Footer.tsx            # §3-6
    ui/
      HighlightHeadline.tsx         # h1/h2 with orange-color emphasis spans
      StepBadge.tsx                 # the small orange-tint "01" badge
      PillPrimary.tsx               # orange CTA pill with warm shadow
      PillOutline.tsx               # small cream outline pill (Read More)
      TextLink.tsx                  # underlined text link with arrow
      LanguagePill.tsx              # En toggle (non-functional, TODO: i18n)
      TrustLogoStrip.tsx            # the partner logo row under hero
      StepDotIndicator.tsx          # 4 dots, active synced to scroll
      RevealOnView.tsx              # framer whileInView wrapper
    mocks/
      TransactionTimeline.tsx        # Send step UI
      IbanNetwork.tsx                # Receive step UI (SVG)
      CryptoSwap.tsx                 # Convert step UI
      CustodyVault.tsx               # Custody step UI
      DifferenceIllustration.tsx     # placeholder gradient circles for v1
  three/
    scenes/
      HeroGlobeScene.tsx              # the swirling abstract metallic globe
      ParisScene.tsx                  # Eiffel + orange torus
    objects/
      AbstractGlobe.tsx                # procedural torus knot with brushed metal
      Eiffel.tsx                       # GLTF loader + wireframe material
      OrangeTorus.tsx                  # the floating ring
public/
  logos/
    partners/  deloitte.svg cryptocom.svg degaulle.svg fireblocks.svg adan.svg sumsub.svg woorton.svg chainalysis.svg softledger.svg
    finance-innovation.svg
  models/
    eiffel-tower.glb
  images/
    news/  city-sunset.jpg skyscraper.jpg
  favicon.svg
```

---

## 3. Core contracts

**`HighlightHeadline`** — the typographic spine. Renders an `h1`/`h2` at the right size and
weight (500), with any child wrapped in `<span class="hl">` getting `color: var(--accent-orange)`.

```tsx
<HighlightHeadline as="h1">
  The infrastructure for <span className="hl">global</span> fiat &amp; digital asset <span className="hl">payments</span>
</HighlightHeadline>
```

Every section's primary headline goes through this component. **Do NOT write per-section
headline styles that bypass it.** The brand voice depends on consistent orange emphasis.

**`useActiveStep`** — IntersectionObserver-driven (or GSAP `ScrollTrigger`-driven) hook
that returns the current step index (`0..3`) for the Solution section. The `StepDotIndicator`
reads this and lights the active dot orange.

**Solution step contract** — each step in `sections/Solution.tsx` is a row component:
- Two-column grid (left: badge + name + description; right: mock UI)
- ~`50vh` block height
- `data-step={i}` attribute so `useActiveStep` can observe it
- Mock UI component receives `inView` prop and animates on scroll-in via framer

**Mock UIs are NOT real product screenshots.** They're hand-built DOM/SVG components that
look like the product. Build them faithful to the spec — wrong-looking mock UIs are
the most likely failure of this rebuild.

**Nav theme** — transparent over hero, gains `.frosted` (translucent white + backdrop
blur + bottom hairline) after hero exits. Implementation in `useNavScrollState`.

---

## 4. Phases

### Phase 0 — Scaffold ⛳
- [ ] Vite + React + TS project, deps installed, `npm run dev` works.
- [ ] Folder structure from §2 created.
- [ ] Fonts loaded via Google Fonts: **Inter Tight** (400/500/600).
- [ ] Lenis + GSAP wired, initialized once in `App.tsx`.
- [ ] All 6 section files exist, rendering placeholder blocks at `min-height: 100vh`.
- [ ] Off-white page background (`--bg: #FBFAF7`) applied. Near-black default text.
- **Gate:** site scrolls smoothly with momentum; fonts render; placeholders visible.

### Phase 1 — Design system + nav + footer 🎨
- [ ] `global.css`: every CSS variable from `ngpes-spec.md` §2 (warm cream bg, vermillion
      orange accent, near-black ink, the warm orange shadow tokens).
- [ ] `HighlightHeadline`, `StepBadge`, `PillPrimary`, `PillOutline`, `TextLink`,
      `LanguagePill`, `RevealOnView` primitives.
- [ ] `Nav.tsx`: stacked `next` / `generation` wordmark + small `ngpes` sub-tag with orange
      dot mark, center 3-link cluster (Home · About · Resources), `En` pill + orange
      `Contact us` CTA right. Transparent over hero, `.frosted` after.
- [ ] `Footer.tsx`: brand block + 3-4 link columns + newsletter input + social row +
      copyright strip.
- [ ] **Test `HighlightHeadline` in isolation** — render `The infrastructure for <span class="hl">global</span> payments` and confirm orange-on-cream looks right.
- **Gate:** open the site, see styled nav, footer, and a `HighlightHeadline` component
      that works. Screenshot it.

### Phase 2 — Hero (without 3D yet) 🌍
- [ ] **§3-1 Hero**: split layout — headline + subtitle + CTA pill on left, placeholder
      cream sphere on right. Use `HighlightHeadline` with `<span class="hl">global</span>`
      and `<span class="hl">payments</span>`.
- [ ] Subtitle: `Built for businesses that need to move money fast. Faster settlement.
      Lower costs. Full compliance.` in `--ink-dim`.
- [ ] `PillPrimary` with text `Contact us` and an arrow icon.
- [ ] `TrustLogoStrip.tsx`: horizontal row of partner SVGs below the hero, with edge fade
      masks. Use real press-kit SVGs.
- [ ] Nav engages `.frosted` after hero exits.
- **Gate:** hero reads as a polished B2B fintech landing page even without 3D. The orange
      pill stands out exactly enough. The logo strip looks like a real trust row.

### Phase 3 — Our Solution (the bulk of the work) 💸
This is the most important section. Spend the time.

- [ ] `Solution.tsx` shell: centered title `Our Solution`, then 4 step rows in sequence,
      then a bottom `StepDotIndicator` (sticky or scroll-tracked) showing 4 dots.
- [ ] Each step row: left = `StepBadge` + name + body description; right = mock UI component.
- [ ] Build the 4 mock UI components:
  - [ ] **`TransactionTimeline.tsx`** (Send) — small white card with hairline border + soft
        shadow. Header: `Instant Transaction · 12:14`. Body: vertical timeline of 5 events
        (Queued / Broadcasting / Confirming / Received), each with a left-aligned dot
        connected by a hairline. Done states use orange dots; the active state pulses;
        pending is gray. See spec §5.8 for the exact markup.
  - [ ] **`IbanNetwork.tsx`** (Receive) — pure SVG. 4 small rounded rect "node" labels
        positioned at compass points (top, right, bottom, left), each containing an IBAN
        like `3754 0044 0532 0130` + small name beneath. Dotted lines from each to a
        central circular spinner with an orange `O` glyph that slowly rotates. See spec §5.9.
  - [ ] **`CryptoSwap.tsx`** (Convert) — small card with a `CRYPTO` label at top and a
        sub-card containing a Bitcoin `₿` glyph. Optionally show a fiat sub-card beside
        it with a swap arrow between. See spec §5.10.
  - [ ] **`CustodyVault.tsx`** (Custody) — circular cream container holding a small vault
        icon (use lucide `Vault`). Subtle pulse animation.
- [ ] `useActiveStep` hook: observe each step row and track `activeStep`. `StepDotIndicator`
      reads this and lights the corresponding dot orange.
- [ ] Each mock UI animates in on enter view (framer `whileInView`, `y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.7`).
- **Gate:** scroll through the Solution section. Each step reads as a real product. Step
      dots track correctly. Mock UIs look polished, not janky.

### Phase 4 — DOM-only remaining sections 📰
- [ ] **§3-3 Difference**: centered title `The NGPES Difference`, 4-card row. Each card has:
      `DifferenceIllustration` (placeholder gradient circle for v1), title (invent if not
      visible in capture: `Faster Settlement` · `Built-in Compliance` · `Global Reach` ·
      `Fiat + Digital`), 1-line description. Hover lift via framer.
- [ ] **§3-5 News & Updates**: centered title with subtle orange-emphasis on a word
      (e.g. `<span class="hl">Updates</span>`), top-right `Explore All ↗` link, 3-column
      article grid:
  - [ ] Card 1: cream `--bg-soft` background, `Read More` outline pill top-left, title,
        and a bottom co-branding row `next generation × Finance Innovation` (two SVG logos
        with `×` separator).
  - [ ] Card 2: city sunset photo top, `Read More` pill overlaid top-left, title beneath.
  - [ ] Card 3: skyscraper photo top, same pattern.
- [ ] Hover: card lifts 4px, photo scales 1.04 with `transition: transform .6s`.
- **Gate:** Sections 3 and 5 look complete. Difference still has placeholder illustrations
      (fine for now); News looks production-ready.

### Phase 5 — 3D scenes (hero globe + Paris) 🇫🇷
- [ ] **Hero globe (§3-1)**: replace placeholder with `HeroGlobeScene.tsx`. Procedural
      torus knot or swept tube with `meshStandardMaterial({ metalness: 1, roughness: 0.3 })`,
      `<Environment preset="studio">`, slow Y-axis idle rotation via `<Float>`. No bloom.
- [ ] **§3-4 Paris**: full-bleed section with `<Canvas>`. `HighlightHeadline` above the
      scene: `Built in Paris,` / `Built For The <span class="hl">World</span>.`. Below
      the headline: subtitle line.
- [ ] `ParisScene.tsx`: load Eiffel Tower GLTF, apply a stylized blueprint/wireframe
      material (white-gray edges on white background — use `EdgesGeometry` + `LineBasicMaterial`
      OR a custom material with `wireframe: true`). Add the orange torus from
      `OrangeTorus.tsx` — `torusGeometry([0.6, 0.12])` with `meshStandardMaterial({ color: '#FF4D1F' })`,
      wrapped in `<Float>` so it orbits subtly.
- [ ] Both scenes pause `useFrame` when out of view (use `useInView` from framer or a
      custom IntersectionObserver hook).
- **Gate:** the hero feels premium with the metallic globe; the Paris scene reads as a
      literal nod to French heritage without being cheesy.

### Phase 6 — Polish ✨
- [ ] Section header reveals (eyebrows + headlines) via `RevealOnView` (framer
      `whileInView` with `once: true`, `margin: '-15%'`).
- [ ] Logo strip: subtle continuous horizontal drift via CSS animation (very slow, ~60s
      per cycle), with edge gradient masks.
- [ ] **Reduced motion**: disable Lenis smoothing, freeze 3D rotation, drop framer reveals
      to instant opacity changes. Mock UI animations become instant.
- [ ] **Mobile (≤768px)**: hero stacks (headline above globe, smaller); Solution steps
      stack mock UI below text; Difference 4-card row → 2×2 grid; News → 1 column;
      logo strip → horizontal scroll with snap.
- [ ] **Anchor scroll**: nav links → `lenis.scrollTo('#section-id', { duration: 1.2 })`.
- [ ] `En` language pill: non-functional, `cursor: pointer`, `title="Translation coming soon"`.
- **Gate:** test on a real phone. Site is fully responsive, no broken layouts at any breakpoint.

### Phase 7 — QA / Definition of Done ✅
- [ ] All 6 sections render.
- [ ] `HighlightHeadline` used everywhere a section title needs orange-emphasis.
- [ ] All 4 mock UIs look polished and on-brand.
- [ ] `StepDotIndicator` tracks the active step accurately as you scroll.
- [ ] Both 3D scenes render, idle-animate, and pause when off-screen.
- [ ] Nav frosted state engages after hero.
- [ ] No console errors. No layout shift (CLS ≈ 0).
- [ ] Lighthouse perf ≥ 92 desktop, ≥ 80 mobile.
- [ ] `npm run build` succeeds; deployed (Vercel/Netlify) and live.

---

## 5. Gotchas for the agent

- **Orange emphasis is COLOR, not WEIGHT.** When you see a bold-looking word in the source
  capture, it's `color: var(--accent-orange)` on a regular-weight span — that's it. If
  you also bold the highlighted word, the brand voice flips to Berco/MAIN style. Wrong brand.
- **No bloom. No glow. No grain.** This is a corporate fintech site, not an experimental
  microsite. If you reach for postprocessing, stop.
- **One accent color.** Warm vermillion orange (`#FF4D1F`). No blue, no green, no purple,
  no secondary accent. The single color is the discipline.
- **Cream background, not white.** `#FBFAF7` is the bg. Pure `#FFFFFF` will read clinical
  and lose the warmth.
- **Mock UIs are the centerpiece of Section 2.** Don't substitute stock illustrations or
  Lottie loops. Hand-build the transaction timeline, IBAN network, swap card, vault. These
  are what sell the product as real.
- **The Eiffel Tower is NOT optional.** Don't replace it with a generic globe or city
  silhouette in the Paris section. The literal landmark is the whole point — it's the
  brand's identity moment.
- **Don't use mini-canvases per Difference card.** That's 4 extra WebGL contexts. Pre-render
  each illustration as a PNG/WebP and use `<img>`. Same visual, 1/10th the GPU.
- **The "wait for it..." overlay and creator reaction shots in the source video are NOT
  part of the site.** That's the same TikTok dev creator from the Berco video. Ignore.
- **The Figma overview frames in the source video are NOT part of the site.** That's the
  designer showing their broader portfolio. Ignore.
- **`En` language pill is non-functional.** Wire i18n later. Mark with `TODO: i18n`.
- **SplitType + fonts**: wait for `document.fonts.ready` before splitting, or measurements
  will be wrong.
- **Generous whitespace is non-negotiable.** `clamp(80px, 14vh, 180px)` block padding per
  section minimum. The brand reads premium because it breathes.
- **No browser storage** anywhere — not needed.

---

## 6. Suggested commit sequence

`chore: scaffold` →
`feat: design system + nav + footer` →
`feat: hero with highlight headline + trust strip (no 3D yet)` →
`feat: our solution with 4 mock UIs + step dot indicator` →
`feat: difference + news sections` →
`feat: 3D globe + paris (eiffel + orange torus)` →
`polish: reveals + reduced motion + mobile` →
`chore: qa + deploy`.

---

## 7. Stretch goals (after Definition of Done)

- **Real i18n (English ↔ French)**: wire `next-intl` or `react-i18next`, translate copy,
  flip the `En` pill on click. This is a French company — French should be a first-class
  language.
- **Live transaction timeline demo**: the Send step's mock timeline updates every few
  seconds with a fake new transaction queueing up. Subtle, not distracting.
- **NGPES Difference 3D illustrations**: replace placeholder gradients with real procedural
  3D objects (hourglass, dome, vessel, sweeping form) rendered once and exported as PNG.
- **Cursor follower**: small orange dot that scales on hover over the `Contact us` pill
  and `Read More` pills.
- **News detail pages**: turn the 3 News cards into real routes (`/news/[slug]`) with
  full article content. Drop in Sanity or Hygraph as a headless CMS.
- **Contact form modal**: the `Contact us` pill opens a multi-step inquiry form (company,
  use case, volume tier, contact info).
- **Compliance / partners section**: dedicated page or expandable section about the
  regulatory side (DE GAULLE FLEURANCE counsel, Finance Innovation cluster certification,
  AMF status, etc.) — important for a B2B fintech brand.
