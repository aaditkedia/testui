# BUILD PLAN — Agricultural Sci-Tech WebGL Sites (Site A + Site B)

> **For:** Claude Code (agentic build). Work through this **phase by phase, top to bottom.**
> Each phase has an **acceptance gate** — do not start the next phase until the current one
> passes. Commit at the end of every phase.
>
> **Reference files in this repo (read them first):**
> - `website-recreation-spec.md` — design system, color/type tokens, per-section breakdown,
>   and code patterns for every effect. **This is the source of truth for *what it looks like*.**
>
> This plan is the source of truth for **architecture, file layout, and sequencing.**

---

## 0. Goal & scope

Build **two** single-page, scroll-as-narrative WebGL sites from the video recordings:

- **Site A — "Corn Revolutionized"**: 8 full-viewport acts. Scroll-driven camera, 3D DNA helix
  with ember particles, photorealistic corn imagery with parallax, particle field maps, cinematic
  text reveals. Dark + amber palette.
- **Site B — "HELIOS"**: 7 acts + transitions. One persistent particle system (~5 000 pts) that
  morphs through galaxy → globe → terrain → map. Teal loading-circle transitions. Cursor-driven
  particle interaction. Pure black + neon green.

Both sites share a single codebase with a shared scroll/animation core and separate scene modules.

**Non-goals:** CMS, routing, backend, auth, i18n. Two pages in one project. Ship static.

---

## 1. Stack (locked — do not substitute)

```bash
npm create vite@latest . -- --template vanilla-ts
npm i three gsap @studio-freight/lenis split-type simplex-noise
npm i -D @types/three
```

| Concern | Library |
|---|---|
| Smooth scroll | `@studio-freight/lenis` |
| Scroll timing / reveals | `gsap` + `ScrollTrigger` |
| WebGL | `three` (vanilla — one persistent canvas per page) |
| Post FX | `three/examples/jsm/postprocessing/` (`EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`) |
| Text splitting | `split-type` |
| Terrain noise | `simplex-noise` |

Pin versions in `package.json` after install. Node 18+.

---

## 2. Final file structure

```
src/
  main.ts                      # entry — detects page, boots Site A or B
  siteA.ts                     # Site A init + animation loop
  siteB.ts                     # Site B init + animation loop
  lib/
    smoothScroll.ts             # Lenis + GSAP ticker wiring
    scrollStore.ts              # { progress: 0..1 }
    textReveal.ts               # SplitType + GSAP line reveal
    helpers.ts                  # clamp01, lerp, window01, remap
  siteA/
    scene.ts                    # Three.js scene, camera, renderer, composer
    acts.ts                     # acts config: index, scrollRange, copy
    act0-hero.ts                # parallax corn imagery (DOM-driven)
    act1-dna.ts                 # DNA helix + ember particles + scope
    act2-seedling.ts            # potted seedling + cyan lines
    act3-computers.ts           # particle scatter
    act4-fieldmap.ts            # chartreuse dot field
    act5-testing.ts             # warm corn field photography
    act6-kernel.ts              # macro kernel zoom
    act7-plant.ts               # full plant / return
    nav.ts                      # progress bar + Pioneer badge
    styles.css                  # Site A tokens + section layout
  siteB/
    scene.ts                    # Three.js scene, camera, renderer, composer
    acts.ts                     # acts config
    particles.ts                # the ONE particle system + all target shapes
    shapes/
      galaxy.ts                 # spiral galaxy position generator
      globe.ts                  # Fibonacci sphere positions
      terrain.ts                # simplex noise heightmap positions
      map.ts                    # geographic map positions
    loadingCircle.ts            # teal ring transition (CSS + GSAP)
    cursorInteraction.ts        # mouse → particle repel
    nav.ts                      # HELIOS nav + green accents
    styles.css                  # Site B tokens + section layout
index.html                      # Site A entry
helios.html                     # Site B entry
public/
  images/                       # corn photos, seedling, field, kernels
  fonts/
```

---

## 3. Core contracts (build these so both sites are consistent)

**Scroll store** — `scrollStore.ts`

```ts
let progress = 0;
export const getProgress = () => progress;
export const setProgress = (p: number) => { progress = p; };
```

**Helpers** — `helpers.ts`

```ts
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const remap = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

// fade-in 0–0.15, hold, fade-out 0.85–1
export function window01(t: number): number {
  if (t < 0 || t > 1) return 0;
  if (t < 0.15) return t / 0.15;
  if (t > 0.85) return (1 - t) / 0.15;
  return 1;
}
```

**Acts config** — each site has an `acts.ts` with this shape:

