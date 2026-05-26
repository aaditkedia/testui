# Website Recreation Spec — "Berco Inc" (eCommerce holding co landing page)

> Reverse-engineered from a ~17s screen-recording filmed off a curved ultrawide monitor.
> Format: TikTok-style design-portfolio reel — intercut shots of the site at native res
> + the creator's reaction face + a Figma overview of unrelated frames. **Only the
> on-screen site frames are part of this rebuild.** The creator reaction shot and the
> Figma canvas shots are ad-wrapper footage — excluded.
>
> The brand appears to be a real Israeli holding company (Hebrew language toggle pill is
> visible in the nav). Treat the longer body paragraphs as best-reads — the off-monitor
> capture is soft enough that exact wording isn't pixel-confirmable. **Brand name reads
> as "Berco Inc"** (the nav wordmark renders with a stylized treatment, possibly
> "BERCO INC" with custom letterforms).

---

## 1. What this site actually is

A **dark-mode corporate landing page** for **Berco Inc**, presented as an **eCommerce
holding / investment company** that owns and operates a portfolio of D2C brands plus
provides services (strategic investment, eCommerce platforms, SaaS, analytics, brand,
incubation). Tone: premium, fintech-adjacent, confident, restrained.

Single long page, scroll-driven, ~6–7 stacked sections. Visual language is **dark
near-black backgrounds, white/cream type, sparse pink-coral accent, two hero 3D objects
(a circuit board / chip in the main hero, and a small exploded card-stack device in the
"Mindset" section), and lots of generous whitespace.** No fancy gradients, no neon glow,
no maximalism. It reads like a Vercel landing page crossed with Cuberto / Linear.

---

## 2. Design system

### Color
| Token | Approx value | Use |
|---|---|---|
| `--bg` | `#0A0A0B` (near-black, very slight warm hint) | every section background |
| `--bg-elevated` | `#121214` | service card backgrounds, hover wash |
| `--text` | `#F4EFE6` (warm off-white, slightly creamy — NOT pure white) | headlines, primary text |
| `--text-dim` | `rgba(244,239,230,.45)` | secondary copy, dim words in scroll-reveal paragraphs |
| `--text-muted` | `rgba(244,239,230,.25)` | unreached words in the long scroll paragraph |
| `--accent-pink` | `#F4B0A3` (dusty pink / blush, NOT hot magenta) | the floating "Berco Inc" card in the 3D stack, subtle accents |
| `--accent-teal` | `#52D4C8` (light cyan / teal mint) | chip glow, small icon accents inside the device stack |
| `--hairline` | `rgba(244,239,230,.08)` | very thin dividers, card borders |
| `--pill-bg` | `#F4EFE6` | the "Hebrew" / language switcher pill background |
| `--pill-text` | `#1A1A1B` | language pill text |

The palette is essentially **two warm neutrals (cream + near-black)** plus the **two
3D-object accents (dusty pink + mint teal)**. That's it. No other colors.

### Type
- One sans-serif family across the whole site — a modern humanist sans with a slight warm
  feel. Looks like **PP Mori**, **Söhne**, or **Inter Tight**. **Free fallback for
  rebuild: Inter Tight** (Google Fonts) with `letter-spacing: -0.022em` on headlines.
- **Display headlines:** clamp `2.4rem`–`4rem`, `font-weight: 500`. **Bold-word emphasis**
  is the signature move — one or two words per headline jump to `font-weight: 700` mid-sentence
  (`Empowering **eCommerce**`, `**worldwide** today`, `Empower **business** growth`).
- **Long scroll paragraph** (statement section): bigger than body, clamp `1.8rem`–`2.6rem`,
  `font-weight: 400`, line-height ~`1.3`. Each word animates from `--text-muted` →
  `--text-dim` → `--text` as it crosses the viewport center. Certain words (`innovation`,
  `businesses`, `transformative`) are pre-bolded so they hit harder when they brighten.
- **Body / card descriptions:** `15px`, weight `400`, line-height `1.55`, color `--text-dim`.
- **Eyebrow labels:** small (`12px`), weight `500`, prefixed with a tiny round dot or
  square mark. Not uppercase, not tracked-out — this is a **lowercase modern eyebrow**
  (e.g., `● Our Mindset`, `● Our Services`).
- **Corner labels** (top-right corner copy, bottom-left section tags): tiny (`12–13px`),
  regular weight, slightly dimmed.

