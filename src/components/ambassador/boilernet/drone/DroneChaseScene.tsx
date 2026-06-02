"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

/*
  Cinematic FPV-drone-chases-locomotive scene — premium pass.

  Convention:
    - Train forward = train-local -Z (matches Three.js lookAt).
    - Cowcatcher / smokebox / headlight live at train-local -Z (front).
    - Cab / tender live at train-local +Z (rear).
    - Drive wheels lie in the YZ plane (rotation axis = X) — wheel.rotation.x rolls them.
*/

/* ================================================================
   Time-of-day palette (Purdue local time, America/Indiana/Indianapolis)
   ================================================================ */

interface Palette {
  bg: THREE.Color;
  fog: THREE.Color;
  fogDensity: number;
  sunColor: THREE.Color;
  sunIntensity: number;
  sunDir: THREE.Vector3;
  ambient: THREE.Color;
  ambientIntensity: number;
  rim: THREE.Color;
  rimIntensity: number;
  exposure: number;
  bloomStrength: number;
  bloomThreshold: number;
  bloomRadius: number;
  godRayIntensity: number;
  fireboxIntensity: number;
  headlightIntensity: number;
  label: string;
}

function pal(
  bg: number,
  fog: number,
  fogDensity: number,
  sunColor: number,
  sunIntensity: number,
  sunDir: [number, number, number],
  ambient: number,
  ambientIntensity: number,
  rim: number,
  rimIntensity: number,
  exposure: number,
  bloomStrength: number,
  bloomThreshold: number,
  bloomRadius: number,
  godRayIntensity: number,
  fireboxIntensity: number,
  headlightIntensity: number,
  label: string,
): Palette {
  return {
    bg: new THREE.Color(bg),
    fog: new THREE.Color(fog),
    fogDensity,
    sunColor: new THREE.Color(sunColor),
    sunIntensity,
    sunDir: new THREE.Vector3(...sunDir).normalize(),
    ambient: new THREE.Color(ambient),
    ambientIntensity,
    rim: new THREE.Color(rim),
    rimIntensity,
    exposure,
    bloomStrength,
    bloomThreshold,
    bloomRadius,
    godRayIntensity,
    fireboxIntensity,
    headlightIntensity,
    label,
  };
}

/* Each anchor: hour, palette.  Linear lerp between adjacent anchors. */
const PALETTE_TABLE: { hour: number; p: Palette }[] = [
  { hour: 0, p: pal(
    0x04060c, 0x05080e, 0.024,
    0xa6b7d8, 0.55, [-0.5, 1.1, 0.45],
    0x1a2436, 0.32,
    0x6d8fc8, 0.55,
    1.15, 1.65, 0.72, 0.85,
    1.9, 2.4, 9.0,
    "DEEP NIGHT",
  ) },
  { hour: 5, p: pal(
    0x0c1018, 0x161a26, 0.020,
    0xb8a8c6, 0.7, [-0.85, 0.55, 0.3],
    0x2a2e3e, 0.4,
    0xc89880, 0.7,
    1.1, 1.35, 0.78, 0.75,
    1.5, 2.0, 8.0,
    "PRE-DAWN",
  ) },
  { hour: 6.5, p: pal(
    0x412318, 0x4a2a1c, 0.014,
    0xffb070, 1.5, [-0.95, 0.35, 0.25],
    0x4a3024, 0.55,
    0xff8a4a, 0.95,
    1.05, 1.0, 0.85, 0.65,
    1.0, 1.5, 5.5,
    "DAWN",
  ) },
  { hour: 8.5, p: pal(
    0x8aa6c6, 0x9ab0c8, 0.010,
    0xffe8c8, 2.0, [-0.5, 0.85, 0.25],
    0x7a8aa0, 0.85,
    0xc8d0e0, 0.5,
    1.0, 0.55, 0.92, 0.55,
    0.55, 0.9, 3.2,
    "MORNING",
  ) },
  { hour: 12, p: pal(
    0x9cb5d0, 0xa8bcd4, 0.008,
    0xfff4dd, 2.4, [0.05, 1.0, 0.15],
    0x8090a8, 1.0,
    0xb6c4d8, 0.5,
    0.95, 0.4, 0.95, 0.5,
    0.35, 0.7, 2.4,
    "MIDDAY",
  ) },
  { hour: 16.5, p: pal(
    0x7a4824, 0x8a5028, 0.013,
    0xffac5a, 1.9, [0.85, 0.45, 0.2],
    0x5a3826, 0.6,
    0x4d6ea8, 0.55,
    1.05, 1.0, 0.85, 0.65,
    1.0, 1.6, 4.5,
    "GOLDEN HOUR",
  ) },
  { hour: 18.5, p: pal(
    0x382140, 0x3a2444, 0.016,
    0xc66a4a, 1.2, [0.95, 0.25, 0.15],
    0x2a1f3c, 0.5,
    0x6a4a8a, 0.7,
    1.1, 1.25, 0.8, 0.7,
    1.4, 2.0, 6.5,
    "DUSK",
  ) },
  { hour: 21, p: pal(
    0x0a0c18, 0x0c0e1a, 0.020,
    0x90a0c8, 0.7, [-0.4, 1.05, 0.4],
    0x1c2436, 0.35,
    0x6d8fc8, 0.6,
    1.15, 1.55, 0.74, 0.8,
    1.7, 2.3, 8.5,
    "NIGHT",
  ) },
  { hour: 24, p: pal(
    0x04060c, 0x05080e, 0.024,
    0xa6b7d8, 0.55, [-0.5, 1.1, 0.45],
    0x1a2436, 0.32,
    0x6d8fc8, 0.55,
    1.15, 1.65, 0.72, 0.85,
    1.9, 2.4, 9.0,
    "DEEP NIGHT",
  ) },
];

function lerpColor(out: THREE.Color, a: THREE.Color, b: THREE.Color, t: number): void {
  out.r = a.r + (b.r - a.r) * t;
  out.g = a.g + (b.g - a.g) * t;
  out.b = a.b + (b.b - a.b) * t;
}

/* Mutates `target` in place to avoid allocation each frame. */
function paletteAtHourInto(target: Palette, h: number): void {
  const table = PALETTE_TABLE;
  let i = 0;
  while (i < table.length - 1 && h >= table[i + 1].hour) i += 1;
  const a = table[i].p;
  const b = table[Math.min(i + 1, table.length - 1)].p;
  const span = table[Math.min(i + 1, table.length - 1)].hour - table[i].hour;
  const localT = span > 0 ? THREE.MathUtils.clamp((h - table[i].hour) / span, 0, 1) : 0;

  lerpColor(target.bg, a.bg, b.bg, localT);
  lerpColor(target.fog, a.fog, b.fog, localT);
  target.fogDensity = THREE.MathUtils.lerp(a.fogDensity, b.fogDensity, localT);
  lerpColor(target.sunColor, a.sunColor, b.sunColor, localT);
  target.sunIntensity = THREE.MathUtils.lerp(a.sunIntensity, b.sunIntensity, localT);
  target.sunDir.copy(a.sunDir).lerp(b.sunDir, localT).normalize();
  lerpColor(target.ambient, a.ambient, b.ambient, localT);
  target.ambientIntensity = THREE.MathUtils.lerp(a.ambientIntensity, b.ambientIntensity, localT);
  lerpColor(target.rim, a.rim, b.rim, localT);
  target.rimIntensity = THREE.MathUtils.lerp(a.rimIntensity, b.rimIntensity, localT);
  target.exposure = THREE.MathUtils.lerp(a.exposure, b.exposure, localT);
  target.bloomStrength = THREE.MathUtils.lerp(a.bloomStrength, b.bloomStrength, localT);
  target.bloomThreshold = THREE.MathUtils.lerp(a.bloomThreshold, b.bloomThreshold, localT);
  target.bloomRadius = THREE.MathUtils.lerp(a.bloomRadius, b.bloomRadius, localT);
  target.godRayIntensity = THREE.MathUtils.lerp(a.godRayIntensity, b.godRayIntensity, localT);
  target.fireboxIntensity = THREE.MathUtils.lerp(a.fireboxIntensity, b.fireboxIntensity, localT);
  target.headlightIntensity = THREE.MathUtils.lerp(a.headlightIntensity, b.headlightIntensity, localT);
  target.label = localT < 0.5 ? a.label : b.label;
}

