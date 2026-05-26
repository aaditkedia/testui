# BUILD PLAN — "Berco Inc" eCommerce holding-co landing page

> **For:** Claude Code. Work through this **phase by phase, top to bottom.** Each phase has
> an **acceptance gate** — do not start the next phase until the current one passes. Commit
> at the end of every phase.
>
> **Reference file in this repo (read it first):**
> - `berco-spec.md` — design system, color/type tokens, per-section breakdown, code
>   patterns for every effect. **Source of truth for *what it looks like* and *how the
>   effects behave*.**
>
> This plan is the source of truth for **architecture, file layout, and sequencing.**

---

## 0. Goal & scope

Build a **dark-mode, premium B2B landing page** for **Berco Inc**, an eCommerce
holding/investment company. **7 sections** stacked vertically: hero with 3D chip → big
scroll-driven statement paragraph → "Our Mindset" with 3D exploded card stack → Vision
Meets Execution (brands carousel) → Tools We Use Everyday (logos carousel) → Our Services
(3×2 hairline grid) → footer.

Two small, **scoped** 3D scenes (hero chip + mindset card stack). Otherwise it's a
type-and-grid site. The wow factor is the **scroll-driven word-by-word paragraph
brightening** and the **bold-word emphasis** baked into every headline.

**Non-goals:** CMS, blog, auth, multi-page routing, dashboard, RTL Hebrew layout (the
`Hebrew` pill is a toggle but the underlying RTL flip is out of scope for this rebuild —
ship the LTR English version, leave the pill as a non-functional UI element with a
`TODO: i18n`). Single page, anchor scroll between sections.

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
| Scroll triggers (word reveal, nav state, section reveals) | `gsap` + `ScrollTrigger` |
| Component-level animation (carousel slides, hovers) | `framer-motion` |
| WebGL (two scoped scenes) | `three`, `@react-three/fiber`, `@react-three/drei` |
| Word splitting for the statement reveal | `split-type` |
| Service grid icons | `lucide-react` |

**Do NOT add:** `@react-three/postprocessing` (this brand has no bloom — see gotchas),
any UI kit (no shadcn, no chakra — every component is hand-built), any animation library
beyond framer-motion + gsap (no react-spring, no lottie).

Node 18+. Pin versions in `package.json` after install.

---

## 2. Final file structure

```
src/
  main.tsx
  App.tsx
  styles/
    global.css                  # tokens, base type, layout primitives, grain, vignette
    nav.css
    footer.css
  lib/
    smoothScroll.ts             # Lenis + GSAP ticker wiring
    useNavScrollState.ts        # toggle .frosted on nav after hero
  components/
    nav/Nav.tsx
    sections/Hero.tsx             # §3-1: 3D chip + asymmetric copy layout
    sections/Statement.tsx        # §3-2: long paragraph, word-by-word brightening
    sections/Mindset.tsx          # §3-3: 'Our Mindset' headline + 3D card stack
    sections/Brands.tsx           # §3-4: 'Meets Execution.' + brand cards carousel
    sections/Tools.tsx            # §3-5: 'We Use Everyday.' + tool logos carousel
    sections/Services.tsx         # §3-6: 'Empower business growth' + 3×2 hairline grid
    sections/Footer.tsx           # §3-7
    ui/
      Eyebrow.tsx                  # dot + label small eyebrow ("● Our Mindset")
      BoldHeadline.tsx             # h1/h2 with <b> emphasis; not bypassed by per-section styles
      TextLink.tsx                 # 'Explore Our Solutions ↗' style link with arrow
      LanguagePill.tsx             # the cream 'Hebrew' pill
      Carousel.tsx                 # shared horizontal carousel for Brands + Tools
      LogoCard.tsx                 # a single brand/tool card with logo+name+tagline
      ServiceCell.tsx              # one cell in the hairline grid
      WordReveal.tsx               # wraps a long paragraph with scroll-scrub word coloring
      RevealOnView.tsx             # framer-motion whileInView fade+rise wrapper
      GrainOverlay.tsx             # fixed paper-grain layer, 3% opacity
  three/
    scenes/
      ChipScene.tsx                # hero canvas: chip + idle teal wisp
      CardStackScene.tsx           # mindset canvas: exploded card stack
    objects/
      Chip.tsx                     # procedural circuit board + die
      CardStack.tsx                # procedural 3-tier card stack
public/
  logos/
    brands/  halo.svg olwite.svg hardcore.svg nitroops.svg     # stylized placeholders
    tools/   shopify.svg meta.svg slack.svg monday.svg figma.svg
  fonts/  (or use Google Fonts <link>)
  favicon.svg
```

