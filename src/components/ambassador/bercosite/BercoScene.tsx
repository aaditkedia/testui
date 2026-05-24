"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PINK = "#F4B0A3";
const TEAL = "#52D4C8";

/* ----------------------------- hero chip ----------------------------- */
function Chip() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.12;
  });
  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={ref} rotation={[-0.5, 0.4, 0]}>
        {/* board */}
        <RoundedBox args={[3, 0.35, 3]} radius={0.12} smoothness={5}>
          <meshStandardMaterial color="#1a1a1d" metalness={0.75} roughness={0.4} />
        </RoundedBox>
        {/* die */}
        <RoundedBox args={[1.25, 0.14, 1.25]} radius={0.05} position={[0, 0.25, 0]}>
          <meshStandardMaterial color="#0c0c0e" metalness={0.3} roughness={0.6} emissive={TEAL} emissiveIntensity={0.45} />
        </RoundedBox>
        {/* trace pins */}
        {[-1, 1].map((s) =>
          [-0.8, -0.3, 0.3, 0.8].map((p, i) => (
            <mesh key={`${s}-${i}`} position={[s * 1.45, 0.18, p]}>
              <boxGeometry args={[0.18, 0.04, 0.08]} />
              <meshStandardMaterial color={TEAL} metalness={0.5} roughness={0.4} emissive={TEAL} emissiveIntensity={0.25} />
            </mesh>
          ))
        )}
      </group>
    </Float>
  );
}

export function ChipScene() {
  return (
    <Canvas camera={{ position: [0, 1.4, 5], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff5ec" />
      <pointLight position={[-2, 2, 3]} intensity={2.2} color={TEAL} />
      <Chip />
    </Canvas>
  );
}

/* --------------------------- mindset card stack --------------------------- */
function CardStack() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.18;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={ref} rotation={[-0.35, 0.5, 0]}>
        {/* dark base */}
        <RoundedBox args={[2.1, 0.22, 2.1]} radius={0.16} position={[0, -0.2, 0]} smoothness={5}>
          <meshStandardMaterial color="#1a1a1d" metalness={0.6} roughness={0.5} />
        </RoundedBox>
        {/* glass-ish middle plate */}
        <RoundedBox args={[1.9, 0.16, 1.9]} radius={0.16} position={[0, 0.05, 0]} smoothness={5}>
          <meshStandardMaterial color="#2a2a2e" metalness={0.4} roughness={0.15} transparent opacity={0.85} />
        </RoundedBox>
        {/* teal inset */}
        <RoundedBox args={[1.0, 0.07, 1.0]} radius={0.07} position={[0, 0.16, 0]} smoothness={5}>
          <meshStandardMaterial color={TEAL} roughness={0.3} metalness={0.2} emissive={TEAL} emissiveIntensity={0.2} />
        </RoundedBox>
        {/* hovering pink card */}
        <RoundedBox args={[1.6, 0.12, 1.6]} radius={0.18} position={[0, 0.7, 0]} smoothness={5}>
          <meshStandardMaterial color={PINK} roughness={0.45} metalness={0.1} />
        </RoundedBox>
      </group>
    </Float>
  );
}

export function CardStackScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 5], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={1.8} color="#fff5ec" />
      <pointLight position={[-3, 1, 3]} intensity={1.6} color={TEAL} />
      <pointLight position={[2, 3, 2]} intensity={1.2} color={PINK} />
      <CardStack />
    </Canvas>
  );
}
