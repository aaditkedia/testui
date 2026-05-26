# Website Recreation Spec — "NGPES" (next generation fintech payments infrastructure)

> Reverse-engineered from an ~18s screen-recording filmed off a curved ultrawide monitor.
> Format: TikTok-style design-portfolio reel by the same creator who did the Berco
> recording — intercut shots of the site at native res + the creator's reaction face +
> a Figma overview of unrelated portfolio frames. **Only the on-screen site frames are
> part of this rebuild.** The creator reaction shot, the Figma canvas, the "wait for it..."
> and "Comment 'build' to work with us" overlays, and the native TikTok UI (heart, comment,
> share counts) are all ad-wrapper footage — excluded.
>
> Brand name reads as **"next generation"** as a logo wordmark with a small **"ngpes"**
> sub-tag (Next Generation Payment Electronic Services). The company is French — partners
> include Finance Innovation (French fintech cluster), DE GAULLE FLEURANCE (Paris law firm),
> ADAN (French digital asset association). There's a dedicated "Built in Paris, Built For
> The World" section.

---

## 1. What this site actually is

A **light-mode B2B fintech marketing site** for **NGPES**, a French infrastructure company
for **global fiat + digital asset payments**. Tone: serious, compliance-aware, polished,
warm. Think **Stripe** crossed with **Fireblocks**, but distinctly French — Eiffel Tower
makes a literal appearance.

Single long page, scroll-driven, ~5–6 stacked sections. Visual language is **white/cream
background, near-black text, single warm orange accent, two hero 3D objects (an abstract
swirling globe in the hero, an Eiffel Tower with an orange torus in the "Built in Paris"
section), and lots of mock UI visualizations beside each product step.**

The signature typographic move is **orange color emphasis on key words inside headlines
and section titles** (`The infrastructure for `**`global`**` fiat & digital asset `**`payments`**) — not bold weight, not italic, just color.

---

## 2. Design system

### Color
| Token | Approx value | Use |
|---|---|---|
| `--bg` | `#FBFAF7` (warm off-white, near-cream) | every section background |
| `--bg-soft` | `#F2EFEA` | secondary panels, news card empty states |
| `--ink` | `#0F0F10` (near-black) | headlines, primary text |
| `--ink-dim` | `rgba(15,15,16,.55)` | body copy, captions |
| `--ink-muted` | `rgba(15,15,16,.35)` | small labels |
| `--accent-orange` | `#FF4D1F` (warm vermillion / coral-red) | emphasis words, CTA pill, step badges, the orange torus |
| `--accent-orange-soft` | `#FF7A4D` | gradient highlights, pill glow |
| `--accent-orange-dim` | `rgba(255,77,31,.10)` | step-badge background washes, hover tints |
| `--hairline` | `rgba(15,15,16,.08)` | thin dividers, card borders |
| `--shadow-warm` | `0 30px 60px rgba(255,77,31,.18)` | orange pill drop shadow (warm tinted) |
| `--shadow-card` | `0 14px 40px rgba(15,15,16,.06)` | news cards, mock UI cards |

This palette is **two warm neutrals (cream + near-black) plus one warm orange accent**.
That's it. No blue, no green, no purple. The orange is **warm vermillion**, not pure red,
not safety orange. Get this wrong and the brand reads off.

### Type
- One sans-serif family across the whole site — a modern humanist sans with slight warmth.
  Looks like **Söhne**, **PP Mori**, or **Inter Tight**. **Free fallback for rebuild:
  Inter Tight** (Google Fonts) with `letter-spacing: -0.02em` on headlines.
- **Headlines:** clamp `2.4rem`–`4.6rem`, `font-weight: 500` (medium, NOT 600 or 700),
  line-height ~`1.06`. **Orange-color emphasis** on key words is the signature:
  ```html
  <h1>The infrastructure for <span class="hl">global</span> fiat &amp; digital asset <span class="hl">payments</span></h1>
  ```
  ```css
  h1 .hl { color: var(--accent-orange); }
  ```
  Do NOT make the highlighted words bolder, italic, or larger. Just color.
