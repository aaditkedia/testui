"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * Scroll-linked train tour guide.
 * Each car is an independent entity positioned on the SVG path at its own
 * offset — they curve and tilt independently based on track curvature.
 */

const SMOKE_COUNT = 12;

// Pixel spacing between each piece along the path
const CAR_SPACING = 115; // px along path between each car's center

export default function TrainGuide() {
  const guideRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const root = guideRef.current;
    if (!root || initialized.current) return;
    initialized.current = true;

    const engine = root.querySelector("#train-engine") as HTMLElement;
    const car1 = root.querySelector("#train-car1") as HTMLElement;
    const car2 = root.querySelector("#train-car2") as HTMLElement;
    const caboose = root.querySelector("#train-caboose") as HTMLElement;
    const trackPath = root.querySelector("#track-rail-line") as SVGPathElement;
    const tiesSvg = root.querySelector("#track-ties-svg") as SVGGElement;
    const smokeEmit = root.querySelector("#smoke-emit") as HTMLElement;

    const allCars = [engine, car1, car2, caboose];
    if (allCars.some(c => !c) || !trackPath) return;

    const animations: ReturnType<typeof animate>[] = [];

    // Smoke particles
    for (let i = 0; i < SMOKE_COUNT; i++) {
      const p = document.createElement("div");
      p.className = "smoke-p";
      smokeEmit.appendChild(p);
    }
    animations.push(animate(smokeEmit.querySelectorAll(".smoke-p"), {
      translateX: () => [0, 6 + Math.random() * 22],
      translateY: () => [0, -(20 + Math.random() * 44)],
      scale: () => [0.2, 0.5 + Math.random() * 0.6],
      opacity: [{ to: 0.4, duration: 180 }, { to: 0, duration: 1000 }],
      duration: () => 1200 + Math.random() * 700,
      delay: stagger(100),
      loop: true,
      ease: "outQuad",
    }));

    // Mechanical animations (engine only)
    animations.push(animate(root.querySelectorAll(".t-whl-lg"), { rotate: 360, duration: 1100, loop: true, ease: "linear" }));
    animations.push(animate(root.querySelectorAll(".t-whl-sm"), { rotate: 360, duration: 820, loop: true, ease: "linear" }));
    animations.push(animate(root.querySelectorAll(".car-wheel"), { rotate: 360, duration: 900, loop: true, ease: "linear" }));
    animations.push(animate(root.querySelectorAll(".t-piston"), { translateX: [0, 7, 0], duration: 550, loop: true, ease: "inOutSine" }));
    animations.push(animate(root.querySelectorAll(".t-rod"), { rotate: [-5, 5, -5], duration: 550, loop: true, ease: "inOutSine" }));
    animations.push(animate(root.querySelectorAll(".eng-wrap"), { translateY: [0, -1, 0], duration: 420, loop: true, ease: "inOutSine" }));

    let pathReady = false;

    function buildPath() {
      const pageWrap = document.getElementById("page-wrap");
      if (!pageWrap) return;
      const PW = pageWrap.offsetWidth;
      const PH = pageWrap.offsetHeight;
      if (!PH || PH < 200) return;

      const wpts: number[][] = [
        [0.95, 0.00], [0.95, 0.08],
        [0.50, 0.13],
        [0.04, 0.19], [0.04, 0.32],
        [0.50, 0.39],
        [0.95, 0.45], [0.95, 0.57],
        [0.50, 0.63],
        [0.04, 0.69], [0.04, 0.84],
        [0.50, 0.91],
        [0.95, 1.00],
      ].map(([fx, fy]) => [fx * PW, fy * PH]);

      let d = `M ${wpts[0][0].toFixed(1)},${wpts[0][1].toFixed(1)}`;
      for (let i = 0; i < wpts.length - 1; i++) {
        const p0 = wpts[Math.max(0, i - 1)];
        const p1 = wpts[i];
        const p2 = wpts[i + 1];
        const p3 = wpts[Math.min(wpts.length - 1, i + 2)];
        d += ` C ${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
      }
      trackPath.setAttribute("d", d);

      // Ties
      tiesSvg.innerHTML = "";
      const total = trackPath.getTotalLength();
      for (let len = 0; len < total; len += 28) {
        const pt = trackPath.getPointAtLength(len);
        const pt2 = trackPath.getPointAtLength(Math.min(len + 2, total));
        const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) + Math.PI / 2;
        const lx = Math.cos(angle) * 7, ly = Math.sin(angle) * 7;
        const tie = document.createElementNS("http://www.w3.org/2000/svg", "line");
        tie.setAttribute("x1", String(pt.x - lx));
        tie.setAttribute("y1", String(pt.y - ly));
        tie.setAttribute("x2", String(pt.x + lx));
        tie.setAttribute("y2", String(pt.y + ly));
        tie.setAttribute("stroke", "rgba(207,185,145,0.12)");
        tie.setAttribute("stroke-width", "2.5");
        tie.setAttribute("stroke-linecap", "round");
        tiesSvg.appendChild(tie);
      }
      pathReady = true;
    }

    // Place a single car element at a given length along the path
    function placeOnPath(el: HTMLElement, lengthOnPath: number, total: number, centerOffsetX: number, centerOffsetY: number) {
      // Clamp to valid range
      const len = Math.max(0, Math.min(lengthOnPath, total));
      const pt = trackPath.getPointAtLength(len);
      const pt2 = trackPath.getPointAtLength(Math.min(len + 8, total));

      const angleRad = Math.atan2(pt2.y - pt.y, pt2.x - pt.x);
      // Add 180° because the train pieces face left in their CSS
      const angleDeg = angleRad * (180 / Math.PI) + 180;

      el.style.transform = `translate(${pt.x - centerOffsetX}px, ${pt.y - centerOffsetY}px) rotate(${angleDeg}deg)`;
    }

    function updateTrain() {
      if (!pathReady) return;
      const total = trackPath.getTotalLength();
      if (!total) return;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const frac = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

      // Engine position along path
      const engineLen = frac * total;

      // Each car trails behind the engine by CAR_SPACING pixels along the path
      // Engine center ~70px wide, cars ~54px wide
      placeOnPath(engine, engineLen, total, 70, 39);
      placeOnPath(car1, engineLen - CAR_SPACING, total, 54, 31);
      placeOnPath(car2, engineLen - CAR_SPACING * 2, total, 54, 31);
      placeOnPath(caboose, engineLen - CAR_SPACING * 3, total, 48, 31);
    }

    let scrollRaf = 0;
    function scheduleTrainUpdate() {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        updateTrain();
      });
    }

    window.addEventListener("scroll", scheduleTrainUpdate, { passive: true });

    // Hide until path is built
    allCars.forEach(c => { c.style.opacity = "0"; });
    const revealTimer = window.setTimeout(() => {
      buildPath();
      updateTrain();
      allCars.forEach(c => {
        c.style.transition = "opacity .8s";
        c.style.opacity = "0.85";
      });
    }, 600);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => { buildPath(); updateTrain(); }, 100);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(resizeTimer);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      animations.forEach((animation) => animation.cancel());
      window.removeEventListener("scroll", scheduleTrainUpdate);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div id="train-guide" ref={guideRef}>
      <svg id="track-svg" xmlns="http://www.w3.org/2000/svg">
        <path id="track-rail-line" d="" />
        <g id="track-ties-svg" />
      </svg>

      {/* ENGINE — independent element on the path */}
      <div id="train-engine" className="train-piece">
        <div className="eng-wrap">
          <div className="smoke-emit" id="smoke-emit" />
          <div className="t-boiler" />
          <div className="t-bb t-bb1" /><div className="t-bb t-bb2" /><div className="t-bb t-bb3" />
          <div className="t-cabin" />
          <div className="t-cabin-roof" />
          <div className="t-cabin-win" />
          <div className="t-stack" />
          <div className="t-stack-cap" />
          <div className="t-light" />
          <div className="t-catcher" />
          <div className="t-piston" />
          <div className="t-rod" />
          <div className="t-whl-lg wl1"><div className="t-spoke" /><div className="t-spoke t-spoke2" /></div>
          <div className="t-whl-lg wl2"><div className="t-spoke" /><div className="t-spoke t-spoke2" /></div>
          <div className="coup-rod" />
          <div className="ecc-rod" />
          <div className="t-whl-sm ws1" />
          <div className="t-whl-sm ws2" />
        </div>
      </div>

      {/* CAR 1 — Builders (gold) */}
      <div id="train-car1" className="train-piece">
        <div className="loco-car">
          <div className="car-coupler" />
          <div className="car-body car-gold" />
          <div className="car-stripe" />
          <div className="car-win cw1" /><div className="car-win cw2" /><div className="car-win cw3" />
          <div className="car-wheel car-wl" /><div className="car-wheel car-wr" />
        </div>
      </div>

      {/* CAR 2 — Mentors (dark) */}
      <div id="train-car2" className="train-piece">
        <div className="loco-car">
          <div className="car-coupler" />
          <div className="car-body car-dark" />
          <div className="car-stripe" />
          <div className="car-win cw1" /><div className="car-win cw2" /><div className="car-win cw3" />
          <div className="car-wheel car-wl" /><div className="car-wheel car-wr" />
        </div>
      </div>

      {/* CABOOSE */}
      <div id="train-caboose" className="train-piece">
        <div className="loco-car lc-caboose">
          <div className="car-coupler" />
          <div className="car-body car-red" />
          <div className="car-cup" />
          <div className="car-wheel car-wl" /><div className="car-wheel car-wr" />
        </div>
      </div>
    </div>
  );
}
