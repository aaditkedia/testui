"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { hierarchy, tree, linkHorizontal, HierarchyPointNode } from "d3";
import { viewport } from "@/lib/motion";
import { useThemeColors } from "@/lib/theme";

type Outcome = "safe" | "risk" | "failure";
type Datum = { name: string; outcome?: Outcome; children?: Datum[] };

const W = 620;
const H = 360;
const M = { top: 20, right: 90, bottom: 20, left: 60 };

const data: Datum = {
  name: "now",
  children: [
    {
      name: "shed load",
      children: [
        { name: "feeder 12", children: [{ name: "", outcome: "safe" }, { name: "", outcome: "safe" }] },
        { name: "feeder 7", children: [{ name: "", outcome: "safe" }, { name: "", outcome: "risk" }] },
      ],
    },
    {
      name: "hold",
      children: [
        { name: "peak hits", children: [{ name: "", outcome: "risk" }, { name: "", outcome: "failure" }] },
        { name: "peak eases", children: [{ name: "", outcome: "safe" }, { name: "", outcome: "risk" }] },
      ],
    },
    {
      name: "reroute",
      children: [
        { name: "via T-21", children: [{ name: "", outcome: "safe" }, { name: "", outcome: "risk" }] },
        { name: "via T-09", children: [{ name: "", outcome: "risk" }, { name: "", outcome: "failure" }] },
      ],
    },
  ],
};

export default function RLTree() {
  const colors = useThemeColors();
  const OUTCOME_COLOR: Record<Outcome, string> = {
    safe: colors.accent,
    risk: colors.advisory,
    failure: colors.critical,
  };
  const { nodes, links, maxDepth } = useMemo(() => {
    const root = hierarchy<Datum>(data);
    const layout = tree<Datum>().size([H - M.top - M.bottom, W - M.left - M.right]);
    layout(root);
    const nodes = root.descendants() as HierarchyPointNode<Datum>[];
    const links = root.links() as { source: HierarchyPointNode<Datum>; target: HierarchyPointNode<Datum> }[];
    const maxDepth = Math.max(...nodes.map((n) => n.depth));
    return { nodes, links, maxDepth };
  }, []);

  const linkGen = linkHorizontal<unknown, HierarchyPointNode<Datum>>()
    .x((d) => d.y + M.left)
    .y((d) => d.x + M.top);

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Reinforcement-learning rollout tree">
        {links.map((l, i) => {
          const isFinal = l.target.depth === maxDepth;
          const color = isFinal && l.target.data.outcome ? OUTCOME_COLOR[l.target.data.outcome] : colors.text;
          return (
            <motion.path
              key={i}
              d={linkGen({ source: l.source, target: l.target }) ?? ""}
              fill="none"
              stroke={color}
              strokeOpacity={isFinal ? 0.6 : 0.22}
              strokeWidth={1.4}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: l.source.depth * 0.35, ease: "easeOut" }}
            />
          );
        })}

        {nodes.map((n, i) => {
          const outcome = n.data.outcome;
          const color = outcome ? OUTCOME_COLOR[outcome] : colors.text;
          const r = n.depth === 0 ? 5 : outcome ? 4 : 3;
          return (
            <motion.g
              key={i}
              transform={`translate(${n.y + M.left},${n.x + M.top})`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ delay: n.depth * 0.35 + 0.2, duration: 0.3 }}
            >
              <circle r={r} fill={color} fillOpacity={outcome ? 1 : n.depth === 0 ? 1 : 0.5} />
              {n.data.name && n.depth > 0 && n.depth < maxDepth && (
                <text x={8} y={3} fontSize="9.5" fill={colors.textMuted}>
                  {n.data.name}
                </text>
              )}
              {n.depth === 0 && (
                <text x={-10} y={3} textAnchor="end" fontSize="10" fill={colors.text} fontWeight={600}>
                  now
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      <figcaption className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.accent }} /> Safe
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.advisory }} /> At risk
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.critical }} /> Failure
        </span>
      </figcaption>
    </figure>
  );
}