### Layout language
- **Full-width sections** with generous internal padding (`clamp(80px, 12vh, 160px)` block
  padding).
- Hero uses an **asymmetric three-column layout**: big headline left, 3D object center,
  small two-line tagline + eyebrow right. Bottom row has a 4-corner caption layout
  (small label bottom-left, sub-paragraph bottom-center, small CTA mid-left).
- Brands & Tools sections use a **horizontal carousel of 4–5 logo cards** with prev/next
  arrows below; each card has logo + name + 1-line tagline + a tiny accent dot/arrow.
- Services section is a **3 columns × 2 rows grid** with **hairline dividers** between
  cells (no card backgrounds — just thin gridlines separating).
- Everything is left-aligned text-of-emphasis with one or two right-aligned secondary
  blocks.

### Atmosphere / mood
- **Calm, premium, confident.** Almost no animation chrome — the wow is in the typography
  reveals and the two 3D objects.
- A barely-perceptible **vignette** at the corners.
- **Subtle film grain** at very low opacity (~3%).
- **No bloom, no glow, no chromatic aberration.** The opposite of Peachweb's maximalism.
- The two 3D objects (chip and exploded card stack) feel like product-shot renders —
  studio lit, slow idle rotation, soft shadow contact.

### Pills, buttons, links
- **Language switcher pill** top-right: filled cream `--pill-bg` with dark text, ~`13px`,
  ~`36px` height, ~`100px` border-radius. Single word: `Hebrew`.
- **Primary text link** (e.g. `Explore Our Solutions ↗`): no button — just left-aligned
  text with a hairline underneath and a small arrow glyph. Subtle hover state thickens
  the underline.
- **No "Sign up" / no big CTA pill in the nav.** This is a B2B brand, not a SaaS funnel.

### Nav
- Fixed top.
- Left: `BERCO INC` wordmark (small, ~`14px`, stylized — possibly slightly condensed or
  with a custom ligature mark).
- Center: `About` · `Brands` · `Services` · `Contact` — small, ~`13px`, weight `400`,
  ~`24px` gap.
- Right: `Hebrew` language pill.
- Background: mostly transparent over the hero. Gains a faint translucent dark background
  (`rgba(10,10,11,.6)` + `backdrop-filter: blur(12px)`) when you scroll past hero.

---

## 3. Section-by-section breakdown

Order is reconstructed from the recording (a straightforward top-to-bottom scroll).

