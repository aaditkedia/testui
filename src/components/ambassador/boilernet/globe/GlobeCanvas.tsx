"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import {
  PURDUE_LON, PURDUE_LAT, CITIES,
  latLonToVec3, createArcCurve, buildArcTube,
  ARC_PULSE_VERTEX, ARC_PULSE_FRAGMENT,
} from "./globe-data";

interface Props {
  rotRef?: React.MutableRefObject<number>;
}

export default function GlobeCanvas({ rotRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, mount.clientWidth / mount.clientHeight, 0.1, 1000,
    );
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      0.4, 0.5, 0.3,
    ));
    composer.addPass(new OutputPass());

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.55;
    controls.autoRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // Procedural starfield
    const STAR_COUNT = 900;
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = 50 * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = 50 * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = 50 * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.08, sizeAttenuation: true,
      transparent: true, opacity: 0.7,
    })));

    // Globe
    const globeR = 1;
    const tex = new THREE.TextureLoader().load(
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/earth-night.jpg`,
    );
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(globeR, 128, 128),
      new THREE.MeshBasicMaterial({ map: tex }),
    );
    scene.add(globe);

    // Arc connections
    const arcGroup = new THREE.Group();
    scene.add(arcGroup);

    interface ArcEntry {
      mat: THREE.ShaderMaterial;
      curve: THREE.QuadraticBezierCurve3;
      phaseOffset: number;
      speed: number;
      pulseDot: THREE.Mesh;
    }
    const arcs: ArcEntry[] = [];
    const pulseDotGeo = new THREE.SphereGeometry(0.01, 8, 8);
    const pulseDotMat = new THREE.MeshBasicMaterial({
      color: 0xfff5e0, transparent: true, opacity: 0.9,
    });

    CITIES.forEach((city) => {
      const curve = createArcCurve(PURDUE_LAT, PURDUE_LON, city.lat, city.lon, globeR);
      const geo = buildArcTube(curve, 0.006, 64);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uPulsePos: { value: 0 },
          uBaseBright: { value: 0.12 },
          uGlowMul: { value: 0.4 },
        },
        vertexShader: ARC_PULSE_VERTEX,
        fragmentShader: ARC_PULSE_FRAGMENT,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      arcGroup.add(new THREE.Mesh(geo, mat));

      const pulseDot = new THREE.Mesh(pulseDotGeo, pulseDotMat);
      arcGroup.add(pulseDot);

      arcs.push({
        mat, curve, pulseDot,
        phaseOffset: Math.random(),
        speed: 0.25 + Math.random() * 0.1,
      });
    });

    // City dots
    const dotGroup = new THREE.Group();
    scene.add(dotGroup);

    interface DotEntry { mesh: THREE.Mesh; phase: number; isPurdue: boolean; }
    const allDots: DotEntry[] = [];
    const dotGeo = new THREE.SphereGeometry(0.015, 16, 16);

    CITIES.forEach((city, i) => {
      const pos = latLonToVec3(city.lat, city.lon, globeR * 1.008);
      const dot = new THREE.Mesh(
        dotGeo,
        new THREE.MeshBasicMaterial({ color: new THREE.Color(city.color) }),
      );
      dot.position.copy(pos);
      dotGroup.add(dot);
      allDots.push({ mesh: dot, phase: i, isPurdue: false });
    });

    // Purdue dot
    const purduePos = latLonToVec3(PURDUE_LAT, PURDUE_LON, globeR * 1.008);
    const purdueDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xdaaa00 }),
    );
    purdueDot.position.copy(purduePos);
    dotGroup.add(purdueDot);
    allDots.push({ mesh: purdueDot, phase: 0, isPurdue: true });

    // Initial rotation — show Purdue
    const initRot = (-PURDUE_LON - 90) * (Math.PI / 180);
    globe.rotation.y = initRot;
    arcGroup.rotation.y = initRot;
    dotGroup.rotation.y = initRot;

    // Render loop — pre-allocated scratch vectors
    let animId: number | null = null;
    let isVisible = true;
    const _camNeg = new THREE.Vector3();
    const _worldPos = new THREE.Vector3();
    const _yAxis = new THREE.Vector3(0, 1, 0);
    const _arcPos = new THREE.Vector3();
    const _normTmp = new THREE.Vector3();

    function animate(time: number) {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const timeSec = time * 0.001;

      controls.update();
      if (!controls.enabled) {
        globe.rotation.y += 0.001;
      }
      arcGroup.rotation.x = globe.rotation.x;
      arcGroup.rotation.y = globe.rotation.y;
      dotGroup.rotation.x = globe.rotation.x;
      dotGroup.rotation.y = globe.rotation.y;
      if (rotRef) rotRef.current = globe.rotation.y;

      camera.getWorldDirection(_camNeg).negate();

      // Arc pulses
      arcs.forEach(arc => {
        const t = ((timeSec * arc.speed) + arc.phaseOffset) % 1.0;
        arc.mat.uniforms.uPulsePos.value = t;
        arc.curve.getPointAt(t, _arcPos);
        _arcPos.applyAxisAngle(_yAxis, globe.rotation.y);
        arc.pulseDot.position.copy(_arcPos);
        _normTmp.copy(_arcPos).normalize();
        arc.pulseDot.visible = _normTmp.dot(_camNeg) > 0.0;
      });

      // Pulsing dots + back-face cull
      allDots.forEach(({ mesh, phase, isPurdue }) => {
        mesh.getWorldPosition(_worldPos);
        _normTmp.copy(_worldPos).normalize();
        const facing = _normTmp.dot(_camNeg);
        mesh.visible = facing > 0.05;
        if (mesh.visible) {
          const pulse = Math.sin(timeSec * 2.5 + phase);
          mesh.scale.setScalar(isPurdue ? 1.0 + pulse * 0.25 : 1.0 + pulse * 0.12);
        }
      });

      composer.render();
    }

    function startLoop() {
      if (animId === null) {
        animId = requestAnimationFrame(animate);
      }
    }

    function stopLoop() {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }

    startLoop();

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) startLoop();
        else stopLoop();
      }, { threshold: 0.01 })
      : null;
    observer?.observe(mount);

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    let isDragging = false;
    const onPointerDown = () => {
      isDragging = true;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      globe.rotation.y += event.movementX * 0.004;
      globe.rotation.x += event.movementY * 0.002;
      globe.rotation.x = Math.max(-0.55, Math.min(0.55, globe.rotation.x));
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    renderer.domElement.style.cursor = "grab";

    return () => {
      isVisible = false;
      stopLoop();
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      controls.dispose();
      mount.removeChild(renderer.domElement);
      composer.dispose();
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((m) => materials.add(m));
        } else if (material) {
          materials.add(material);
        }
      });
      materials.forEach((material) => {
        const mapped = material as THREE.Material & { map?: THREE.Texture | null };
        mapped.map?.dispose();
        material.dispose();
      });
      geometries.forEach((geometry) => geometry.dispose());
      renderer.dispose();
    };
  }, [rotRef]);

  return <div ref={mountRef} id="globe-canvas" />;
}
