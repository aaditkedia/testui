/* Shared data & math for the 3D globe */

export const PURDUE_LON = -86.9;
export const PURDUE_LAT = 40.4;
export const TILT = -18; // X-axis tilt (degrees)

export interface City {
  lon: number;
  lat: number;
  label: string;
  type: string;
  color: string;
  desc: string;
  connections: string[];
}

export const CITIES: City[] = [
  { lon: -122.4, lat: 37.7, label: "San Francisco", type: "investor", color: "#7ee89a", desc: "Home to Sequoia, a16z, and YC — Purdue founders have raised here.", connections: ["Sequoia Capital", "Y Combinator", "Andreessen Horowitz"] },
  { lon: -74.0, lat: 40.7, label: "New York", type: "mentor", color: "#7ab4e8", desc: "Stripe, Goldman, and dozens of Purdue alumni in finance and tech.", connections: ["Stripe Engineering", "Goldman Sachs", "Betterment"] },
  { lon: -0.1, lat: 51.5, label: "London", type: "investor", color: "#7ee89a", desc: "Techstars London and multiple EU funds backing Purdue spinoffs.", connections: ["Techstars London", "Balderton Capital", "Index Ventures"] },
  { lon: 103.8, lat: 1.3, label: "Singapore", type: "founder", color: "#cfb991", desc: "Southeast Asia hub — Purdue alumni leading startups across APAC.", connections: ["GovTech Singapore", "Grab", "Sea Group"] },
  { lon: 139.7, lat: 35.7, label: "Tokyo", type: "mentor", color: "#7ab4e8", desc: "Deep tech mentors in robotics and semiconductors from Purdue.", connections: ["SoftBank Ventures", "Sony Innovation", "Toyota Ventures"] },
  { lon: -97.7, lat: 30.3, label: "Austin", type: "investor", color: "#7ee89a", desc: "Emerging tech hub with strong Boilermaker alumni network.", connections: ["Susa Ventures", "LiveOak Ventures", "Capital Factory"] },
  { lon: -71.1, lat: 42.4, label: "Boston", type: "mentor", color: "#7ab4e8", desc: "MIT-adjacent biotech and deeptech mentors for Purdue founders.", connections: ["Mass General Brigham", "Pillar VC", "General Catalyst"] },
  { lon: 2.4, lat: 48.9, label: "Paris", type: "founder", color: "#cfb991", desc: "Station F and EU innovation hubs housing Purdue-founded teams.", connections: ["Station F", "Partech", "BPI France"] },
  { lon: 55.3, lat: 25.2, label: "Dubai", type: "investor", color: "#7ee89a", desc: "MENA investors and sovereign funds connected to Purdue network.", connections: ["DIFC FinTech", "Mubadala", "Wamda Capital"] },
];

/* Simplified continent polygons [lon, lat] */
export const LAND: number[][][] = [
  // North America
  [[-168,71],[-140,72],[-85,72],[-70,68],[-62,50],[-56,47],[-70,42],[-75,36],[-80,26],[-88,16],[-77,8],[-84,10],[-90,16],[-96,20],[-108,24],[-118,30],[-117,34],[-122,38],[-124,46],[-130,54],[-148,60],[-164,60],[-168,64],[-168,71]],
  // Greenland
  [[-70,76],[-22,76],[-18,72],[-20,64],[-28,60],[-44,58],[-54,62],[-62,68],[-70,76]],
  // South America
  [[-72,12],[-62,10],[-52,4],[-36,-4],[-38,-12],[-42,-22],[-46,-24],[-52,-32],[-56,-38],[-60,-40],[-66,-56],[-68,-56],[-74,-52],[-74,-40],[-70,-30],[-70,-18],[-76,-10],[-80,-2],[-76,2],[-72,12]],
  // Europe + Asia
  [[-10,36],[34,36],[36,24],[44,12],[54,12],[60,22],[68,22],[72,8],[80,12],[92,8],[100,2],[104,4],[110,2],[120,4],[130,4],[136,8],[140,38],[142,46],[138,54],[128,60],[118,54],[100,60],[80,66],[60,68],[44,68],[30,72],[20,60],[10,56],[0,52],[-10,44],[-10,36]],
  // India
  [[68,22],[72,22],[80,8],[88,22],[92,22],[88,26],[80,28],[72,26],[68,22]],
  // Africa
  [[-6,36],[36,36],[50,12],[44,2],[40,-10],[36,-22],[26,-34],[16,-34],[10,-18],[8,2],[0,6],[-6,14],[-18,16],[-6,36]],
  // SE Asia
  [[98,22],[106,22],[106,10],[102,2],[100,4],[98,10],[98,22]],
  // Australia
  [[114,-22],[118,-20],[122,-18],[130,-12],[136,-12],[140,-16],[148,-16],[150,-22],[152,-28],[150,-38],[142,-38],[136,-36],[128,-34],[118,-34],[114,-28],[114,-22]],
  // Japan
  [[130,32],[136,34],[140,36],[142,40],[140,44],[134,44],[130,38],[130,32]],
  // UK
  [[-6,50],[2,52],[0,58],[-4,60],[-6,56],[-4,52],[-6,50]],
  // Scandinavia
  [[6,58],[10,56],[20,58],[28,62],[30,70],[26,72],[16,70],[8,64],[6,58]],
  // Madagascar
  [[44,-12],[50,-16],[48,-22],[44,-26],[44,-20],[44,-12]],
  // New Zealand
  [[166,-46],[172,-46],[172,-34],[166,-34],[166,-46]],
];

