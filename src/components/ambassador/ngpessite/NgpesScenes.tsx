"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ORANGE = "#FF4D1F";

/* ----------------------------- Hero globe ----------------------------- */
// A swirling brushed-metal torus knot, lit on cream. No bloom — this brand is corporate.
function GlobeObject() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.25} floatIntensity={0.35}>
      <group ref={ref}>
        <mesh>
          <torusKnotGeometry args={[1.45, 0.42, 240, 36, 2, 5]} />
          <meshStandardMaterial color="#eceae5" metalness={0.85} roughness={0.28} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroGlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-5, -2, 2]} intensity={1.1} color="#ffd9c9" />
      <pointLight position={[2, -4, 4]} intensity={1.4} color={ORANGE} />
      <GlobeObject />
    </Canvas>
  );
}

/* ----------------------------- Paris scene ----------------------------- */
// Procedural wireframe Eiffel Tower (blueprint look) — no external GLTF needed.
// Builds a lattice silhouette from the iconic taper profile.
function eiffelLines(): Float32Array {
  // profile: [normalised height 0..1, half-width]
  const profile: [number, number][] = [
    [0.0, 1.0],
    [0.12, 0.62],
    [0.26, 0.44],
    [0.34, 0.4], // first platform
    [0.5, 0.26],
    [0.6, 0.22], // second platform
    [0.78, 0.12],
    [0.9, 0.07],
    [1.0, 0.04],
  ];
  const H = 3.4;
  const yOf = (t: number) => t * H - H / 2;
  const corners = (w: number, y: number): THREE.Vector3[] => [
    new THREE.Vector3(-w, y, -w),
    new THREE.Vector3(w, y, -w),
    new THREE.Vector3(w, y, w),
    new THREE.Vector3(-w, y, w),
  ];

  const seg: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) => {
    seg.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };

  for (let i = 0; i < profile.length - 1; i++) {
    const [t0, w0] = profile[i];
    const [t1, w1] = profile[i + 1];
    const c0 = corners(w0, yOf(t0));
    const c1 = corners(w1, yOf(t1));
    // 4 vertical edges + cross bracing per face
    for (let k = 0; k < 4; k++) {
      push(c0[k], c1[k]);
      push(c0[k], c1[(k + 1) % 4]); // diagonal brace
    }
    // ring squares at this level
    for (let k = 0; k < 4; k++) push(c0[k], c0[(k + 1) % 4]);
  }
  // platforms (extra ring squares at the two platform levels)
  [3, 5].forEach((idx) => {
    const [t, w] = profile[idx];
    const c = corners(w * 1.15, yOf(t));
    for (let k = 0; k < 4; k++) push(c[k], c[(k + 1) % 4]);
  });
  // antenna
  const top = yOf(1.0);
  push(new THREE.Vector3(0, top, 0), new THREE.Vector3(0, top + 0.45, 0));

  return new Float32Array(seg);
}

function EiffelTower() {
  const positions = useMemo(() => eiffelLines(), []);
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#3a3a3c" transparent opacity={0.85} />
    </lineSegments>
  );
}

function OrangeRing() {
  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.25}>
      <mesh rotation={[Math.PI / 2.3, 0.2, 0.35]} position={[0, 0.1, 0]}>
        <torusGeometry args={[1.85, 0.05, 24, 120]} />
        <meshStandardMaterial color={ORANGE} metalness={0.5} roughness={0.35} emissive={ORANGE} emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
}

function ParisContent() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return (
    <group ref={ref}>
      <EiffelTower />
      <OrangeRing />
    </group>
  );
}

export function ParisScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 6.5], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />
      <pointLight position={[-3, 1, 3]} intensity={1.2} color={ORANGE} />
      <ParisContent />
    </Canvas>
  );
}
