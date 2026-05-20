"use client";

import { motion } from "framer-motion";
import { ambassador } from "@/config/ambassador.config";
import CountUp from "./CountUp";

const ACCENT = "#0EA5E9";
const viewport = { once: true, margin: "-60px" } as const;

/* ------------------------------- perk SVGs ------------------------------- */

function PerkSVG({ kind }: { kind: number }) {
  const stroke = "#0A0A0B";
  switch (kind) {
    case 0: // concentric circles pulsing outward
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {[28, 52, 76].map((r, i) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke={i === 0 ? ACCENT : stroke} strokeWidth="1.5" opacity={0.9 - i * 0.25}>
              <animate attributeName="r" values={`${r};${r + 14};${r}`} dur="4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.2;0.9" dur="4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <circle cx="100" cy="100" r="5" fill={ACCENT} />
        </svg>
      );
    case 1: // line drawing into a podium/triangle
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <motion.path
            d="M40 150 L100 50 L160 150"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewport}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <motion.line x1="40" y1="150" x2="160" y2="150" stroke={ACCENT} strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={viewport} transition={{ duration: 0.8, delay: 1 }} />
        </svg>
      );
    case 2: // two arcs forming a globe outline
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="62" fill="none" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="100" cy="100" rx="26" ry="62" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
          <line x1="38" y1="100" x2="162" y2="100" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
          <circle cx="100" cy="100" r="62" fill="none" stroke={ACCENT} strokeWidth="2" strokeDasharray="6 10">
            <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="18s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    default: // dot grid; node lights up and propagates
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full">
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => {
              const cx = 30 + c * 35;
              const cy = 30 + r * 35;
              const lit = r === 2 && c === 2;
              return (
                <circle key={`${r}-${c}`} cx={cx} cy={cy} r={lit ? 4 : 2.5} fill={lit ? ACCENT : stroke} opacity={lit ? 1 : 0.35}>
                  {lit && <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />}
                </circle>
              );
            })
          )}
          {[[100, 100, 135, 65], [100, 100, 65, 135], [100, 100, 135, 135], [100, 100, 65, 65]].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={ACCENT} strokeWidth="1">
              <animate attributeName="opacity" values="0;0.7;0" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </line>
          ))}
        </svg>
      );
  }
}

/* ------------------------------- concept -------------------------------- */

export default function ConceptC() {
  const a = ambassador;
  const hero = a.heroes.c;
  const title = hero.title.replace(/\.$/, "");

  return (
    <div className="bg-[#FAFAF7] font-body text-[#0A0A0B]">
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E68]">{hero.eyebrow}</p>
        <div className="mt-8 h-[3px] w-24" style={{ background: ACCENT }} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <h1 className="text-[clamp(3.5rem,13vw,11rem)] font-bold leading-[0.86] tracking-[-0.04em]">
            {title.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={i === title.length - 1 ? { color: ACCENT } : undefined}
              >
                {ch}
              </motion.span>
            ))}
            <span style={{ color: ACCENT }}>.</span>
          </h1>
          <div>
            <p className="max-w-sm text-lg leading-relaxed text-[#3a3a36]">{hero.sub}</p>
            <a href={a.applyHref} className="mt-6 inline-block border-b-2 pb-0.5 text-base font-medium" style={{ borderColor: ACCENT }}>
              {hero.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Overview — numbered manifest */}
      <section className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E68]">02 — By the numbers</p>
        <div className="mt-6 border-t border-[#0A0A0B]/12">
          {a.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid items-center gap-4 border-b border-[#0A0A0B]/12 py-7 sm:grid-cols-[120px_1fr_1fr]"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-[#6E6E68]">
                {String(i + 1).padStart(2, "0")} — {s.label}
              </div>
              <CountUp value={s.value} className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-tight" />
              <p className="text-sm text-[#6E6E68] sm:text-right sm:text-base">{s.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* values */}
        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {a.values.map((v) => (
            <div key={v.n} className="flex gap-4">
              <span className="font-mono text-sm text-[#6E6E68]">{v.n}</span>
              <div>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-[#6E6E68]">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become an ambassador — color block */}
      <section className="mt-28 flex min-h-screen flex-col justify-center px-6 py-24 text-white sm:px-10" style={{ background: ACCENT }}>
        <div className="mx-auto w-full max-w-[1200px]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">03 — The role</p>
          <h2 className="mt-6 text-[clamp(4rem,18vw,16rem)] font-bold leading-[0.82] tracking-[-0.04em]">Lead.</h2>
          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-white/90">
            Ambassadors run AI Valley in their city. You set the tone, host the room, and decide who gets in. We hand you the
            playbook, the budget, and the network. You bring the ambition.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-white/90">
            {a.commitment.map((c, i) => (
              <span key={c}>
                {String(i + 1).padStart(2, "0")} — {c}
              </span>
            ))}
          </div>
          <a href={a.applyHref} className="mt-10 inline-block bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#0A0A0B] transition-transform hover:-translate-y-0.5">
            Apply now
          </a>
        </div>
      </section>

      {/* Perks — type-only compositions */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6E6E68]">04 — What you get</p>
        <div className="mt-10 divide-y divide-[#0A0A0B]/12">
          {a.perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6 }}
              className="grid items-center gap-8 py-14 md:grid-cols-[1fr_220px]"
            >
              <div>
                <span className="font-mono text-sm text-[#6E6E68]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-[clamp(2rem,5vw,3.4rem)] italic leading-[1.05]">{p.title}</h3>
                <p className="mt-4 max-w-md text-base text-[#6E6E68]">{p.blurb}</p>
              </div>
              <div className="mx-auto h-44 w-44">
                <PerkSVG kind={i} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="border-t border-[#0A0A0B]/12 px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-[1200px]">
          <p className="max-w-[20ch] font-serif text-[clamp(2.2rem,6vw,4.5rem)] italic leading-[1.05]">{a.closing}</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-4">
            {a.timeline.map((t) => (
              <div key={t.n} className="border-t-2 pt-3" style={{ borderColor: ACCENT }}>
                <div className="font-mono text-xs text-[#6E6E68]">{t.n}</div>
                <div className="mt-1 text-lg font-semibold">{t.step}</div>
                <p className="mt-1 text-sm text-[#6E6E68]">{t.note}</p>
              </div>
            ))}
          </div>
          <a href={a.applyHref} className="mt-12 inline-block px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5" style={{ background: ACCENT }}>
            Apply to lead
          </a>
        </div>
      </section>
    </div>
  );
}