---

## 3. Core contracts

**`BoldHeadline`** — the typographic spine of the site. Renders an `h1` or `h2` with
`font-weight: 500` and `letter-spacing: -0.022em`. Inside, any `<b>` child renders at
`font-weight: 700` with no other styling change. Every section's headline goes through
this component. **Do not write per-section headline styles** that override this — the
brand voice depends on consistency.

```tsx
<BoldHeadline as="h1">Empowering <b>eCommerce</b><br/>with Bold<br/>Solutions</BoldHeadline>
```

**`WordReveal`** — the scroll-scrub paragraph. Splits content into words via SplitType,
uses GSAP `ScrollTrigger` with `scrub: true` and a `start: 'top 70%'` / `end: 'bottom 30%'`
window to assign each word one of three colors (`--text-muted`, `--text-dim`, `--text`)
based on its position relative to the scroll progress. See spec §5.1 for the exact pattern.

```tsx
<WordReveal>
  At Berco Inc. we redefine <b>innovation</b> by empowering <b>businesses</b> to reach their full potential. From <b>transformative</b> eCommerce strategies to ...
</WordReveal>
```

`<b>` words inside the reveal stay bold throughout — the brightening lands harder on them.

**`Carousel`** — the shared component for Brands and Tools sections. Props:
`{ items: LogoCardData[]; title: ReactNode; topRightCaption?: ReactNode; }`. Renders a
horizontal flex row of `LogoCard`s, prev/next arrow buttons below center, current index
animates via framer-motion `<motion.div animate={{ x: -index * cardWidth }}>` with ease
`[0.16, 1, 0.3, 1]`.

**`ServiceCell`** — one cell of the 3×2 hairline grid. Props:
`{ icon: LucideIcon; name: string; description: string; }`. Padding `32px`. No background.
Borders applied by parent grid (right + bottom hairlines, with `:nth-child` overrides on
edges). Slight on-hover background wash (`--bg-elevated`) via framer.

**Nav theme** — transparent over hero, gains `.frosted` class (translucent dark + backdrop
blur + hairline bottom border) once the hero exits the viewport. Implementation in
`useNavScrollState`.

---

## 4. Phases

### Phase 0 — Scaffold ⛳
- [ ] Vite + React + TS project, deps installed, `npm run dev` works.
- [ ] Folder structure from §2 created.
- [ ] Fonts loaded via Google Fonts: **Inter Tight** (400/500/700).
- [ ] Lenis + GSAP wired in `lib/smoothScroll.ts`, initialized once in `App.tsx`.
- [ ] All 7 section files exist and render a placeholder block at `min-height: 100vh`.
- [ ] Off-black page background (`--bg: #0A0A0B`) applied via CSS variable. Cream text by default.
- **Gate:** site scrolls smoothly with momentum; fonts render correctly; placeholders visible.

### Phase 1 — Design system + nav + footer + atmosphere 🎨
- [ ] `global.css`: every CSS variable from `berco-spec.md` §2.
- [ ] `BoldHeadline`, `Eyebrow`, `TextLink`, `LanguagePill`, `GrainOverlay`, `RevealOnView` primitives.
- [ ] `Nav.tsx`: `BERCO INC` wordmark left, center 4-link cluster (About · Brands · Services · Contact),
      `Hebrew` LanguagePill right. Transparent over hero, `.frosted` after. Mobile: hamburger.
- [ ] `Footer.tsx`: brand mark + tagline, 3–4 link columns, thin top hairline divider, copyright strip.
- [ ] `GrainOverlay` fixed, `z: 90`, opacity 0.03, mix-blend-mode overlay.
- [ ] Subtle vignette via a fixed pseudo-element on `body`.
- [ ] **Test BoldHeadline in isolation** — render `Empowering <b>eCommerce</b>` and confirm the bold word reads correctly.
- **Gate:** open the site, see styled nav + footer + atmosphere. BoldHeadline component works.

### Phase 2 — Statement paragraph (the signature) ✍️
Do this **early**. If you can't get the word-scrub reveal feeling right, nothing else matters.
- [ ] Build `WordReveal` per spec §5.1: SplitType into words, GSAP scroll-scrub from
      `top 70%` to `bottom 30%`, three-tier color (`--text-muted` → `--text-dim` → `--text`).
