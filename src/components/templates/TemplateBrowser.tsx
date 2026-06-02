"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { templateEntries, type TemplateEntry } from "@/config/template-gallery";
import PravahTemplate from "./PravahTemplate";
import RestaurantTemplate from "./RestaurantTemplate";
import ConceptA from "@/components/ambassador/ConceptA";
import ConceptB from "@/components/ambassador/ConceptB";
import ConceptC from "@/components/ambassador/ConceptC";
import CornSite from "@/components/ambassador/cornsite/CornSite";
import MainConcept from "@/components/ambassador/main/MainConcept";
import HeliosSite from "@/components/ambassador/heliossite/HeliosSite";
import NgpesSite from "@/components/ambassador/ngpessite/NgpesSite";
import BercoSite from "@/components/ambassador/bercosite/BercoSite";
import CinematicSite from "@/components/ambassador/boilernet/cinematic/CinematicSite";
import GlobeTrainSite from "@/components/ambassador/boilernet/globe/GlobeTrainSite";
import DroneSite from "@/components/ambassador/boilernet/drone/DroneSite";

function ActiveTemplate({ template }: { template: TemplateEntry }) {
  switch (template.kind) {
    case "pravah":
      return <PravahTemplate />;
    case "glass":
      return <ConceptA />;
    case "cinematic":
      return <ConceptB />;
    case "editorial":
      return <ConceptC />;
    case "corn":
      return <CornSite />;
    case "dark-3d":
      return <MainConcept variant="dark" />;
    case "helios":
      return <HeliosSite />;
    case "ngpes":
      return <NgpesSite />;
    case "berco":
      return <BercoSite />;
    case "boiler-cinematic":
      return <CinematicSite />;
    case "boiler-globe":
      return <GlobeTrainSite />;
    case "boiler-drone":
      return <DroneSite />;
    case "restaurant":
      return <RestaurantTemplate data={template.data} />;
  }
}

// Grouped by category for the sidebar. Order here drives sidebar order.
const groupOrder = [
  "Restaurant / Hospitality",
  "Community / Program",
  "Fintech / SaaS",
  "Agency / Holding",
  "Experimental / 3D",
  "AI / Infrastructure",
];

function categoryGroup(entry: TemplateEntry): string {
  if (entry.kind === "restaurant") return "Restaurant / Hospitality";
  if (entry.kind === "glass" || entry.kind === "cinematic" || entry.kind === "editorial")
    return "Community / Program";
  if (entry.kind === "ngpes") return "Fintech / SaaS";
  if (entry.kind === "berco") return "Agency / Holding";
  if (
    entry.kind === "corn" ||
    entry.kind === "dark-3d" ||
    entry.kind === "helios" ||
    entry.kind === "boiler-cinematic" ||
    entry.kind === "boiler-globe" ||
    entry.kind === "boiler-drone"
  )
    return "Experimental / 3D";
  return "AI / Infrastructure";
}

export default function TemplateBrowser() {
  const [activeId, setActiveId] = useState<string>(templateEntries[0]?.id ?? "");
  const [query, setQuery] = useState("");

  const active = useMemo(
    () => templateEntries.find((t) => t.id === activeId) ?? templateEntries[0],
    [activeId]
  );

  // Filter + group templates for the sidebar.
  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? templateEntries.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.label.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.summary.toLowerCase().includes(q)
        )
      : templateEntries;
    const map = new Map<string, TemplateEntry[]>();
    for (const t of filtered) {
      const key = categoryGroup(t);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return groupOrder
      .map((g) => ({ group: g, entries: map.get(g) ?? [] }))
      .filter((g) => g.entries.length > 0);
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-[70] hidden w-72 border-r border-white/10 bg-[#0b0d12] lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-5 pb-4 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            Template Lab
          </p>
          <h1 className="mt-1 text-lg font-semibold leading-tight text-white">
            Landing-page gallery
          </h1>
          <p className="mt-2 text-xs leading-5 text-white/60">
            Pitch-ready designs. Click any layout to preview it full-bleed.
          </p>
          <div className="relative mt-4">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter templates…"
              className="h-9 w-full rounded-md border border-white/15 bg-white/[0.04] px-3 pl-8 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/35"
            />
            <svg
              className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {grouped.length === 0 ? (
            <p className="px-2 py-6 text-center text-xs text-white/45">No matches.</p>
          ) : (
            grouped.map(({ group, entries }) => (
              <div key={group} className="mb-4">
                <p className="px-2 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  {group}
                </p>
                <div className="space-y-1">
                  {entries.map((t) => {
                    const selected = active.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveId(t.id)}
                        className={`group flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                          selected
                            ? "bg-white text-[#0b0d12]"
                            : "text-white/80 hover:bg-white/[0.07] hover:text-white"
                        }`}
                      >
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate font-medium">{t.label}</span>
                          <span
                            className={`truncate text-[11px] ${
                              selected ? "text-black/55" : "text-white/45"
                            }`}
                          >
                            {t.category}
                          </span>
                        </span>
                        {selected ? (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-black/55">
                            Live
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white/45">
          {templateEntries.length} templates · static gallery
        </div>
      </aside>

      {/* Mobile picker */}
      <div className="sticky top-0 z-[70] border-b border-white/10 bg-[#0b0d12] p-3 lg:hidden">
        <label htmlFor="template-picker" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
          Template
        </label>
        <select
          id="template-picker"
          value={active.id}
          onChange={(event) => setActiveId(event.target.value)}
          className="mt-2 h-11 w-full rounded-md border border-white/15 bg-white text-[#0b0d12] px-3 text-sm font-semibold"
        >
          {grouped.map(({ group, entries }) => (
            <optgroup key={group} label={group}>
              {entries.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <main className="lg:pl-72">
        {/* Template-aware header strip */}
        <div className="border-b border-white/10 bg-[#0b0d12] px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 md:flex-row md:items-end md:justify-between md:gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                {active.category}
              </p>
              <h2 className="mt-1 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {active.name}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/70">{active.summary}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <ActiveTemplate template={active} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
