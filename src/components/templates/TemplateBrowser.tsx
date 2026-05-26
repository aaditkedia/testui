"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { templateEntries, type TemplateEntry } from "@/config/template-gallery";
import PravahTemplate from "./PravahTemplate";
import RestaurantTemplate from "./RestaurantTemplate";
import NgpesSite from "@/components/ambassador/ngpessite/NgpesSite";
import BercoSite from "@/components/ambassador/bercosite/BercoSite";

function SourceLine({ template }: { template: TemplateEntry }) {
  const parts = [template.spec, template.buildPlan].filter(Boolean);
  return <span>{parts.join(" + ")}</span>;
}

function ActiveTemplate({ template }: { template: TemplateEntry }) {
  if (template.kind === "pravah") return <PravahTemplate />;
  if (template.kind === "ngpes") return <NgpesSite />;
  if (template.kind === "berco") return <BercoSite />;
  if (template.kind === "restaurant") return <RestaurantTemplate data={template.data} />;
  return null;
}

export default function TemplateBrowser() {
  const [activeId, setActiveId] = useState(templateEntries[3]?.id ?? templateEntries[0].id);
  const active = useMemo(
    () => templateEntries.find((template) => template.id === activeId) ?? templateEntries[0],
    [activeId]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      <aside className="fixed inset-y-0 left-0 z-[70] hidden w-80 border-r border-white/10 bg-[#0f1115]/95 p-5 backdrop-blur-xl lg:block">
        <div className="flex h-full flex-col">
          <div>
            <p className="text-xs font-semibold uppercase text-white/45">Template lab</p>
            <h1 className="mt-2 text-2xl font-semibold leading-tight">Landing pages and website templates</h1>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Switch between reusable builds, visual directions, and spec-backed page systems.
            </p>
          </div>

          <div className="mt-7 flex-1 space-y-2 overflow-y-auto pr-1">
            {templateEntries.map((template) => {
              const selected = active.id === template.id;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setActiveId(template.id)}
                  className={`w-full rounded-lg border p-4 text-left transition-colors ${
                    selected
                      ? "border-white/22 bg-white text-[#0f1115]"
                      : "border-white/10 bg-white/[0.03] text-white hover:border-white/22 hover:bg-white/[0.07]"
                  }`}
                >
                  <span className={`text-[11px] font-bold uppercase ${selected ? "text-black/50" : "text-white/35"}`}>
                    {template.status}
                  </span>
                  <span className="mt-2 block text-base font-semibold">{template.label}</span>
                  <span className={`mt-1 block text-xs ${selected ? "text-black/55" : "text-white/45"}`}>{template.category}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase text-white/45">Active source</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              <SourceLine template={active} />
            </p>
          </div>
        </div>
      </aside>

      <div className="sticky top-0 z-[70] border-b border-white/10 bg-[#0f1115]/96 p-3 backdrop-blur lg:hidden">
        <label htmlFor="template-picker" className="text-xs font-semibold uppercase text-white/45">
          Template
        </label>
        <select
          id="template-picker"
          value={active.id}
          onChange={(event) => setActiveId(event.target.value)}
          className="mt-2 h-11 w-full rounded-lg border border-white/15 bg-white text-[#0f1115] px-3 text-sm font-semibold"
        >
          {templateEntries.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <main className="lg:pl-80">
        <div className="border-b border-white/10 bg-[#0f1115] px-5 py-5 sm:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-white/45">{active.category}</p>
              <h2 className="mt-1 text-3xl font-semibold leading-tight sm:text-4xl">{active.name}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-white/55">{active.summary}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <ActiveTemplate template={active} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
