"use client";

import { useRef } from "react";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Noise,
  SMAA,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";
import NebulaParticles from "./NebulaParticles";
import ProjectCard from "./ProjectCard";
import CameraController from "./CameraController";
import { CARDS } from "./cards-data";

export default function Scene() {
  const dofRef = useRef<{ focusDistance: number } | null>(null);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[10, 12, 6]} intensity={0.5} color="#bcc8ff" />
      <pointLight position={[-15, -8, -30]} intensity={6} color="#ff5a7a" distance={60} />
      <pointLight position={[15, 5, -70]} intensity={6} color="#4a8aff" distance={70} />

      <NebulaParticles />
      {CARDS.map((card, i) => (
        <ProjectCard key={card.title} card={card} index={i} />
      ))}

      <CameraController dofRef={dofRef} />

      <EffectComposer multisampling={0}>
        <SMAA />
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.1}
          height={300}
          intensity={1.2}
          mipmapBlur
        />
        <DepthOfField
          ref={dofRef as never}
          focusDistance={0.08}
          focalLength={0.05}
          bokehScale={4.0}
          height={480}
        />
        <ChromaticAberration
          offset={new Vector2(0.0014, 0.0018)}
          radialModulation={true}
          modulationOffset={0.4}
          blendFunction={BlendFunction.NORMAL}
        />
        <Noise opacity={0.045} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.18} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
