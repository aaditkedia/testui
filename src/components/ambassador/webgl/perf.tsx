"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

/** True inside the gallery's scaled-down <iframe> previews (/p/<id>/). */
export const IS_EMBED = typeof window !== "undefined" && window.self !== window.top;

/**
 * Device-pixel-ratio cap for a WebGL scene. Fill cost scales with dpr², so
 * scenes cap it; gallery previews are drawn at ~1/3 size, so 1x is plenty there.
 */
export function maxDpr(cap: number): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, IS_EMBED ? 1 : cap);
}

/**
 * R3F <Canvas> that pauses its render loop while scrolled out of view. Use it
 * for canvases that sit inline in the page — fixed full-screen backdrops are
 * always on screen and don't need it.
 */
export function ViewportCanvas({ style, ...props }: CanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <Canvas {...props} style={style} frameloop={inView ? "always" : "never"} />
    </div>
  );
}
