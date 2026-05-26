# Website Recreation Spec — Two Agricultural / Sci-Tech WebGL Sites

> Reverse-engineered from two screen recordings filmed off a laptop monitor. The captures are
> low-res (200×134 and 238×180) so exact hex values / fonts can't be pixel-confirmed — everything
> below is a best-read plus the libraries and code patterns you need to rebuild every effect.
> Treat color/type values as starting points, not gospel.

---

## 1. What these sites actually are

**Two** single-page, **scroll-as-narrative** sites for agricultural science / seed technology
products. Both are "Awwwards / FWA" tier builds.

### Site A — "Corn Revolutionized" (Video 1, ~17 s)

A vertical scroll-driven storytelling site for **Pioneer Seeds**. The story follows the lifecycle
of a corn seed — from genetics (DNA) through breeding, testing, field trials, to final harvest.
Each section occupies the full viewport with a **WebGL 3D element** (DNA helix, particle field,
corn imagery) center-stage and **large bold condensed type** revealing the narrative. Scroll
controls everything — camera movement, object morphing, text reveals.

The original was built by **Resn** + **Bader Rutter** and won Awwwards SOTD (July 2020) and
FWA SOTM. Stack was **Three.js + WebGL** (not R3F — vanilla), all UI rendered inside the
WebGL context for DOM/GL perf consistency.

### Site B — "HELIOS" (Video 2, ~57 s)

An interactive 3D particle-driven site for what appears to be a **Syngenta / agricultural
biotech** product called **HELIOS**. The centerpiece is a **massive particle system** that morphs
through several forms: star field → spiral galaxy → globe/sphere → terrain → geographic map.
Between sections, a **pulsing teal circle** acts as a loading/transition element. The user
interacts directly — cursor/touch moves particles.

---

## 2. Design systems

### Site A — Color

| Token | Value (approx) | Use |
|---|---|---|
| `--bg` | `#0a0a0a` → `#0d1a0d` | Primary background, very dark with green hint |
| `--green-deep` | `#1a4d1a` | Section gradient background (field scenes) |
| `--green-vibrant` | `#2d7a2d` | Field imagery, corn plant tones |
| `--amber-core` | `#ff8c00` | DNA helix glow center |
| `--amber-edge` | `#ff6600` → `#ff4500` | Helix ember particles, warm transitions |
| `--gold` | `#daa520` | Corn kernels, warm section backgrounds |
| `--cyan` | `#00bfff` | Accent lines on seedling section |
| `--chartreuse` | `#7fff00` | Data point dots on field map |
| `--text` | `#ffffff` at 100 % | Headlines |
| `--text-dim` | `#b0b0b0` at ~70 % | Body paragraphs, small captions |

The palette swings between **cold dark/black** and **warm amber/green** depending on the section.
Very high contrast — white type on near-black backgrounds. Not warm and desaturated — this is
**dark, cinematic, sci-fi agricultural**.

### Site A — Type

- Headlines: **extremely** bold condensed sans-serif — use **Druk Wide Bold**, **Knockout**,
  **Oswald 700**, or free fallback **Bebas Neue** / **Anton**. All caps. Weight 700–900.
- Size: massive — `clamp(3rem, 8vw, 7rem)`. Tight leading (~0.95). Slight negative tracking.
- Body: light sans-serif, **Inter 300** or **Roboto 300**, small (`0.85–1rem`), dim white.
- The typographic signature: **every heading is a bold declarative statement in all caps**.
  "CORN. REVOLUTIONIZED." / "FIRST, A SOLID FOUNDATION." / "OUR BREEDERS DIAL IT IN FURTHER."

### Site A — Layout

- Every section is `100vh` minimum. Content is full-bleed — 3D elements and imagery fill viewport.
- Text is pushed to the **left side**, roughly `6vw` from the edge, vertically centered or
  lower-third.
- A thin **horizontal progress bar** runs across the top of the viewport.
- **Navigation** is minimal — small Pioneer logo top-left, subtle top bar.

---

### Site B — Color

| Token | Value (approx) | Use |
|---|---|---|
| `--bg` | `#000000` | Pure black, always |
| `--teal` | `#00e5cc` → `#00ffd5` | Loading circle, nav accents, particle highlights |
| `--green-particle` | `#00ff88` → `#4a9e6e` | Majority of particles |
| `--white` | `#ffffff` | Typography, brightest particles |
| `--red-accent` | `#ff3333` | Sparse accent dots on map visualization |
| `--text` | `#ffffff` at 100 % | Headlines |
| `--text-dim` | `#cccccc` at ~60 % | Body text |