- **Section titles** (`Our Solution`, `The NGPES Difference`, `Built in Paris, Built For The World`, `News & Updates`): centered, clamp `2rem`–`3rem`, weight `500`, same orange-on-one-word treatment where applicable (`Built For The `**`World`**, `Our Solu`**`tion`** appears to have a subtle orange gradient on "tion" — could be a per-letter color reveal).
- **Body / step descriptions:** `15–16px`, weight `400`, line-height ~`1.5`, color `--ink-dim`.
- **Step number badges** (`01`, `02`, `03`, `04`): small cream/orange rounded square (~`28×28px`), orange text, weight 500, with a soft orange `--shadow-warm` glow underneath.
- **Nav:** small (`14px`), weight `400`, gap ~`24px`.

### Layout language
- **Generous whitespace.** Every section breathes — block padding `clamp(80px, 14vh, 180px)`.
- **Container max-width** around `1280–1400px`, padding-inline `clamp(24px, 6vw, 96px)`.
- **Hero** is a two-column split: big headline + subtitle + CTA pill on the left, 3D
  abstract globe object on the right, with a centered trust-logo strip below.
- **Our Solution** uses a **two-column repeating layout**: each step is a row with text
  (number badge + name + description) on the left, mock UI visualization on the right.
  Below the step is a row of dots indicating which step is in view (4 dots, current one
  filled orange).
- **NGPES Difference** is a **4-column card grid** — each card has a small 3D-rendered
  illustration on top, a title, a 1–2 line description.
- **Built in Paris** is a single full-bleed scene with the Eiffel Tower + orange torus
  centered, headline overlaid above.
- **News & Updates** is a **3-column article grid** with an "Explore All" link top-right.

### Buttons & pills
- **Primary CTA pill** = orange-filled, white text, `~14px` weight 500, `~40px` height,
  `100px` border-radius, the **warm orange drop shadow** underneath. Single text:
  `Contact us`. Hover: lifts 2px + intensifies the shadow.
- **Secondary text link** (`Explore All`, `Read More`): small text with a hairline
  underline that grows on hover. The `Read More` pill on news cards is a small cream
  outline pill.
- **No filled secondary buttons.** It's pill or text link only.

### Nav
- Fixed top.
- Left: **`next` / `generation`** stacked wordmark (2-line, ~`16px` weight 500, very tight
  line-height) with a small **`ngpes`** sub-tag (orange dot mark) below or to the right.
- Center: `Home` · `About` · `Resources` (3 links, current page in orange).
- Right: `En` text (language toggle) + orange `Contact us` pill.
- Background: transparent over hero; gains a translucent white background blur
  (`rgba(251,250,247,.8)` + `backdrop-filter: blur(12px)`) once you scroll.

### Atmosphere / mood
- **Light, airy, premium.** No glow, no bloom, no grain (this brand is corporate, not
  experimental).
- Two restrained 3D objects + a handful of mock UI illustrations as visual punctuation.
- The orange accent is **sparse** — it draws the eye exactly where the brand wants it.

---

## 3. Section-by-section breakdown

Order reconstructed from the recording (a straightforward top-to-bottom scroll):