```ts
export interface Act {
  index: number;
  key: string;
  copy: string;
  scrollStart: number; // 0..1
  scrollEnd: number;   // 0..1
}

// For N acts, act i spans [i/N, (i+1)/N]
export function getActProgress(globalProgress: number, act: Act): number {
  return clamp01((globalProgress - act.scrollStart) / (act.scrollEnd - act.scrollStart));
}

export function getActVisibility(globalProgress: number, act: Act): number {
  return window01(getActProgress(globalProgress, act));
}
```

**Act module contract** — every file in `siteA/act*.ts` or `siteB/` exports:

```ts
export function create(scene: THREE.Scene): ActInstance;
export function update(act: ActInstance, local: number, visible: number, delta: number): void;
export function dispose(act: ActInstance): void;
```

- `local` (0..1) = progress within this act's scroll range
- `visible` (0..1) = fade weight from `window01`
- `delta` = frame delta for clock-driven animation
- Objects are always in the scene tree — never add/remove per scroll. Set `visible` to control
  opacity / scale. Skip expensive per-frame work when `visible < 0.002`.

---

## 4. Phases

### Phase 0 — Scaffold ⛳

- [ ] Vite + vanilla-TS project, deps installed, dev server runs.
- [ ] Folder structure from §2 created (empty files OK).
- [ ] `smoothScroll.ts`: Lenis instance, `lenis.on('scroll', ScrollTrigger.update)`, GSAP ticker
      drives `lenis.raf`, `lagSmoothing(0)`. Init once per page load.
- [ ] `scrollStore.ts` + one body-spanning `ScrollTrigger` that writes `progress`.
- [ ] `index.html` with 8 empty `<section>`s at `min-height: 140vh`.
- [ ] `helios.html` with 7 empty `<section>`s at `min-height: 140vh`.
- **Gate:** both pages scroll with momentum; `progress` logs `0 → 1` in console.

---

### Phase 1 — Design system + DOM shell (no 3D yet) 🎨

- [ ] `siteA/styles.css`: all color tokens from spec §2, section layout, nav bar, progress bar.
      Load **Bebas Neue** (700) + **Inter** (300/400) from Google Fonts.
- [ ] `siteB/styles.css`: all color tokens, pure black bg, nav layout, loading circle CSS
      (see spec §5.9). Load **Cormorant Garamond** (300) + **Inter** (300/400).
- [ ] `textReveal.ts`: SplitType into lines, GSAP `from` blur + rise on ScrollTrigger
      `start: 'top 82%'`. Must wait for `document.fonts.ready` before splitting.
- [ ] Site A DOM: all 8 section headings rendered with correct copy from spec §3, progress bar,
      Pioneer-style nav badge top-left.
- [ ] Site B DOM: all 7 section text overlays, "HELIOS" title centered, teal loading circle
      element, nav with green accent.
- [ ] Site B loading circle: the teal ring pulses on load, GSAP scales it to fill viewport,
      then fades to reveal content (page preloader).
- **Gate:** both sites look intentional and on-brand with **zero WebGL** — correct typography,
  colors, text reveals, nav, progress bar. Screenshot each; compare mood to spec.

---

### Phase 2 — WebGL foundation 🧱

- [ ] `siteA/scene.ts`: one `<canvas>` fixed, full-screen, `z-index: 1`, behind DOM content.
      `THREE.WebGLRenderer({ alpha: true, antialias: true })`. `PerspectiveCamera`. Resize handler.
- [ ] `siteB/scene.ts`: same setup, pure black `setClearColor(0x000000)`.
- [ ] Both: `EffectComposer` + `RenderPass` + `UnrealBloomPass`.
  - Site A: bloom strength `1.5`, threshold `0.5` (heavier amber glow).
  - Site B: bloom strength `0.8`, threshold `0.6` (subtle green glow).
- [ ] Both: `requestAnimationFrame` loop that reads `getProgress()`, computes per-act `local`
      and `visible`, calls each act's `update()`, then `composer.render()`.
- [ ] Drop **one** placeholder mesh in Site A (a spinning amber sphere) to prove the pipeline.
- [ ] Drop **one** placeholder `THREE.Points` (100 random green dots) in Site B to prove particles.
- **Gate:** placeholder objects appear, rotate on scroll, bloom glows. Both sites at 60 fps.

---

### Phase 3a — Site A acts (one at a time, commit each) 🌽

Port each act's behavior using the code patterns from `website-recreation-spec.md` §5.

- [ ] **Act 0 — Hero**: DOM-driven parallax corn image (§5.12). Generate or place corn hero
      photo in `public/images/`. Full-bleed green gradient bg. "CORN. REVOLUTIONIZED." text
      scales up + fades on scroll.
- [ ] **Act 1 — DNA Helix**: Two `TubeGeometry` strands from `CatmullRomCurve3` (§5.3).
      Amber emissive material. Rungs as thin cylinders between strands every 10th point.
      `THREE.Points` ember particles (300 pts, additive blending). Faint radar scope circle
      on the right (§5.13). Scroll drives helix rotation. Text reveal left side.