Pure **black + neon green/teal**. Very Matrix-meets-NASA aesthetic. The only warmth is the
rare red accent dot.

### Site B — Type

- **"HELIOS"** title: thin/light weight, elegant, wide tracking — use **Playfair Display 300**,
  **Cormorant Garamond 300**, or **Cinzel 400**. Could also be a geometric sans at light weight
  like **Outfit 200** / **Space Grotesk 300**. Size: `clamp(3rem, 10vw, 8rem)`.
- Section headings: sans-serif, medium weight (~400–500), `clamp(1.5rem, 3vw, 2.5rem)`.
- Body/links: small sans-serif, `~0.9rem`, white. Green accent for links/CTAs.
- Nav: small green logo/wordmark top-left, tiny menu top-right.

### Site B — Layout

- Full-viewport immersive 3D — no traditional "sections" visible. The WebGL canvas IS the page.
- Text overlays appear at specific scroll positions, always on the **left side** or **centered**.
- Generous negative space — the particle globe is the star, text is secondary.

---

## 3. Section-by-section breakdown

### Site A — Corn Revolutionized (8 acts)

| # | Scene | 3D / Visual element | Text | Key effect |
|---|---|---|---|---|
| 1 | **Hero** | Full-bleed corn plant photography, green gradient wash, ear of corn visible right side | center: **"CORN. REVOLUTIONIZED."** | Parallax on corn imagery; text fades on scroll-down. |
| 2 | **DNA Helix** | Glowing **amber DNA double-helix** rotating slowly, ember/firefly particles floating around it, faint circular **radar/scope** element on the right | left: **"FIRST, A SOLID FOUNDATION."** + small body paragraph about genetics | Helix built from `TubeGeometry` along parametric curve; emissive amber shader; `THREE.Points` for embers; scroll drives rotation speed. |
| 3 | **Seedling** | Photorealistic **potted corn seedling** in a dark bucket/container, thin **cyan luminous lines** connecting around the plant like neural pathways | left: **"OUR BREEDERS DIAL IT IN FURTHER"** | Plant has DoF blur; cyan lines are animated SVG or `THREE.Line` segments pulsing outward. |
| 4 | **Computers** | Green-tinted background with **bright particle scatter** — yellow/green dots like data points floating across screen | left: **"COMPUTERS CUT DOWN THE CONTENDERS"** | Particles animate/scatter on scroll; text staggers in word-by-word. |
| 5 | **Field Map** | Top-down **agricultural field** rendered as bright chartreuse/lime **dots on dark green** — each dot is a test plot | Small Pioneer badge top-left | Dots pulse and appear progressively; camera pans across the field on scroll. Interactive feel. |
| 6 | **Testing** | Full-screen **corn field photography** with warm golden/amber color grading, sunset tones | overlaid: **"TESTING, TESTING AND MORE TESTING"** | Heavy color grading; text parallaxes with the corn stalks; warm → cool transition. |
| 7 | **Kernel Close-up** | Extreme **macro zoom on corn kernels** — golden, shallow DoF, bokeh blur | Semi-transparent text during transition | Smooth zoom transition; warm amber tones; camera pushes in. |
| 8 | **Full Plant / Return** | Final corn plant in profile, full growth | text about the final product | Plant sways subtly; background lightens; loops back to hero. |

### Site B — HELIOS (7 acts + transitions)

| # | Scene | 3D / Visual element | Text | Key effect |
|---|---|---|---|---|
| T | **Loading Circle** | Pulsing **teal/cyan ring** on pure black, glows and breathes | none | CSS + possible `THREE.RingGeometry` with emissive; used as section transition (appears ~4 times). Expands to reveal, contracts to hide. |
| 1 | **Star Field** | Thousands of tiny **white/green/amber dots** scattered in 3D space — a star field / deep space view | none (nav elements only) | `THREE.Points` with depth-based sizing; subtle mouse-parallax; particles drift slowly. |
| 2 | **HELIOS Galaxy** | Massive **spiral galaxy** made of green/teal particles swirling in a disc, bright white/teal **core** at center | center: **"HELIOS"** + subtitle + CTA button | Particles on logarithmic spiral arms; galaxy rotates continuously; scroll morphs speed/spread. |
| 3 | **Particle Globe** | Large **sphere/globe** made of green/white particles distributed on surface (Fibonacci sphere), semi-transparent — you see through it. Bright **glowing core** visible inside. | nav overlay only | Slow rotation; particles shimmer individually; scroll → globe explodes outward or collapses. Mouse/touch → particles repel near cursor. |
| 4 | **Data Terrain** | Globe particles **morph into a 3D terrain/landscape** — looks like a topographic heightmap made of dots | left: **"Two roads in the same path"** + body text + "Live on…" link | Smooth particle morph from sphere → terrain using GLSL lerp between target positions. |
| 5 | **Geographic Map** | Particles rearrange to form a **world map** or regional geography — bright dots cluster along coastlines, a few **red accent dots** mark specific locations | left: **"Three visions. One sprint. One stack."** / **"Live across fourteen… core"** | Map assembles from scattered particles with staggered timing; text reveals line-by-line. |
| 6 | **Return / Cycle** | Globe reforms or galaxy returns; teal circle transition plays | repeated HELIOS branding | Full cycle — the experience loops or resolves back to a state. |