- [ ] `Statement.tsx` section uses it for the full paragraph with `<b>` markup on
      `innovation`, `businesses`, `transformative`.
- [ ] Section has generous block padding (`clamp(120px, 20vh, 200px)`) and a max-width
      around `1100px`. Text size: clamp `1.8rem` to `2.6rem`, weight 400, line-height ~1.3.
- [ ] Test by scrolling slowly through — words should brighten one-by-one, smoothly.
- **Gate:** the word reveal looks deliberate and reads premium. If it feels janky or
      mechanical, fix it before moving on.

### Phase 3 — DOM-only sections (services + carousels) 🧱
- [ ] **§3-6 Services** — hairline 3×2 grid. Eyebrow + BoldHeadline at top left, body
      paragraph top right. 6 cells with lucide icons (`Shield`, `Store`, `Layers`,
      `BarChart3`, `Megaphone`, `Lightbulb`). Subtle hover wash.
- [ ] **`Carousel` + `LogoCard`** components.
- [ ] **§3-4 Brands** — Carousel of 4 stylized brand wordmarks. Create placeholder SVG
      wordmarks for `Wear Your Halo`, `Olwite`, `Hardcore`, `NitroOps`. Headline:
      `[Vision] Meets Execution.` (BoldHeadline with bold on "Execution").
- [ ] **§3-5 Tools** — Carousel of real tool press-kit SVGs: Shopify, Meta, Slack,
      Monday.com, Figma. Headline: `[Tools] We Use Everyday.`
- **Gate:** scroll the full site top to bottom. Hero is still a placeholder, but every
      other section is real. Services and carousels look correct.

### Phase 4 — Hero section (3D chip) 🦾
- [ ] Build the asymmetric three-column layout: big BoldHeadline left, 3D chip center,
      `Fintech` eyebrow + small headline right.
- [ ] Bottom row: `Products & Services` tag bottom-left, body subtitle bottom-center.
- [ ] `Explore Our Solutions ↗` TextLink under the headline.
- [ ] `three/objects/Chip.tsx` + `three/scenes/ChipScene.tsx`: procedural chip per
      spec §5.3 — rounded dark base + smaller chip die on top with a teal emissive
      accent. Wrapped in `<Float>` for idle motion. `<Environment preset="city">` or
      a dark studio HDRI.
- [ ] Optional: a faint teal mist sprite or Points cloud rising from the chip corner.
- **Gate:** the hero hits — premium, restrained, the 3D chip feels like a product shot,
      not a screensaver.

### Phase 5 — Mindset section (3D card stack) 🃏
- [ ] **§3-3 Mindset** — two-column layout. Left: eyebrow `● Our Mindset`, BoldHeadline
      `Empower growth` / `for businesses` / `<b>worldwide</b> today.`, body paragraph,
      single dot indicator below. Right: 3D card stack scene.
- [ ] `three/objects/CardStack.tsx` + `three/scenes/CardStackScene.tsx`: procedural
      stack per spec §5.4 — dusty pink top card hovering, glass middle plate with
      teal inset, dark base. Idle Y-axis rotation. Soft contact shadow.
- **Gate:** the card stack looks like an Apple keynote object — clean, slow, deliberate.

### Phase 6 — Polish ✨
- [ ] Nav frosted state engages exactly when hero exits.
- [ ] Section header reveals (eyebrow + headline) via `RevealOnView` (framer
      `whileInView` with `once: true`, `margin: '-15%'`, `duration: 0.8`, ease `[0.16,1,0.3,1]`).
- [ ] Carousel cards have a subtle `whileHover={{ y: -4 }}` lift.
- [ ] **Reduced motion**: disable Lenis smoothing, disable WordReveal scrub (just fade
      the paragraph to full opacity instantly), kill idle 3D rotation, drop framer reveals
      to instant opacity changes.
- [ ] **Mobile (≤768px)**: hero stacks to single column with chip below headline; 3D
      objects drop to `dpr={[1, 1.3]}`; carousels stay horizontal scroll with peek; services
      grid → 1 column with horizontal hairlines; statement paragraph at smaller size,
      reveal still works.
- [ ] **Anchor scroll**: nav links → `lenis.scrollTo('#section-id', { duration: 1.2 })`.
- **Gate:** test on a phone or Chrome device toolbar. Site reads at 375px wide.

### Phase 7 — QA / Definition of Done ✅
- [ ] All 7 sections render.
- [ ] BoldHeadline used in every section that has a headline. No section has its own
      headline styles bypassing it.
