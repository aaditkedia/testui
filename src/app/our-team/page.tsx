import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = { title: "Our Team" };

// Template data: move to src/config/content.config.ts when wiring real people.
const team = [
  { name: "A. Rao", role: "Forecasting", initials: "AR" },
  { name: "M. Schein", role: "Network ML", initials: "MS" },
  { name: "K. Osei", role: "Perception", initials: "KO" },
  { name: "L. Park", role: "RL & planning", initials: "LP" },
  { name: "D. Volkov", role: "Platform", initials: "DV" },
  { name: "S. Nair", role: "Grid operations", initials: "SN" },
];

export default function OurTeam() {
  return (
    <>
      <main className="mx-auto min-h-screen max-w-container px-5 pb-24 pt-36 sm:px-8">
        <p className="eyebrow">Our team</p>
        <h1 className="h-section mt-4 max-w-2xl">Researchers and operators, building in one room.</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">
          A small team spanning machine learning research and frontline grid operations.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-border bg-bg-elevated/40 p-6 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-text/20"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-bg text-sm font-semibold text-accent">
                {m.initials}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tightest">{m.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{m.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link href="/" className="text-sm text-text-muted transition-colors hover:text-text">
            &larr; Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
