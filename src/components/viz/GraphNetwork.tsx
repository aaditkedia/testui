"use client";

import { useEffect, useMemo, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3";
import { useThemeColors } from "@/lib/theme";

type Status = "normal" | "advisory" | "critical";
type Node = SimulationNodeDatum & { id: number; status: Status; x: number; y: number };
type Link = SimulationLinkDatum<Node> & { stressed: boolean };

const W = 620;
const H = 360;

function makeRng(seed: number) {
  let s = seed;
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

function buildGraph() {
  const rng = makeRng(42);
  const N = 42;
  const nodes: Node[] = Array.from({ length: N }, (_, id) => {
    const r = rng();
    const status: Status = r > 0.9 ? "critical" : r > 0.74 ? "advisory" : "normal";
    return { id, status, x: W / 2 + (rng() - 0.5) * 200, y: H / 2 + (rng() - 0.5) * 160 };
  });

  const links: Link[] = [];
  const seen = new Set<string>();
  for (let i = 1; i < N; i++) {
    // attach each node to an earlier one (spanning tree) + occasional extra edge
    const j = Math.floor(rng() * i);
    const a = Math.min(i, j);
    const b = Math.max(i, j);
    const key = `${a}-${b}`;
    if (!seen.has(key)) {
      seen.add(key);
      const stressed = nodes[i].status !== "normal" || nodes[j].status !== "normal";
      links.push({ source: a, target: b, stressed });
    }
    if (rng() > 0.7) {
      const k = Math.floor(rng() * N);
      const a2 = Math.min(i, k);
      const b2 = Math.max(i, k);
      if (a2 !== b2 && !seen.has(`${a2}-${b2}`)) {
        seen.add(`${a2}-${b2}`);
        const stressed = nodes[a2].status !== "normal" || nodes[b2].status !== "normal";
        links.push({ source: a2, target: b2, stressed });
      }
    }
  }
  return { nodes, links };
}

export default function GraphNetwork() {
  const colors = useThemeColors();
  const STATUS_COLOR: Record<Status, string> = {
    normal: colors.accent,
    advisory: colors.advisory,
    critical: colors.critical,
  };
  const base = useMemo(buildGraph, []);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  // Run the force layout once on the client, then freeze positions.
  useEffect(() => {
    const ns = base.nodes.map((n) => ({ ...n }));
    const ls = base.links.map((l) => ({ ...l }));
    const sim = forceSimulation<Node>(ns)
      .force("charge", forceManyBody().strength(-160))
      .force(
        "link",
        forceLink<Node, Link>(ls)
          .id((d) => d.id)
          .distance(58)
          .strength(0.6)
      )
      .force("center", forceCenter(W / 2, H / 2))
      .force("collide", forceCollide<Node>(16))
      .stop();

    for (let i = 0; i < 320; i++) sim.tick();

    // clamp inside the viewBox
    ns.forEach((n) => {
      n.x = Math.max(20, Math.min(W - 20, n.x));
      n.y = Math.max(20, Math.min(H - 20, n.y));
    });
    setNodes(ns);
    setLinks(ls);
  }, [base]);

  const neighbors = useMemo(() => {
    if (hover === null) return null;
    const set = new Set<number>([hover]);
    links.forEach((l) => {
      const s = (l.source as Node).id ?? (l.source as number);
      const t = (l.target as Node).id ?? (l.target as number);
      if (s === hover) set.add(t);
      if (t === hover) set.add(s);
    });
    return set;
  }, [hover, links]);

  const isActive = (id: number) => neighbors === null || neighbors.has(id);

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Grid network graph">
        {links.map((l, i) => {
          const s = l.source as Node;
          const t = l.target as Node;
          const active =
            neighbors === null || (neighbors.has(s.id) && neighbors.has(t.id));
          return (
            <line
              key={i}
              x1={s.x}
              y1={s.y}
              x2={t.x}
              y2={t.y}
              stroke={l.stressed ? colors.critical : colors.text}
              strokeWidth={l.stressed ? 1.4 : 0.8}
              strokeOpacity={active ? (l.stressed ? 0.5 : 0.18) : 0.05}
              style={{ transition: "stroke-opacity 0.3s" }}
            >
              {l.stressed && (
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;0.12;0.5"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          );
        })}

        {nodes.map((n) => {
          const active = isActive(n.id);
          const r = n.status === "critical" ? 7 : n.status === "advisory" ? 5.5 : 4.5;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "opacity 0.3s", opacity: active ? 1 : 0.2 }}
            >
              {n.status !== "normal" && (
                <circle r={r} fill="none" stroke={STATUS_COLOR[n.status]} strokeWidth={1}>
                  <animate attributeName="r" values={`${r};${r + 6};${r}`} dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle r={r} fill={STATUS_COLOR[n.status]} fillOpacity={n.status === "normal" ? 0.85 : 1} />
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.accent }} /> Normal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.advisory }} /> Advisory
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: colors.critical }} /> Critical
        </span>
        <span className="ml-auto hidden sm:block">hover a node to trace its neighborhood</span>
      </figcaption>
    </figure>
  );
}
