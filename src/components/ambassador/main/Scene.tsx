"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  RoundedBox,
} from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import type { MainTheme } from "./theme";

export const NUM_ACTS = 6;

type ProgressRef = MutableRefObject<number>;
type ActProps = { progress: ProgressRef; index: number; theme: MainTheme };

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** fade-in 0..0.22, hold, fade-out 0.8..1; 0 outside the act range. */
function windowWeight(x: number) {
  if (x <= 0 || x >= 1) return 0;
  if (x < 0.22) return x / 0.22;
  if (x > 0.8) return (1 - x) / 0.2;
  return 1;
}

/** progress within this act, 0..1 */
function localT(progress: number, index: number) {
  return clamp01(progress * NUM_ACTS - index);
}
function visibleT(progress: number, index: number) {
  return windowWeight(progress * NUM_ACTS - index);
}

/* ------------------------------ act objects ------------------------------ */

function HeroOrb({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    g.current.scale.setScalar(v * 1.6);
    g.current.visible = v > 0.002;
    g.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    g.current.rotation.y += 0.0015;
  });
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={1.2}
          roughness={0.2}
          transmission={1}
          ior={1.3}
          chromaticAberration={theme.fringe}
          backside
          samples={4}
          resolution={256}
        />
      </mesh>
    </group>
  );
}

function GlassCube({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    const l = localT(progress.current, index);
    g.current.scale.setScalar(v * 1.5);
    g.current.visible = v > 0.002;
    g.current.rotation.y = l * Math.PI * 2;
    g.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    g.current.position.x = lerp(-0.4, 0.4, l);
  });
  return (
    <group ref={g}>
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.14} smoothness={5}>
        <MeshTransmissionMaterial
          thickness={0.9}
          roughness={0.12}
          transmission={1}
          ior={1.4}
          chromaticAberration={theme.fringe}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          backside
          samples={4}
          resolution={256}
        />
      </RoundedBox>
    </group>
  );
}

