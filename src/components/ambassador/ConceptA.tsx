"use client";

import { motion } from "framer-motion";
import { ambassador } from "@/config/ambassador.config";

const ACCENT = "#0EA5E9";
const viewport = { once: true, margin: "-80px" } as const;

const cardCls =
  "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]";

function MeshBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -inset-1/4 animate-[meshmove_24s_ease-in-out_infinite] opacity-70"
        style={{
          background:
            "radial-gradient(40% 40% at 25% 30%, rgba(14,165,233,0.35), transparent 60%), radial-gradient(35% 35% at 75% 25%, rgba(99,102,241,0.28), transparent 60%), radial-gradient(45% 45% at 60% 80%, rgba(14,165,233,0.22), transparent 60%)",
        }}
      />
      {/* fine grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

function GlassOrb() {
  return (
    <div className="relative h-72 w-72 sm:h-80 sm:w-80">
      <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "radial-gradient(circle at 50% 50%, rgba(14,165,233,0.55), transparent 70%)" }} />
      <div
        className="absolute inset-5 rounded-full border border-white/25"
        style={{
          background:
            "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.45), rgba(14,165,233,0.18) 46%, rgba(6,8,12,0.55) 78%)",
          boxShadow: "inset 0 0 70px rgba(14,165,233,0.45), inset -10px -16px 40px rgba(0,0,0,0.5), 0 30px 80px rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div className="absolute left-[30%] top-[22%] h-12 w-16 rounded-full bg-white/40 blur-xl" />
      <svg className="absolute inset-0 animate-[spin_22s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="47" fill="none" stroke={ACCENT} strokeWidth="0.4" strokeDasharray="1.5 5" opacity="0.7" />
      </svg>
      <svg className="absolute inset-0 animate-[spin_32s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <ellipse cx="50" cy="50" rx="49" ry="20" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
      </svg>
    </div>
  );
}

function PerkGlyph({ kind }: { kind: number }) {
  switch (kind) {
    case 0:
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <circle cx="32" cy="32" r="6" fill={ACCENT} />
          {[16, 24].map((r, i) => (
            <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="white" strokeWidth="1" opacity={0.4 - i * 0.12}>
              <animate attributeName="r" values={`${r};${r + 4};${r}`} dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          {[14, 26, 38, 50].map((x, i) => (
            <rect key={x} x={x} y={44 - i * 8} width="6" height={10 + i * 8} fill={i === 3 ? ACCENT : "white"} opacity={i === 3 ? 1 : 0.5} rx="1" />
          ))}
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <circle cx="32" cy="32" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
          <circle cx="32" cy="12" r="3" fill={ACCENT}>
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="6s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          {[[16, 16], [48, 16], [16, 48], [48, 48], [32, 32]].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={i === 4 ? 4 : 2.5} fill={i === 4 ? ACCENT : "white"} opacity={i === 4 ? 1 : 0.5} />
          ))}
          {[[32, 32, 16, 16], [32, 32, 48, 16], [32, 32, 16, 48], [32, 32, 48, 48]].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={ACCENT} strokeWidth="0.8" opacity="0.5" />
          ))}
        </svg>
      );
  }
}

export default function ConceptA() {
  const a = ambassador;
  const hero = a.heroes.a;

  return (
    <div className="relative bg-[#06080C] font-body text-[#F2F5FA]">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <MeshBg />
        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 pt-24 sm:px-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{hero.eyebrow}</p>
            <h1 className="mt-6 text-[clamp(3rem,8vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">{hero.sub}</p>
            <a
              href={a.applyHref}
              className={`mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-[#06080C] transition-transform hover:-translate-y-0.5`}
              style={{ background: `linear-gradient(120deg,#7dd3fc,${ACCENT})`, boxShadow: `0 14px 40px -10px ${ACCENT}` }}
            >
              {hero.cta} &#8594;
            </a>
          </div>
          <div className="relative flex justify-center">
            <GlassOrb />
            {/* floating glass stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`${cardCls} absolute -left-2 top-2 animate-float px-4 py-3`}
            >
              <div className="text-xl font-semibold">{a.stats[0].value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{a.stats[0].label}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={`${cardCls} absolute -right-2 bottom-6 animate-float px-4 py-3`}
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-xl font-semibold">{a.stats[1].value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">{a.stats[1].label}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview: glass cards */}
      <section className="relative mx-auto max-w-[1200px] px-6 py-28 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>The network</p>
        <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-light leading-tight tracking-tight">
          A live interface into the people building AI.
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${cardCls} p-6`}
            >
              <div className="text-4xl font-semibold" style={{ color: i === 0 ? ACCENT : undefined }}>{s.value}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/50">{s.label}</div>
              <p className="mt-3 text-sm text-white/55">{s.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {a.values.map((v) => (
            <div key={v.n} className={`${cardCls} flex gap-4 p-5`}>
              <span className="font-mono text-sm" style={{ color: ACCENT }}>{v.n}</span>
              <div>
                <h3 className="font-medium">{v.title}</h3>
                <p className="mt-1 text-sm text-white/55">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Become an ambassador */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-10">
        <MeshBg />
        <div className={`${cardCls} relative mx-auto max-w-4xl overflow-hidden p-10 text-center sm:p-16`}>
          <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>The role</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.02] tracking-tight">
            Lead the network in your region.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-white/60">
            Run the network in your city: host the rooms, open the doors, and connect your community to the people shaping AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-xs text-white/70">
            {a.commitment.map((c) => (
              <span key={c} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5">{c}</span>
            ))}
          </div>
          <a
            href={a.applyHref}
            className="mt-9 inline-block rounded-full px-7 py-3 text-sm font-medium text-[#06080C]"
            style={{ background: `linear-gradient(120deg,#7dd3fc,${ACCENT})`, boxShadow: `0 14px 40px -10px ${ACCENT}` }}
          >
            Request access
          </a>
        </div>
      </section>

      {/* Perks */}
      <section className="relative mx-auto max-w-[1200px] px-6 py-24 sm:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>What you get</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {a.perks.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`${cardCls} group p-7 transition-all hover:-translate-y-1 hover:border-white/25`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <PerkGlyph kind={i} />
              </div>
              <h3 className="mt-5 text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-sm text-white/55">{p.blurb}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="relative overflow-hidden px-6 py-28 sm:px-10">
        <MeshBg />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="mx-auto max-w-2xl text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-tight">{a.closing}</h2>
          <div className="mt-12 grid gap-3 sm:grid-cols-4">
            {a.timeline.map((t) => (
              <div key={t.n} className={`${cardCls} p-5 text-left`}>
                <div className="font-mono text-xs" style={{ color: ACCENT }}>{t.n}</div>
                <div className="mt-1 font-medium">{t.step}</div>
                <p className="mt-1 text-xs text-white/50">{t.note}</p>
              </div>
            ))}
          </div>
          <a
            href={a.applyHref}
            className="mt-12 inline-block rounded-full px-8 py-3.5 text-sm font-medium text-[#06080C]"
            style={{ background: `linear-gradient(120deg,#7dd3fc,${ACCENT})`, boxShadow: `0 14px 40px -10px ${ACCENT}` }}
          >
            Request access
          </a>
          <p className="mt-16 font-mono text-[11px] uppercase tracking-widest text-white/35">City Partner Program</p>
        </div>
      </section>
    </div>
  );
}
