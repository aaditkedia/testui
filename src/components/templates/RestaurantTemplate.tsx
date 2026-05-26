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

function FoodVisual({ visual }: { visual: RestaurantVisual }) {
  if (visual === "steakhouse") {
    return (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[28px] bg-[#241814] p-5 text-[#FFF3E4] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(200,164,106,.32),transparent_28%),radial-gradient(circle_at_72%_55%,rgba(155,31,31,.42),transparent_36%),linear-gradient(145deg,#2B1712,#0F0908)]" />
        <div className="absolute left-8 top-8 h-28 w-28 rounded-full border border-[#C8A46A]/50 bg-[#160C09] shadow-[0_0_0_18px_rgba(200,164,106,.08)]" />
        <div className="absolute bottom-12 right-8 h-44 w-44 rounded-full bg-[#5D1713] shadow-[inset_0_0_0_18px_rgba(255,243,228,.05)]" />
        <div className="absolute bottom-24 right-20 h-20 w-28 rotate-[-18deg] rounded-full bg-[#9B1F1F] shadow-xl" />
        <div className="absolute bottom-16 left-9 w-48 rounded-2xl border border-[#C8A46A]/30 bg-black/20 p-4 backdrop-blur">
          <p className="text-xs uppercase">Tonight</p>
          <p className="mt-2 text-2xl font-semibold">Prime Rib Sunday</p>
        </div>
      </div>
    );
  }

  if (visual === "shelby") {
    return (
      <div className="relative grid h-full min-h-[360px] grid-cols-[1.05fr_.75fr] gap-4">
        <div className="relative overflow-hidden rounded-[28px] bg-[#2A1D15]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_28%,rgba(184,111,60,.62),transparent_28%),linear-gradient(145deg,#12100e,#4b2a19_70%,#B86F3C)]" />
          <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-[#F8F2E8]/92 p-5 text-[#191511]">
            <p className="text-xs uppercase text-[#6F6254]">Seasonal feature</p>
            <p className="mt-2 text-2xl font-semibold">Brunch and dinner, framed editorially.</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[24px] bg-[#EFE4D3] p-5">
            <div className="h-full rounded-full bg-[radial-gradient(circle,#46664C_0_26%,#D9B78F_27%_42%,#EFE4D3_43%)]" />
          </div>
          <div className="rounded-[24px] bg-[#11100E] p-5 text-[#FFF7EC]">
            <p className="text-sm uppercase text-[#D9B78F]">Reserve</p>
            <p className="mt-4 text-3xl">Resy + Toast</p>
          </div>
        </div>
      </div>
    );
  }

  if (visual === "sandwich") {
    return (
      <div className="relative h-full min-h-[360px] overflow-hidden rounded-[28px] border-2 border-[#2A2018] bg-[#F2E2C3] p-6">
        <div className="absolute -right-10 -top-8 h-36 w-36 rotate-12 rounded-[32px] bg-[#F2B84B]" />
        <div className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-[#4B7F38]/80" />
        <div className="relative mx-auto mt-10 h-44 max-w-sm rounded-[42px] bg-[#D6452F] shadow-xl">
          <div className="absolute left-7 right-7 top-6 h-11 rounded-full bg-[#F7DDAE]" />
          <div className="absolute left-10 right-10 top-20 h-7 rounded-full bg-[#4B7F38]" />
          <div className="absolute left-8 right-8 top-28 h-10 rounded-full bg-[#FFF7EA]" />
          <div className="absolute -left-4 top-16 rotate-[-2deg] rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#D6452F] shadow">
            Best Seller
          </div>
        </div>
        <div className="absolute bottom-7 right-7 max-w-[220px] rounded-2xl bg-white p-4 shadow-lg">
          <p className="text-xs uppercase text-[#765F4A]">Catering</p>
          <p className="mt-1 text-xl font-bold text-[#2A2018]">Trays, box lunches, and pickup.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-[28px] bg-[#F4E5C6] p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(224,167,34,.5),transparent_26%),radial-gradient(circle_at_76%_72%,rgba(199,66,47,.28),transparent_34%)]" />
      <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-[#FFF8EC] shadow-[inset_0_0_0_18px_rgba(47,125,50,.12)]" />
      <div className="absolute left-20 top-20 h-28 w-28 rounded-full bg-[conic-gradient(#2F7D32,#E0A722,#C7422F,#2F7D32)]" />
      <div className="absolute bottom-10 right-10 w-64 rounded-3xl bg-white p-5 shadow-xl">
        <p className="text-xs uppercase text-[#65705C]">Fresh favorite</p>
        <p className="mt-2 text-2xl font-bold text-[#1C2418]">Shawarma bowls, falafel, hummus, baklava.</p>
      </div>
    </div>
  );
}

export default function RestaurantTemplate({ data }: { data: RestaurantTemplateData }) {
  const vars = {
    "--rt-bg": data.theme.bg,
    "--rt-surface": data.theme.surface,
    "--rt-surface-alt": data.theme.surfaceAlt,
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
      <header className="sticky top-0 z-30 border-b border-[var(--rt-line)] bg-[var(--rt-bg)]/88 backdrop-blur-xl">
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
          <h1 className={`${headingClass} mt-5 max-w-4xl text-5xl font-semibold leading-[1.03] sm:text-6xl lg:text-7xl`}>
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
            {data.featured.map((item) => (
              <motion.article
                key={item.name}
                {...reveal}
                className="group overflow-hidden rounded-[26px] border border-[var(--rt-line)] bg-[var(--rt-bg)]"
              >
                <div className="h-40 bg-[linear-gradient(135deg,var(--rt-accent),var(--rt-accent-3),var(--rt-accent-2))] transition-transform duration-500 group-hover:scale-[1.02]" />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--rt-surface)] px-3 py-1 text-xs font-bold text-[var(--rt-accent)]">
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
                  <span key={item} className="rounded-full bg-[var(--rt-bg)] px-3 py-2 text-sm text-[var(--rt-muted)]">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="template-spotlight" className="bg-[var(--rt-surface-alt)] py-16 text-[var(--rt-text)] lg:py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div {...reveal} className="rounded-[28px] bg-[var(--rt-surface)] p-7">
            <p className="text-xs font-bold uppercase text-[var(--rt-accent)]">{data.spotlight.eyebrow}</p>
            <h2 className={`${headingClass} mt-3 text-4xl font-semibold leading-tight sm:text-5xl`}>{data.spotlight.title}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--rt-muted)]">{data.spotlight.body}</p>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.spotlight.points.map((point) => (
              <motion.div
                key={point}
                {...reveal}
                className="rounded-[22px] border border-[var(--rt-line)] bg-[var(--rt-surface)] p-5 text-lg font-bold"
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
            <h3 className="text-sm font-bold uppercase text-[var(--rt-accent)]">Hours seed</h3>
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
