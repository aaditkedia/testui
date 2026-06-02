"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { gsap } from "gsap";
import type { CinematicCard } from "./cards-data";
import { useCinematicStore } from "./store";

interface Props {
  card: CinematicCard;
  index: number;
}

const vert = /* glsl */ `
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave = sin(pos.x * 1.2 + uTime * 1.6) * sin(pos.y * 1.4 + uTime * 1.1);
    pos.z += wave * 0.18 * uHover;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHover;
  uniform float uTime;
  uniform vec3 uAccent;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    // Chromatic aberration intensifies on hover.
    float ca = 0.006 + uHover * 0.012;
    vec2 dir = normalize(vUv - vec2(0.5));
    float r = texture2D(uMap, vUv + dir * ca).r;
    float g = texture2D(uMap, vUv).g;
    float b = texture2D(uMap, vUv - dir * ca).b;
    vec3 color = vec3(r, g, b);

    // Faint scanlines that pulse with hover.
    float scan = sin(vUv.y * 220.0 - uTime * 4.0) * 0.05 * uHover;
    color += scan;

    // Edge accent glow.
    float edge = smoothstep(0.45, 0.5, abs(vUv.x - 0.5)) + smoothstep(0.45, 0.5, abs(vUv.y - 0.5));
    color += uAccent * edge * (0.4 + uHover * 0.8);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createCardTexture(card: CinematicCard): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 1024, 576);
  grad.addColorStop(0, "#06080f");
  grad.addColorStop(0.6, "#0c0f1c");
  grad.addColorStop(1, card.accent);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 576);

  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 576);
    ctx.stroke();
  }
  for (let y = 0; y < 576; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255,255,255,0.04)";
  for (let i = 0; i < 80; i += 1) {
    const r = Math.random() * 120 + 20;
    ctx.beginPath();
    ctx.arc(Math.random() * 1024, Math.random() * 576, r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = card.accent;
  ctx.font = "600 18px ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText(card.category, 48, 60);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 132px ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText(card.title, 48, 280);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "400 28px ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText(card.subtitle, 48, 340);

  ctx.fillStyle = card.accent;
  ctx.font = "600 26px ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText(`◯  ${card.year}`, 48, 510);

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "400 18px ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
  ctx.fillText("CLICK TO ENTER", 820, 510);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function ProjectCard({ card, index }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const setActive = useCinematicStore((s) => s.setActive);
  const setHover = useCinematicStore((s) => s.setHover);
  const isHovered = useCinematicStore((s) => s.hoverIndex === index);

  const { texture, uniforms } = useMemo(() => {
    const tex = createCardTexture(card);
    const u = {
      uMap: { value: tex },
      uHover: { value: 0 },
      uTime: { value: 0 },
      uAccent: { value: new THREE.Color(card.accent) },
    };
    return { texture: tex, uniforms: u };
  }, [card]);

  useEffect(() => () => texture.dispose(), [texture]);

  useEffect(() => {
    if (!matRef.current) return;
    gsap.to(matRef.current.uniforms.uHover, {
      value: isHovered ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isHovered]);

  useFrame((state, dt) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += dt;
    }
    if (meshRef.current) {
      meshRef.current.position.y = card.pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.15;
    }
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(index);
    document.body.style.cursor = "pointer";
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(null);
    document.body.style.cursor = "auto";
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActive(index);
  };

  return (
    <mesh
      ref={meshRef}
      position={card.pos}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      <planeGeometry args={[16, 9, 32, 32]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
