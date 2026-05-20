"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { viewport } from "@/lib/motion";
import { useThemeColors } from "@/lib/theme";

const W = 620;
const H = 360;

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  conf: number;
  tone: "accent" | "advisory";
};

const boxes: Box[] = [
  { x: 70, y: 60, w: 96, h: 64, label: "Transformer", conf: 0.98, tone: "advisory" },
  { x: 250, y: 120, w: 140, h: 84, label: "Solar array", conf: 0.95, tone: "accent" },
  { x: 430, y: 70, w: 80, h: 80, label: "Substation", conf: 0.92, tone: "advisory" },
  { x: 150, y: 230, w: 120, h: 70, label: "Solar array", conf: 0.9, tone: "accent" },
  { x: 410, y: 220, w: 110, h: 96, label: "Switchyard", conf: 0.88, tone: "advisory" },
];

function makeRng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

export default function AssetMapping() {
  const colors = useThemeColors();
  // stylized "satellite" plots: a scatter of field/parcel rectangles
  const parcels = useMemo(() => {
    const rng = makeRng(11);
    return Array.from({ length: 26 }, () => ({
      x: rng() * W,
      y: rng() * H,
      w: 30 + rng() * 80,
      h: 24 + rng() * 60,
      o: 0.03 + rng() * 0.06,
    }));
  }, []);

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl border border-border">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Asset detection over satellite imagery">
          {/* terrain backdrop */}
          <rect width={W} height={H} fill={colors.bgElevated} />
          {parcels.map((p, i) => (
            <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill={colors.text} opacity={p.o} rx={2} />
          ))}
          {/* roads */}
          <line x1={0} y1={H * 0.5} x2={W} y2={H * 0.42} stroke={colors.text} strokeOpacity={0.1} strokeWidth={6} />
          <line x1={W * 0.4} y1={0} x2={W * 0.46} y2={H} stroke={colors.text} strokeOpacity={0.1} strokeWidth={5} />

          {/* scanning sweep */}
          <motion.rect
            x={0}
            y={0}
            width={3}
            height={H}
            fill={colors.accent}
            opacity={0.5}
            initial={{ x: 0, opacity: 0 }}
            whileInView={{ x: W, opacity: [0, 0.5, 0] }}
            viewport={viewport}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* detections */}
          {boxes.map((b, i) => {
            const color = b.tone === "accent" ? colors.accent : colors.advisory;
            const c = 10; // corner bracket length
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewport}
                transition={{ delay: 0.4 + i * 0.18, duration: 0.4 }}
                style={{ transformOrigin: `${b.x + b.w / 2}px ${b.y + b.h / 2}px` }}
              >
                <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={color} fillOpacity={0.06} stroke={color} strokeOpacity={0.5} strokeWidth={1} />
                {/* corner brackets */}
                {[
                  [b.x, b.y, c, 0, 0, c],
                  [b.x + b.w, b.y, -c, 0, 0, c],
                  [b.x, b.y + b.h, c, 0, 0, -c],
                  [b.x + b.w, b.y + b.h, -c, 0, 0, -c],
                ].map((p, k) => (
                  <path
                    key={k}
                    d={`M ${p[0] + p[2]} ${p[1] + p[3]} L ${p[0]} ${p[1]} L ${p[0] + p[4]} ${p[1] + p[5]}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={2}
                  />
                ))}
                <g transform={`translate(${b.x}, ${b.y - 8})`}>
                  <rect x={0} y={-11} width={b.label.length * 6.4 + 34} height={14} rx={2} fill={colors.bg} opacity={0.85} />
                  <text x={4} y={0} fontSize="9.5" fill={color} fontWeight={600}>
                    {b.label} {b.conf.toFixed(2)}
                  </text>
                </g>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 text-xs text-text-muted">
        Computer vision over satellite tiles, inventorying grid assets in place.
      </figcaption>
    </figure>
  );
}