function getPurdueHourFraction(): number {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Indiana/Indianapolis",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0") % 24;
    const m = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
    const s = Number(parts.find((p) => p.type === "second")?.value ?? "0");
    return (h + m / 60 + s / 3600) % 24;
  } catch {
    const d = new Date();
    return (d.getUTCHours() + d.getUTCMinutes() / 60 - 5 + 24) % 24;
  }
}

/* ================================================================
   Materials
   ================================================================ */

const castIron = () =>
  new THREE.MeshStandardMaterial({
    color: 0x141618,
    metalness: 0.55,
    roughness: 0.78,
  });

const polishedBrass = () =>
  new THREE.MeshStandardMaterial({
    color: 0xc89545,
    metalness: 1,
    roughness: 0.18,
  });

const weatheredSteel = () =>
  new THREE.MeshStandardMaterial({
    color: 0x2a2a2c,
    metalness: 0.65,
    roughness: 0.5,
  });

const accentGold = () =>
  new THREE.MeshStandardMaterial({
    color: 0xeeb000,
    emissive: 0x4a2a00,
    metalness: 0.7,
    roughness: 0.3,
  });

const rustOrange = () =>
  new THREE.MeshStandardMaterial({
    color: 0x6e2e15,
    metalness: 0.4,
    roughness: 0.9,
  });

const blackCoal = () =>
  new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.2,
    roughness: 0.95,
  });

const headlightGlass = () =>
  new THREE.MeshStandardMaterial({
    color: 0xfff8d8,
    emissive: 0xfff0a0,
    emissiveIntensity: 8.0,
    metalness: 0.1,
    roughness: 0.08,
  });

const fireboxMat = () =>
  new THREE.MeshStandardMaterial({
    color: 0xff5a18,
    emissive: 0xff4818,
    emissiveIntensity: 5.5,
    metalness: 0.0,
    roughness: 0.6,
  });

const darkWindow = () =>
  new THREE.MeshStandardMaterial({
    color: 0x0a1418,
    emissive: 0x33485a,
    emissiveIntensity: 0.9,
    metalness: 0.9,
    roughness: 0.15,
  });

/* ================================================================
   Locomotive part builders
   ================================================================ */

function castReceiveAll(obj: THREE.Object3D): void {
  obj.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh) {
      m.castShadow = true;
      m.receiveShadow = true;
    }
  });
}

interface WheelInfo {
  wheel: THREE.Group;
  crankRadius: number;
}

/** Spoked drive wheel built in YZ plane. axis = X. */
function createDetailedWheel(
  radius: number,
  body: THREE.Material,
  accent: THREE.Material,
): WheelInfo {
  const wheel = new THREE.Group();

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius, radius * 0.14, 18, 48),
    accent,
  );
  rim.rotation.y = Math.PI / 2;
  wheel.add(rim);

  const tread = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 1.02, radius * 0.06, 14, 48),
    body,
  );
  tread.rotation.y = Math.PI / 2;
  wheel.add(tread);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.28, radius * 0.28, radius * 0.5, 20),
    accent,
  );
  hub.rotation.z = Math.PI / 2;
  wheel.add(hub);

  // 6 cross-spokes (cylinders along Y rotated about X) → 12-spoke appearance.
  const spokeGeo = new THREE.CylinderGeometry(radius * 0.045, radius * 0.045, radius * 1.85, 8);
  for (let i = 0; i < 6; i += 1) {
    const spoke = new THREE.Mesh(spokeGeo, body);
    spoke.rotation.x = (Math.PI / 6) * i;
    wheel.add(spoke);
  }

  // Counterweight — partial cylinder wedge.
  const counter = new THREE.Mesh(
    new THREE.CylinderGeometry(
      radius * 0.88,
      radius * 0.88,
      radius * 0.32,
      24,
      1,
      false,
      -Math.PI / 5,
      (Math.PI * 2) / 5,
    ),
    body,
  );
  counter.rotation.z = Math.PI / 2;
  wheel.add(counter);

  // Crank pin (rod attaches here).
  const pin = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.09, radius * 0.09, radius * 0.55, 12),
    accent,
  );
  pin.rotation.z = Math.PI / 2;
  pin.position.set(0, radius * 0.6, 0);
  wheel.add(pin);

  castReceiveAll(wheel);
  return { wheel, crankRadius: radius * 0.6 };
}

/** Slatted cowcatcher. Sits at train-local front (-Z). */
function createCowcatcher(material: THREE.Material): THREE.Group {
  const pilot = new THREE.Group();
  const slatCount = 11;
  const width = 2.6;
  const slatGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.7, 8);

  for (let i = 0; i < slatCount; i += 1) {
    const slat = new THREE.Mesh(slatGeo, material);
    const xOffset = (i / (slatCount - 1)) * width - width / 2;
    slat.position.set(xOffset, -0.35, 0);
    slat.rotation.x = Math.PI / 6; // lean forward (toward -Z)
    slat.rotation.z = xOffset * -0.18;
    pilot.add(slat);
  }

  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.4, 0.12, 0.16),
    material,
  );
  bar.position.set(0, -0.9, 0.55);
  pilot.add(bar);

  // Coupler hook.
  const hook = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 0.4),
    material,
  );
  hook.position.set(0, -0.6, -0.25);
  pilot.add(hook);

  castReceiveAll(pilot);
  return pilot;
}

/** Decorative brass piping wrapping around boiler side. */
function createPiping(brass: THREE.Material): THREE.Mesh {
  const pipePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.55, 1.2, 1.4),
    new THREE.Vector3(-0.95, 1.3, 0.6),
    new THREE.Vector3(-0.95, 0.95, -0.6),
    new THREE.Vector3(-0.7, 0.6, -1.4),
  ]);
  const pipeGeo = new THREE.TubeGeometry(pipePath, 48, 0.07, 12, false);
  const pipe = new THREE.Mesh(pipeGeo, brass);
  pipe.castShadow = true;
  pipe.receiveShadow = true;
  return pipe;
}

/** Brake shoe wedge in front of a drive wheel. */
function createBrakeShoe(material: THREE.Material): THREE.Mesh {
  const shoe = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.36, 0.16),
    material,
  );
  shoe.castShadow = true;
  shoe.receiveShadow = true;
  return shoe;
}

/** Thin sand pipe curving from dome down toward a wheel. */
function createSandPipe(
  brass: THREE.Material,
  from: THREE.Vector3,
  to: THREE.Vector3,
): THREE.Mesh {
  const mid = from.clone().lerp(to, 0.55);
  mid.x += (to.x > 0 ? 0.15 : -0.15);
  const curve = new THREE.CatmullRomCurve3([from, mid, to]);
  const pipe = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 24, 0.03, 8, false),
    brass,
  );
  pipe.castShadow = true;
  pipe.receiveShadow = true;
  return pipe;
}

