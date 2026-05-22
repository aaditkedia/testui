"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ambassador } from "@/config/ambassador.config";
import { asset } from "@/lib/asset";

const ACCENT = "#0EA5E9";
const viewport = { once: true, margin: "-80px" } as const;

// Film-grain overlay (stands in for the "treated photography" pipeline).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Duotone gradients tinting the AI-generated event photography (and the
// fallback shown until the image files exist). See public/images/concept-b/.
const PHOTOS = [
  "linear-gradient(135deg,#0b2a3a,#0EA5E9 60%,#0b1622)",
  "linear-gradient(160deg,#1a1230,#3a2a5a 55%,#0a0a0b)",
  "linear-gradient(135deg,#10212b,#1f6b86 70%,#06080c)",
  "linear-gradient(200deg,#241a12,#7a5a2a 60%,#0a0a0b)",
];

// AI-generated photography, served from /public. Drop the files described in
// public/images/concept-b/README.md into place and they appear automatically.
const IMG = "/images/concept-b";

function PhotoBlock({
  gradient,
  src,
  alt = "",
  label,
  className = "",
  kenburns = false,
}: {
  gradient: string;
  /** Optional AI-generated photo (path under /public). Falls back to the duotone gradient if absent or it fails to load. */
  src?: string;
  alt?: string;
  label?: string;
  className?: string;
  kenburns?: boolean;
}) {
  const [showImg, setShowImg] = useState(Boolean(src));
  const anim = kenburns ? "animate-[kenburns_18s_ease-in-out_infinite_alternate]" : "";
  // Only add `relative` when the caller hasn't set its own positioning, so an
  // `absolute inset-0` className isn't overridden (which would collapse the box).
  const positioned = /\b(absolute|fixed|relative|sticky)\b/.test(className);

  return (
    <div className={`overflow-hidden ${positioned ? "" : "relative"} ${className}`}>
      {/* duotone base — also the fallback when no photo is present */}
      <div className={`absolute inset-0 ${showImg ? "" : anim}`} style={{ background: gradient }} />

      {src && showImg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(src)}
            alt={alt}
            onError={() => setShowImg(false)}
            className={`absolute inset-0 h-full w-full object-cover ${anim}`}
          />
          {/* light duotone tint keeps real photos on-theme without crushing them */}
          <div className="absolute inset-0 opacity-25 mix-blend-color" style={{ background: gradient }} />
        </>
      )}

      {/* grain */}
      <div className="absolute inset-0 opacity-[0.13] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      {/* vignette — lighter over real photos so detail survives */}
      <div className="absolute inset-0" style={{ boxShadow: showImg ? "inset 0 0 140px 10px rgba(0,0,0,0.4)" : "inset 0 0 160px 30px rgba(0,0,0,0.6)" }} />
      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-white/55">{label}</span>
      )}
    </div>
  );
}

function Medal() {
  return (
    <div className="animate-[spin_14s_linear_infinite] [transform-style:preserve-3d]">
      <svg viewBox="0 0 120 120" className="h-32 w-32 drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <defs>
          <radialGradient id="gold" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#fff4d6" />
            <stop offset="45%" stopColor="#d9a441" />
            <stop offset="100%" stopColor="#7a531a" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="url(#gold)" stroke="#f3d99b" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="40" fill="none" stroke="#7a531a" strokeWidth="1" opacity="0.6" />
        {Array.from({ length: 36 }).map((_, i) => {
          const ang = (i / 36) * Math.PI * 2;
          return <circle key={i} cx={60 + Math.cos(ang) * 47} cy={60 + Math.sin(ang) * 47} r="1" fill="#7a531a" opacity="0.5" />;
        })}
        <text x="60" y="67" textAnchor="middle" fontSize="22" fontWeight="700" fill="#5e3f12" fontFamily="serif">
          AIV
        </text>
      </svg>
    </div>
  );
}

