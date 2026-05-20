"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Scene = dynamic(() => import("./CornScene"), { ssr: false });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

type Bg = "hero" | "testing" | "harvest" | null;
const ACTS: { copy: string; body?: string; pos: "center" | "left"; bg: Bg }[] = [
  { copy: "Corn. Revolutionized.", pos: "center", bg: "hero" },
  { copy: "First, a solid foundation.", body: "It starts in the genome. We map the traits that matter and breed for them with intent.", pos: "left", bg: null },
  { copy: "Computers cut down the contenders.", body: "Millions of candidates, narrowed to the few that perform.", pos: "left", bg: null },
  { copy: "Tested across thousands of plots.", body: "Every hybrid is proven in the field before it reaches yours.", pos: "left", bg: null },
  { copy: "Testing, testing, and more testing.", pos: "center", bg: "testing" },
  { copy: "Corn, finally perfected.", pos: "center", bg: "harvest" },
];

const BG_STYLE: Record<Exclude<Bg, null>, string> = {
  hero: "linear-gradient(160deg,#070707 0%,#0d1a0d 50%,#1a4d1a 100%)",
  testing: "linear-gradient(160deg,#160c00 0%,#3a2300 55%,#b9851f 100%)",
  harvest: "linear-gradient(180deg,#1a1000 0%,#7a5a12 60%,#daa520 100%)",
};

export default function CornSite() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => (progress.current = v));

  return (
    <div ref={ref} className="relative bg-[#070809] text-white">
      <Scene progress={progress} />
      <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.07] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      <motion.div className="fixed left-0 top-0 z-[40] h-[2px] w-full origin-left bg-[#ff8c00]" style={{ scaleX: scrollYProgress }} />
      <div className="pointer-events-none fixed bottom-5 right-6 z-[40] font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
        Pioneer Seeds
      </div>

      <div className="relative z-10">
        {ACTS.map((a, i) => (
          <section key={i} className={`relative flex min-h-screen w-full px-[7vw] ${a.pos === "center" ? "items-center justify-center text-center" : "items-center justify-start text-left"}`}>
            {a.bg && (
              <>
                <div className="absolute inset-0 -z-10" style={{ background: BG_STYLE[a.bg] }} />
                <div className="absolute inset-0 -z-10" style={{ boxShadow: "inset 0 0 200px 50px rgba(0,0,0,0.65)" }} />
              </>
            )}
            <motion.div
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-3xl"
            >
              <h2
                className="uppercase leading-[0.92] tracking-[0.01em]"
                style={{ fontFamily: "var(--font-condensed), sans-serif", fontSize: "clamp(2.8rem,8vw,7rem)" }}
              >
                {a.copy}
              </h2>
              {a.body && <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">{a.body}</p>}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}
