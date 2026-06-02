"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const COUNT = 35000;
const RADIUS = 38;
const Z_SPAN = 220; // -180..40

const vert = /* glsl */ `
  uniform float uTime;
  attribute float aRandom;
  attribute float aSize;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 pos = position;
    float r = length(pos.xy);
    float angle = atan(pos.y, pos.x);
    // Differential rotation — inner ring rotates faster than outer.
    float swirl = uTime * 0.04 * (1.0 / (r * 0.04 + 1.0));
    pos.x = cos(angle + swirl) * r;
    pos.y = sin(angle + swirl) * r;
    // Drift along Z so particles slowly stream past the camera.
    pos.z = mod(pos.z + uTime * 0.6 + 100.0, ${Z_SPAN.toFixed(1)}) - 180.0;
    // Subtle noise jitter so the field shimmers.
    pos.x += sin(uTime * 0.7 + aRandom * 6.2831) * 0.18;
    pos.y += cos(uTime * 0.5 + aRandom * 6.2831) * 0.18;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (180.0 / max(-mv.z, 1.0));
    gl_Position = projectionMatrix * mv;
    vAlpha = aRandom;
    vSeed = aRandom;
  }
`;

const frag = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float intensity = smoothstep(0.5, 0.0, d);
    intensity *= intensity;
    vec3 color = mix(uColorA, uColorB, vSeed);
    float alpha = intensity * (0.12 + vAlpha * 0.16);
    gl_FragColor = vec4(color * 0.55, alpha);
  }
`;

export default function NebulaParticles() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i += 1) {
      // Cylindrical volume biased toward the center axis for a swirling galaxy feel.
      const r = Math.pow(Math.random(), 1.6) * RADIUS;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.65;
      positions[i * 3 + 2] = (Math.random() - 0.8) * Z_SPAN;
      randoms[i] = Math.random();
      sizes[i] = 0.6 + Math.random() * 2.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const u = {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(0x4a6cff) },
      uColorB: { value: new THREE.Color(0xff9ad0) },
    };

    return { geometry: geo, uniforms: u };
  }, []);

  useFrame((_, dt) => {
    if (materialRef.current) {
      const u = materialRef.current.uniforms;
      u.uTime.value += dt;
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false} raycast={() => null}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
