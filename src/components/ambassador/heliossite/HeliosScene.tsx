"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { clamp01 } from "../webgl/helpers";

const N = 3200;
type Ref = MutableRefObject<number>;

function starfield() {
  const a = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const dir = new THREE.Vector3().randomDirection().multiplyScalar(2 + Math.random() * 5);
    a[i * 3] = dir.x; a[i * 3 + 1] = dir.y; a[i * 3 + 2] = dir.z;
  }
  return a;
}
function galaxy() {
  const a = new Float32Array(N * 3), arms = 4, radius = 4.2;
  for (let i = 0; i < N; i++) {
    const arm = i % arms, armAngle = (arm / arms) * Math.PI * 2;
    const t = Math.random(), r = t * radius, angle = armAngle + r * 1.2 + (Math.random() - 0.5) * 0.5;
    a[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.3;
    a[i * 3 + 1] = (Math.random() - 0.5) * 0.18 * (1 - t);
    a[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.3;
  }
  return a;
}
function globe() {
  const a = new Float32Array(N * 3), R = 3, ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i;
    a[i * 3] = Math.cos(th) * r * R; a[i * 3 + 1] = y * R; a[i * 3 + 2] = Math.sin(th) * r * R;
  }
  return a;
}
function terrain() {
  const a = new Float32Array(N * 3), cols = Math.ceil(Math.sqrt(N * 1.4)), rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    const x = (c / cols - 0.5) * 9, z = (r / rows - 0.5) * 6;
    const y = Math.sin(x * 0.8) * Math.cos(z * 0.7) * 1.2 + Math.sin(x * 1.7 + z) * 0.35;
    a[i * 3] = x; a[i * 3 + 1] = y - 0.4; a[i * 3 + 2] = z;
  }
  return a;
}
function mapShape() {
  const a = new Float32Array(N * 3), cols = Math.ceil(Math.sqrt(N * 1.6)), rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    a[i * 3] = (c / cols - 0.5) * 9 + (Math.random() - 0.5) * 0.1;
    a[i * 3 + 1] = (r / rows - 0.5) * 5 + (Math.random() - 0.5) * 0.1;
    a[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return a;
}

function Particles({ progress }: { progress: Ref }) {
  const pts = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const shapes = useMemo(() => [starfield(), galaxy(), globe(), terrain(), mapShape()], []);
  const current = useMemo(() => shapes[0].slice(), [shapes]);
  const colors = useMemo(() => {
    const c = new Float32Array(N * 3), col = new THREE.Color();
    for (let i = 0; i < N; i++) {
      const pick = Math.random();
      if (pick > 0.92) col.set("#ffffff");
      else if (pick > 0.6) col.set("#00e5cc");
      else col.set("#00ff88");
      c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b;
    }
    return c;
  }, []);

  const mouse = useRef(new THREE.Vector3(999, 999, 0));
  useFrame((state, dt) => {
    if (!pts.current) return;
    const p = progress.current;
    const stage = p < 0.18 ? 0 : p < 0.4 ? 1 : p < 0.62 ? 2 : p < 0.82 ? 3 : 4;
    const target = shapes[stage];

    // mouse to world at z=0
    const fov = ((camera as THREE.PerspectiveCamera).fov * Math.PI) / 180;
    const cz = camera.position.z;
    const halfH = Math.tan(fov / 2) * cz;
    const halfW = halfH * (state.size.width / state.size.height);
    mouse.current.set(state.pointer.x * halfW, state.pointer.y * halfH, 0);

    const arr = (pts.current.geometry.getAttribute("position") as THREE.BufferAttribute).array as Float32Array;
    const speed = 0.045;
    const showGlobe = stage === 2;
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      arr[i3] += (target[i3] - arr[i3]) * speed;
      arr[i3 + 1] += (target[i3 + 1] - arr[i3 + 1]) * speed;
      arr[i3 + 2] += (target[i3 + 2] - arr[i3 + 2]) * speed;
      if (showGlobe) {
        const dx = arr[i3] - mouse.current.x, dy = arr[i3 + 1] - mouse.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 2.25) {
          const f = (1 - Math.sqrt(d2) / 1.5) * 0.25;
          arr[i3] += dx * f; arr[i3 + 1] += dy * f;
        }
      }
    }
    pts.current.geometry.getAttribute("position").needsUpdate = true;
    // rotation: galaxy + globe spin
    const spin = stage === 1 ? 0.18 : stage === 2 ? 0.08 : 0.02;
    pts.current.rotation.y += dt * spin;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </points>
  );
}

function Core({ progress }: { progress: Ref }) {
  const m = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!m.current) return;
    const p = progress.current;
    const vis = p > 0.18 && p < 0.62 ? 1 : 0;
    m.current.scale.setScalar(THREE.MathUtils.lerp(m.current.scale.x, vis ? 1 : 0.001, 0.1));
  });
  return (
    <mesh ref={m}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshBasicMaterial color="#aef9ee" toneMapped={false} />
    </mesh>
  );
}

export default function HeliosScene({ progress }: { progress: Ref }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: false, antialias: true }}
      onCreated={({ gl }) => gl.setClearColor("#000000")}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <Particles progress={progress} />
      <Core progress={progress} />
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.4} luminanceSmoothing={0.35} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