export default function ConceptB() {
  const a = ambassador;
  const hero = a.heroes.b;

  return (
    <div className="bg-[#0A0A0B] font-body text-[#FAFAF7]">
      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <PhotoBlock
          gradient="radial-gradient(120% 90% at 70% 20%,#13384a,#0a0a0b 70%)"
          src={`${IMG}/hero.jpg`}
          alt="AI Valley summit stage at night"
          kenburns
          className="absolute inset-0"
        />
        <div className="absolute inset-0" style={{ boxShadow: "inset 0 -180px 160px -40px rgba(0,0,0,0.9)" }} />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-20 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/55">{hero.eyebrow}</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-4xl font-serif text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95] tracking-tight"
          >
            {hero.title}
          </motion.h1>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-white/65">{hero.sub}</p>
            <a href={a.applyHref} className="inline-block border-b pb-1 text-sm font-medium" style={{ borderColor: ACCENT, color: ACCENT }}>
              {hero.cta} &#8594;
            </a>
          </div>
        </div>
      </section>

      {/* Overview: magazine spread */}
      <section className="mx-auto max-w-[1200px] px-6 py-28 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-[120px]">
          <PhotoBlock gradient={PHOTOS[0]} src={`${IMG}/demo-day.jpg`} alt="Founders presenting at an AI Valley demo day" label="AIV demo day" kenburns className="aspect-[4/5] w-full rounded-sm" />
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              {a.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-5xl font-light leading-none">{s.value}</div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 border-l-2 pl-5 font-serif text-xl italic leading-relaxed text-white/85" style={{ borderColor: ACCENT }}>
              &ldquo;AI Valley is where the people building the future already are. Ambassadors bring that to your city.&rdquo;
            </p>
            <ul className="mt-10 space-y-3">
              {a.values.map((v) => (
                <li key={v.n} className="flex gap-4 text-sm">
                  <span className="font-mono text-white/40">{v.n}</span>
                  <span className="text-white/80">{v.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Become an ambassador: portrait moment */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <PhotoBlock gradient={PHOTOS[1]} src={`${IMG}/portrait.jpg`} alt="An AI Valley ambassador hosting a room" kenburns className="absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/55">The role</p>
              <h2 className="mt-5 max-w-2xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] font-light italic leading-[0.98]">
                Lead AI Valley in your region.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-white/70">
                {a.commitment.map((c) => (
                  <span key={c} className="rounded-full border border-white/20 px-4 py-1.5">{c}</span>
                ))}
              </div>
              <a href={a.applyHref} className="mt-10 inline-block rounded-full border border-white/30 px-7 py-3 text-sm transition-colors hover:border-white">
                Apply to lead
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Medal />
            </div>
          </div>
        </div>
      </section>

      {/* Perks: full-bleed panels */}
      <section>
        {a.perks.map((p, i) => (
          <div key={p.title} className="relative flex min-h-[80vh] items-center overflow-hidden">
            <PhotoBlock gradient={PHOTOS[i % PHOTOS.length]} src={`${IMG}/perk-${i + 1}.jpg`} alt={p.title} kenburns className="absolute inset-0" />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-[1200px] px-6 sm:px-10"
            >
              <div className="font-mono text-sm tracking-widest text-white/60">{String(i + 1).padStart(2, "0")} / 04</div>
              <h3 className="mt-4 max-w-3xl font-serif text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.02]">{p.title}</h3>
              <p className="mt-5 max-w-lg text-base text-white/70">{p.blurb}</p>
            </motion.div>
          </div>
        ))}
      </section>

      {/* Final CTA: cinematic close */}
      <section id="apply" className="relative overflow-hidden px-6 py-32 text-center sm:px-10">
        <div className="absolute inset-0" style={{ background: "radial-gradient(100% 100% at 50% 0%,#13384a,#0a0a0b 65%)" }} />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] font-light italic leading-[1.05]">{a.closing}</h2>
          <a href={a.applyHref} className="mt-8 inline-block border-b pb-1 text-base font-medium" style={{ borderColor: ACCENT, color: ACCENT }}>
            Apply to lead &#8594;
          </a>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Demo Day · SF", "Founder Dinner · NYC", "Summit · Lisbon", "Hack Night · Bangalore"].map((ev, i) => (
              <div key={ev} className="group relative">
                <PhotoBlock gradient={PHOTOS[i % PHOTOS.length]} src={`${IMG}/event-${i + 1}.jpg`} alt={ev} className="aspect-video w-full rounded-sm" />
                <span className="mt-2 block text-left font-mono text-[10px] uppercase tracking-widest text-white/50 transition-colors group-hover:text-white/80">
                  {ev}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-16 font-mono text-[11px] uppercase tracking-widest text-white/40">AI Valley Ambassador Program</p>
        </div>
      </section>
    </div>
  );
}
