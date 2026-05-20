"use client";

import { Fragment, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MAIN_THEMES, type MainVariant } from "./theme";

// WebGL must never run during static prerender.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Pos = "bl" | "c" | "r" | "l";
const SCENES: { copy: string; pos: Pos; hint?: boolean }[] = [
  { copy: "It's the unseen and invisible signals that make us *human*.", pos: "bl", hint: true },
  { copy: "From Artificial Intelligence to *Personal Intelligence*.", pos: "c" },
  { copy: "From isolated models to a *shared consciousness*.", pos: "r" },
  { copy: "The world's first network for *human intent*.", pos: "c" },
  { copy: "It stops mimicking, and starts *mirroring*.", pos: "l" },
  { copy: "Real intelligence isn't trained. It's *felt*.", pos: "c" },
];

const POS_CLS: Record<Pos, string> = {
  bl: "items-end justify-start text-left pb-[14vh]",
  c: "items-center justify-center text-center",
  r: "items-center justify-end text-right",
  l: "items-center justify-start text-left",
};

function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <b key={i} className="font-semibold">
            {p.slice(1, -1)}
          </b>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

export default function MainConcept({ variant }: { variant: MainVariant }) {
  const theme = MAIN_THEMES[variant];
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  return (
    <div ref={ref} className="relative" style={{ color: theme.ink }}>
      {/* atmosphere */}
      <div className="fixed inset-0 z-0" style={{ background: theme.pageBg }} />
      <div className="fixed inset-0 z-0" style={{ background: theme.glow, mixBlendMode: "screen", filter: "blur(20px)" }} />
      <Scene progress={progress} theme={theme} />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <div className="pointer-events-none fixed inset-0 z-[2]" style={{ boxShadow: "inset 0 0 220px 40px rgba(0,0,0,0.35)" }} />

      {/* scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[40] h-[2px] w-full origin-left"
        style={{ scaleX: scrollYProgress, background: theme.core }}
      />

      {/* wordmark */}
      <div className="pointer-events-none fixed bottom-5 right-6 z-[40] font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: theme.inkDim }}>
        Personal Intelligence
      </div>

      {/* scroll narrative */}
      <div className="relative z-10">
        {SCENES.map((s, i) => (
          <section key={i} className={`flex min-h-screen w-full px-[6vw] ${POS_CLS[s.pos]}`}>
            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-[18ch] text-[clamp(2.2rem,5.5vw,4.6rem)] font-light leading-[1.05] tracking-[-0.02em]"
            >
              <Emphasis text={s.copy} />
              {s.hint && (
                <span className="mt-6 block font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: theme.inkDim }}>
                  Scroll to explore
                </span>
              )}
            </motion.h2>
          </section>
        ))}
      </div>
    </div>
  );
}