- [ ] Statement paragraph word reveal smoothly scrubs with scroll. Pre-bolded words
      (`innovation`, `businesses`, `transformative`) stay bold throughout.
- [ ] Both 3D scenes idle-rotate and feel calm. No bloom anywhere.
- [ ] Both carousels work — arrows navigate, cards animate, hover lifts.
- [ ] Services grid uses hairlines only, no card backgrounds.
- [ ] Nav frosted state engages correctly.
- [ ] No console errors. No layout shift (CLS ≈ 0). No unhandled promise rejections.
- [ ] Lighthouse perf ≥ 90 desktop, ≥ 80 mobile.
- [ ] `npm run build` succeeds; deployed (Vercel/Netlify) and live on a custom domain.

---

## 5. Gotchas for the agent

- **No bloom. No glow. No chromatic aberration.** The previous Berco-style spec is
  Peachweb's opposite. If you find yourself reaching for `@react-three/postprocessing`,
  stop and re-read the spec. The two 3D objects are studio-lit product shots, not light shows.
- **Cream, not white.** Body text is `#F4EFE6` (warm off-white). If you wrote `color: white`
  anywhere, that's wrong — change it.
- **Bold-word emphasis is mandatory** on every headline. Don't substitute italic, color,
  size, or weight-100 contrast. The brand voice depends on it. If `BoldHeadline` ever
  renders a headline without a `<b>` child, that's a bug in your copy.
- **The statement paragraph reveal is the centerpiece.** Don't ship it as a static
  paragraph that fades in once. The word-by-word scrub is the whole point.
- **Services section: NO card backgrounds.** Just hairlines (`rgba(244,239,230,.08)`).
  If you add `background: var(--bg-elevated)` to the cells, the section will read like
  a generic SaaS template. The whitespace + hairlines do the work.
- **`Hebrew` language pill is non-functional** for this rebuild. Wire `i18n` later.
  Leave the pill in place with a `TODO: i18n` comment, but don't try to flip the site
  to RTL.
- **The TikTok intercut shots in the source video are NOT part of the site.** The creator
  reaction shot (a guy with headphones) and the Figma file showing unrelated portfolio
  pieces are ad framing. Ignore them.
- **Brand logos** for the Brands carousel (`Wear Your Halo`, `Olwite`, `Hardcore`,
  `NitroOps`) are stylized SVG wordmarks you'll build by hand. They don't need to be
  the real brands' logos — they just need to feel like distinct premium brand marks.
  Tool logos can use real press-kit SVGs with attribution in the footer if required.
- **Scroll-driven word coloring can hammer the main thread.** Throttle the
  `onUpdate` callback or update via CSS variables on a parent and let the GPU do the work.
- **SplitType + fonts.** Wait for `document.fonts.ready` before calling SplitType, or
  line/word measurements will be wrong. Refresh ScrollTrigger after.
- **Generous vertical padding is non-negotiable.** `clamp(80px, 12vh, 160px)` block
  padding per section minimum. Premium B2B brands breathe.
- **No browser storage** anywhere — not needed.

---

## 6. Suggested commit sequence

`chore: scaffold` →
`feat: design system + nav + footer + atmosphere` →
`feat: statement paragraph with word-scrub reveal` →
`feat: services hairline grid + carousels (brands + tools)` →
`feat: hero with 3D chip` →
`feat: mindset with 3D card stack` →
`polish: reveals + reduced motion + mobile` →
`chore: qa + deploy`.

---

## 7. Stretch goals (after Definition of Done)

- **Full Hebrew RTL i18n**: wire `next-intl` or hand-roll, flip layout direction on
  `Hebrew` pill click, translate copy. The pill is in the design for a reason.
- **Brand detail pages**: clicking a brand card in the Brands carousel opens a detail
  view (modal or dedicated route) with case-study copy, screenshots, KPIs.
- **Animated chip dies**: the teal accent on the chip pulses subtly to a slow heartbeat
  rhythm. Use a shader uniform driven by `useFrame` clock.
- **Cursor follower**: small cream dot that scales up on hover over carousel arrows
  and TextLinks. Subtle, not intrusive.
- **Real CMS**: pull Brands and Services from a headless CMS (Sanity / Hygraph) so
  Berco can add portfolio companies without redeploying.
- **Contact form modal**: nav `Contact` link opens a multi-step inquiry form (party,
  inquiry type, budget range, contact).