export interface Projected { px: number; py: number; z: number; vis: boolean; }

export function project3d(
  lon: number, lat: number,
  rotDeg: number, cx: number, cy: number, R: number,
  scaleR?: number
): Projected {
  const D = Math.PI / 180;
  const phi = lat * D, lam = lon * D;
  let x = Math.cos(phi) * Math.sin(lam);
  let y = -Math.sin(phi);
  let z = Math.cos(phi) * Math.cos(lam);
  // Y-axis rotation (longitude spin)
  const ry = rotDeg * D;
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  x = x1; z = z1;
  // X-axis tilt
  const rx = TILT * D;
  const y1 = y * Math.cos(rx) - z * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z * Math.cos(rx);
  y = y1; z = z2;
  return { px: cx + (scaleR || R) * x, py: cy + (scaleR || R) * y, z, vis: z > -0.05 };
}

export function gcDist(lo1: number, la1: number, lo2: number, la2: number): number {
  const d = Math.PI / 180;
  const p1 = la1 * d, p2 = la2 * d, dl = (lo2 - lo1) * d;
  return 2 * Math.asin(Math.sqrt(Math.sin((p2 - p1) / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2));
}

/* ── Shared Three.js utilities (used by GlobeCanvas + GlobeModal) ── */
import * as THREE from "three";

export function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

export function createArcCurve(
  lat1: number, lon1: number,
  lat2: number, lon2: number,
  r: number,
): THREE.QuadraticBezierCurve3 {
  const start = latLonToVec3(lat1, lon1, r);
  const end = latLonToVec3(lat2, lon2, r);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  mid.normalize().multiplyScalar(r * 1.35);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

export function buildArcTube(curve: THREE.QuadraticBezierCurve3, radius: number, segments: number): THREE.TubeGeometry {
  const geo = new THREE.TubeGeometry(curve, segments, radius, 6, false);
  const radialCount = 7;
  const tubularCount = segments + 1;
  const arcTArr = new Float32Array(geo.attributes.position.count);
  for (let i = 0; i < tubularCount; i++) {
    const t = i / segments;
    for (let j = 0; j < radialCount; j++) {
      arcTArr[i * radialCount + j] = t;
    }
  }
  geo.setAttribute("arcT", new THREE.BufferAttribute(arcTArr, 1));
  return geo;
}

export const ARC_PULSE_VERTEX = `
  attribute float arcT;
  varying float vArcT;
  void main() {
    vArcT = arcT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const ARC_PULSE_FRAGMENT = `
  uniform float uPulsePos;
  uniform float uBaseBright;
  uniform float uGlowMul;
  varying float vArcT;
  void main() {
    vec3 baseColor = vec3(0.812, 0.725, 0.569);
    vec3 base = baseColor * uBaseBright;
    float d = abs(vArcT - uPulsePos);
    d = min(d, 1.0 - d);
    float pulse = exp(-d * d * 600.0);
    float glow = exp(-d * d * 60.0) * uGlowMul;
    vec3 color = base + vec3(1.0, 0.95, 0.8) * pulse + baseColor * 1.5 * glow;
    float alpha = clamp(uBaseBright + pulse + glow * 0.5, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;

export const ATMOS_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;