- [ ] **Act 2 — Seedling**: DOM layer with potted seedling photograph. Animated cyan SVG lines
      pulsing outward from the plant (CSS `stroke-dashoffset` animation). Mild DoF blur via
      CSS `filter: blur()` on the photo edges.
- [ ] **Act 3 — Computers**: `THREE.Points` particle scatter (500 pts), yellow-green, random
      positions. Particles drift in `useFrame`; on scroll they spread/converge. Text staggers
      in word-by-word.
- [ ] **Act 4 — Field Map**: Top-down particle field (800 pts) — chartreuse dots on dark green bg.
      Dots appear progressively with scroll (opacity driven by `local`). Camera pans across
      (translate group X/Z with scroll). Pioneer badge in top-left.
- [ ] **Act 5 — Testing**: DOM parallax corn field photo with warm amber CSS color-grading overlay
      (`mix-blend-mode: multiply` + amber gradient). Text overlaid with parallax offset.
- [ ] **Act 6 — Kernel**: DOM macro corn kernel photo. Scroll drives CSS `transform: scale()`
      zoom from 1 → 1.4. Shallow DoF via CSS blur vignette around edges.
- [ ] **Act 7 — Full Plant**: DOM corn plant in profile. Subtle CSS sway animation
      (`transform: rotate(±1deg)`). Background lightens. Transition / loop-back.
- **Gate:** full scroll-through plays all 8 scenes; objects cross-fade cleanly at boundaries;
  60 fps on a normal laptop. Text reveals fire correctly.

---

### Phase 3b — Site B acts (one at a time, commit each) 🌀

- [ ] **Particle system core** (`particles.ts`): Create ONE `THREE.Points` with 5 000 vertices.
      Store current positions + four target position arrays (galaxy, globe, terrain, map) as
      `Float32Array`. On each frame, lerp current → active target. Use `ShaderMaterial` with
      the morph vertex shader from spec §5.6 for best perf. Particle color: green base,
      random per-particle brightness variation via a `color` attribute.
- [ ] **Galaxy shape** (`galaxy.ts`): Spiral positions from spec §5.5. 4 arms. When active,
      group slowly rotates. Bright core: small emissive `SphereGeometry` mesh at center.
- [ ] **Globe shape** (`globe.ts`): Fibonacci sphere from spec §5.4. Slow Y-axis rotation.
      Bright core mesh. On scroll, globe can "explode" (multiply positions by `1 + local * 2`)
      before transitioning to terrain.
- [ ] **Terrain shape** (`terrain.ts`): Simplex noise heightmap from spec §5.11. Particles
      settle into a landscape formation.
- [ ] **Map shape** (`map.ts`): Pre-computed positions approximating a world map or continental
      outline. Could use a simple lat/lng → XY mapping of coastline sample points (hardcoded
      array of ~200 key coordinates, remaining particles scattered nearby with jitter). Add
      5–10 red accent dots (`THREE.Points` with separate red material) for marked locations.
- [ ] **Cursor interaction** (`cursorInteraction.ts`): Raycaster mouse → world position,
      repel particles within radius (spec §5.10). Apply force as an additive offset on top of
      the morph lerp.
- [ ] **Loading circle transitions** (`loadingCircle.ts`): GSAP timeline: scale circle `1 → 40`
      over 0.8 s with `power2.inOut`, simultaneously fade opacity 1 → 0. Trigger at each
      section boundary. Use ScrollTrigger `onEnter` / `onLeave` callbacks.
- [ ] **Text sections**: "HELIOS" title over galaxy. "Two roads in the same path" over terrain.
      "Three visions. One sprint. One stack." over map. All use `textReveal.ts`.
- **Gate:** full scroll-through morphs particles galaxy → globe → terrain → map; teal circle
  fires between sections; cursor repels particles on globe; 60 fps.

---

### Phase 4 — Choreography polish 🎬

- [ ] Tune each act's scroll range / easing so transitions feel deliberate, not mechanical.
- [ ] Site A: ensure parallax images don't show edges at extremes. Tune bloom per-act
      (stronger on DNA helix, lighter on photo sections).
- [ ] Site B: smooth particle morph timing — no instant jumps. Add slight overshoot easing
      (particles drift past target then settle). Tune galaxy rotation speed to feel organic.
- [ ] Site B: the teal circle should feel like a "breath" — expand on exhale, contract on inhale.
      Tune timing to 0.6–1.0 s depending on section gap.
- [ ] Both: whole-scene subtle pointer parallax on camera (`camera.position.x += mouse * 0.1`).
- [ ] Both: verify scroll-up works as well as scroll-down — all reveals and morphs reverse cleanly.
- **Gate:** scrolling feels **cinematic and continuous**, not like separate demos stitched together.

