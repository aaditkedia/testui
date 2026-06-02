"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import Scene from "./Scene";
import { useCinematicStore } from "./store";
import { CARDS } from "./cards-data";

const CATEGORIES = [
  "WEBSITES",
  "INSTALLATIONS",
  "AR / VR / AI",
  "MULTIPLAYER",
  "GAMES",
];

// Ported from BoilerNet's /cinematic route — a scroll-free R3F portfolio scene
// (drifting nebula + clickable monoliths, GSAP camera dolly). Self-contained:
// the back-to-landing router link was dropped for the gallery.
export default function CinematicSite() {
  const uiHidden = useCinematicStore((s) => s.uiHidden);
  const activeIndex = useCinematicStore((s) => s.activeIndex);
  const setActive = useCinematicStore((s) => s.setActive);
  const overlayRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current.querySelectorAll(".cin-fade"), {
      opacity: uiHidden ? 0 : 1,
      y: uiHidden ? -8 : 0,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.04,
    });
  }, [uiHidden]);

  useEffect(() => {
    if (!detailRef.current) return;
    gsap.to(detailRef.current, {
      opacity: activeIndex === null ? 0 : 1,
      y: activeIndex === null ? 12 : 0,
      duration: 0.65,
      ease: "power3.out",
      delay: activeIndex === null ? 0 : 1.4,
    });
  }, [activeIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setActive]);

  const activeCard = activeIndex !== null ? CARDS[activeIndex] : null;

  return (
    <div className="bn-scope">
      <main className="cinematic-page">
        <div className="cinematic-canvas-wrap">
          <Canvas
            gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
            camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 500 }}
            dpr={[1, 2]}
          >
            <color attach="background" args={["#020205"]} />
            <fog attach="fog" args={["#020205", 25, 180]} />
            <Scene />
          </Canvas>
        </div>

        <div ref={overlayRef} className="cinematic-overlay">
          <div className="cin-corner cin-tl cin-fade">
            <span className="cin-brand">CINEMATIC // PORTFOLIO</span>
            <span className="cin-meta">v0.1 · SHOWCASE MODE</span>
          </div>

          <div className="cin-corner cin-tr cin-fade">
            <button className="cin-pill" type="button">WORK</button>
            <button className="cin-pill" type="button">CONTACT</button>
          </div>

          <div className="cin-nav cin-fade">
            <p className="cin-eyebrow">WHAT ARE YOU LOOKING FOR?</p>
            <ul className="cin-nav-list">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <button type="button" className="cin-nav-item">
                    <span className="cin-arrow">{"->"}</span>
                    <span>{c}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="cin-bottom-left cin-fade">
            <button type="button" className="cin-pill cin-pill-accent">ASK ME ANYTHING</button>
          </div>

          <div className="cin-bottom-right cin-fade">
            <span className="cin-cards-count">{String(CARDS.length).padStart(2, "0")} PROJECTS</span>
            <span className="cin-hint">CLICK A MONOLITH TO ENTER</span>
          </div>
        </div>

        <div ref={detailRef} className="cinematic-detail" style={{ opacity: 0 }}>
          {activeCard && (
            <>
              <p className="cin-eyebrow">{activeCard.category} · {activeCard.year}</p>
              <h1 className="cin-detail-title" style={{ color: activeCard.accent }}>{activeCard.title}</h1>
              <p className="cin-detail-sub">{activeCard.subtitle}</p>
              <div className="cin-detail-actions">
                <button type="button" className="cin-pill cin-pill-accent">VIEW PROJECT</button>
                <button type="button" className="cin-pill" onClick={() => setActive(null)}>{"<-"} RETURN</button>
              </div>
              <p className="cin-hint">PRESS ESC TO EXIT</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