| # | Section | Key visual | Copy | Notes |
|---|---|---|---|---|
| 1 | **Hero** | Right: **3D abstract globe** — a swirling, hair-like or fluted, brushed-metal sphere rendered in white/silver on white background. Below the hero (full-width): horizontal **trust-logo strip** with: Deloitte (or similar), crypto.com, [Doha Bank?], DE GAULLE FLEURANCE, Fireblocks, ADAN, sumsub, WOORTON, Chainalysis, softledger | Headline (left, large): `The infrastructure for `**`global`**` fiat & digital asset `**`payments`**. Subtitle: `Built for businesses that need to move money fast. Faster settlement. Lower costs. Full compliance.` CTA: orange `Contact us` pill | The two emphasized words (`global` and `payments`) are colored orange. The globe slowly rotates idle. |
| 2 | **Our Solution** | Centered title `Our Solution`. Then four sequential rows (4 steps), each a 2-column split: left = small orange `01`/`02`/`03`/`04` square badge + step name + description; right = mock UI visualization. Below all steps: 4-dot indicator (one filled orange, scrolls with you). | **01 Send** — `Send payments worldwide in fiat or digital assets to registered counterparties, all from one platform. Manage outbound payment flows with greater speed, control and visibility.` → mock UI: **transaction timeline card** showing `Instant Transaction · 12:14` / `Queued · 04/03/2025 13:14` / `Broadcasting · 04/03/2025 13:14` / `Confirming · 04/03/2025 13:14` / `Received`. **02 Receive** — `Receive funds globally from third parties or transfer within your own accounts, in fiat through your linked IBAN or in supported digital assets to your platform wallet. Bring incoming liquidity into one operational setup.` → mock UI: **payment network diagram** — 4 IBAN-numbered nodes (`3754 0044 0532 0130 · Tarja Macher` etc.) connected by dotted lines to a central spinner with an orange `O` glyph inside. **03 Convert** — `Convert between fiat and supported digital assets within one operational environment. Reduce friction and manage liquidity more flexibly across currencies, rails and networks.` → mock UI: **crypto swap card** — small card with `CRYPTO` label and a Bitcoin `B` glyph inside a sub-card. **04 Custody** — `Securely hold and manage supported digital assets in one place. Structuring liquidity across wallets, teams or use cases while maintaining operational control.` → mock UI: **vault icon** in a circular cream container. | Step rows are tall (~`50vh` each). Mock UIs are subtle, light, with hairline borders. Each step's mock UI animates in on scroll. |
| 3 | **The NGPES Difference** | Centered title. Below: a **4-card row** of differentiators. Each card has a small **3D-rendered abstract object** illustration on top (hourglass, dome, vessel, sweeping form — premium product-shot style), title, 1-line description. | (titles obscured in capture — invent reasonable ones: `Faster Settlement` · `Built-in Compliance` · `Global Reach` · `Fiat + Digital`) | Cards have a subtle rounded background, soft shadow, hover-lift. |
| 4 | **Built in Paris, Built For The World** | Centered hero-style scene: **3D wireframe/blueprint Eiffel Tower** centered with an **orange torus ring** floating around it (tilted, suggesting a halo or planetary ring). The headline sits above the scene. | Headline: `Built in Paris,` (line break) `Built For The `**`World`** — with "World" in orange. | A short subtitle is likely beneath: "From the French fintech ecosystem to global payments infrastructure." Subtle scroll-driven parallax on the tower + ring orbits. |
| 5 | **News & Updates** | Centered title `News & Updates` (with subtle orange-gradient on the "tion" of "Updates" — could be either an orange-emphasized word or per-letter accent). Top-right: `Explore All ↗` link. Below: **3-column article grid**. | Article 1: `NGPES Officially Labelled by Finance Innovation, France's Leading Fintech Cluster` — placeholder cream card with `Read More` pill + co-branding row at bottom `next generation × Finance Innovation`. Article 2: `Blockchain's Strength In A Bear Crypto Market` — city skyline sunset photo + `Read More` pill. Article 3: `Stablecoins and Corporate Payments: A Structural Shift in Motion` — low-angle skyscraper photo + `Read More` pill. | News cards have soft shadows, photo top + text bottom layout. |
| 6 | **Footer** (inferred — not shown in capture) | Cream/white background, brand wordmark + tagline, multi-column link cluster (Product, Resources, Company, Legal), small newsletter input, social row, copyright | — | Match the rest of the visual language. |

A persistent **`En` language toggle + `Contact us` pill** sits in the top-right across all sections.

---

## 4. Tech stack