/** Cylinder block (steam chest) sitting between cowcatcher and first drive wheel. */
interface CylinderBlock {
  group: THREE.Group;
  pistonRod: THREE.Mesh;
  pistonRodBaseZ: number;
}
function createCylinderBlock(
  iron: THREE.Material,
  steel: THREE.Material,
  brass: THREE.Material,
  sideX: number,
): CylinderBlock {
  const group = new THREE.Group();

  // Main cylinder housing (large block).
  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.6, 1.0),
    iron,
  );
  housing.position.set(0, 0, 0);
  group.add(housing);

  // Valve chest on top.
  const chest = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.28, 0.7),
    steel,
  );
  chest.position.set(0, 0.4, 0);
  group.add(chest);

  // Cap end (cylinder face).
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.08, 14),
    brass,
  );
  cap.rotation.x = Math.PI / 2;
  cap.position.set(0, -0.05, -0.55);
  group.add(cap);

  // Piston rod — slides in/out of cylinder face along -Z (forward) toward driver.
  const pistonRodBaseZ = 0.55;
  const pistonRod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.05, 12),
    brass,
  );
  pistonRod.rotation.x = Math.PI / 2;
  pistonRod.position.set(0, -0.05, pistonRodBaseZ);
  group.add(pistonRod);

  // Crosshead block at end of piston rod.
  const crosshead = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.18, 0.2),
    steel,
  );
  crosshead.position.set(0, -0.05, pistonRodBaseZ + 0.55);
  group.add(crosshead);
  // Mark it for later in-loop reach via children.
  pistonRod.userData.crosshead = crosshead;

  // Slide bar (a thin guide rod the crosshead slides on).
  const slideBar = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.04, 1.4),
    steel,
  );
  slideBar.position.set(0, 0.06, 0.85);
  group.add(slideBar);

  group.position.set(sideX, 0.55, 0);
  castReceiveAll(group);
  return { group, pistonRod, pistonRodBaseZ };
}

/** Simplified Walschaerts valve gear: eccentric rod, expansion link, radius rod. */
interface ValveGear {
  group: THREE.Group;
  tick: (phase: number) => void;
}
function createValveGear(steel: THREE.Material, brass: THREE.Material, sideX: number): ValveGear {
  const group = new THREE.Group();
  const dir = sideX > 0 ? 1 : -1;

  // Expansion link (curved slot) — represented as a slim arc box.
  const link = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.5, 0.08),
    steel,
  );
  link.position.set(0, 0.7, -0.4);
  group.add(link);

  // Eccentric rod — long thin horizontal bar tied to wheel phase.
  const eccentric = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.06, 1.6),
    brass,
  );
  eccentric.position.set(0, 0.65, 0.4);
  group.add(eccentric);

  // Radius rod — from expansion link forward to valve chest.
  const radius = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.05, 1.4),
    brass,
  );
  radius.position.set(0, 0.8, -0.9);
  group.add(radius);

  // Combination lever — vertical pivot bar near cylinder.
  const combination = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.45, 0.05),
    brass,
  );
  combination.position.set(0, 0.6, -1.55);
  group.add(combination);

  // Tiny pivot pins.
  const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.14, 8);
  const pin1 = new THREE.Mesh(pinGeo, steel);
  pin1.rotation.z = Math.PI / 2;
  pin1.position.set(0, 0.7, -0.4);
  group.add(pin1);
  const pin2 = new THREE.Mesh(pinGeo, steel);
  pin2.rotation.z = Math.PI / 2;
  pin2.position.set(0, 0.6, -1.55);
  group.add(pin2);

  group.position.set(sideX * 1.18, 0, 0);
  castReceiveAll(group);

  const tick = (phase: number) => {
    // Eccentric rod bobs vertically out of phase with main wheel by ~90deg.
    const bob = Math.sin(phase + Math.PI / 2) * 0.06;
    eccentric.position.y = 0.65 + bob;
    radius.position.y = 0.8 + bob * 0.7;
    // Combination lever tilts slightly.
    combination.rotation.x = Math.sin(phase) * 0.08 * dir;
  };

  return { group, tick };
}

/** Ring of small rivets around the boiler at a given Z. */
function createRivetRing(brass: THREE.Material, z: number, boilerR: number, y: number): THREE.InstancedMesh {
  const count = 16;
  const geom = new THREE.SphereGeometry(0.035, 8, 6);
  const mesh = new THREE.InstancedMesh(geom, brass, count);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * (boilerR + 0.02), y + Math.sin(a) * (boilerR + 0.02), z);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/** Small brass builder's plate. */
function createBuilderPlate(brass: THREE.Material): THREE.Mesh {
  const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.025, 24),
    brass,
  );
  plate.rotation.x = Math.PI / 2;
  plate.castShadow = true;
  plate.receiveShadow = true;
  return plate;
}

/** Air pump — vertical cylindrical accessory bolted to the smokebox side. */
function createAirPump(iron: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.85, 18),
    iron,
  );
  group.add(body);
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.1, 18),
    iron,
  );
  top.position.y = 0.45;
  group.add(top);
  const bottom = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.1, 18),
    iron,
  );
  bottom.position.y = -0.45;
  group.add(bottom);
  castReceiveAll(group);
  return group;
}

/** Coupler knuckle at the rear of the tender. */
function createCouplerKnuckle(iron: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  const draft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.5), iron);
  group.add(draft);
  const knuckle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.32), iron);
  knuckle.position.z = -0.35;
  group.add(knuckle);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8), iron);
  pin.position.z = -0.35;
  group.add(pin);
  castReceiveAll(group);
  return group;
}

interface BuiltLocomotive {
  train: THREE.Group;
  driveWheelRefs: { mesh: THREE.Group; sideX: number; z: number; isDriver: boolean }[];
  driverIndices: number[]; // indices of true drivers (not leading/trailing/tender wheels)
  connectingRods: { mesh: THREE.Mesh; sideX: number; baseY: number }[];
  pistonRods: { mesh: THREE.Mesh; sideX: number; baseZ: number; crosshead: THREE.Mesh }[];
  valveGearTickers: ((phase: number) => void)[];
  driveRadius: number;
  headlightLens: THREE.Mesh;
  headlightSpot: THREE.SpotLight;
  fireboxPanel: THREE.Mesh;
  fireboxLight: THREE.PointLight;
}

