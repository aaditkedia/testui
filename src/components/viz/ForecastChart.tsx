"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { scaleLinear, line, area, curveMonotoneX } from "d3";
import { viewport } from "@/lib/motion";
import { useThemeColors } from "@/lib/theme";

/** Deterministic pseudo-random so SSR and client render identically. */
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Pt = { x: number; actual: number; predicted: number; lo: number; hi: number };

const W = 620;
const H = 320;
const M = { top: 24, right: 20, bottom: 28, left: 36 };
const SPLIT = 30; // hour where "now" sits: actual before, forecast after

function buildData(): Pt[] {
  const rng = makeRng(7);
  const pts: Pt[] = [];
  let base = 540;
  for (let h = 0; h <= 47; h++) {
    // daily double-peak load shape
    const shape =
      120 * Math.sin((h / 24) * Math.PI * 2 - 1.2) +
      70 * Math.sin((h / 24) * Math.PI * 4 - 0.4);
    base += (rng() - 0.5) * 26;
    const actual = 620 + shape + base * 0.04;
    const driftError = (h - SPLIT) * 2.2;
    const predicted = actual + (rng() - 0.5) * 18 + (h > SPLIT ? driftError * 0.4 : 0);
    const spread = h <= SPLIT ? 0 : 14 + (h - SPLIT) * 5.5;
    pts.push({
      x: h,
      actual,
      predicted,
      lo: predicted - spread,
      hi: predicted + spread,
    });
  }
  return pts;
}

export default function ForecastChart() {
  const colors = useThemeColors();
  const data = useMemo(buildData, []);

  const { x, y, actualPath, predPath, bandPath, nowX } = useMemo(() => {
    const x = scaleLinear().domain([0, 47]).range([M.left, W - M.right]);
    const yMin = Math.min(...data.map((d) => d.lo)) - 20;
    const yMax = Math.max(...data.map((d) => d.hi)) + 20;
    const y = scaleLinear().domain([yMin, yMax]).range([H - M.bottom, M.top]);

    const actualPath =
      line<Pt>()
        .x((d) => x(d.x))
        .y((d) => y(d.actual))
        .curve(curveMonotoneX)(data.filter((d) => d.x <= SPLIT)) ?? "";

    const predPath =
      line<Pt>()
        .x((d) => x(d.x))
        .y((d) => y(d.predicted))
        .curve(curveMonotoneX)(data.filter((d) => d.x >= SPLIT)) ?? "";

    const bandPath =
      area<Pt>()
        .x((d) => x(d.x))
        .y0((d) => y(d.lo))
        .y1((d) => y(d.hi))
        .curve(curveMonotoneX)(data.filter((d) => d.x >= SPLIT)) ?? "";

    return { x, y, actualPath, predPath, bandPath, nowX: x(SPLIT) };
  }, [data]);

  const yTicks = y.ticks(4);

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Load forecast with confidence band">
        {/* gridlines */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke={colors.border} />
            <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="10" fill={colors.textMuted}>
              {Math.round(t)}
            </text>
          </g>
        ))}

        {/* forecast confidence band */}
        <motion.path
          d={bandPath}
          fill={colors.accent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          viewport={viewport}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* actual (solid) */}
        <motion.path
          d={actualPath}
          fill="none"
          stroke={colors.text}
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewport}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* predicted (dashed) */}
        <motion.path
          d={predPath}
          fill="none"
          stroke={colors.accent}
          strokeWidth={2}
          strokeDasharray="5 5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewport}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* "now" marker */}
        <motion.line
          x1={nowX}
          x2={nowX}
          y1={M.top}
          y2={H - M.bottom}
          stroke={colors.textMuted}
          strokeDasharray="2 4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={viewport}
          transition={{ delay: 1, duration: 0.5 }}
        />
        <motion.text
          x={nowX + 6}
          y={M.top + 4}
          fontSize="10"
          fill={colors.textMuted}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ delay: 1.1 }}
        >
          now
        </motion.text>
      </svg>

      <figcaption className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-px w-4 bg-text" /> Actual load
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-4 border-t border-dashed" style={{ borderColor: colors.accent }} /> Forecast
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-sm" style={{ background: colors.accent, opacity: 0.2 }} /> Confidence
        </span>
      </figcaption>
    </figure>
  );
}