| # | Section | Key visual | Copy | Notes |
|---|---|---|---|---|
| 1 | **Hero** | 3D rendered **circuit board / chip** centered, with subtle teal smoke/glow rising from a corner | Left: `Empowering` / **`eCommerce`** / `with Bold` / `Solutions` + small `Explore Our Solutions ↗` link below. Bottom-left tag: `Products & Services`. Bottom-center subtitle: `Strategic investments. Innovative solutions. Unmatched growth opportunities.` Top-right eyebrow: `Fintech`. Right column: `The Future Of eCommerce, Delivered Today` | Hero photo has no parallax; the chip very slowly rotates / wisps; everything else stays still. |
| 2 | **Long Statement Paragraph** | (no graphic — just big text on dark) | Single big paragraph that fades in word by word as you scroll: `At Berco Inc. we redefine `**`innovation`**` by empowering `**`businesses`**` to reach their full potential. From `**`transformative`**` eCommerce strategies to [continues...]` | This is the signature reveal. Each word transitions `muted → dim → text` based on scroll position. Pre-bolded words are higher-impact when they brighten. |
| 3 | **Our Mindset** | Left: `● Our Mindset` eyebrow + headline `Empower growth` / `for businesses` / **`worldwide`** `today.` + small body paragraph: "From innovative algorithms to seamless automation, we craft solutions that turn challenges into opportunities with technology." + a dot indicator below. Right: **3D exploded card stack** — a dusty-pink rounded square card labeled `Berco Inc` floating above a chrome/glass plate with a cyan/teal inset on a base | — | The 3D stack idle-rotates slightly on Y axis; pink card hovers ~30px above the stack. |
| 4 | **Vision Meets Execution** (Brands) | Top: small right-aligned eyebrow `Innovative brands we've partnered with, built, and propelled.` + headline left: `[Vision] Meets Execution.` (first word may be different but the structure is "[X] Meets Execution."). Below: horizontal carousel of 4–5 **brand cards**, each with: stylized brand logo (large, fills card top half), brand name (~`16px` weight 500), 1-line tagline (~`13px` dimmed), tiny sparkle/arrow accent. Names + taglines: `Wear Your Halo — Faith-inspired jewelry with timeless elegance.` · `Olwite — Pure style, all white, always right.` · `Hardcore — Revitalizing menswear with style and comfort.` · `NitroOps — Revolutionizing eCommerce with stunning storefronts.` (+1 more off-screen). Below: `<` `>` prev/next arrows | This is a portfolio brag — Berco Inc owns/invests in these brands. |
| 5 | **We Use Everyday** (Tools) | Same layout as Brands, but with **tool logos**: Shopify (green bag), Meta (infinity), Slack (color hash), Monday.com (rounded gradient pill stack), Figma (rainbow shapes). Each card: logo (large, top half), tool name, 1-line description (`Powerful platform for online stores`, `Connecting people through digital platforms`, `Streamlined communication for modern teams`, `Work management made effortlessly organized`, `Collaborative design for creative teams`). Headline: `[Tools] We Use Everyday.` | Headline first word likely "Tools" but obscured in capture. Same `<` `>` carousel controls. |
| 6 | **Our Services** | Eyebrow `● Our Services` + headline `Empower `**`business`**` growth and Innovation` (left-aligned). Top-right body paragraph: `Unlock the potential of your business with strategies and solutions that drive growth, innovation, and success.` Below: **3 × 2 grid** of service cells separated by hairlines: 1. Strategic Investments (shield icon) · 2. eCommerce Excellence (storefront icon) · 3. SaaS Solutions (3-block stack icon) · 4. Data-Driven Insights (bar chart icon) · 5. Brand Amplification (megaphone icon) · 6. Innovation Incubation (lightbulb / location pin icon). Each cell has service name (top, bold), tiny icon (top-right of cell), description (bottom): `Providing strategic mentorship to help businesses thrive.` / `Building scalable platforms to dominate the digital space.` / `Designing tools that redefine how businesses operate.` / `Leveraging analytics and AI to guide smarter decisions and optimize performance.` / `Creating bold strategies to maximize visibility and engagement globally.` / `Partnering with visionary founders to launch disruptive products and solutions.` | Hairline grid divider style is the key — no card fills. |
| 7 | **Footer** (inferred — not shown in capture) | Dark, multi-column: brand mark + tagline, link columns (Brands, Services, Company, Legal), tiny social row, copyright line | — | Match the rest of the visual language: cream type on near-black, thin hairlines. |

A persistent **`Hebrew` language pill** is visible in the top-right across all sections.

---

## 4. Tech stack

```bash
npm create vite@latest berco-site -- --template react-ts
cd berco-site
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
npm i framer-motion gsap @studio-freight/lenis split-type
npm i lucide-react
npm i -D @types/three
```

| Job | Library |
|---|---|
| Smooth scroll | `@studio-freight/lenis` |
| Scroll-driven word reveal + carousel logic | `gsap` + `ScrollTrigger` |
| Component-level animation (card hover, carousel transitions) | `framer-motion` |
| WebGL for the two 3D objects | `three`, `@react-three/fiber`, `@react-three/drei` |
| Per-character/word splitting for the big paragraph reveal | `split-type` |
| Service grid icons | `lucide-react` (`Shield`, `Store`, `Layers`, `BarChart3`, `Megaphone`, `Lightbulb`) |

Plus:
- **Brand logos** (Wear Your Halo, Olwite, Hardcore, NitroOps, +1) — these are placeholder
  text/SVG marks unless you have the real assets. Build them as stylized SVG wordmarks.
- **Tool logos** — official press-kit SVGs for Shopify, Meta, Slack, Monday.com, Figma.
- **Two GLTF models** — circuit board / chip + exploded card stack. If you can't model:
  - Chip: a textured plane + a small extruded chip on top with embossed traces (low-poly
    box geometry + emissive teal accent), or download a CC0 chip from Sketchfab.
  - Card stack: 3 stacked `RoundedBox`es with different materials (pink, glass, chrome
    base). Procedural is fine.
- **HDRI** for studio lighting on the 3D objects (dark studio preset works).
- **Fonts**: Inter Tight 400/500/700 + a fallback serif if you want a tiny italic accent
  anywhere (probably not needed for this brand).

