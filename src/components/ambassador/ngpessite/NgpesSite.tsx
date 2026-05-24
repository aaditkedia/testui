"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroGlobe = dynamic(() => import("./NgpesScenes").then((m) => m.HeroGlobeScene), { ssr: false });
const ParisScene = dynamic(() => import("./NgpesScenes").then((m) => m.ParisScene), { ssr: false });

/* ---------------------------------- tokens --------------------------------- */
const C = {
  bg: "#FBFAF7",
  bgSoft: "#F2EFEA",
  ink: "#0F0F10",
  inkDim: "rgba(15,15,16,0.55)",
  inkMuted: "rgba(15,15,16,0.35)",
  orange: "#FF4D1F",
  orangeDim: "rgba(255,77,31,0.10)",
  hairline: "rgba(15,15,16,0.08)",
  shadowWarm: "0 24px 60px rgba(255,77,31,0.18)",
  shadowCard: "0 14px 40px rgba(15,15,16,0.06)",
};
const FONT = "var(--font-inter-tight), system-ui, sans-serif";

/* signature: orange COLOR emphasis (never bold) */
const HL = ({ children }: { children: ReactNode }) => <span style={{ color: C.orange }}>{children}</span>;

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

/* ----------------------------------- nav ----------------------------------- */
function Nav() {
  const [frosted, setFrosted] = useState(false);
  useEffect(() => {
    const onScroll = () => setFrosted(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed inset-x-0 top-[58px] z-40 transition-all duration-300"
      style={{
        background: frosted ? "rgba(251,250,247,0.8)" : "transparent",
        backdropFilter: frosted ? "blur(12px)" : "none",
        borderBottom: `1px solid ${frosted ? C.hairline : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#ngpes-hero" className="flex items-center gap-2.5">
          <span className="leading-[0.95]" style={{ fontWeight: 500, fontSize: "15px", letterSpacing: "-0.02em" }}>
            next<br />generation
          </span>
          <span className="flex items-center gap-1 text-[11px]" style={{ color: C.inkMuted }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: C.orange, display: "inline-block" }} />
            ngpes
          </span>
        </a>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-[14px] lg:flex" style={{ color: C.inkDim }}>
            <a href="#ngpes-hero" style={{ color: C.orange }}>Home</a>
            <a href="#ngpes-solution" className="transition-colors hover:text-black">About</a>
            <a href="#ngpes-news" className="transition-colors hover:text-black">Resources</a>
          </nav>
          <button
            title="Translation coming soon"
            className="hidden text-[13px] sm:block"
            style={{ color: C.inkDim, cursor: "pointer" }}
          >
            En
          </button>
          <a
            href="#ngpes-news"
            className="rounded-full px-5 py-2 text-[13px] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.orange, fontWeight: 500, boxShadow: C.shadowWarm }}
          >
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- hero ----------------------------------- */
const PARTNERS = [
  "Deloitte", "crypto.com", "DE GAULLE FLEURANCE", "Fireblocks", "ADAN",
  "sumsub", "WOORTON", "Chainalysis", "softledger",
];

function Hero() {
  return (
    <section id="ngpes-hero" className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-32 sm:px-10 sm:pt-40">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div {...reveal}>
          <h1 style={{ fontFamily: FONT, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.06, fontSize: "clamp(2.4rem,5vw,4.4rem)" }}>
            The infrastructure for <HL>global</HL> fiat &amp; digital asset <HL>payments</HL>
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: C.inkDim }}>
            Built for businesses that need to move money fast. Faster settlement. Lower costs. Full compliance.
          </p>
          <a
            href="#ngpes-news"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] text-white transition-transform hover:-translate-y-0.5"
            style={{ background: C.orange, fontWeight: 500, boxShadow: C.shadowWarm }}
          >
            Contact us <span aria-hidden>→</span>
          </a>
        </motion.div>
        <div className="relative h-[320px] sm:h-[440px]">
          <HeroGlobe />
        </div>
      </div>

      {/* trust strip */}
      <motion.div {...reveal} className="mt-12 overflow-hidden border-y" style={{ borderColor: C.hairline }}>
        <div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-[13px] sm:gap-x-10"
          style={{ color: C.inkMuted }}
        >
          {PARTNERS.map((p) => (
            <span key={p} style={{ fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{p}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------ mock UIs ----------------------------------- */
function TransactionTimeline() {
  const rows = [
    { label: "Queued · 04/03/2025 13:14", state: "done" },
    { label: "Broadcasting · 04/03/2025 13:14", state: "done" },
    { label: "Confirming · 04/03/2025 13:14", state: "active" },
    { label: "Received", state: "pending" },
  ];
  return (
    <div className="w-full max-w-[380px]" style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 16, padding: 20, boxShadow: C.shadowCard }}>
      <div className="flex items-center justify-between text-[14px]" style={{ fontWeight: 500 }}>
        <span>Instant Transaction</span>
        <span style={{ color: C.inkMuted }}>12:14</span>
      </div>
      <ul className="mt-4">
        {rows.map((r, i) => {
          const dot = r.state === "pending" ? C.hairline : C.orange;
          return (
            <li key={i} className="relative pl-5" style={{ borderLeft: `2px solid ${C.hairline}`, paddingTop: 10, paddingBottom: 10, fontSize: 13, color: r.state === "pending" ? C.inkMuted : C.inkDim }}>
              <span
                className="absolute"
                style={{
                  left: -5, top: 14, width: 8, height: 8, borderRadius: 99, background: dot,
                  boxShadow: r.state === "active" ? `0 0 0 4px ${C.orangeDim}` : "none",
                }}
              />
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IbanNetwork() {
  const nodes = [
    { x: 160, y: 14, iban: "3754 0044 0532 0130", name: "Tarja Macher" },
    { x: 250, y: 120, iban: "8821 0907 6610 4402", name: "Léa Dubois" },
    { x: 160, y: 224, iban: "5540 2231 0098 7712", name: "Marco Ferri" },
    { x: 70, y: 120, iban: "1190 7745 3320 0091", name: "Ana Sørensen" },
  ];
  return (
    <svg viewBox="0 0 320 260" className="w-full max-w-[400px]">
      {nodes.map((n, i) => (
        <line key={i} x1={160} y1={130} x2={n.x + 60} y2={n.y + 18} stroke={C.hairline} strokeWidth={1.5} strokeDasharray="3 4" />
      ))}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x - 60},${n.y})`}>
          <rect width={120} height={36} rx={9} fill="#fff" stroke={C.hairline} />
          <text x={10} y={15} fontSize={9} fill={C.ink} style={{ fontFamily: FONT, fontWeight: 500 }}>{n.iban}</text>
          <text x={10} y={28} fontSize={8} fill={C.inkMuted} style={{ fontFamily: FONT }}>{n.name}</text>
        </g>
      ))}
      <circle cx={160} cy={130} r={26} fill="#fff" stroke={C.orange} strokeWidth={1.5} />
      <g style={{ transformOrigin: "160px 130px", animation: "ngpes-spin 6s linear infinite" }}>
        <circle cx={160} cy={130} r={18} fill="none" stroke={C.orange} strokeWidth={2} strokeDasharray="6 6" />
      </g>
      <text x={160} y={135} fontSize={14} fill={C.orange} textAnchor="middle" style={{ fontFamily: FONT, fontWeight: 600 }}>O</text>
      <style>{`@keyframes ngpes-spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}

function CryptoSwap() {
  const cell = (label: string, glyph: string) => (
    <div className="flex flex-1 flex-col items-center gap-2 rounded-xl py-5" style={{ background: C.bgSoft, border: `1px solid ${C.hairline}` }}>
      <span className="text-[10px] tracking-[0.18em]" style={{ color: C.inkMuted }}>{label}</span>
      <span style={{ fontSize: 28, color: C.ink }}>{glyph}</span>
    </div>
  );
  return (
    <div className="w-full max-w-[360px]" style={{ background: "#fff", border: `1px solid ${C.hairline}`, borderRadius: 16, padding: 20, boxShadow: C.shadowCard }}>
      <div className="text-[12px]" style={{ fontWeight: 500, color: C.inkDim }}>Convert</div>
      <div className="mt-4 flex items-center gap-3">
        {cell("CRYPTO", "₿")}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white" style={{ background: C.orange }}>⇌</span>
        {cell("EUR", "€")}
      </div>
    </div>
  );
}

function CustodyVault() {
  return (
    <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full" style={{ background: C.bgSoft, border: `1px solid ${C.hairline}` }}>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-24 w-24 items-center justify-center rounded-2xl"
        style={{ background: "#fff", border: `1px solid ${C.hairline}`, boxShadow: C.shadowCard }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth={1.6} strokeLinecap="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 12v-2M12 12l1.6 1.2" />
          <path d="M3 8h2M3 16h2" />
        </svg>
      </motion.div>
    </div>
  );
}

/* -------------------------------- solution --------------------------------- */
const STEPS = [
  { n: "01", name: "Send", desc: "Send payments worldwide in fiat or digital assets to registered counterparties, all from one platform. Manage outbound payment flows with greater speed, control and visibility.", Mock: TransactionTimeline },
  { n: "02", name: "Receive", desc: "Receive funds globally from third parties or transfer within your own accounts, in fiat through your linked IBAN or in supported digital assets to your platform wallet.", Mock: IbanNetwork },
  { n: "03", name: "Convert", desc: "Convert between fiat and supported digital assets within one operational environment. Reduce friction and manage liquidity more flexibly across currencies, rails and networks.", Mock: CryptoSwap },
  { n: "04", name: "Custody", desc: "Securely hold and manage supported digital assets in one place. Structure liquidity across wallets, teams or use cases while maintaining operational control.", Mock: CustodyVault },
];

function Solution() {
  const [active, setActive] = useState(0);
  return (
    <section id="ngpes-solution" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
      <motion.h2 {...reveal} className="text-center" style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
        Our Solu<HL>tion</HL>
      </motion.h2>

      <div className="mt-16 flex flex-col gap-20 sm:gap-28">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            className="grid items-center gap-8 md:grid-cols-2"
          >
            <motion.div {...reveal}>
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[12px]"
                style={{ background: C.orangeDim, color: C.orange, fontWeight: 500, boxShadow: "0 8px 16px rgba(255,77,31,0.15)" }}
              >
                {s.n}
              </span>
              <h3 className="mt-4 text-[28px]" style={{ fontFamily: FONT, fontWeight: 500, letterSpacing: "-0.02em" }}>{s.name}</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: C.inkDim }}>{s.desc}</p>
            </motion.div>
            <motion.div {...reveal} className={`flex justify-center ${i % 2 === 0 ? "md:justify-end" : "md:justify-start md:order-first"}`}>
              <s.Mock />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* step dots */}
      <div className="mt-16 flex justify-center gap-2.5">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? 24 : 8, background: i === active ? C.orange : C.hairline }}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- difference -------------------------------- */
const DIFFS = [
  { title: "Faster Settlement", desc: "Move value in minutes, not days, across rails and networks.", g: "linear-gradient(135deg,#FF4D1F,#FF7A4D)" },
  { title: "Built-in Compliance", desc: "KYC, AML and reporting handled within the platform.", g: "linear-gradient(135deg,#FFB39C,#FF4D1F)" },
  { title: "Global Reach", desc: "One operational setup for counterparties worldwide.", g: "linear-gradient(135deg,#0F0F10,#FF4D1F)" },
  { title: "Fiat + Digital", desc: "Hold, send and convert across both worlds, seamlessly.", g: "linear-gradient(135deg,#FF7A4D,#F2EFEA)" },
];

function Difference() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32" style={{ background: C.bgSoft }}>
      <div className="mx-auto max-w-[1400px]">
        <motion.h2 {...reveal} className="text-center" style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
          The NGPES <HL>Difference</HL>
        </motion.h2>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFS.map((d) => (
            <motion.div
              key={d.title}
              {...reveal}
              whileHover={{ y: -6 }}
              className="rounded-2xl p-6"
              style={{ background: "#fff", border: `1px solid ${C.hairline}`, boxShadow: C.shadowCard }}
            >
              <div className="h-16 w-16 rounded-2xl" style={{ background: d.g }} />
              <h3 className="mt-5 text-[18px]" style={{ fontFamily: FONT, fontWeight: 500 }}>{d.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: C.inkDim }}>{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- paris ---------------------------------- */
function Paris() {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
      <motion.h2 {...reveal} className="relative z-10" style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2.2rem,5vw,3.6rem)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
        Built in Paris,<br />Built For The <HL>World</HL>
      </motion.h2>
      <p className="relative z-10 mx-auto mt-5 max-w-md text-[15px]" style={{ color: C.inkDim }}>
        From the French fintech ecosystem to global payments infrastructure.
      </p>
      <div className="mx-auto mt-2 h-[420px] w-full max-w-[640px] sm:h-[520px]">
        <ParisScene />
      </div>
    </section>
  );
}

/* ---------------------------------- news ----------------------------------- */
function News() {
  return (
    <section id="ngpes-news" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex items-end justify-between">
        <motion.h2 {...reveal} style={{ fontFamily: FONT, fontWeight: 500, fontSize: "clamp(2rem,4vw,3rem)", letterSpacing: "-0.02em" }}>
          News &amp; Up<HL>dates</HL>
        </motion.h2>
        <a href="#ngpes-hero" className="hidden items-center gap-1 border-b pb-0.5 text-[14px] sm:inline-flex" style={{ borderColor: C.ink }}>
          Explore All <span aria-hidden>↗</span>
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* card 1 — co-branding cream card */}
        <motion.article {...reveal} whileHover={{ y: -4 }} className="flex flex-col justify-between rounded-2xl p-6" style={{ background: C.bgSoft, border: `1px solid ${C.hairline}`, minHeight: 320 }}>
          <span className="self-start rounded-full px-3 py-1 text-[12px]" style={{ border: `1px solid ${C.hairline}`, color: C.inkDim, background: "#fff" }}>Read More</span>
          <div>
            <h3 className="text-[18px] leading-snug" style={{ fontFamily: FONT, fontWeight: 500 }}>
              NGPES Officially Labelled by Finance Innovation, France&apos;s Leading Fintech Cluster
            </h3>
            <div className="mt-5 flex items-center gap-3 border-t pt-4 text-[13px]" style={{ borderColor: C.hairline, color: C.inkDim }}>
              <span style={{ fontWeight: 500, color: C.ink }}>next generation</span>
              <span style={{ color: C.inkMuted }}>×</span>
              <span style={{ fontWeight: 500 }}>Finance Innovation</span>
            </div>
          </div>
        </motion.article>

        {/* cards 2 + 3 — photo cards (gradient stand-ins) */}
        {[
          { title: "Blockchain's Strength In A Bear Crypto Market", g: "linear-gradient(160deg,#ff9a6c,#ff4d1f 55%,#7a2410)" },
          { title: "Stablecoins and Corporate Payments: A Structural Shift in Motion", g: "linear-gradient(200deg,#33414f,#0f1620 60%,#ff7a4d)" },
        ].map((c) => (
          <motion.article key={c.title} {...reveal} whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl" style={{ background: "#fff", border: `1px solid ${C.hairline}`, boxShadow: C.shadowCard }}>
            <div className="relative h-44 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: c.g }} />
              <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[12px]" style={{ background: "rgba(251,250,247,0.9)", color: C.ink }}>Read More</span>
            </div>
            <h3 className="p-5 text-[17px] leading-snug" style={{ fontFamily: FONT, fontWeight: 500 }}>{c.title}</h3>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- footer ---------------------------------- */
function Footer() {
  const cols: { h: string; links: string[] }[] = [
    { h: "Product", links: ["Send", "Receive", "Convert", "Custody"] },
    { h: "Resources", links: ["News", "Compliance", "Docs"] },
    { h: "Company", links: ["About", "Careers", "Contact"] },
    { h: "Legal", links: ["Privacy", "Terms"] },
  ];
  return (
    <footer className="border-t px-6 py-16 sm:px-10" style={{ borderColor: C.hairline, background: C.bg }}>
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <div className="leading-[0.95]" style={{ fontWeight: 500, fontSize: 16, letterSpacing: "-0.02em" }}>next<br />generation</div>
          <p className="mt-3 max-w-[220px] text-[13px]" style={{ color: C.inkDim }}>
            The infrastructure for global fiat &amp; digital asset payments. Built in Paris.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <h4 className="text-[13px]" style={{ fontWeight: 600 }}>{col.h}</h4>
            <ul className="mt-3 space-y-2 text-[13px]" style={{ color: C.inkDim }}>
              {col.links.map((l) => <li key={l}><a href="#ngpes-hero" className="hover:text-black">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-[1400px] border-t pt-6 text-[12px]" style={{ borderColor: C.hairline, color: C.inkMuted }}>
        © {new Date().getFullYear()} NGPES — Next Generation Payment Electronic Services. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */
export default function NgpesSite() {
  return (
    <main style={{ background: C.bg, color: C.ink, fontFamily: FONT }}>
      <Nav />
      <Hero />
      <Solution />
      <Difference />
      <Paris />
      <News />
      <Footer />
    </main>
  );
}