---

## 4. Tech stack

```bash
npm create vite@latest . -- --template vanilla-ts
npm i three gsap @studio-freight/lenis split-type
npm i simplex-noise                # terrain heightmaps
npm i -D @types/three
```

| Job | Library |
|---|---|
| Smooth / momentum scroll | **Lenis** (`@studio-freight/lenis`) |
| Scroll-driven animation, pinning, scrub | **GSAP** + **ScrollTrigger** |
| WebGL scene | **Three.js** (vanilla — no React; the originals are vanilla) |
| Post FX | Three.js `EffectComposer` + `UnrealBloomPass` + `RenderPass` from `three/examples/jsm/` |
| Text splitting for reveals | **split-type** |
| Terrain noise | **simplex-noise** |

> **Why vanilla Three.js, not R3F?** The original Pioneer site was vanilla Three.js (all text
> rendered inside WebGL for perf). Both sites are single-page with one persistent canvas. Vanilla
> is simpler here — no React reconciler overhead, and the scroll-driven architecture maps to a
> straightforward `requestAnimationFrame` loop reading a progress value.

---

## 5. Core effects — code patterns

### 5.1 Lenis smooth scroll, driving GSAP

```js
// lib/smoothScroll.js
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

### 5.2 Scroll progress store (the spine of both sites)

```js
// lib/scrollStore.js
let progress = 0;
export function getProgress() { return progress; }
export function setProgress(p) { progress = p; }

// in init:
ScrollTrigger.create({
  trigger: document.body,
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => setProgress(self.progress),
});
```

Inside the `requestAnimationFrame` loop, read `getProgress()` to drive all 3D morphs.

### 5.3 DNA double-helix (Site A, Act 2)

```js
// Build helix from two intertwined parametric curves
function createHelixPoints(turns = 4, pointsPerTurn = 60, radius = 0.8, height = 6) {
  const total = turns * pointsPerTurn;
  const strand1 = [], strand2 = [], rungs = [];

  for (let i = 0; i < total; i++) {
    const t = i / total;
    const angle = t * turns * Math.PI * 2;
    const y = (t - 0.5) * height;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    strand1.push(new THREE.Vector3(x1, y, z1));
    strand2.push(new THREE.Vector3(x2, y, z2));

    if (i % 10 === 0) {
      rungs.push([
        new THREE.Vector3(x1, y, z1),
        new THREE.Vector3(x2, y, z2),
      ]);
    }
  }
  return { strand1, strand2, rungs };
}

// Render strands as TubeGeometry
const curve1 = new THREE.CatmullRomCurve3(strand1);
const tubeGeo = new THREE.TubeGeometry(curve1, 200, 0.04, 8, false);
const tubeMat = new THREE.MeshStandardMaterial({
  color: 0xff8c00,
  emissive: 0xff6600,
  emissiveIntensity: 2.5,
  metalness: 0.3,
  roughness: 0.4,
});
```

Add ember particles around the helix:

```js
const emberCount = 300;
const emberGeo = new THREE.BufferGeometry();
const positions = new Float32Array(emberCount * 3);
const velocities = [];