---

## 5. Core effects — code patterns

### 5.1 Scroll-driven word reveal (the signature paragraph)

Each word transitions through three opacity states as it crosses the viewport center.
Implementation: `SplitType` into words, GSAP `ScrollTrigger` with `scrub: true`,
animate `color` via CSS variables on each word.

```js
const split = new SplitType('.statement', { types: 'words' });
split.words.forEach(w => {
  w.style.color = 'var(--text-muted)';
  w.style.transition = 'color 0.4s ease';
});

ScrollTrigger.create({
  trigger: '.statement',
  start: 'top 70%',
  end: 'bottom 30%',
  scrub: true,
  onUpdate: self => {
    const progress = self.progress;
    const visibleCount = Math.floor(progress * split.words.length);
    split.words.forEach((w, i) => {
      if (i < visibleCount - 4) w.style.color = 'var(--text)';        // bright
      else if (i < visibleCount) w.style.color = 'var(--text-dim)';   // mid
      else w.style.color = 'var(--text-muted)';                       // dim
    });
  }
});
```

Pre-mark the words you want pre-bolded with a CSS class so they hit harder when they brighten:

```html
<p class="statement">At Berco Inc. we redefine <b>innovation</b> by empowering <b>businesses</b> ...</p>
```

```css
.statement b { font-weight: 700; }
```

### 5.2 Headline bold-word emphasis (the cheap version)

For shorter headlines, no scroll-scrub needed. Just markup the bold word and let CSS handle it:

```html
<h1>Empowering <b>eCommerce</b><br/>with Bold<br/>Solutions</h1>
```

```css
h1 { font-weight: 500; }
h1 b { font-weight: 700; }
```

This is the headline style across the whole site. **Don't substitute italic or color — bold weight is the move.**

### 5.3 3D hero chip (procedural, low effort)

```jsx
import { Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";

function Chip() {
  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.2}>
      <group rotation={[-0.4, 0.4, 0]}>
        <RoundedBox args={[3, 0.4, 3]} radius={0.15} smoothness={6}>
          <meshStandardMaterial color="#1a1a1d" metalness={0.7} roughness={0.4} />
        </RoundedBox>
        {/* tiny embossed traces / chip die in center */}
        <RoundedBox args={[1.2, 0.1, 1.2]} radius={0.05} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#0a0a0b" metalness={0.3} roughness={0.7} emissive="#52d4c8" emissiveIntensity={0.3} />
        </RoundedBox>
        {/* faint teal mist — Sprite with additive blending or volumetric Points */}
      </group>
    </Float>
  );
}
```

### 5.4 3D exploded card stack (Mindset section)

```jsx
function CardStack() {
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* pink top card, hovering ~0.4 above */}
        <RoundedBox args={[1.6, 0.12, 1.6]} radius={0.18} position={[0, 0.55, 0]}>
          <meshStandardMaterial color="#F4B0A3" roughness={0.5} />
        </RoundedBox>
        {/* glass middle plate with teal inset */}
        <RoundedBox args={[1.8, 0.16, 1.8]} radius={0.18} position={[0, 0.18, 0]}>
          <MeshTransmissionMaterial thickness={0.3} roughness={0.1} ior={1.4} />
        </RoundedBox>
        <RoundedBox args={[1.0, 0.06, 1.0]} radius={0.08} position={[0, 0.27, 0]}>
          <meshStandardMaterial color="#52d4c8" roughness={0.3} />
        </RoundedBox>
        {/* dark base */}
        <RoundedBox args={[2.0, 0.2, 2.0]} radius={0.2} position={[0, -0.15, 0]}>
          <meshStandardMaterial color="#1a1a1d" metalness={0.6} roughness={0.5} />
        </RoundedBox>
      </group>
    </Float>
  );
}
```

### 5.5 Brand/Tool carousel

Horizontal scroll-snap row with prev/next buttons. Either:

- **Pure CSS**: `display: flex; overflow-x: auto; scroll-snap-type: x mandatory;` with each
  card `scroll-snap-align: start;`. Buttons increment `scrollLeft` by card width.
- **framer-motion**: track current index, animate the row's `x` transform via
  `<motion.div animate={{ x: -index * cardWidth }}>`. Adds easing.

Use framer-motion — the snap with easing reads more premium than CSS scroll-snap on this brand.

