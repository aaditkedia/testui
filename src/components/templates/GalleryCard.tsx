"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";

// The iframe renders each template at this logical viewport, then we scale the
// whole frame down to fit the card. Keeping a fixed design width means every
// preview is captured at the same "desktop" breakpoint regardless of card size.
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 800; // 16:10 — shows the hero + a bit of the next section

export type GalleryCardProps = {
  id: string;
  name: string;
  label: string;
  summary: string;
  accent: string;
};

export default function GalleryCard({ id, name, label, summary, accent }: GalleryCardProps) {
  const thumbRef = useRef<HTMLDivElement>(null);
  // `mounted` controls whether the live iframe exists at all. We only mount it
  // near the viewport and unmount it once it scrolls far away, so the number of
  // simultaneous WebGL contexts stays small (some templates are r3f scenes and
  // browsers cap active contexts at ~16).
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.25);

  // Scale = card width / design width, kept in sync on resize.
  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Mount the iframe when the card approaches the viewport; unmount when it
  // leaves (releasing its WebGL context / timers).
  useEffect(() => {
    const el = thumbRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setMounted(entry.isIntersecting);
        if (!entry.isIntersecting) setLoaded(false);
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // Outer element is a plain <div> so the live <iframe> is a sibling of the
    // navigation link, not a descendant of an <a> (invalid HTML). A stretched,
    // transparent <Link> overlay (below) makes the whole card clickable.
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-200 hover:-translate-y-1"
      style={{ background: "#161616", border: "1px solid #262626" }}
    >
      {/* Browser-chrome frame */}
      <div className="flex items-center gap-2 px-3.5 py-2.5" style={{ borderBottom: "1px solid #262626" }}>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span
          className="ml-1 flex-1 truncate rounded-md px-2.5 py-1 text-[11px] font-mono"
          style={{ background: "#0e0e0e", color: "#6b6b6b" }}
        >
          {id}.preview
        </span>
      </div>

      {/* Live preview thumbnail. `contain: paint` + clipPath force the box to
          clip composited descendants (the templates' WebGL canvases paint on
          their own layer and otherwise escape overflow:hidden on iOS Safari). */}
      <div
        ref={thumbRef}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}`,
          background: "#0a0a0a",
          contain: "paint",
          clipPath: "inset(0)",
        }}
      >
        {/* Accent poster shown until the iframe paints (and whenever unmounted) */}
        <div
          className="absolute inset-0 flex items-end p-4 transition-opacity duration-500"
          style={{
            opacity: loaded ? 0 : 1,
            background: `radial-gradient(120% 120% at 0% 0%, ${accent}22 0%, transparent 55%), #0d0d0d`,
          }}
        >
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accent }}>
            {label}
          </span>
        </div>

        {mounted && (
          // Fixed-size scaler box: the transform lives here (not on the iframe)
          // so the iframe keeps a clean DESIGN_WIDTH×DESIGN_HEIGHT layout box and
          // the wrapper's overflow:hidden clips the iframe's own scrollbar on
          // mobile, where iframes ignore the height attr and auto-expand.
          <div
            className="absolute left-0 top-0 overflow-hidden"
            style={{
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
          >
            <iframe
              src={asset(`/p/${id}/`)}
              title={`${name} preview`}
              aria-hidden
              tabIndex={-1}
              onLoad={() => setLoaded(true)}
              style={{
                display: "block",
                width: DESIGN_WIDTH,
                height: DESIGN_HEIGHT,
                border: 0,
              }}
            />
          </div>
        )}

        {/* Hover overlay CTA (above the stretched link) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <span
            className="rounded-full px-5 py-2 text-sm font-semibold"
            style={{ background: "#fff", color: "#0a0a0a" }}
          >
            Live Preview →
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accent }}>
          {label}
        </span>
        <span className="text-lg font-semibold leading-snug" style={{ color: "#f5f5f5" }}>
          {name}
        </span>
        <span className="text-sm leading-relaxed line-clamp-2" style={{ color: "#9a9a9a" }}>
          {summary}
        </span>
      </div>

      {/* Stretched, transparent link — makes the whole card a single click target */}
      <Link
        href={`/t/${id}/`}
        aria-label={`${name} — open live preview`}
        className="absolute inset-0 z-10"
      />
    </div>
  );
}