for (let i = 0; i < emberCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const r = 0.5 + Math.random() * 2;
  positions[i * 3]     = Math.cos(angle) * r;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
  positions[i * 3 + 2] = Math.sin(angle) * r;
  velocities.push({
    x: (Math.random() - 0.5) * 0.002,
    y: Math.random() * 0.005,
    z: (Math.random() - 0.5) * 0.002,
  });
}
emberGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const emberMat = new THREE.PointsMaterial({
  color: 0xff8c00,
  size: 0.06,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
```

### 5.4 Particle sphere / globe (Site B, Act 3)

```js
// Fibonacci sphere distribution — even points on sphere surface
function fibonacciSphere(count = 5000, radius = 3) {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;

    positions[i * 3]     = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

const globeGeo = new THREE.BufferGeometry();
globeGeo.setAttribute("position",
  new THREE.BufferAttribute(fibonacciSphere(5000, 3), 3));

const globeMat = new THREE.PointsMaterial({
  color: 0x00ff88,
  size: 0.035,
  transparent: true,
  opacity: 0.7,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
```

### 5.5 Spiral galaxy (Site B, Act 2)

```js
function spiralGalaxyPositions(count = 8000, arms = 4, radius = 4) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const arm = i % arms;
    const armAngle = (arm / arms) * Math.PI * 2;
    const t = Math.random();
    const r = t * radius;
    const spiral = r * 1.2;
    const angle = armAngle + spiral + (Math.random() - 0.5) * 0.5;

    positions[i * 3]     = Math.cos(angle) * r + (Math.random() - 0.5) * 0.3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.15 * (1 - t);
    positions[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.3;
  }
  return positions;
}
```

### 5.6 Particle morphing between shapes (globe → terrain → map)

The key effect in Site B: same particle system, positions lerp between target arrays.

```js
// JS approach (fine up to ~5 000 particles):
const posAttr = points.geometry.getAttribute("position");
const arr = posAttr.array;

for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;
  arr[i3]     += (targetPositions[i3]     - arr[i3])     * lerpSpeed;
  arr[i3 + 1] += (targetPositions[i3 + 1] - arr[i3 + 1]) * lerpSpeed;
  arr[i3 + 2] += (targetPositions[i3 + 2] - arr[i3 + 2]) * lerpSpeed;
}
posAttr.needsUpdate = true;
```

For better perf at 5 000+ particles, do this in a **vertex shader** with two position attributes
and a `uniform float morphProgress`:

```glsl
// vertex shader
attribute vec3 posA; // e.g. sphere
attribute vec3 posB; // e.g. terrain
uniform float morph; // 0..1 driven by scroll

void main() {
  vec3 pos = mix(posA, posB, morph);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 2.5;
}
```

### 5.7 Bloom post-processing (both sites)

```js
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass }     from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.2,   // strength — Site A heavier (~1.5), Site B lighter (~0.8)
  0.4,   // radius
  0.6    // threshold
);
composer.addPass(bloom);

// render loop: composer.render() instead of renderer.render()
```

### 5.8 Scroll text reveal (both sites)

```js
import SplitType from "split-type";

function setupTextReveals() {
  document.querySelectorAll(".reveal-text").forEach((el) => {
    const split = new SplitType(el, { types: "lines,words" });
    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      filter: "blur(8px)",
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });
  });
}

// CRITICAL: call after fonts load
document.fonts.ready.then(() => {
  setupTextReveals();
  ScrollTrigger.refresh();
});
```

### 5.9 Teal loading circle transition (Site B)

```css
.loading-circle {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 80px; height: 80px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #00e5cc;
  border-right-color: #00e5cc;
  box-shadow:
    0 0 30px rgba(0,229,204,0.4),
    0 0 60px rgba(0,229,204,0.2),
    inset 0 0 20px rgba(0,229,204,0.1);
  animation: spin 1.5s ease-in-out infinite,
             pulse 2s ease-in-out infinite;
  z-index: 100;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 30px rgba(0,229,204,0.4), 0 0 60px rgba(0,229,204,0.2); }
  50%      { box-shadow: 0 0 50px rgba(0,229,204,0.6), 0 0 100px rgba(0,229,204,0.3); }
}
```

Use GSAP to scale it from `1` → `40` (viewport fill) as a transition wipe between sections.

### 5.10 Cursor-based particle interaction (Site B)

```js
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const mouseWorld = new THREE.Vector3();
const repelPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

window.addEventListener("mousemove", (e) => {
  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(repelPlane, mouseWorld);
});

// animation loop — push particles away from cursor
const repelRadius   = 1.5;
const repelStrength = 0.03;

for (let i = 0; i < particleCount; i++) {
  const dx = arr[i*3]     - mouseWorld.x;
  const dy = arr[i*3 + 1] - mouseWorld.y;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < repelRadius) {
    const force = (1 - dist / repelRadius) * repelStrength;
    arr[i*3]     += (dx / dist) * force;
    arr[i*3 + 1] += (dy / dist) * force;
  }
}
```

### 5.11 Terrain heightmap from noise (Site B, Act 4)

```js
import { createNoise2D } from "simplex-noise";
const noise2D = createNoise2D();