### 5.6 Services hairline grid

```css
.services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(280px, auto);
}
.service-cell {
  padding: 32px;
  border-right: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}
.service-cell:nth-child(3n) { border-right: none; }
.service-cell:nth-last-child(-n+3) { border-bottom: none; }
```

No card backgrounds. Just hairlines + padding + thoughtful internal layout.

### 5.7 Nav frosted state on scroll

```js
ScrollTrigger.create({
  trigger: '.hero', start: 'bottom top',
  onEnter: () => nav.classList.add('frosted'),
  onLeaveBack: () => nav.classList.remove('frosted'),
});
```

```css
.nav.frosted {
  background: rgba(10,10,11,.6);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hairline);
}
```

---

## 6. Build order

1. **Scaffold + design system + nav.** Tokens, Inter Tight font, off-black bg, cream text,
   nav with frosted state. Site looks intentional with empty sections.
2. **Hero (Section 1)** — three-column layout, all the corner labels, the bold-word
   treatment on the headline, the `Hebrew` pill. **Skip the 3D chip for now** — use a
   placeholder dark square.
3. **Statement paragraph (Section 2)** — the scroll-scrub word brightening. This is the
   signature reveal. Get it right before moving on.
4. **Services grid (Section 6)** — the hairline 3×2 grid with lucide icons. Cheap and high-impact.
5. **Brands + Tools carousels (Sections 4–5)** — both share the same component.
   Stub the brand logos as styled SVG wordmarks; use real tool logos from press kits.
6. **Mindset (Section 3) + 3D card stack** — `<Canvas>` with the procedural stack
   from §5.4.
7. **3D chip in hero** — upgrade the hero placeholder to the procedural chip from §5.3.
8. **Footer.**
9. **Polish:** nav frosted state, reveals on all section headers via framer-motion
   `whileInView`, hover states on carousel cards, reduced-motion fallbacks, mobile.

---

## 7. Mobile

- Stack everything to one column.
- Hero: headline above 3D object above corner labels (corner labels become a stacked block).
- Brands + Tools carousels: stay horizontal scroll, but with snap-to-card and visible-edge
  hints (next card peeks ~10% on the right).
- Services: 3×2 grid becomes 1 column with horizontal hairlines between cells.
- Statement paragraph: same scroll-reveal, just at smaller type size.
- Disable Lenis smoothing under reduced motion.

---

## 8. Asset checklist
- [ ] Two GLTF (or procedural) 3D objects: chip + exploded card stack
- [ ] HDRI for studio lighting (dark studio preset works, or a CC0 night-studio HDRI)
- [ ] Brand wordmark SVGs (5 brands; styled as the originals — stylized "Wear Your Halo"
      cross-with-wings, "Olwite" with the strikethrough lozenge, "Hardcore" inside a
      sphere, "NitroOps" geometric — these don't need to be real, just visually distinct)
- [ ] Tool SVG logos: Shopify, Meta, Slack, Monday.com, Figma (all available from their
      press kits with attribution)
- [ ] Lucide icons for services: `Shield`, `Store`, `Layers`, `BarChart3`, `Megaphone`,
      `Lightbulb`
- [ ] Font: Inter Tight from Google Fonts (no install needed)

---

## 9. Performance notes
- Two scoped `<Canvas>`es (hero chip + Mindset card stack). Both small. Pause `useFrame`
  when out of view.
- The statement paragraph's per-word scroll-scrub can be expensive on long pages — debounce
  the color updates, or compute once per ~50ms.
- No bloom/postprocessing on either 3D scene — just `Environment` lighting. This brand
  doesn't want glow.
- Lighthouse perf target: ≥ 90 desktop, ≥ 80 mobile.

---

## 10. The five things that make this look

1. **Bold-word emphasis on every headline.** One or two words per headline jump to `font-weight: 700`. It's the typographic spine of the brand.
2. **Scroll-driven word-by-word paragraph brightening** for the long statement. Words go muted → dim → bright as they cross the viewport.
3. **Cream-on-near-black**, not white-on-black. The off-white (`#F4EFE6`) is warmer and softer than pure white.
4. **Two restrained 3D objects** (chip + card stack) as product-shot accents — calm idle rotation, soft lighting, no bloom.
5. **Hairline grid divisions** (no card backgrounds) for the services section, instead of filled cards. The whitespace + thin lines do the work.
