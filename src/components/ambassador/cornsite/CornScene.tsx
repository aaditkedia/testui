"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { localAct, visAct } from "../webgl/helpers";

const NUM = 6;
type Ref = MutableRefObject<number>;

const AMBER = "#ff8c00";
const AMBER_EDGE = "#ff5a00";
const CHARTREUSE = "#9bff2e";

/* DNA double helix (act 1) */
function DNAHelix({ progress }: { progress: Ref }) {
  const g = useRef<THREE.Group>(null);
  const { c1, c2, rungs, embers } = useMemo(() => {
    const turns = 4, per = 64, radius = 0.7, height = 5, total = turns * per;
    const s1: THREE.Vector3[] = [], s2: THREE.Vector3[] = [], r: number[] = [];
    for (let i = 0; i < total; i++) {
      const t = i / total, ang = t * turns * Math.PI * 2, y = (t - 0.5) * height;
      const x1 = Math.cos(ang) * radius, z1 = Math.sin(ang) * radius;
      const x2 = Math.cos(ang + Math.PI) * radius, z2 = Math.sin(ang + Math.PI) * radius;
      s1.push(new THREE.Vector3(x1, y, z1));
      s2.push(new THREE.Vector3(x2, y, z2));
      if (i % 8 === 0) r.push(x1, y, z1, x2, y, z2);
    }
    const n = 340;
    const e = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, rr = 0.4 + Math.random() * 1.8;
      e[i * 3] = Math.cos(a) * rr;
      e[i * 3 + 1] = (Math.random() - 0.5) * 6;
      e[i * 3 + 2] = Math.sin(a) * rr;
    }
    return {
      c1: new THREE.CatmullRomCurve3(s1),
      c2: new THREE.CatmullRomCurve3(s2),
      rungs: new Float32Array(r),
      embers: e,
    };
  }, []);

  const sweep = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const v = visAct(progress.current, NUM, 1);
    const l = localAct(progress.current, NUM, 1);
    g.current.visible = v > 0.002;
    g.current.scale.setScalar(v);
    g.current.rotation.y = l * Math.PI * 3 + state.clock.elapsedTime * 0.15;
    if (sweep.current) sweep.current.rotation.z -= dt * 0.5;
  });

  const tubeMat = (
    <meshStandardMaterial color={AMBER} emissive={AMBER_EDGE} emissiveIntensity={1.3} metalness={0.3} roughness={0.4} toneMapped={false} />
  );

  return (
    <group ref={g}>
      <mesh>
        <tubeGeometry args={[c1, 240, 0.04, 8, false]} />
        {tubeMat}
      </mesh>
      <mesh>
        <tubeGeometry args={[c2, 240, 0.04, 8, false]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER_EDGE} emissiveIntensity={1.3} metalness={0.3} roughness={0.4} toneMapped={false} />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[rungs, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={AMBER} transparent opacity={0.55} toneMapped={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[embers, 3]} />
        </bufferGeometry>
        <pointsMaterial color={AMBER} size={0.06} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </points>
      {/* radar scope on the right */}
      <mesh position={[2.6, 0, -1]} ref={sweep}>
        <ringGeometry args={[1.5, 1.55, 128]} />
        <meshBasicMaterial color="#888" transparent opacity={0.22} side={THREE.DoubleSide} />
        <mesh position={[0, 0.75, 0]}>
          <planeGeometry args={[0.02, 1.5]} />
          <meshBasicMaterial color={AMBER} transparent opacity={0.3} toneMapped={false} />
        </mesh>
      </mesh>
    </group>
  );
}

/* particle scatter (act 2) */
function Scatter({ progress }: { progress: Ref }) {
  const g = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 700;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 8;
      a[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      a[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return a;
  }, []);
  useFrame((state) => {
    if (!g.current) return;
    const v = visAct(progress.current, NUM, 2);
    const l = localAct(progress.current, NUM, 2);
    g.current.visible = v > 0.002;
    (g.current.material as THREE.PointsMaterial).opacity = v * 0.9;
    g.current.scale.setScalar(0.7 + l * 0.6);
    g.current.rotation.y = state.clock.elapsedTime * 0.05;
  });
  return (
    <points ref={g}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CHARTREUSE} size={0.05} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </points>
  );
}

/* top-down field map dots (act 3) */
function FieldMap({ progress }: { progress: Ref }) {
  const g = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const cols = 44, rows = 30;
    const a = new Float32Array(cols * rows * 3);
    let k = 0;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        a[k++] = (c / cols - 0.5) * 9;
        a[k++] = 0;
        a[k++] = (r / rows - 0.5) * 6;
      }
    return a;
  }, []);
  useFrame(() => {
    if (!g.current) return;
    const v = visAct(progress.current, NUM, 3);
    const l = localAct(progress.current, NUM, 3);
    g.current.visible = v > 0.002;
    const pts = g.current.children[0] as THREE.Points;
    if (pts) (pts.material as THREE.PointsMaterial).opacity = v;
    g.current.position.x = (l - 0.5) * 2;
  });
  return (
    <group ref={g} rotation={[-1.05, 0, 0]} position={[0, -0.4, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color={CHARTREUSE} size={0.06} transparent blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </points>
    </group>
  );
}

export default function CornScene({ progress }: { progress: Ref }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 3]} intensity={3.5} color={AMBER} distance={12} />
      <pointLight position={[3, 2, 2]} intensity={2} color="#ffd9a0" />
      <DNAHelix progress={progress} />
      <Scatter progress={progress} />
      <FieldMap progress={progress} />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.62} luminanceSmoothing={0.3} mipmapBlur />
        <Vignette eskil={false} offset={0.3} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
}