function terrainPositions(count = 5000, width = 8, depth = 6, heightScale = 1.5) {
  const positions = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count * (width / depth)));
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col / cols - 0.5) * width;
    const z = (row / rows - 0.5) * depth;
    const y = noise2D(x * 0.5, z * 0.5) * heightScale;

    positions[i * 3]     = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }
  return positions;
}
```

### 5.12 Corn imagery parallax (Site A, CSS-driven)

For the photo sections (hero, testing, kernel close-up), use DOM `<img>` with CSS transforms
rather than WebGL textures. Cheaper, sharper, easier to swap.

```css
.parallax-bg {
  position: absolute;
  inset: -15% 0;          /* overflow for parallax travel */
  width: 100%;
  height: 130%;
  object-fit: cover;
  will-change: transform;
}
```

```js
ScrollTrigger.create({
  trigger: ".section-hero",
  start: "top bottom",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
    const yShift = self.progress * 30 - 15; // ±15 %
    heroImg.style.transform = `translateY(${yShift}%)`;
  },
});
```

### 5.13 Radar / scope circle UI (Site A, Act 2)

```js
// Thin animated circle on the right side of the DNA section
const scopeGeo = new THREE.RingGeometry(1.8, 1.85, 128);
const scopeMat = new THREE.MeshBasicMaterial({
  color: 0x666666,
  transparent: true,
  opacity: 0.25,
  side: THREE.DoubleSide,
});
const scope = new THREE.Mesh(scopeGeo, scopeMat);
scope.position.set(3, 0, -1);

// Add a rotating sweep line inside
const sweepGeo = new THREE.PlaneGeometry(0.02, 1.8);
const sweepMat = new THREE.MeshBasicMaterial({
  color: 0xff8c00,
  transparent: true,
  opacity: 0.3,
});
const sweep = new THREE.Mesh(sweepGeo, sweepMat);
sweep.position.y = 0.9; // pivot from center
scope.add(sweep);

// in animation loop:
sweep.rotation.z -= delta * 0.4;
```

---

## 6. Performance notes

- **One canvas per site, ever.** Never mount a canvas per section. All acts' meshes live in one
  scene; visibility/opacity controlled by scroll range.
- Keep particle counts under **10 000** per active system. The globe can be 5 000, the galaxy
  8 000 — but only one is fully visible at a time. Fade others to 0 opacity and skip their
  per-frame math.
- `UnrealBloomPass` with `mipmapBlur` is much cheaper than high `radius`. Use it.
- For Site A: corn imagery → use `<img>` tags in DOM with `position:fixed` + CSS transforms for
  parallax, not WebGL textures. Cheaper, sharper, easier to swap.
- For Site B: particle morphing in JS (`for` loop over positions) is fine up to ~5 000. Beyond
  that, move to vertex shader with `uniform float morph` and two position attributes.
- Respect `prefers-reduced-motion`: disable Lenis smoothing, freeze particles to a static pose,
  keep all content readable.

---

## 7. Quick reference — the five things that make each site look right

### Site A

1. **Dark cinematic backgrounds** + bursts of warm amber/gold. High contrast, dramatic.
2. **Massive bold condensed all-caps type** — the headings feel like movie titles.
3. Scroll-driven **3D DNA helix** with glowing embers and bloom.
4. Mixing **photorealistic imagery** (corn, fields) with **abstract particle data viz**.
5. Everything choreographed to scroll — each section is a "scene" in a film.

### Site B

1. **Pure black** + **neon green/teal** particles. Minimal, space-like.
2. One **morphing particle system** that transforms through multiple shapes
   (galaxy → globe → terrain → map).
3. The **pulsing teal circle** transition between sections.
4. **"HELIOS"** in elegant thin typography over the galaxy — restrained luxury.
5. **Cursor interaction** — particles react to the user's presence.

---

## 8. Asset checklist

- [ ] Font files (Bebas Neue / Anton for Site A headings; Inter for body; Cormorant / Outfit
      for Site B HELIOS title)
- [ ] Corn plant photography — hero, field, kernel macro (generate or source)
- [ ] Potted seedling image for the Breeders section
- [ ] Pioneer-style logo SVG for nav
- [ ] HELIOS logo / wordmark SVG for nav
- [ ] Optional: radial glow sprite texture, film grain texture
