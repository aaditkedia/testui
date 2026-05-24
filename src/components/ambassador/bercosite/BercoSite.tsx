"use client";

import { createElement, useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const ChipScene = dynamic(() => import("./BercoScene").then((m) => m.ChipScene), { ssr: false });
const CardStackScene = dynamic(() => import("./BercoScene").then((m) => m.CardStackScene), { ssr: false });

/* ---------------------------------- tokens --------------------------------- */
const C = {
  bg: "#0A0A0B",
  bgEl: "#121214",
  text: "#F4EFE6",
  textDim: "rgba(244,239,230,0.45)",
  textMuted: "rgba(244,239,230,0.22)",
  pink: "#F4B0A3",
  teal: "#52D4C8",
  hairline: "rgba(244,239,230,0.10)",
};
const FONT = "var(--font-inter-tight), system-ui, sans-serif";

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

/* the typographic spine: weight 500 with <b> jumping to 700 */
function BoldHeadline({ as = "h2", children, style, className }: { as?: ElementType; children: ReactNode; style?: React.CSSProperties; className?: string }) {
  return createElement(
    as,
    { className, style: { fontFamily: FONT, fontWeight: 500, letterSpacing: "-0.022em", lineHeight: 1.05, ...style } },
    children
  );
}

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[12px]" style={{ color: C.textDim, fontWeight: 500 }}>
    <span style={{ width: 6, height: 6, borderRadius: 99, background: C.teal, display: "inline-block" }} />
    {children}
  </span>
);

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
        background: frosted ? "rgba(10,10,11,0.6)" : "transparent",
        backdropFilter: frosted ? "blur(12px)" : "none",
        borderBottom: `1px solid ${frosted ? C.hairline : "transparent"}`,
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-10">
        <a href="#berco-hero" className="text-[14px] tracking-[0.08em]" style={{ fontWeight: 600 }}>BERCO INC</a>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-[13px] lg:flex" style={{ color: C.textDim }}>
            <a href="#berco-mindset" className="transition-colors hover:text-[#F4EFE6]">About</a>
            <a href="#berco-brands" className="transition-colors hover:text-[#F4EFE6]">Brands</a>
            <a href="#berco-services" className="transition-colors hover:text-[#F4EFE6]">Services</a>
            <a href="#berco-footer" className="transition-colors hover:text-[#F4EFE6]">Contact</a>
          </nav>
          <button
            title="Translation coming soon"
            className="rounded-full px-4 py-1.5 text-[13px]"
            style={{ background: C.text, color: "#1A1A1B", fontWeight: 500, cursor: "pointer" }}
          >
            Hebrew
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------- hero ----------------------------------- */
function Hero() {
  return (
    <section id="berco-hero" className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-8 px-6 pb-16 pt-32 sm:px-10 md:grid-cols-[1.1fr_1fr_0.7fr]">
      <motion.div {...reveal}>
        <span className="text-[12px]" style={{ color: C.textDim }}>Products &amp; Services</span>
        <BoldHeadline as="h1" style={{ fontSize: "clamp(2.4rem,4.6vw,4rem)", marginTop: 12 }}>
          Empowering <b>eCommerce</b><br />with Bold<br />Solutions
        </BoldHeadline>
        <a href="#berco-services" className="mt-7 inline-flex items-center gap-2 border-b pb-0.5 text-[14px]" style={{ borderColor: C.text }}>
          Explore Our Solutions <span aria-hidden>↗</span>
        </a>
      </motion.div>

      <div className="relative h-[300px] md:h-[460px]">
        <ChipScene />
      </div>

      <motion.div {...reveal} className="md:self-start md:pt-10">
        <span className="text-[12px]" style={{ color: C.teal }}>Fintech</span>
        <p className="mt-2 text-[15px] leading-snug" style={{ color: C.textDim }}>
          The Future Of eCommerce, Delivered Today
        </p>
        <p className="mt-8 max-w-[240px] text-[13px] leading-relaxed" style={{ color: C.textMuted }}>
          Strategic investments. Innovative solutions. Unmatched growth opportunities.
        </p>
      </motion.div>
    </section>
  );
}

