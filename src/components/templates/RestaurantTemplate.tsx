"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import type { RestaurantTemplateData, RestaurantVisual } from "@/config/template-gallery";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const fontClass: Record<RestaurantTemplateData["typography"], string> = {
  fresh: "font-display",
  steakhouse: "font-serif",
  cafe: "font-serif",
  editorial: "font-serif",
};

function TemplateButton({
  children,
  variant = "primary",
}: {
  children: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href="#template-conversion"
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 ${
        variant === "primary" ? "text-[var(--rt-inverse)]" : "border bg-transparent"
      }`}
      style={{
        background: variant === "primary" ? "var(--rt-accent)" : "transparent",
        borderColor: variant === "secondary" ? "var(--rt-line)" : "transparent",
        color: variant === "primary" ? "var(--rt-inverse)" : "var(--rt-text)",
      }}
    >
      {children}
    </a>
  );
}

// Stock photography (Unsplash CDN, hotlink-stable). Swap to your own assets
// in /public/images and the template keeps working — the photo URL is the
// only line that has to change per visual.
// Three featured-card photos per visual style. Hotlink-stable Unsplash URLs.
const FEATURED_PHOTOS: Record<RestaurantVisual, [string, string, string]> = {
  steakhouse: [
    "https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=900&q=70&auto=format&fit=crop",
  ],
  shelby: [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=900&q=70&auto=format&fit=crop",
  ],
  sandwich: [
    "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=70&auto=format&fit=crop",
  ],
  mediterranean: [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=70&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=70&auto=format&fit=crop",
  ],
};

function featuredPhoto(visual: RestaurantVisual, i: number) {
  return FEATURED_PHOTOS[visual][i % 3];
}

const HERO_PHOTOS: Record<RestaurantVisual, string> = {
  steakhouse:
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=1100&q=70&auto=format&fit=crop",
  shelby:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100&q=70&auto=format&fit=crop",
  sandwich:
    "https://images.unsplash.com/photo-1539252554935-80fdcd573a44?w=1100&q=70&auto=format&fit=crop",
  mediterranean:
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1100&q=70&auto=format&fit=crop",
};

function FoodVisual({ visual }: { visual: RestaurantVisual }) {
  if (visual === "steakhouse") {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] bg-[#241814] text-[#FFF3E4] shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_PHOTOS.steakhouse} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,9,8,.78)_10%,rgba(91,15,15,.55)_70%,rgba(200,164,106,.35)_120%)]" />
        <div className="absolute bottom-7 left-7 max-w-[70%] rounded-2xl border border-[#C8A46A]/40 bg-black/45 p-5 backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A46A]">Tonight</p>
          <p className="mt-2 text-2xl font-semibold leading-tight">Prime Rib Sunday</p>
          <p className="mt-1 text-xs leading-5 text-[#FFF3E4]/80">Reservation-first dining-room conversion.</p>
        </div>
        <div className="absolute right-7 top-7 rounded-full border border-[#C8A46A]/40 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
          Reserve
        </div>
      </div>
    );
  }

  if (visual === "shelby") {
    return (
      <div className="relative grid h-full min-h-[420px] grid-cols-1 gap-4 sm:grid-cols-[1.05fr_.75fr]">
        <div className="relative min-h-[260px] overflow-hidden rounded-[28px] bg-[#2A1D15] sm:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_PHOTOS.shelby} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(18,16,14,.55)_0%,rgba(75,42,25,.35)_60%,rgba(184,111,60,.3)_100%)]" />
          <div className="absolute bottom-7 left-7 right-7 rounded-3xl bg-[#F8F2E8]/96 p-5 text-[#191511]">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6F6254]">Seasonal feature</p>
            <p className="mt-2 text-2xl font-semibold">Brunch and dinner, framed editorially.</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="min-h-[160px] overflow-hidden rounded-[24px] bg-[#EFE4D3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&q=70&auto=format&fit=crop"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex min-h-[160px] flex-col justify-center rounded-[24px] bg-[#11100E] p-5 text-[#FFF7EC]">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9B78F]">Reserve</p>
            <p className="mt-3 text-2xl font-semibold">Resy + Toast</p>
            <p className="mt-1 text-xs text-[#FFF7EC]/70">Reservation and pickup paths live side by side.</p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "sandwich") {
    return (
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border-2 border-[#2A2018] bg-[#F2E2C3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_PHOTOS.sandwich} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(242,184,75,.18)_0%,rgba(214,69,47,.12)_55%,rgba(75,127,56,.22)_100%)]" />
        <div className="absolute -left-4 top-7 rotate-[-3deg] rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#D6452F] shadow-lg">
          Best Seller
        </div>
        <div className="absolute bottom-7 right-7 max-w-[240px] rounded-2xl bg-white p-4 shadow-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#765F4A]">Catering</p>
          <p className="mt-1 text-lg font-bold leading-snug text-[#2A2018]">Trays, box lunches, and pickup.</p>
        </div>
      </div>
    );
  }

  // mediterranean
  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] bg-[#F4E5C6]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={HERO_PHOTOS.mediterranean} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
      <div className="absolute inset-0 bg-[linear-gradient(165deg,rgba(255,248,236,.35)_0%,rgba(224,167,34,.22)_55%,rgba(47,125,50,.25)_100%)]" />
      <div className="absolute bottom-7 right-7 max-w-[280px] rounded-[28px] bg-white/95 p-5 shadow-xl backdrop-blur">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#65705C]">Fresh favorite</p>
        <p className="mt-2 text-xl font-bold leading-snug text-[#1C2418]">Bowls, wraps, hummus, baklava.</p>
      </div>
      <div className="absolute left-7 top-7 rounded-full bg-[#2F7D32] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white shadow">
        Order Online
      </div>
    </div>
  );
}

export default function RestaurantTemplate({ data }: { data: RestaurantTemplateData }) {
  const vars = {
    "--rt-bg": data.theme.bg,
    "--rt-surface": data.theme.surface,
    "--rt-surface-alt": data.theme.surfaceAlt,
    "--rt-surface-alt-text": data.theme.surfaceAltText,
    "--rt-text": data.theme.text,
    "--rt-inverse": data.theme.textInverse,
    "--rt-muted": data.theme.muted,
    "--rt-accent": data.theme.accent,
    "--rt-accent-2": data.theme.accent2,
    "--rt-accent-3": data.theme.accent3,
    "--rt-line": data.theme.line,
  } as CSSProperties;

  const headingClass = fontClass[data.typography];

  return (
    <main style={vars} className="min-h-screen bg-[var(--rt-bg)] text-[var(--rt-text)]">
      <header
        className="sticky top-0 z-30 border-b border-[var(--rt-line)] bg-[var(--rt-bg)]"
      >
        <nav className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#template-hero" className="text-base font-black uppercase">
            {data.shortName}
          </a>
          <div className="hidden items-center gap-6 text-sm text-[var(--rt-muted)] md:flex">
            <a href="#template-menu" className="hover:text-[var(--rt-text)]">Menu</a>
            <a href="#template-spotlight" className="hover:text-[var(--rt-text)]">Story</a>
            <a href="#template-location" className="hover:text-[var(--rt-text)]">Location</a>
          </div>
          <div className="flex items-center gap-2">
            <TemplateButton>{data.hero.primaryAction}</TemplateButton>
          </div>
        </nav>
      </header>

      <section id="template-hero" className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:py-24">
        <motion.div {...reveal}>
          <p className="text-xs font-bold uppercase text-[var(--rt-accent)]">{data.hero.eyebrow}</p>
          <h1 className={`${headingClass} mt-5 max-w-4xl text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-6xl`}>
            {data.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--rt-muted)] sm:text-lg">{data.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TemplateButton>{data.hero.primaryAction}</TemplateButton>
            <TemplateButton variant="secondary">{data.hero.secondaryAction}</TemplateButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {data.hero.badges.map((badge) => (
              <span key={badge} className="rounded-full border border-[var(--rt-line)] bg-[var(--rt-surface)] px-3 py-1 text-xs font-semibold text-[var(--rt-muted)]">
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div {...reveal}>
          <FoodVisual visual={data.hero.visual} />
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-3 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {data.quickActions.map((action) => (
          <motion.article
            key={action.label}
            {...reveal}
            className="rounded-[24px] border border-[var(--rt-line)] bg-[var(--rt-surface)] p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <h2 className="text-lg font-bold">{action.label}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--rt-muted)]">{action.detail}</p>
          </motion.article>
        ))}
      </section>

      <section className="bg-[var(--rt-surface)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <motion.div {...reveal}>
              <p className="text-xs font-bold uppercase text-[var(--rt-accent)]">Featured</p>
              <h2 className={`${headingClass} mt-3 text-4xl font-semibold leading-tight sm:text-5xl`}>What guests see first.</h2>
            </motion.div>
            <motion.p {...reveal} className="max-w-md text-sm leading-7 text-[var(--rt-muted)]">
              The preview turns the spec sheet into a reusable landing-page pattern with editable seed content, CTA hierarchy, and visual sections.
            </motion.p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {data.featured.map((item, i) => (
              <motion.article
                key={item.name}
                {...reveal}
                className="group overflow-hidden rounded-[24px] border border-[var(--rt-line)] bg-[var(--rt-bg)]"
              >
                <div className="relative h-44 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredPhoto(data.hero.visual, i)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,.35))]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[var(--rt-line)] px-3 py-1 text-xs font-bold text-[var(--rt-accent)]">
                      {item.tag}
                    </span>
                    {item.price && <span className="text-sm font-bold text-[var(--rt-muted)]">{item.price}</span>}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{item.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--rt-muted)]">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="template-menu" className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <motion.div {...reveal} className="max-w-2xl">
          <p className="text-xs font-bold uppercase text-[var(--rt-accent)]">Menu system</p>
          <h2 className={`${headingClass} mt-3 text-4xl font-semibold leading-tight sm:text-5xl`}>Category-first and conversion-ready.</h2>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {data.menu.map((category) => (
            <motion.article
              key={category.name}
              {...reveal}
              className="rounded-[24px] border border-[var(--rt-line)] bg-[var(--rt-surface)] p-6"
            >
              <h3 className="text-xl font-bold">{category.name}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--rt-line)] bg-[var(--rt-bg)] px-3 py-2 text-sm text-[var(--rt-muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="template-spotlight" className="bg-[var(--rt-surface-alt)] py-16 text-[var(--rt-surface-alt-text)] lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div {...reveal} className="rounded-[28px] bg-[var(--rt-surface)] p-7">
            <p className="text-xs font-bold uppercase text-[var(--rt-accent-2)]">{data.spotlight.eyebrow}</p>
            <h2 className={`${headingClass} mt-3 text-4xl font-semibold leading-tight text-[var(--rt-text)] sm:text-5xl`}>{data.spotlight.title}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--rt-muted)]">{data.spotlight.body}</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.spotlight.points.map((point) => (
              <motion.div
                key={point}
                {...reveal}
                className="rounded-[24px] border border-[var(--rt-line)] bg-[var(--rt-surface)] p-5 text-lg font-bold text-[var(--rt-text)]"
              >
                {point}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="template-conversion" className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:py-24">
        <motion.div
          {...reveal}
          className="grid gap-8 rounded-[28px] bg-[var(--rt-text)] p-7 text-[var(--rt-inverse)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <div>
            <h2 className={`${headingClass} text-4xl font-semibold leading-tight sm:text-5xl`}>{data.conversion.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 opacity-75">{data.conversion.body}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#template-location" className="rounded-full bg-[var(--rt-accent)] px-5 py-3 text-sm font-bold text-[var(--rt-inverse)]">
              {data.conversion.primary}
            </a>
            <a href="#template-menu" className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold">
              {data.conversion.secondary}
            </a>
          </div>
        </motion.div>
      </section>

      <footer id="template-location" className="border-t border-[var(--rt-line)] bg-[var(--rt-surface)] px-5 py-12 sm:px-8">
        <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <h2 className="text-xl font-black uppercase">{data.name}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--rt-muted)]">{data.category} template preview built from {data.source.spec}.</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[var(--rt-accent)]">Visit</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--rt-muted)]">{data.location.address}</p>
            <p className="text-sm leading-7 text-[var(--rt-muted)]">{data.location.phone}</p>
            {data.location.email && <p className="text-sm leading-7 text-[var(--rt-muted)]">{data.location.email}</p>}
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase text-[var(--rt-accent)]">Hours</h3>
            <ul className="mt-3 space-y-1 text-sm leading-7 text-[var(--rt-muted)]">
              {data.location.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