```bash
npm create vite@latest ngpes-site -- --template react-ts
cd ngpes-site
npm i three @react-three/fiber @react-three/drei
npm i framer-motion gsap @studio-freight/lenis split-type
npm i lucide-react
npm i -D @types/three
```

| Job | Library |
|---|---|
| Smooth scroll | `@studio-freight/lenis` |
| Scroll triggers (mock-UI reveals, step dot tracking, nav state) | `gsap` + `ScrollTrigger` |
| Component-level animation (card hover, pill press) | `framer-motion` |
| WebGL (two scoped scenes) | `three`, `@react-three/fiber`, `@react-three/drei` |
| Per-line headline reveal | `split-type` |
| Mock-UI icons | `lucide-react` |

**Do NOT add:** `@react-three/postprocessing` (no bloom on this brand), any UI kit (every
component hand-built), Lottie / react-spring (framer + gsap is enough).

Plus:
- One **abstract 3D globe / sweep object** for the hero — procedural (a torus knot or
  swept curve with a brushed-metal material works), or a CC0 stylized model from Sketchfab.
- One **3D Eiffel Tower** — a low-poly tower model with a stylized "blueprint" wireframe
  material + an orange torus ring (just a `TorusGeometry` with `meshStandardMaterial`).
  Real Eiffel Tower CC0 models exist on Sketchfab.
- **4 small 3D illustrations** for the NGPES Difference cards — can be procedural primitives
  (hourglass, dome, vessel, sweep) or CC0 renders.
- **Real partner logos** for the trust strip: Deloitte, crypto.com, DE GAULLE FLEURANCE,
  Fireblocks, ADAN, sumsub, WOORTON, Chainalysis, softledger. Most have public press kits.
  (Use real logos with attribution in footer.)
- **HDRI** for studio lighting (light/cream studio preset).
- **Font:** Inter Tight from Google Fonts.

---

## 5. Core effects — code patterns

### 5.1 Orange-color emphasis on headline words (the signature)

```html
<h1>The infrastructure for <span class="hl">global</span> fiat &amp; digital asset <span class="hl">payments</span></h1>
```

```css
h1 { font-weight: 500; letter-spacing: -0.02em; line-height: 1.06; }
h1 .hl { color: var(--accent-orange); }
```

**Critical: do not also make the highlighted span bold.** The color does the work alone.
If you bold it, the brand voice flips to a Berco/MAIN style — this is a different brand.

### 5.2 Orange CTA pill with warm drop shadow

```css
.pill-primary {
  background: var(--accent-orange);
  color: white;
  padding: 12px 24px;
  border-radius: 100px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: var(--shadow-warm);
  transition: transform .35s var(--ease), box-shadow .35s var(--ease);
}
.pill-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 40px 80px rgba(255,77,31,.28);
}
```

### 5.3 Step badge

```jsx
<div className="step-badge">01</div>
```

```css
.step-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px;
  background: var(--accent-orange-dim);
  color: var(--accent-orange);
  border-radius: 8px;
  font-weight: 500; font-size: 12px;
  box-shadow: 0 8px 16px rgba(255,77,31,.15);
}
```

### 5.4 Lenis + GSAP wiring (standard, copy from previous specs)