function buildLocomotive(): BuiltLocomotive {
  const train = new THREE.Group();

  const ironMat = castIron();
  const steelMat = weatheredSteel();
  const brassMat = polishedBrass();
  const goldMat = accentGold();
  const rustMat = rustOrange();

  /* Convention: front (cowcatcher / smokebox / headlight) at -Z, cab/tender at +Z. */

  // ── Main boiler ──
  const boilerLen = 3.4;
  const boilerR = 0.95;
  const boilerY = 1.05;
  const boilerCenterZ = -0.4; // shifted so smokebox lives near -Z front
  const boiler = new THREE.Mesh(
    new THREE.CylinderGeometry(boilerR, boilerR, boilerLen, 36),
    ironMat,
  );
  boiler.rotation.x = Math.PI / 2;
  boiler.position.set(0, boilerY, boilerCenterZ);
  train.add(boiler);

  // Boiler bands (decorative brass hoops).
  const bandZs: number[] = [];
  for (let i = -3; i <= 3; i += 1) {
    const z = boilerCenterZ + i * 0.42;
    bandZs.push(z);
    const band = new THREE.Mesh(
      new THREE.TorusGeometry(boilerR + 0.015, 0.04, 8, 32),
      brassMat,
    );
    band.rotation.y = Math.PI / 2;
    band.position.set(0, boilerY, z);
    train.add(band);
  }

  // Rivet rings between bands.
  for (let i = 0; i < bandZs.length - 1; i += 1) {
    const ringZ = (bandZs[i] + bandZs[i + 1]) / 2;
    train.add(createRivetRing(brassMat, ringZ, boilerR, boilerY));
  }

  // Smokebox (front cap of boiler) at -Z.
  const smokeboxZ = boilerCenterZ - boilerLen / 2 - 0.25;
  const smokebox = new THREE.Mesh(
    new THREE.CylinderGeometry(boilerR + 0.05, boilerR + 0.05, 0.5, 36),
    weatheredSteel(),
  );
  smokebox.rotation.x = Math.PI / 2;
  smokebox.position.set(0, boilerY, smokeboxZ);
  train.add(smokebox);

  // Smokebox door.
  const door = new THREE.Mesh(
    new THREE.CircleGeometry(0.85, 32),
    rustMat,
  );
  door.position.set(0, boilerY, smokeboxZ - 0.26);
  door.rotation.y = Math.PI; // face -Z (forward)
  train.add(door);

  // Door bolts (rivets around the door rim).
  const doorRivets = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.04, 8, 6),
    brassMat,
    20,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i += 1) {
    const a = (i / 20) * Math.PI * 2;
    dummy.position.set(Math.cos(a) * 0.78, boilerY + Math.sin(a) * 0.78, smokeboxZ - 0.275);
    dummy.updateMatrix();
    doorRivets.setMatrixAt(i, dummy.matrix);
  }
  doorRivets.instanceMatrix.needsUpdate = true;
  doorRivets.castShadow = true;
  train.add(doorRivets);

  // Number plate centered on door.
  const numberPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.04, 32),
    brassMat,
  );
  numberPlate.rotation.x = Math.PI / 2;
  numberPlate.position.set(0, boilerY, smokeboxZ - 0.295);
  numberPlate.castShadow = true;
  train.add(numberPlate);

  // ── Smokestack ──
  const stackZ = smokeboxZ + 0.35;
  const stackBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.34, 0.4, 18),
    ironMat,
  );
  stackBase.position.set(0, boilerY + 1.05, stackZ);
  train.add(stackBase);
  const stackTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.28, 0.5, 18),
    ironMat,
  );
  stackTop.position.set(0, boilerY + 1.4, stackZ);
  train.add(stackTop);

  // Capuchon (top lip).
  const cap = new THREE.Mesh(
    new THREE.TorusGeometry(0.38, 0.04, 6, 18),
    ironMat,
  );
  cap.rotation.x = Math.PI / 2;
  cap.position.set(0, boilerY + 1.65, stackZ);
  train.add(cap);

  // ── Steam dome (mid-boiler) ──
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2),
    brassMat,
  );
  dome.position.set(0, boilerY + 1.0, boilerCenterZ + 0.1);
  train.add(dome);
  const domeBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.46, 0.18, 24),
    goldMat,
  );
  domeBase.position.set(0, boilerY + 0.87, boilerCenterZ + 0.1);
  train.add(domeBase);

  // Sand dome (smaller, near cab).
  const sandDome = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    ironMat,
  );
  const sandDomePos = new THREE.Vector3(0, boilerY + 0.95, boilerCenterZ + 1.2);
  sandDome.position.copy(sandDomePos);
  train.add(sandDome);

  // ── Headlight ──
  const headlightZ = smokeboxZ - 0.3;
  const headlightHousing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.3, 18),
    ironMat,
  );
  headlightHousing.rotation.x = Math.PI / 2;
  headlightHousing.position.set(0, boilerY + 0.6, headlightZ);
  train.add(headlightHousing);

  // Glass lens — bloom hero.
  const headlightLens = new THREE.Mesh(
    new THREE.CircleGeometry(0.18, 24),
    headlightGlass(),
  );
  headlightLens.position.set(0, boilerY + 0.6, headlightZ - 0.155);
  headlightLens.rotation.y = Math.PI;
  train.add(headlightLens);

  // Filament — tiny extra-bright spot inside the lens.
  const filament = new THREE.Mesh(
    new THREE.SphereGeometry(0.04, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  filament.position.set(0, boilerY + 0.6, headlightZ - 0.13);
  train.add(filament);

  const headlightSpot = new THREE.SpotLight(0xfff0c0, 9, 26, Math.PI / 7, 0.45, 1.0);
  headlightSpot.position.set(0, boilerY + 0.6, headlightZ - 0.1);
  headlightSpot.target.position.set(0, 1.0, headlightZ - 8);
  headlightSpot.castShadow = true;
  headlightSpot.shadow.mapSize.set(1024, 1024);
  train.add(headlightSpot);
  train.add(headlightSpot.target);

  // ── Cab (engineer compartment) ──
  const cabZ = boilerCenterZ + 1.95;
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 1.6, 1.4),
    rustMat,
  );
  cab.position.set(0, 1.35, cabZ);
  train.add(cab);

  const cabRoof = new THREE.Mesh(
    new THREE.BoxGeometry(2.3, 0.12, 1.55),
    ironMat,
  );
  cabRoof.position.set(0, 2.21, cabZ);
  train.add(cabRoof);

  // Cab windows.
  const winMat = darkWindow();
  for (const xs of [-0.92, 0.92]) {
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.7, 0.7), winMat);
    win.position.set(xs, 1.65, cabZ);
    train.add(win);
  }
  const frontCabWin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.05), winMat);
  frontCabWin.position.set(0, 1.65, cabZ - 0.72);
  train.add(frontCabWin);
  const rearCabWin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.05), winMat);
  rearCabWin.position.set(0, 1.65, cabZ + 0.72);
  train.add(rearCabWin);

  // ── Firebox glow under the cab (visible between cab and frame) ──
  const fireboxPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.6),
    fireboxMat(),
  );
  fireboxPanel.position.set(0, 0.7, cabZ - 0.7);
  fireboxPanel.rotation.y = Math.PI;
  train.add(fireboxPanel);

  const fireboxLight = new THREE.PointLight(0xff6418, 3.5, 9, 1.6);
  fireboxLight.position.set(0, 0.5, cabZ - 0.4);
  train.add(fireboxLight);

  // ── Running boards (catwalks) ──
  for (const xs of [-1.05, 1.05]) {
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 3.4),
      steelMat,
    );
    board.position.set(xs, 0.55, boilerCenterZ);
    train.add(board);
  }

  // ── Frame / chassis ──
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.2, 4.6),
    castIron(),
  );
  frame.position.set(0, 0.35, boilerCenterZ);
  train.add(frame);

  // ── Drive wheels ──
  const drivePositions = [boilerCenterZ - 0.8, boilerCenterZ + 0.2, boilerCenterZ + 1.2];
  const driveRadius = 0.55;
  const driveWheelRefs: { mesh: THREE.Group; sideX: number; z: number; isDriver: boolean }[] = [];
  const driverIndices: number[] = [];

  for (const sideX of [-1.05, 1.05]) {
    for (const z of drivePositions) {
      const { wheel } = createDetailedWheel(driveRadius, ironMat, brassMat);
      wheel.position.set(sideX, driveRadius, z);
      train.add(wheel);
      driverIndices.push(driveWheelRefs.length);
      driveWheelRefs.push({ mesh: wheel, sideX, z, isDriver: true });

      // Brake shoe just behind each drive wheel.
      const shoe = createBrakeShoe(ironMat);
      shoe.position.set(sideX, driveRadius, z + driveRadius * 1.15);
      train.add(shoe);
    }
  }

  // Leading wheel pair (front truck).
  const leadRadius = 0.32;
  for (const sideX of [-1.05, 1.05]) {
    const { wheel } = createDetailedWheel(leadRadius, ironMat, brassMat);
    wheel.position.set(sideX, leadRadius, smokeboxZ + 0.3);
    train.add(wheel);
    driveWheelRefs.push({ mesh: wheel, sideX, z: smokeboxZ + 0.3, isDriver: false });
  }

  // ── Connecting rods on each side (side rods linking all drivers) ──
  const rodLength = drivePositions[2] - drivePositions[0];
  const rodGeo = new THREE.BoxGeometry(0.15, 0.18, rodLength + 0.6);
  const connectingRods: { mesh: THREE.Mesh; sideX: number; baseY: number }[] = [];
  for (const sideX of [-1.18, 1.18]) {
    const rod = new THREE.Mesh(rodGeo, brassMat);
    rod.position.set(sideX, driveRadius, (drivePositions[0] + drivePositions[2]) / 2);
    rod.castShadow = true;
    rod.receiveShadow = true;
    train.add(rod);
    connectingRods.push({ mesh: rod, sideX, baseY: driveRadius });
  }

  // ── Cylinder blocks at front (steam chests) + piston rods ──
  const pistonRods: { mesh: THREE.Mesh; sideX: number; baseZ: number; crosshead: THREE.Mesh }[] = [];
  for (const sideX of [-1.0, 1.0]) {
    const { group, pistonRod, pistonRodBaseZ } = createCylinderBlock(ironMat, steelMat, brassMat, sideX);
    group.position.z = smokeboxZ + 0.6;
    train.add(group);
    const crosshead = pistonRod.userData.crosshead as THREE.Mesh;
    pistonRods.push({
      mesh: pistonRod,
      sideX,
      baseZ: group.position.z + pistonRodBaseZ,
      crosshead,
    });
  }

  // ── Walschaerts valve gear (animated) ──
  const valveGearTickers: ((phase: number) => void)[] = [];
  for (const sideX of [-1, 1]) {
    const gear = createValveGear(steelMat, brassMat, sideX);
    gear.group.position.z = boilerCenterZ - 0.3;
    train.add(gear.group);
    valveGearTickers.push(gear.tick);
  }

  // ── Cowcatcher in front ──
  const pilot = createCowcatcher(ironMat);
  pilot.position.set(0, 0.6, smokeboxZ - 0.55);
  train.add(pilot);

  // ── Piping on each side ──
  const pipeLeft = createPiping(brassMat);
  train.add(pipeLeft);
  const pipeRight = createPiping(brassMat);
  pipeRight.scale.x = -1;
  train.add(pipeRight);

  // ── Sand pipes from sand dome down to drivers ──
  for (const sideX of [-1.05, 1.05]) {
    for (const z of drivePositions) {
      const from = sandDomePos.clone();
      from.x = sideX * 0.4;
      const to = new THREE.Vector3(sideX, driveRadius + 0.05, z);
      train.add(createSandPipe(brassMat, from, to));
    }
  }

  // ── Air pumps on smokebox sides ──
  for (const sideX of [-0.85, 0.85]) {
    const pump = createAirPump(ironMat);
    pump.position.set(sideX, boilerY + 0.1, smokeboxZ + 0.1);
    train.add(pump);
  }

  // ── Builder's plate on smokebox side ──
  const plate = createBuilderPlate(brassMat);
  plate.position.set(1.02, boilerY, smokeboxZ);
  plate.rotation.y = Math.PI / 2;
  train.add(plate);
  const plate2 = createBuilderPlate(brassMat);
  plate2.position.set(-1.02, boilerY, smokeboxZ);
  plate2.rotation.y = -Math.PI / 2;
  train.add(plate2);

  // ── Whistle ──
  const whistle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12),
    brassMat,
  );
  whistle.position.set(0.3, boilerY + 0.95, boilerCenterZ - 0.3);
  train.add(whistle);

  // ── Bell ──
  const bell = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    brassMat,
  );
  bell.position.set(-0.3, boilerY + 0.92, boilerCenterZ - 0.45);
  train.add(bell);

  // ── Handrails along the boiler ──
  for (const xs of [-1.0, 1.0]) {
    const railGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.0, 8);
    const rail = new THREE.Mesh(railGeo, brassMat);
    rail.rotation.x = Math.PI / 2;
    rail.position.set(xs, boilerY + 0.65, boilerCenterZ);
    train.add(rail);
    // Rail stanchions.
    for (let i = -1; i <= 1; i += 1) {
      const stan = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.18, 6),
        brassMat,
      );
      stan.position.set(xs, boilerY + 0.55, boilerCenterZ + i * 1.0);
      train.add(stan);
    }
  }

  // ── Coal tender (separate group behind cab) ──
  const tender = new THREE.Group();
  const tenderBody = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 2.4), rustMat);
  tenderBody.position.y = 1.0;
  tender.add(tenderBody);

  // Tender side trim (brass strips).
  for (const xs of [-1.01, 1.01]) {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.06, 2.3), brassMat);
    trim.position.set(xs, 1.55, 0);
    tender.add(trim);
  }

  // Coal pile.
  const coalMat = blackCoal();
  for (let i = 0; i < 22; i += 1) {
    const lump = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.3 + Math.random() * 0.2,
        0.18 + Math.random() * 0.2,
        0.3 + Math.random() * 0.2,
      ),
      coalMat,
    );
    lump.position.set(
      (Math.random() - 0.5) * 1.6,
      1.62 + Math.random() * 0.18,
      (Math.random() - 0.5) * 2.0,
    );
    lump.rotation.set(Math.random(), Math.random(), Math.random());
    tender.add(lump);
  }
  // Tender wheels.
  for (const sideX of [-1.05, 1.05]) {
    for (const z of [-0.75, 0.75]) {
      const { wheel } = createDetailedWheel(leadRadius, ironMat, brassMat);
      wheel.position.set(sideX, leadRadius, z);
      tender.add(wheel);
      driveWheelRefs.push({ mesh: wheel, sideX, z: z + cabZ + 2.4, isDriver: false });
    }
  }

  // Coupler knuckle at rear of tender.
  const coupler = createCouplerKnuckle(ironMat);
  coupler.position.set(0, 0.55, 1.3);
  tender.add(coupler);

  tender.position.set(0, 0, cabZ + 1.85);
  train.add(tender);

  castReceiveAll(train);
  return {
    train,
    driveWheelRefs,
    driverIndices,
    connectingRods,
    pistonRods,
    valveGearTickers,
    driveRadius,
    headlightLens,
    headlightSpot,
    fireboxPanel,
    fireboxLight,
  };
}

