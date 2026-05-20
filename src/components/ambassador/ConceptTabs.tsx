"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ConceptA from "./ConceptA";
import ConceptB from "./ConceptB";
import ConceptC from "./ConceptC";
import ConceptD from "./ConceptD";
import ConceptE from "./ConceptE";
import ConceptF from "./ConceptF";

type Id = "a" | "b" | "c" | "d" | "e" | "f";

const tabs: { id: Id; label: string; Comp: () => ReactElement }[] = [
  { id: "a", label: "Glass", Comp: ConceptA },
  { id: "b", label: "Cinematic", Comp: ConceptB },
  { id: "c", label: "Editorial", Comp: ConceptC },
  { id: "d", label: "Corn", Comp: ConceptD },
  { id: "e", label: "Dark 3D", Comp: ConceptE },
  { id: "f", label: "Helios", Comp: ConceptF },
];

export default function ConceptTabs() {
  const [active, setActive] = useState<Id>("a");
  const Active = tabs.find((t) => t.id === active)!.Comp;

  const change = (id: Id) => {
    setActive(id);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <>
      {/* design switcher */}
      <div className="fixed left-1/2 top-4 z-[60] -translate-x-1/2">
        <div
          role="tablist"
          aria-label="Ambassador design concepts"
          className="flex items-center gap-1 rounded-full border border-white/15 bg-black/55 p-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl"
        >
          {tabs.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                onClick={() => change(t.id)}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors sm:px-4 ${
                  on ? "text-[#06080C]" : "text-white/55 hover:text-white/85"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="concept-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#0EA5E9" }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span className="font-semibold uppercase">{t.id}</span>
                  <span className="hidden text-xs opacity-80 sm:inline">{t.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* back to main site */}
      <Link
        href="/"
        className="fixed left-4 top-5 z-[60] hidden font-mono text-[11px] uppercase tracking-widest text-white/50 mix-blend-difference transition-colors hover:text-white md:block"
      >
        &#8592; AI Valley
      </Link>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Active />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