```js
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### 5.5 Step dot indicator (synced with scroll position)

A 4-dot row at the bottom of the Solution section. As you scroll through each step,
the corresponding dot fills orange.

```js
const steps = gsap.utils.toArray('.solution-step');
steps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => setActiveDot(i),
    onEnterBack: () => setActiveDot(i),
  });
});
```

### 5.6 Hero 3D abstract globe (procedural)

```jsx
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function AbstractGlobe() {
  // A torus knot or swept geometry with a metallic brushed material works well.
  return (
    <Float speed={0.4} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh>
        <torusKnotGeometry args={[1.6, 0.35, 200, 32, 2, 5]} />
        <meshStandardMaterial
          color="#f0ede8" metalness={1} roughness={0.3}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}
```

Light with a warm `<Environment preset="studio">` and a soft white key light. Slow Y-axis
idle rotation.

### 5.7 Eiffel Tower + orange torus

```jsx
function ParisScene() {
  const { scene } = useGLTF("/models/eiffel-tower.glb");
  return (
    <>
      <primitive object={scene} scale={1.2}>
        {/* Apply a blueprint wireframe material to the tower meshes */}
      </primitive>
      <Float speed={0.6} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[0.4, 0.2, 0]} rotation={[Math.PI / 2.4, 0, 0.3]}>
          <torusGeometry args={[0.6, 0.12, 24, 96]} />
          <meshStandardMaterial color="#FF4D1F" metalness={0.6} roughness={0.4} />
        </mesh>
      </Float>
    </>
  );
}
```

Apply a wireframe/blueprint look to the tower by setting `material.wireframe = true` or
using a custom `LineMaterial` along edges. Keep it light gray on white background.

### 5.8 Mock-UI transaction timeline (Send step)

Pure DOM, no 3D. Card style:

```jsx
<div className="mock-card">
  <header>Instant Transaction <span className="time">12:14</span></header>
  <ul className="timeline">
    <li className="done">Queued · 04/03/2025 13:14</li>
    <li className="done">Broadcasting · 04/03/2025 13:14</li>
    <li className="active">Confirming · 04/03/2025 13:14</li>
    <li className="pending">Received</li>
  </ul>
