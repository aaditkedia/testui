/**
 * Shared content for the City Partner Program landing page.
 * Concepts A, B, and C all render this same content in three different visual
 * directions. Only the hero copy differs per concept (see `heroes`).
 */

export type Stat = { value: string; label: string; detail: string };
export type Perk = { title: string; blurb: string };

export const ambassador = {
  program: "City Partner Program",
  accent: "#0EA5E9",

  // Per-concept hero copy. Same intent, three voices.
  heroes: {
    a: {
      eyebrow: "City Partners",
      title: "Step inside the network.",
      sub: "City partners are the living interface of the network in their market. Represent the community, run the room, and plug local builders into useful opportunities.",
      cta: "Request access",
    },
    b: {
      eyebrow: "City Partners",
      title: "Be in the room.",
      sub: "Every chapter starts with one person who decides to lead. City partners host the dinners, open the doors, and bring their market into the network.",
      cta: "Apply",
    },
    c: {
      eyebrow: "01 / Introduction",
      title: "City partners.",
      sub: "We are building a practical network for builders. City partners lead it, one market at a time.",
      cta: "Apply",
    },
  },

  stats: [
    { value: "2,000+", label: "Builders", detail: "Founders, researchers, and operators already in the network." },
    { value: "40+", label: "Cities", detail: "Active chapters across four continents." },
    { value: "120", label: "Events / yr", detail: "Dinners, demo days, and summits run by city partners." },
    { value: "$5M+", label: "Raised", detail: "Capital raised by startups that met inside the network." },
  ] as Stat[],

  values: [
    { n: "01", title: "Curiosity over credentials", body: "We pick people by what they build, not where they studied." },
    { n: "02", title: "Build in public", body: "Ship, post, repeat. The network rewards momentum." },
    { n: "03", title: "Lift as you climb", body: "City partners open doors for the people behind them." },
    { n: "04", title: "Signal over noise", body: "Less talk, more demos. We protect everyone's attention." },
  ],

  commitment: ["5-8 hrs / week", "6-month term", "Quarterly summit"],

  perks: [
    { title: "Access to founders & investors", blurb: "Warm intros to the operators and funds inside the network." },
    { title: "Speaker & host opportunities", blurb: "Run events in your city and share the stage with people shipping real AI." },
    { title: "Travel & summit stipend", blurb: "We cover your way to the quarterly network summit." },
    { title: "A network of 2,000+ builders", blurb: "A private room with the most ambitious builders in AI." },
  ] as Perk[],

  timeline: [
    { n: "01", step: "Apply", note: "Two minutes. Tell us what you build." },
    { n: "02", step: "Interview", note: "A short call with the program team." },
    { n: "03", step: "Onboard", note: "Playbook, budget, and your first event." },
    { n: "04", step: "Launch", note: "Open your chapter and start hosting." },
  ],

  closing: "The next chapter gets written in your city. Lead it.",
  applyHref: "#apply",
} as const;

export type PartnerProgram = typeof ambassador;