/* ------------------------------- statement --------------------------------- */
const STATEMENT = "At Berco Inc. we redefine *innovation by empowering *businesses to reach their full potential. From *transformative eCommerce strategies to seamless automation, we build the systems that turn ambition into measurable growth."
  .split(" ")
  .map((w) => (w.startsWith("*") ? { t: w.slice(1), b: true } : { t: w, b: false }));

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.45"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = words.current.length;
    const visible = v * n;
    words.current.forEach((w, i) => {
      if (!w) return;
      w.style.color = i < visible - 4 ? C.text : i < visible ? C.textDim : C.textMuted;
    });
  });
  return (
    <section className="mx-auto max-w-[1100px] px-6 py-32 sm:px-10 sm:py-48">
      <p ref={ref} style={{ fontFamily: FONT, fontWeight: 400, lineHeight: 1.3, fontSize: "clamp(1.7rem,3.2vw,2.6rem)", letterSpacing: "-0.01em" }}>
        {STATEMENT.map((w, i) => (
          <span key={i} ref={(el) => { words.current[i] = el; }} style={{ color: C.textMuted, fontWeight: w.b ? 700 : 400, transition: "color 0.3s ease" }}>
            {w.t}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

/* --------------------------------- mindset --------------------------------- */
function Mindset() {
  return (
    <section id="berco-mindset" className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-24 sm:px-10 sm:py-32 md:grid-cols-2">
      <motion.div {...reveal}>
        <Eyebrow>Our Mindset</Eyebrow>
        <BoldHeadline as="h2" style={{ fontSize: "clamp(2rem,3.8vw,3.2rem)", marginTop: 16 }}>
          Empower growth<br />for businesses<br /><b>worldwide</b> today.
        </BoldHeadline>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: C.textDim }}>
          From innovative algorithms to seamless automation, we craft solutions that turn challenges into opportunities with technology.
        </p>
        <span className="mt-6 inline-block h-1.5 w-1.5 rounded-full" style={{ background: C.pink }} />
      </motion.div>
      <div className="relative h-[340px] md:h-[460px]">
        <CardStackScene />
      </div>
    </section>
  );
}

/* --------------------------------- carousel -------------------------------- */
type Card = { mark: ReactNode; name: string; tag: string };

function Carousel({ id, title, caption, items }: { id?: string; title: ReactNode; caption?: ReactNode; items: Card[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  return (
    <section id={id} className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
      {caption && <motion.p {...reveal} className="mb-3 text-right text-[13px]" style={{ color: C.textDim }}>{caption}</motion.p>}
      <motion.div {...reveal}>{title}</motion.div>
      <div
        ref={scroller}
        className="mt-12 flex gap-5 overflow-x-auto pb-3"
        style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
      >
        {items.map((it) => (
          <motion.div
            key={it.name}
            whileHover={{ y: -4 }}
            className="shrink-0"
            style={{ width: 280, scrollSnapAlign: "start" }}
          >
            <div className="flex h-44 items-center justify-center rounded-2xl" style={{ background: C.bgEl, border: `1px solid ${C.hairline}` }}>
              {it.mark}
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 text-[16px]" style={{ fontWeight: 500 }}>
                {it.name}
                <span style={{ color: C.teal }}>✦</span>
              </div>
              <p className="mt-1 text-[13px]" style={{ color: C.textDim }}>{it.tag}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        {[-1, 1].map((d) => (
          <button
            key={d}
            onClick={() => nudge(d)}
            aria-label={d < 0 ? "Previous" : "Next"}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
            style={{ border: `1px solid ${C.hairline}`, color: C.text }}
          >
            {d < 0 ? "‹" : "›"}
          </button>
        ))}
      </div>
    </section>
  );
}

/* brand wordmarks (stylized placeholders) */
const wordmark = (label: string, color: string) => (
  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 22, color, letterSpacing: "-0.02em" }}>{label}</span>
);
const BRANDS: Card[] = [
  { mark: wordmark("Wear Your Halo", C.pink), name: "Wear Your Halo", tag: "Faith-inspired jewelry with timeless elegance." },
  { mark: wordmark("Olwite", "#F4EFE6"), name: "Olwite", tag: "Pure style, all white, always right." },
  { mark: wordmark("Hardcore", C.teal), name: "Hardcore", tag: "Revitalizing menswear with style and comfort." },
  { mark: wordmark("NitroOps", "#9aa7ff"), name: "NitroOps", tag: "Revolutionizing eCommerce with stunning storefronts." },
];

/* tool glyphs (simplified recognizable marks) */
const ToolMark = ({ kind }: { kind: string }) => {
  const s = 44;
  switch (kind) {
    case "shopify":
      return <svg width={s} height={s} viewBox="0 0 24 24"><path d="M15 4c-.5-1-1.4-1.5-2.3-1.2C11.8 2 10.8 3 10.2 5L6 6.2 4.5 20l9 2 6-1.5L17.5 5 15 4z" fill="#95BF47" /><path d="M13.5 8c-.8-.3-1.4 0-1.7.8-.6-.4-1.4-.2-1.8.6-.3.7 0 1.4.8 1.7l-.4 1.4c.9.3 1.6 0 1.9-.8.6.4 1.4.2 1.8-.6.3-.8 0-1.5-.8-1.8l.2-1.3z" fill="#fff" /></svg>;
    case "meta":
      return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#0866FF" strokeWidth="2.4"><path d="M3 15c1.5-7 4-9 6-5s3.5 8 6 8 3-3 3-6-1.5-5-3-5-3 2-4.5 5" /></svg>;
    case "slack":
      return <svg width={s} height={s} viewBox="0 0 24 24"><rect x="10" y="3" width="4" height="11" rx="2" fill="#E01E5A" /><rect x="3" y="10" width="11" height="4" rx="2" fill="#36C5F0" /><rect x="10" y="10" width="11" height="4" rx="2" fill="#2EB67D" /><rect x="10" y="10" width="4" height="11" rx="2" fill="#ECB22E" /></svg>;
    case "monday":
      return <svg width={s} height={s} viewBox="0 0 24 24"><rect x="3" y="9" width="5" height="11" rx="2.5" fill="#FF3D57" /><rect x="9.5" y="5" width="5" height="15" rx="2.5" fill="#FFCB00" /><rect x="16" y="9" width="5" height="11" rx="2.5" fill="#00CA72" /></svg>;
    case "figma":
      return <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="9" cy="5" r="3" fill="#F24E1E" /><circle cx="15" cy="5" r="3" fill="#FF7262" /><circle cx="9" cy="12" r="3" fill="#A259FF" /><circle cx="15" cy="12" r="3" fill="#1ABCFE" /><circle cx="9" cy="19" r="3" fill="#0ACF83" /></svg>;
    default:
      return null;
  }
};
const TOOLS: Card[] = [
  { mark: <ToolMark kind="shopify" />, name: "Shopify", tag: "Powerful platform for online stores." },
  { mark: <ToolMark kind="meta" />, name: "Meta", tag: "Connecting people through digital platforms." },
  { mark: <ToolMark kind="slack" />, name: "Slack", tag: "Streamlined communication for modern teams." },
  { mark: <ToolMark kind="monday" />, name: "Monday.com", tag: "Work management made effortlessly organized." },
  { mark: <ToolMark kind="figma" />, name: "Figma", tag: "Collaborative design for creative teams." },
];

/* --------------------------------- services -------------------------------- */
const Icon = ({ d }: { d: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const SERVICES = [
  { name: "Strategic Investments", desc: "Providing strategic mentorship to help businesses thrive.", icon: <Icon d={<><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" /></>} /> },
  { name: "eCommerce Excellence", desc: "Building scalable platforms to dominate the digital space.", icon: <Icon d={<><path d="M4 7h16l-1 4H5L4 7z" /><path d="M5 11v8h14v-8" /><path d="M3 7l1-3h16l1 3" /></>} /> },
  { name: "SaaS Solutions", desc: "Designing tools that redefine how businesses operate.", icon: <Icon d={<><rect x="4" y="4" width="16" height="5" rx="1" /><rect x="4" y="10" width="16" height="5" rx="1" /><rect x="4" y="16" width="16" height="4" rx="1" /></>} /> },
  { name: "Data-Driven Insights", desc: "Leveraging analytics and AI to guide smarter decisions.", icon: <Icon d={<><path d="M5 20V10M12 20V4M19 20v-7" /></>} /> },
  { name: "Brand Amplification", desc: "Creating bold strategies to maximize visibility globally.", icon: <Icon d={<><path d="M3 11v2l11 4V7L3 11z" /><path d="M14 8c2 1 2 7 0 8" /></>} /> },
  { name: "Innovation Incubation", desc: "Partnering with founders to launch disruptive products.", icon: <Icon d={<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 00-3 11c.6.4 1 1 1 2h4c0-1 .4-1.6 1-2a6 6 0 00-3-11z" /></>} /> },
];

function Services() {
  return (
    <section id="berco-services" className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <motion.div {...reveal}>
          <Eyebrow>Our Services</Eyebrow>
          <BoldHeadline as="h2" style={{ fontSize: "clamp(2rem,3.6vw,3rem)", marginTop: 16 }}>
            Empower <b>business</b><br />growth and Innovation
          </BoldHeadline>
        </motion.div>
        <motion.p {...reveal} className="max-w-sm text-[15px] leading-relaxed" style={{ color: C.textDim }}>
          Unlock the potential of your business with strategies and solutions that drive growth, innovation, and success.
        </motion.p>
      </div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ borderTop: `1px solid ${C.hairline}`, borderLeft: `1px solid ${C.hairline}` }}>
        {SERVICES.map((s) => (
          <motion.div
            key={s.name}
            whileHover={{ backgroundColor: C.bgEl }}
            transition={{ duration: 0.25 }}
            className="p-8"
            style={{ borderRight: `1px solid ${C.hairline}`, borderBottom: `1px solid ${C.hairline}`, minHeight: 220 }}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-[17px]" style={{ fontWeight: 600 }}>{s.name}</h3>
              {s.icon}
            </div>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: C.textDim }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- footer ---------------------------------- */
function Footer() {
  const cols: { h: string; links: string[] }[] = [
    { h: "Brands", links: ["Wear Your Halo", "Olwite", "Hardcore", "NitroOps"] },
    { h: "Services", links: ["Investments", "eCommerce", "SaaS", "Insights"] },
    { h: "Company", links: ["About", "Careers", "Contact"] },
    { h: "Legal", links: ["Privacy", "Terms"] },
  ];
  return (
    <footer id="berco-footer" className="border-t px-6 py-16 sm:px-10" style={{ borderColor: C.hairline }}>
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <div className="text-[15px] tracking-[0.08em]" style={{ fontWeight: 600 }}>BERCO INC</div>
          <p className="mt-3 max-w-[240px] text-[13px]" style={{ color: C.textDim }}>
            An eCommerce holding company building, investing in, and propelling D2C brands.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.h}>
            <h4 className="text-[13px]" style={{ fontWeight: 600 }}>{col.h}</h4>
            <ul className="mt-3 space-y-2 text-[13px]" style={{ color: C.textDim }}>
              {col.links.map((l) => <li key={l}><a href="#berco-hero" className="hover:text-[#F4EFE6]">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-[1400px] border-t pt-6 text-[12px]" style={{ borderColor: C.hairline, color: C.textMuted }}>
        © {new Date().getFullYear()} Berco Inc. All rights reserved.
      </div>
    </footer>
  );
}

/* ---------------------------------- page ----------------------------------- */
export default function BercoSite() {
  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: FONT }}>
      <Nav />
      <Hero />
      <Statement />
      <Mindset />
      <Carousel
        id="berco-brands"
        caption="Innovative brands we've partnered with, built, and propelled."
        title={<BoldHeadline as="h2" style={{ fontSize: "clamp(2rem,3.8vw,3.2rem)" }}>Vision <b>Meets</b> Execution.</BoldHeadline>}
        items={BRANDS}
      />
      <Carousel
        title={<BoldHeadline as="h2" style={{ fontSize: "clamp(2rem,3.8vw,3.2rem)" }}>Tools We Use <b>Everyday.</b></BoldHeadline>}
        items={TOOLS}
      />
      <Services />
      <Footer />
    </main>
  );
}
