"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { useCinematicStore } from "./store";
import { CARDS } from "./cards-data";

const IDLE_POS = new THREE.Vector3(0, 0, 10);
const IDLE_LOOKAT = new THREE.Vector3(0, 0, -20);
const ROLL_AXIS = new THREE.Vector3(0, 0, 1);

interface Props {
  dofRef: React.MutableRefObject<{ focusDistance: number } | null>;
}

export default function CameraController({ dofRef }: Props) {
  const { camera } = useThree();
  const activeIndex = useCinematicStore((s) => s.activeIndex);

  const targetPos = useRef(IDLE_POS.clone());
  const targetLook = useRef(IDLE_LOOKAT.clone());
  const focusDistance = useRef({ value: 0.08 });
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));
  const lastCamX = useRef(0);
  const roll = useRef(0);
  const rollQuat = useRef(new THREE.Quaternion());

  useEffect(() => {
    if (tlRef.current) tlRef.current.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    if (activeIndex === null) {
      tl.to(
        targetPos.current,
        { x: IDLE_POS.x, y: IDLE_POS.y, z: IDLE_POS.z, duration: 2.4, ease: "power4.inOut" },
        0,
      );
      tl.to(
        targetLook.current,
        { x: IDLE_LOOKAT.x, y: IDLE_LOOKAT.y, z: IDLE_LOOKAT.z, duration: 2.4, ease: "power4.inOut" },
        0,
      );
      tl.to(
        focusDistance.current,
        { value: 0.08, duration: 2.4, ease: "power4.inOut" },
        0,
      );
    } else {
      const card = CARDS[activeIndex];
      const cardPos = new THREE.Vector3(...card.pos);
      const stop = cardPos.clone().add(new THREE.Vector3(0, 0, 5));
      tl.to(
        targetPos.current,
        { x: stop.x, y: stop.y, z: stop.z, duration: 2.5, ease: "power4.inOut" },
        0,
      );
      tl.to(
        targetLook.current,
        { x: cardPos.x, y: cardPos.y, z: cardPos.z, duration: 2.5, ease: "power4.inOut" },
        0,
      );
      tl.to(
        focusDistance.current,
        { value: 0.02, duration: 2.5, ease: "power4.inOut" },
        0,
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  useFrame((state) => {
    smoothedMouse.current.lerp(state.pointer, 0.04);
    const intensity = activeIndex === null ? 1 : 0.15;
    const parX = smoothedMouse.current.x * 1.0 * intensity;
    const parY = smoothedMouse.current.y * 0.6 * intensity;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      targetPos.current.x + parX,
      0.1,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetPos.current.y + parY,
      0.1,
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos.current.z, 0.1);

    camera.lookAt(targetLook.current);

    const dx = camera.position.x - lastCamX.current;
    const targetRoll = THREE.MathUtils.clamp(dx * -0.6, -0.18, 0.18);
    roll.current = THREE.MathUtils.lerp(roll.current, targetRoll, 0.06);
    rollQuat.current.setFromAxisAngle(ROLL_AXIS, roll.current);
    camera.quaternion.multiply(rollQuat.current);

    lastCamX.current = camera.position.x;

    if (dofRef.current) {
      dofRef.current.focusDistance = focusDistance.current.value;
    }
  });

  return null;
}