/* ================================================================
   Atmosphere — ground/cloud textures, god ray, sparks, dust
   ================================================================ */

function createGroundTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "#1a1208";
    for (let y = 0; y < 256; y += 32) {
      ctx.fillRect(0, y, 256, 14);
    }
    // Ballast noise on sleepers.
    ctx.fillStyle = "#2a1c10";
    for (let i = 0; i < 400; i += 1) {
      ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    // Rails.
    ctx.fillStyle = "#6e5230";
    ctx.fillRect(108, 0, 6, 256);
    ctx.fillRect(142, 0, 6, 256);
    // Rail highlights (top edge).
    ctx.fillStyle = "#b08850";
    ctx.fillRect(108, 0, 2, 256);
    ctx.fillRect(146, 0, 2, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 60);
  tex.anisotropy = 8;
  return tex;
}

function createCloudTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 256);
    const grad = ctx.createRadialGradient(256, 128, 30, 256, 128, 240);
    grad.addColorStop(0, "rgba(255,255,255,0.7)");
    grad.addColorStop(0.5, "rgba(200,200,220,0.25)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    for (let i = 0; i < 24; i += 1) {
      ctx.globalAlpha = 0.4 + Math.random() * 0.4;
      ctx.fillStyle = grad;
      const cx = Math.random() * 512;
      const cy = Math.random() * 256;
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.arc(0, 0, 70 + Math.random() * 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.translate(-cx, -cy);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Volumetric god-ray cone — radial+length fade, additive blending. */
interface GodRay {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
}
function createGodRayCone(): GodRay {
  // Cone with tip at origin pointing along -Z.
  const length = 14;
  const baseR = 2.0;
  const geom = new THREE.ConeGeometry(baseR, length, 32, 1, true);
  // Orient: default cone tip at +Y. Rotate so tip is at +Z, base at -Z (pointing into -Z = forward).
  geom.rotateX(Math.PI / 2);
  // Translate so tip sits at origin, cone extends along -Z.
  geom.translate(0, 0, -length / 2);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xfff0c0) },
      uIntensity: { value: 1.5 },
      uLength: { value: length },
    },
    vertexShader: `
      varying vec3 vLocal;
      void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uLength;
      varying vec3 vLocal;
      void main() {
        // vLocal.z goes from 0 (tip) to -uLength (base).
        float t = clamp(-vLocal.z / uLength, 0.0, 1.0);
        // Length fade — bright at tip, dim at far base.
        float lengthFade = pow(1.0 - t, 1.4);
        // Radial fade based on distance from center axis at this slice.
        float radialDist = length(vec2(vLocal.x, vLocal.y));
        float maxR = 2.0 * t + 0.05;
        float radial = 1.0 - clamp(radialDist / maxR, 0.0, 1.0);
        radial = pow(radial, 2.0);
        float alpha = lengthFade * radial * uIntensity;
        gl_FragColor = vec4(uColor * alpha * 1.6, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geom, material);
  mesh.frustumCulled = false;
  return { mesh, material };
}

/** Spark pool spawned on hard curves. */
interface Spark {
  mesh: THREE.Mesh;
  life: number;
  vel: THREE.Vector3;
}
function createSparkPool(scene: THREE.Scene, size = 60): Spark[] {
  const sparks: Spark[] = [];
  const geo = new THREE.IcosahedronGeometry(0.05, 0);
  for (let i = 0; i < size; i += 1) {
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: 0xffa040, transparent: true, opacity: 1 }),
    );
    mesh.visible = false;
    scene.add(mesh);
    sparks.push({ mesh, life: 0, vel: new THREE.Vector3() });
  }
  return sparks;
}

/** Floating dust field that follows the camera — sells the "in-flight drone" feel. */
function createDustField(): THREE.Points {
  const COUNT = 250;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffe4b0,
    size: 0.025,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true,
  });
  return new THREE.Points(geo, mat);
}

/* ================================================================
   React component
   ================================================================ */

export default function DroneChaseScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetingBoxRef = useRef<HTMLDivElement>(null);
  const targetingLabelRef = useRef<HTMLDivElement>(null);
  const timeLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mountEl = mount;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountEl.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05080e);
    scene.fog = new THREE.FogExp2(0x05080e, 0.02);

    /* ── Camera rig ── */
    const camera = new THREE.PerspectiveCamera(
      72,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      600,
    );
    const cameraGroup = new THREE.Group();
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    /* ── Lighting (driven by palette) ── */
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(-40, 60, -30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -40;
    sun.shadow.camera.right = 40;
    sun.shadow.camera.top = 30;
    sun.shadow.camera.bottom = -30;
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.04;
    scene.add(sun);
    scene.add(sun.target);

    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(30, 15, 80);
    scene.add(rim);

    /* ── Ground (parallax rail-tie texture) ── */
    const groundTex = createGroundTexture();
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      metalness: 0.3,
      roughness: 0.85,
    });
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 1400),
      groundMat,
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    /* ── Cloud layers (parallax) ── */
    const cloudTex = createCloudTexture();
    const cloudLayers: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i += 1) {
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(220, 70),
        new THREE.MeshBasicMaterial({
          map: cloudTex.clone(),
          transparent: true,
          opacity: 0.5 - i * 0.08,
          depthWrite: false,
        }),
      );
      plane.position.set((Math.random() - 0.5) * 20, 10 + i * 5, -25 - i * 25);
      scene.add(plane);
      cloudLayers.push(plane);
    }

    /* ── Track curve ── */
    const trackCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 0, -40),
        new THREE.Vector3(-8, 0, -90),
        new THREE.Vector3(12, 0, -150),
        new THREE.Vector3(-6, 0, -210),
        new THREE.Vector3(8, 0, -270),
        new THREE.Vector3(0, 0, -340),
      ],
      false,
      "catmullrom",
      0.4,
    );

    /* ── Locomotive ── */
    const loco = buildLocomotive();
    // Object3D.lookAt rotates the object's +Z toward the target (not -Z — that
    // convention is only for Camera/Light). The locomotive was authored with
    // cowcatcher at inner-local -Z, so we wrap it and flip the inner 180° on Y.
    // Now the wrapper does position + lookAt, and after the flip the cowcatcher
    // lives at wrapper +Z which is what lookAt aligns with forward.
    const trainWrapper = new THREE.Group();
    trainWrapper.add(loco.train);
    loco.train.rotation.y = Math.PI;
    scene.add(trainWrapper);

    /* ── God ray cone parented to the inner train so it inherits the flip. ── */
    const godRay = createGodRayCone();
    godRay.mesh.position.set(0, 1.55, -2.85);
    loco.train.add(godRay.mesh);

    /* ── Smoke trails ── */
    const smokeParticles: { mesh: THREE.Mesh; life: number; vel: THREE.Vector3 }[] = [];
    const smokeGeo = new THREE.SphereGeometry(0.35, 8, 6);
    const smokeMatBase = new THREE.MeshBasicMaterial({
      color: 0x5a4a3a,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    for (let i = 0; i < 90; i += 1) {
      const m = new THREE.Mesh(smokeGeo, smokeMatBase.clone());
      m.visible = false;
      m.castShadow = false;
      scene.add(m);
      smokeParticles.push({ mesh: m, life: 0, vel: new THREE.Vector3() });
    }

    /* ── Wheel sparks ── */
    const sparks = createSparkPool(scene, 80);

    /* ── Dust field follows camera ── */
    const dust = createDustField();
    scene.add(dust);

    /* ── Post-processing composer ── */
    const composer = new EffectComposer(renderer);
    composer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(mountEl.clientWidth, mountEl.clientHeight),
      1.5, 0.7, 0.85,
    );
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    /* ── Per-frame palette buffer ── */
    const palette: Palette = {
      bg: new THREE.Color(),
      fog: new THREE.Color(),
      fogDensity: 0.02,
      sunColor: new THREE.Color(),
      sunIntensity: 1,
      sunDir: new THREE.Vector3(0, 1, 0),
      ambient: new THREE.Color(),
      ambientIntensity: 0.4,
      rim: new THREE.Color(),
      rimIntensity: 0.5,
      exposure: 1.05,
      bloomStrength: 1.5,
      bloomThreshold: 0.85,
      bloomRadius: 0.7,
      godRayIntensity: 1.5,
      fireboxIntensity: 2.0,
      headlightIntensity: 8.0,
      label: "",
    };

    /* ── State ── */
    // Camera sits in wrapper +Z direction (= forward of train after Object3D
    // lookAt aligns +Z with motion) so the drone is ahead of the train, looking
    // back — cowcatcher + headlight stay framed for the entire chase.
    let pursuitOffset = new THREE.Vector3(-22, 9, 18);
    const closeOffset = new THREE.Vector3(-3.5, 2.4, 7.5);
    let currentRoll = 0;
    let prevTrainX = 0;
    let prevTrainPos = new THREE.Vector3();
    const dampedQuat = new THREE.Quaternion();
    const tmpMatrix = new THREE.Matrix4();
    const tmpVec3 = new THREE.Vector3();
    const screenVec = new THREE.Vector3();
    const upVec = new THREE.Vector3(0, 1, 0);
    // Train-local AABB: -Z = cowcatcher tip, +Z = rear of tender + coupler.
    const trainBoxCorners = [
      new THREE.Vector3(-1.4, 0, -3.5),
      new THREE.Vector3(1.4, 0, -3.5),
      new THREE.Vector3(-1.4, 2.6, -3.5),
      new THREE.Vector3(1.4, 2.6, -3.5),
      new THREE.Vector3(-1.4, 0, 4.8),
      new THREE.Vector3(1.4, 0, 4.8),
      new THREE.Vector3(-1.4, 2.6, 4.8),
      new THREE.Vector3(1.4, 2.6, 4.8),
    ];

    const cycleSeconds = 22;
    const startTime = performance.now();
    let lastFrame = startTime;

    let animId: number | null = null;
    let isVisible = true;
    let lastPaletteUpdate = 0;

    function resize() {
      const w = mountEl.clientWidth;
      const h = mountEl.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }
    window.addEventListener("resize", resize);

    function applyPalette() {
      scene.background = palette.bg;
      (scene.fog as THREE.FogExp2).color.copy(palette.fog);
      (scene.fog as THREE.FogExp2).density = palette.fogDensity;

      ambient.color.copy(palette.ambient);
      ambient.intensity = palette.ambientIntensity;

      sun.color.copy(palette.sunColor);
      sun.intensity = palette.sunIntensity;
      // Position sun based on direction (relative to camera, large distance for parallel-ish shadow).
      const sunDistance = 80;
      sun.position.copy(palette.sunDir).multiplyScalar(sunDistance);
      sun.position.add(cameraGroup.position);
      sun.target.position.copy(cameraGroup.position);
      sun.target.position.y = 0;

      rim.color.copy(palette.rim);
      rim.intensity = palette.rimIntensity;

      renderer.toneMappingExposure = palette.exposure;

      bloomPass.strength = palette.bloomStrength;
      bloomPass.threshold = palette.bloomThreshold;
      bloomPass.radius = palette.bloomRadius;

      (godRay.material.uniforms.uIntensity as { value: number }).value = palette.godRayIntensity;
      (loco.fireboxPanel.material as THREE.MeshStandardMaterial).emissiveIntensity = palette.fireboxIntensity;
      loco.fireboxLight.intensity = palette.fireboxIntensity * 1.4;
      (loco.headlightLens.material as THREE.MeshStandardMaterial).emissiveIntensity = palette.headlightIntensity;
      loco.headlightSpot.intensity = palette.headlightIntensity * 1.1;

      if (timeLabelRef.current) {
        const purdueH = getPurdueHourFraction();
        const hh = String(Math.floor(purdueH)).padStart(2, "0");
        const mm = String(Math.floor((purdueH * 60) % 60)).padStart(2, "0");
        timeLabelRef.current.textContent = `WEST LAFAYETTE  ${hh}:${mm}  · ${palette.label}`;
      }
    }

    function animate() {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      const elapsed = (now - startTime) / 1000;

      // Update palette every 750ms (cheap but smooth across day/night transitions).
      if (now - lastPaletteUpdate > 750) {
        paletteAtHourInto(palette, getPurdueHourFraction());
        applyPalette();
        lastPaletteUpdate = now;
      }

      const cycleT = (elapsed % cycleSeconds) / cycleSeconds;
      const t = Math.min(0.999, cycleT * 0.95);

      /* ── Train position & heading (animate the wrapper, not the model) ── */
      const trainPos = trackCurve.getPointAt(t);
      const lookAhead = trackCurve.getPointAt(Math.min(0.999, t + 0.004));
      trainWrapper.position.copy(trainPos);
      trainWrapper.lookAt(lookAhead);
      // Force matrixWorld to refresh now so smoke / spark / AR projection
      // calls below this frame use the latest train pose rather than last
      // frame's stale matrix.
      trainWrapper.updateMatrixWorld(true);

      // Speed sample.
      const tNext = Math.min(0.999, t + 0.001);
      const ahead = trackCurve.getPointAt(tNext);
      const speed = ahead.distanceTo(trainPos) / ((0.001 * cycleSeconds) / 0.95);

      /* ── Wheel rolling ── */
      const dTheta = (speed / loco.driveRadius) * dt;
      for (const ref of loco.driveWheelRefs) {
        ref.mesh.rotation.x -= dTheta;
      }

      /* ── Connecting rod bob (follows crank phase of first driver) ── */
      const driverPhase = loco.driveWheelRefs[loco.driverIndices[0]]?.mesh.rotation.x ?? 0;
      const crankRadius = loco.driveRadius * 0.6;
      const rodBob = Math.cos(driverPhase) * crankRadius;
      for (const rod of loco.connectingRods) {
        rod.mesh.position.y = rod.baseY + rodBob;
      }

      /* ── Piston in/out (90° offset from side rod for proper steam-engine timing) ── */
      const pistonStroke = 0.18;
      const pistonOffset = Math.sin(driverPhase) * pistonStroke;
      for (const pr of loco.pistonRods) {
        pr.mesh.position.z = pr.baseZ + pistonOffset;
        pr.crosshead.position.z = pr.baseZ + 0.55 + pistonOffset;
      }

      /* ── Valve gear tick ── */
      for (const tick of loco.valveGearTickers) tick(driverPhase);

      /* ── Firebox flicker ── */
      const flicker = 0.85 + Math.sin(elapsed * 17.3) * 0.08 + Math.sin(elapsed * 7.1) * 0.12;
      loco.fireboxLight.intensity = palette.fireboxIntensity * 1.4 * flicker;
      (loco.fireboxPanel.material as THREE.MeshStandardMaterial).emissiveIntensity = palette.fireboxIntensity * flicker;

      /* ── Smoke emission ── */
      const stackLocal = new THREE.Vector3(0, 2.7, -2.25); // train-local stack top
      const stackWorld = stackLocal.clone().applyMatrix4(loco.train.matrixWorld);
      if (Math.random() < 0.55) {
        const dead = smokeParticles.find((p) => !p.mesh.visible);
        if (dead) {
          dead.mesh.visible = true;
          dead.mesh.position.copy(stackWorld);
          dead.mesh.scale.setScalar(0.4 + Math.random() * 0.4);
          dead.life = 1;
          dead.vel.set(
            (Math.random() - 0.5) * 0.3,
            1.4 + Math.random() * 0.5,
            (Math.random() - 0.5) * 0.6,
          );
          const m = dead.mesh.material as THREE.MeshBasicMaterial;
          m.opacity = 0.7;
          // Tint smoke based on palette (dark at night, slightly warmer at day).
          m.color.copy(palette.fog).lerp(new THREE.Color(0xffffff), 0.3);
        }
      }
      for (const p of smokeParticles) {
        if (!p.mesh.visible) continue;
        p.mesh.position.addScaledVector(p.vel, dt);
        p.mesh.scale.multiplyScalar(1.012);
        p.life -= dt * 0.32;
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, p.life * 0.65);
        if (p.life <= 0) p.mesh.visible = false;
      }

      /* ── Wheel sparks on hard curves ── */
      const lateralDelta = trainPos.x - prevTrainX;
      const curveSeverity = Math.abs(lateralDelta);
      if (curveSeverity > 0.04) {
        // Spawn 1-2 sparks at random driver wheel contact points.
        for (let k = 0; k < 2; k += 1) {
          const idx = loco.driverIndices[Math.floor(Math.random() * loco.driverIndices.length)];
          const ref = loco.driveWheelRefs[idx];
          const dead = sparks.find((s) => !s.mesh.visible);
          if (!dead) break;
          // Contact = train-local (sideX, 0, z) → world.
          tmpVec3.set(ref.sideX, 0.02, ref.z);
          tmpVec3.applyMatrix4(loco.train.matrixWorld);
          dead.mesh.position.copy(tmpVec3);
          dead.mesh.visible = true;
          const dir = lateralDelta > 0 ? -1 : 1;
          dead.vel.set(
            dir * (1.2 + Math.random() * 1.2),
            0.6 + Math.random() * 1.2,
            (Math.random() - 0.5) * 0.6,
          );
          dead.life = 0.6 + Math.random() * 0.25;
          const m = dead.mesh.material as THREE.MeshBasicMaterial;
          m.opacity = 1;
          m.color.setHex(Math.random() < 0.6 ? 0xffaa40 : 0xffe080);
        }
      }
      for (const s of sparks) {
        if (!s.mesh.visible) continue;
        s.mesh.position.addScaledVector(s.vel, dt);
        s.vel.y -= 4.5 * dt; // gravity
        s.life -= dt;
        const m = s.mesh.material as THREE.MeshBasicMaterial;
        m.opacity = Math.max(0, s.life / 0.85);
        if (s.life <= 0) {
          s.mesh.visible = false;
        }
      }
      prevTrainX = trainPos.x;
      prevTrainPos.copy(trainPos);

      /* ── Closing-the-gap intercept ── */
      pursuitOffset = pursuitOffset.lerp(closeOffset, 0.004);
      tmpMatrix.makeRotationFromQuaternion(trainWrapper.quaternion);
      const localOffset = pursuitOffset.clone().applyMatrix4(tmpMatrix);
      const idealCamPos = trainPos.clone().add(localOffset);
      cameraGroup.position.lerp(idealCamPos, 0.07);

      /* ── Damped lookAt (Quaternion slerp) ── */
      tmpMatrix.lookAt(cameraGroup.position, trainPos.clone().add(new THREE.Vector3(0, 1.2, 0)), upVec);
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(tmpMatrix);
      if (dampedQuat.lengthSq() === 0) dampedQuat.copy(targetQuat);
      else dampedQuat.slerp(targetQuat, 0.12);
      cameraGroup.quaternion.copy(dampedQuat);

      /* ── Banking ── */
      const targetRoll = THREE.MathUtils.clamp(lateralDelta * -12, -0.35, 0.35);
      currentRoll = THREE.MathUtils.lerp(currentRoll, targetRoll, 0.06);
      camera.rotation.z = currentRoll;

      /* ── Ground parallax ── */
      groundTex.offset.y -= speed * dt * 0.5;
      ground.position.x = cameraGroup.position.x;
      ground.position.z = cameraGroup.position.z;

      /* ── Cloud drift ── */
      for (const c of cloudLayers) {
        const cm = c.material as THREE.MeshBasicMaterial;
        cm.map!.offset.x += dt * 0.005;
        // Tint clouds with sky color.
        cm.color.copy(palette.bg).lerp(new THREE.Color(0xffffff), 0.6);
        c.position.x = cameraGroup.position.x;
        c.position.z = cameraGroup.position.z - 40 - c.position.y * 2;
      }

      /* ── Dust drifts past camera with subtle motion ── */
      dust.position.copy(cameraGroup.position);
      dust.rotation.y += dt * 0.01;
      const dustPositions = dust.geometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = dustPositions.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i + 2] += dt * 4;
        if (arr[i + 2] > 12) arr[i + 2] -= 24;
      }
      dustPositions.needsUpdate = true;

      /* ── AR targeting overlay ── */
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      let anyInFront = false;
      for (const corner of trainBoxCorners) {
        tmpVec3.copy(corner).applyMatrix4(loco.train.matrixWorld);
        screenVec.copy(tmpVec3).project(camera);
        if (screenVec.z < 1) anyInFront = true;
        const sx = (screenVec.x * 0.5 + 0.5) * mountEl.clientWidth;
        const sy = (-screenVec.y * 0.5 + 0.5) * mountEl.clientHeight;
        if (sx < minX) minX = sx;
        if (sy < minY) minY = sy;
        if (sx > maxX) maxX = sx;
        if (sy > maxY) maxY = sy;
      }
      const targetBox = targetingBoxRef.current;
      const targetLabel = targetingLabelRef.current;
      if (targetBox && anyInFront) {
        const left = Math.max(8, minX);
        const top = Math.max(8, minY);
        const width = Math.max(40, Math.min(mountEl.clientWidth - left - 8, maxX - minX));
        const height = Math.max(40, Math.min(mountEl.clientHeight - top - 8, maxY - minY));
        targetBox.style.opacity = "1";
        targetBox.style.transform = `translate(${left}px, ${top}px)`;
        targetBox.style.width = `${width}px`;
        targetBox.style.height = `${height}px`;
        if (targetLabel) {
          const range = cameraGroup.position.distanceTo(trainPos).toFixed(1);
          const conf = Math.min(99.4, 86 + (1 - pursuitOffset.distanceTo(closeOffset) / 25) * 13).toFixed(1);
          targetLabel.textContent = `TRGT-01  BoilerNet Express  ·  RNG ${range}m  ·  CONF ${conf}%`;
        }
      } else if (targetBox) {
        targetBox.style.opacity = "0";
      }

      composer.render();
    }

    function startLoop() {
      if (animId === null) {
        lastFrame = performance.now();
        animId = requestAnimationFrame(animate);
      }
    }
    function stopLoop() {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    // Initial palette + lighting.
    paletteAtHourInto(palette, getPurdueHourFraction());
    applyPalette();

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              isVisible = entry.isIntersecting;
              if (isVisible) startLoop();
              else stopLoop();
            },
            { threshold: 0.01 },
          )
        : null;
    observer?.observe(mountEl);

    startLoop();

    return () => {
      isVisible = false;
      stopLoop();
      window.removeEventListener("resize", resize);
      observer?.disconnect();
      if (renderer.domElement.parentElement === mountEl) {
        mountEl.removeChild(renderer.domElement);
      }
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        const mat = (mesh as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => materials.add(m));
        else if (mat) materials.add(mat);
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      groundTex.dispose();
      cloudTex.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="drone-chase-root">
      <div ref={mountRef} className="drone-chase-canvas" />
      <div className="dc-lens-dust" aria-hidden="true" />
      <div className="dc-vignette" aria-hidden="true" />
      <div className="drone-chase-ui" aria-hidden="true">
        <div className="dc-corner dc-corner-tl" />
        <div className="dc-corner dc-corner-tr" />
        <div className="dc-corner dc-corner-bl" />
        <div className="dc-corner dc-corner-br" />
        <div className="dc-hud-top">
          <span className="dc-hud-label">FPV-DRONE / TACTICAL CAM</span>
          <span className="dc-hud-blink">● REC</span>
        </div>
        <div className="dc-hud-bottom">
          <span>ALT 240m</span>
          <span>SPD 86 kt</span>
          <span>HDG 184°</span>
          <span ref={timeLabelRef} className="dc-time">WEST LAFAYETTE</span>
          <span className="dc-yolo">YOLOv8 · TRACKING</span>
        </div>
        <div ref={targetingBoxRef} className="dc-targeting-box">
          <span className="dc-tb-corner dc-tb-tl" />
          <span className="dc-tb-corner dc-tb-tr" />
          <span className="dc-tb-corner dc-tb-bl" />
          <span className="dc-tb-corner dc-tb-br" />
          <div ref={targetingLabelRef} className="dc-tb-label">
            TRGT-01  BoilerNet Express
          </div>
        </div>
      </div>
    </div>
  );
}
