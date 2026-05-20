"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Scene = dynamic(() => import("./HeliosScene"), { ssr: false });

const TEAL = "#00e5cc";

type Sec = { title?: boolean; copy: string; sub?: string; pos: "center" | "left"; hint?: string };
const SECS: Sec[] = [
  { title: true, copy: "HELIOS", sub: "An intelligence that grows.", pos: "center", hint: "Scroll to explore" },
  { copy: "Every point of light is a signal.", pos: "center" },
  { copy: "Move your cursor. It responds.", pos: "center" },
  { copy: "Two roads in the same path.", sub: "One model, many forms. The system finds the shape the data wants to take.", pos: "left" },
  { copy: "Three visions. One sprint. One stack.", sub: "Live across fourteen markets, from one core.", pos: "left" },
  { copy: "HELIOS", title: true, pos: "center", sub: "The network, alive." },
];

export default function HeliosSite() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (progress.current = v));

  return (
    <div ref={ref} className="relative bg-black text-white">
      <Scene progress={progress} />

      {/* intro loading ring: expands + fades on mount */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0.9 }}
        animate={{ scale: 42, opacity: 0 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        className="pointer-events-none fixed left-1/2 top-1/2 z-[50] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{ borderColor: TEAL, boxShadow: `0 0 40px ${TEAL}` }}
      />

      {/* live ring indicator */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed bottom-6 left-1/2 z-[40] h-3 w-3 -translate-x-1/2 rounded-full border"
        style={{ borderColor: TEAL, boxShadow: `0 0 12px ${TEAL}` }}
      />

      <motion.div className="fixed left-0 top-0 z-[40] h-[2px] w-full origin-left" style={{ scaleX: scrollYProgress, background: TEAL }} />
      <div className="pointer-events-none fixed bottom-5 right-6 z-[40] font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: TEAL }}>
        Helios
      </div>

      <div className="relative z-10">
        {SECS.map((s, i) => (
          <section key={i} className={`flex min-h-screen w-full px-[7vw] ${s.pos === "center" ? "items-center justify-center text-center" : "items-center justify-start text-left"}`}>
            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl"
            >
              {s.title ? (
                <h2 className="font-light leading-none" style={{ fontFamily: "var(--font-serif-thin), serif", fontSize: "clamp(4rem,13vw,10rem)", letterSpacing: "0.18em" }}>
                  {s.copy}
                </h2>
              ) : (
                <h2 className="font-light leading-[1.1]" style={{ fontSize: "clamp(1.6rem,3.4vw,2.8rem)" }}>
                  {s.copy}
                </h2>
              )}
              {s.sub && <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base">{s.sub}</p>}
              {s.hint && <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: TEAL }}>{s.hint}</p>}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}
