"use client";

import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3";
import { feature } from "topojson-client";
import type { Feature, Geometry } from "geojson";
import { tokens } from "@/config/theme.tokens";
import type { Marker } from "@/config/content.config";

const W = 900;
const H = 460;
const TOPO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ markers }: { markers: Marker[] }) {
  const [geos, setGeos] = useState<Feature<Geometry>[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(TOPO_URL)
      .then((r) => r.json())
      .then((topo) => {
        if (!alive) return;
        const fc = feature(topo, topo.objects.countries) as unknown as {
          features: Feature<Geometry>[];
        };
        setGeos(fc.features);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const projection = useMemo(
    () => geoNaturalEarth1().scale(170).translate([W / 2, H / 2 + 10]),
    []
  );
  const path = useMemo(() => geoPath(projection), [projection]);

  const projected = markers.map((m) => {
    const p = projection(m.coordinates);
    return { ...m, px: p?.[0] ?? 0, py: p?.[1] ?? 0 };
  });

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="World deployment map">
        {geos?.map((g, i) => (
          <path
            key={i}
            d={path(g) ?? ""}
            fill={tokens.color.bgElevated}
            stroke={tokens.color.border}
            strokeWidth={0.5}
          />
        ))}

        {(geos || failed) &&
          projected.map((m, i) => {
            const color = m.status === "live" ? tokens.color.accent : tokens.color.advisory;
            return (
              <g key={i} transform={`translate(${m.px},${m.py})`}>
                <circle r={4} fill="none" stroke={color} strokeWidth={1}>
                  <animate attributeName="r" values="4;18;4" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle r={3.5} fill={color} />
                <text x={8} y={4} fontSize="11" fill={tokens.color.text} fontWeight={500}>
                  {m.name}
                </text>
              </g>
            );
          })}
      </svg>

      {!geos && !failed && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-text-muted">
          loading map...
        </div>
      )}
    </div>
  );
}