</div>
```

```css
.mock-card {
  background: white;
  border: 1px solid var(--hairline);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-card);
  max-width: 380px;
}
.timeline { list-style: none; padding: 0; margin-top: 16px; }
.timeline li { padding: 12px 0; border-left: 2px solid var(--hairline); padding-left: 16px; position: relative; font-size: 13px; }
.timeline li::before { content: ""; position: absolute; left: -5px; top: 16px; width: 8px; height: 8px; border-radius: 50%; background: var(--hairline); }
.timeline li.done::before { background: var(--accent-orange); }
.timeline li.active::before { background: var(--accent-orange); box-shadow: 0 0 0 4px var(--accent-orange-dim); }
```

### 5.9 Mock-UI IBAN payment network (Receive step)

Pure SVG, no canvas needed. Position 4 small `<rect>` nodes (showing IBAN + name) around
a central spinner, draw dotted `<line>` paths from each node to the center, animate the
spinner. The central spinner is an orange-bordered circle with an `O` glyph inside that
slowly rotates.

### 5.10 Mock-UI crypto swap (Convert step)

Small card with two side-by-side smaller cards (one labeled `CRYPTO` with a `₿` glyph,
one with `EUR` or similar fiat), with a tiny ⇌ swap icon between them.

### 5.11 Nav scroll state

```js
ScrollTrigger.create({
  trigger: '.hero', start: 'bottom top',
  onEnter: () => nav.classList.add('frosted'),
  onLeaveBack: () => nav.classList.remove('frosted'),
});
```

```css
.nav.frosted {
  background: rgba(251,250,247,.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hairline);
}
```

### 5.12 News article cards

3-column grid. Each card has:
- A photo at the top (16:9, with `border-radius: 14px`)
- An overlaid `Read More` outline pill in the top-left of the photo (small, cream)
- Title below in `--ink`
- Subtle hover: card lifts 4px, photo scales 1.04

The first article ("NGPES Officially Labelled by Finance Innovation...") has no photo —
it has a cream `--bg-soft` background card with the `Read More` pill at the top-left and
a co-branding row at the bottom: `next generation × Finance Innovation` (two logos
side-by-side with an `×` separator).

---

## 6. Build order

1. **Scaffold + design system + nav.** Tokens, Inter Tight font, off-white bg, nav with
   frosted state, the **`HighlightHeadline`** primitive that handles orange-color emphasis.
2. **Hero (Section 1)** — split layout, headline with orange emphasis, subtitle, CTA pill,
   trust logo strip. **Skip the 3D globe** for now — use a placeholder cream sphere.
3. **Our Solution (Section 2)** — the 4-step flow with mock UI visualizations. **This is
   the bulk of the work.** Build the timeline UI, IBAN network SVG, crypto swap card, and
   custody icon. Wire the step-dot indicator to scroll.
4. **News & Updates (Section 5)** — 3-card grid with hover states.
5. **The NGPES Difference (Section 3)** — 4-card row. Stub the 3D illustrations as gradient
   circles for now.
6. **Built in Paris (Section 4) + 3D Eiffel + orange torus** — full-bleed scene with
   `<Canvas>`. Procedural torus + GLTF tower (or stylized blueprint tower).
7. **Hero 3D globe** — upgrade hero placeholder to procedural metallic torus-knot.
8. **NGPES Difference 3D illustrations** — replace card placeholder gradients with small
   `<Canvas>` mini-scenes (or pre-rendered PNGs if perf is a concern).
9. **Footer.**
10. **Polish:** nav frosted state, framer-motion `whileInView` reveals on section headers
    and step rows, mock-UI animations on scroll-in, reduced-motion fallbacks, mobile.

---

## 7. Mobile

- Stack everything to single column.
- Hero: headline above 3D globe; CTA pill stays prominent.
- Our Solution: step number badge + name + description stacks above the mock UI, not beside.
- NGPES Difference: 4-card row → 2×2 grid (or single column if narrow).
- News & Updates: 1 column.
- Trust logo strip: horizontal scroll with edge fade.
- Eiffel scene: keep WebGL, but cap `dpr={[1, 1.3]}` and disable idle rotation.

---

## 8. Asset checklist

- [ ] One abstract 3D globe (torus knot procedural is fine for v1; upgrade to a real
      brushed-metal sweep mesh later)
- [ ] One Eiffel Tower GLTF (CC0 from Sketchfab or hand-modeled low-poly)
- [ ] 4 small 3D illustrations for NGPES Difference cards (placeholder gradients OK for v1)
- [ ] HDRI: studio light preset (any CC0 white studio HDRI works)
- [ ] Partner logos: Deloitte, crypto.com, DE GAULLE FLEURANCE, Fireblocks, ADAN, sumsub,
      WOORTON, Chainalysis, softledger — SVG from each press kit
- [ ] Finance Innovation logo (for co-branding card)
- [ ] Two stock photos for news cards: a city skyline at sunset, a low-angle skyscraper
      (Unsplash search: "city sunset finance", "skyscraper looking up")
- [ ] Font: Inter Tight from Google Fonts
- [ ] Lucide icons: only if needed for mock UIs

---

## 9. Performance notes

- Two scoped `<Canvas>`es (hero globe + Eiffel scene). Both should pause `useFrame`
  when out of view via `useInView`.
- The NGPES Difference cards COULD use mini-canvases per card, but **don't** — that's 4
  extra contexts. Pre-render each as a PNG/WebP and use `<img>`. Same visual, 1/10th the GPU.
- The mock UIs in Our Solution are pure DOM/SVG — cheap. No perf risk.
- Lighthouse perf target: ≥ 92 desktop, ≥ 82 mobile.
- Don't load the Eiffel GLTF eagerly — use a React `<Suspense>` boundary on the section.

---

## 10. The five things that make this look

1. **Orange-color emphasis on key headline words** — not bold, not italic, just color.
   It's the brand's typographic signature.
2. **Warm cream-on-near-black** palette with **one and only one accent color** (warm
   vermillion orange). No blue, no green.
3. **Mock UI visualizations beside every product step** — payment timeline, IBAN network,
   crypto swap, vault — sell the actual product, not abstract benefits.
4. **Eiffel Tower + orange torus** as the "Built in Paris" centerpiece — literal,
   confident, a little playful. Don't replace with a generic globe.
5. **Generous whitespace everywhere** — light, airy, premium. Sections breathe with
   `clamp(80px, 14vh, 180px)` block padding.