function GlassSphere({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    g.current.scale.setScalar(v * 1.5);
    g.current.visible = v > 0.002;
    g.current.rotation.y += 0.004;
    if (core.current) core.current.rotation.x = state.clock.elapsedTime * 0.6;
  });
  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        <MeshTransmissionMaterial
          thickness={1.1}
          roughness={0.1}
          transmission={1}
          ior={1.45}
          chromaticAberration={theme.fringe}
          backside
          samples={4}
          resolution={256}
        />
      </mesh>
      <mesh ref={core} scale={0.42}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial color={theme.metal} metalness={1} roughness={0.2} emissive={theme.core} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function ChromeRings({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    g.current.scale.setScalar(v * 1.5);
    g.current.visible = v > 0.002;
    g.current.children.forEach((ring, i) => {
      ring.rotation.x += dt * (0.2 + i * 0.14);
      ring.rotation.y += dt * (0.12 + i * 0.1);
    });
  });
  return (
    <group ref={g}>
      {[0.7, 1.0, 1.3, 1.6].map((r, i) => (
        <mesh key={r}>
          <torusGeometry args={[r, 0.035, 16, 140]} />
          <meshStandardMaterial color={theme.metal} metalness={1} roughness={0.18} />
        </mesh>
      ))}
      <mesh>
        <octahedronGeometry args={[0.42]} />
        <meshStandardMaterial color={theme.core} emissive={theme.core} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function IconField({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  const tiles = useMemo(() => {
    let s = 99;
    const rng = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
    return Array.from({ length: 16 }, () => ({
      pos: [(rng() - 0.5) * 5, (rng() - 0.5) * 3.4, (rng() - 0.5) * 3] as [number, number, number],
      rot: rng() * Math.PI,
      spin: (rng() - 0.5) * 0.5,
      scale: 0.3 + rng() * 0.22,
    }));
  }, []);
  useFrame((state) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    const l = localT(progress.current, index);
    g.current.scale.setScalar(v);
    g.current.visible = v > 0.002;
    g.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
    g.current.position.z = lerp(-1.5, 1.2, l);
    g.current.children.forEach((c, i) => {
      c.rotation.x += 0.003 * (i % 3 === 0 ? 1.5 : 1);
      c.rotation.z += 0.002;
    });
  });
  return (
    <group ref={g}>
      {tiles.map((t, i) => (
        <RoundedBox key={i} args={[1, 1, 0.12]} radius={0.16} smoothness={3} position={t.pos} rotation={[t.rot, t.rot, 0]} scale={t.scale}>
          <meshStandardMaterial color={theme.tile} metalness={0.6} roughness={0.35} emissive={theme.core} emissiveIntensity={0.08} />
        </RoundedBox>
      ))}
    </group>
  );
}

function ChromeKnot({ progress, index, theme }: ActProps) {
  const g = useRef<THREE.Group>(null);
  const pts = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 1600;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const dir = new THREE.Vector3().randomDirection();
      arr[i * 3] = dir.x;
      arr[i * 3 + 1] = dir.y;
      arr[i * 3 + 2] = dir.z;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!g.current) return;
    const v = visibleT(progress.current, index);
    const l = localT(progress.current, index);
    g.current.scale.setScalar(v * 1.3);
    g.current.visible = v > 0.002;
    g.current.rotation.y = state.clock.elapsedTime * 0.4;
    if (pts.current) {
      const burst = Math.pow(l, 1.4) * 3 + 0.4;
      pts.current.scale.setScalar(burst);
      const mat = pts.current.material as THREE.PointsMaterial;
      mat.opacity = clamp01(1 - l) * 0.9;
    }
  });
  return (
    <group ref={g}>
      <mesh>
        <torusKnotGeometry args={[0.8, 0.26, 180, 32]} />
        <meshStandardMaterial color={theme.metal} metalness={1} roughness={0.22} emissive={theme.core} emissiveIntensity={0.15} />
      </mesh>
      <points ref={pts}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color={theme.particle} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </group>
  );
}

/* --------------------------------- rig ---------------------------------- */

function Rig({ progress, theme }: { progress: ProgressRef; theme: MainTheme }) {
  return (
    <group>
      <HeroOrb progress={progress} index={0} theme={theme} />
      <GlassCube progress={progress} index={1} theme={theme} />
      <GlassSphere progress={progress} index={2} theme={theme} />
      <ChromeRings progress={progress} index={3} theme={theme} />
      <IconField progress={progress} index={4} theme={theme} />
      <ChromeKnot progress={progress} index={5} theme={theme} />
    </group>
  );
}

function Lights({ theme }: { theme: MainTheme }) {
  const warm = theme.env === "warm";
  return (
    <>
      <ambientLight intensity={warm ? 0.5 : 0.35} />
      <directionalLight position={[3, 4, 2]} intensity={warm ? 1.1 : 0.9} color={warm ? "#ffe3b0" : "#cfe6ff"} />
      <Environment resolution={256}>
        <Lightformer form="circle" intensity={warm ? 3 : 2} color={warm ? "#F2C98C" : "#bfe2ff"} position={[0, 2, 4]} scale={6} />
        <Lightformer form="rect" intensity={warm ? 1.2 : 1.4} color={warm ? "#C4733A" : "#6aa8d8"} position={[-4, 1, 2]} scale={5} />
        <Lightformer form="rect" intensity={1} color="#ffffff" position={[4, -1, 3]} scale={4} />
      </Environment>
    </>
  );
}

export default function Scene({ progress, theme }: { progress: ProgressRef; theme: MainTheme }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 1.8]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <Lights theme={theme} />
      <Rig progress={progress} theme={theme} />
      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={theme.variant === "dark" ? 0.7 : 0.5} />
        <Noise opacity={0.035} />
      </EffectComposer>
    </Canvas>
  );
}