---

### Phase 5 — Assets & images 🖼️

- [ ] Generate or source corn hero photograph (full-bleed, green tones, ear of corn visible).
- [ ] Generate or source potted seedling photograph (dark background, young corn plant in pot).
- [ ] Generate or source corn field photograph (warm golden tones, sunset lighting).
- [ ] Generate or source corn kernel macro photograph (shallow DoF, golden kernels).
- [ ] Generate or source full corn plant profile photograph.
- [ ] Create Pioneer-style logo SVG (simple geometric mark + "PIONEER" wordmark).
- [ ] Create HELIOS wordmark SVG for Site B nav.
- [ ] Drop all assets in `public/images/` and `public/fonts/`.
- **Gate:** all placeholder images replaced with real or generated assets. Site looks polished.

---

### Phase 6 — Fallback, perf, accessibility 🧪

- [ ] **Reduced motion:** if `prefers-reduced-motion`, disable Lenis smoothing + freeze
      3D scenes to a static representative pose; keep content fully readable.
- [ ] **Mobile (< 680 px):** reduce particle counts by 50 %, drop bloom strength, simplify
      parallax to plain scroll, verify text sizes and layout hold.
- [ ] **Perf pass:** cap all `requestAnimationFrame` work — early-return when act's
      `visible < 0.002`. Verify no memory growth on repeated scroll (dispose unused geometries).
      Keep bloom `radius` low.
- [ ] **Resize:** renderer + composer resize, camera aspect ratio update,
      `ScrollTrigger.refresh()` on resize.
- [ ] **Loading:** show Site B's teal circle as a real page preloader while Three.js initializes.
      Site A: simple fade-in after fonts + images load.
- **Gate:** Lighthouse perf ≥ 85 desktop; no scroll jank; reduced-motion + mobile both usable.

---

### Phase 7 — QA / Definition of Done ✅

- [ ] All acts render, animate, and cross-fade on scroll (up **and** down) for both sites.
- [ ] Text reveals fire once, measure correctly after fonts load (`document.fonts.ready` →
      `ScrollTrigger.refresh()`).
- [ ] No console errors/warnings; no memory growth on repeated scroll.
- [ ] Resize handled (camera aspect, renderer + composer size, `ScrollTrigger.refresh()`).
- [ ] Site A: progress bar, nav badge, parallax, DNA helix + embers, particle fields — all present.
- [ ] Site B: loading circle, particle morphing, cursor interaction, HELIOS title, nav — all present.
- [ ] `npm run build` succeeds; `npm run preview` matches dev.
- [ ] Both `index.html` and `helios.html` load clean on a fresh browser.

---

## 5. Gotchas for the agent

- **One canvas per page, ever.** Never mount a canvas per section. Acts are always in the scene;
  scale/fade them by `visible`.
- **Don't add/remove meshes on scroll** — that thrashes GPU. Set `material.opacity` to ~0 and
  skip their per-frame work instead.
- **SplitType timing:** split + animate **after** webfonts load or lines measure wrong. Call
  `ScrollTrigger.refresh()` inside `document.fonts.ready.then(...)`.
- **Lenis + ScrollTrigger:** must share a ticker (see Phase 0). If scroll feels detached from
  animations, this wiring is wrong.
- **Particle morphing must be smooth.** Never teleport particles — always lerp. Use a lerp speed
  of `0.02–0.05` per frame for organic feel.
- **UnrealBloomPass** is the #1 visual driver. Get it right early. If the scene looks flat,
  bloom threshold is too high or strength too low.
- **No browser storage** anywhere — not needed, don't add it.
- **Asset gaps don't block.** Missing photos/images → use a solid color placeholder `<div>` and
  move on; leave a `// TODO: real asset` comment.
- **Site B's particle system is ONE mesh.** Don't create separate `THREE.Points` per shape.
  One geometry, multiple target position arrays, morph between them.
- Keep Site A's **bold all-caps headline** style — it's the signature of the design.
  Every heading is a declarative statement: "CORN. REVOLUTIONIZED." not "Corn, revolutionized."

---

## 6. Suggested commit sequence

**Site A:**
`chore: scaffold` → `feat: design system + dom shell` → `feat: webgl foundation` →
`feat: act0 hero parallax` → `feat: act1 dna helix` → `feat: act2 seedling` →
`feat: act3-4 particles + field` → `feat: act5-7 photo sections` →
`polish: choreography` → `feat: assets` → `chore: perf + a11y` → `chore: qa`

**Site B:**
`feat: site-b dom shell` → `feat: site-b webgl + particle core` →
`feat: galaxy shape` → `feat: globe shape` → `feat: terrain shape` →
`feat: map shape + red accents` → `feat: cursor interaction` →
`feat: loading circle transitions` → `polish: choreography` →
`feat: assets` → `chore: qa`
