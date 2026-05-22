/**
 * Shared content for the AI Valley Ambassador Program landing page.
 * Concepts A, B, and C all render this same content in three different visual
 * directions. Only the hero copy differs per concept (see `heroes`).
 */

export type Stat = { value: string; label: string; detail: string };
export type Perk = { title: string; blurb: string };

export const ambassador = {
  program: "AI Valley Ambassador Program",
  accent: "#0EA5E9", // AIV sky blue

  // Per-concept hero copy. Same intent, three voices.
  heroes: {
    a: {
      eyebrow: "AI Valley Ambassadors",
      title: "Step inside the network.",
      sub: "Ambassadors are the living interface of AI Valley in their city. Represent the network, run the room, and plug your community into the people building the future.",
      cta: "Request access",
    },
    b: {
      eyebrow: "AI Valley Ambassadors",
      title: "Be in the room.",
      sub: "Every AI Valley chapter starts with one person who decides to lead. Ambassadors host the dinners, open the doors, and bring their city into the network.",
      cta: "Apply",
    },
    c: {
      eyebrow: "01 / Introduction",
      title: "Ambassadors.",
      sub: "We are building the largest network of AI builders on earth. Ambassadors lead it, one city at a time.",
      cta: "Apply",
    },
  },

  stats: [
    { value: "2,000+", label: "Builders", detail: "Founders, researchers, and operators already in the network." },
    { value: "40+", label: "Cities", detail: "Active AI Valley chapters across four continents." },
    { value: "120", label: "Events / yr", detail: "Dinners, demo days, and summits run by ambassadors." },
    { value: "$5M+", label: "Raised", detail: "Capital raised by startups that met inside the network." },
  ] as Stat[],

  values: [
    { n: "01", title: "Curiosity over credentials", body: "We pick people by what they build, not where they studied." },
    { n: "02", title: "Build in public", body: "Ship, post, repeat. The network rewards momentum." },
    { n: "03", title: "Lift as you climb", body: "Ambassadors open doors for the people behind them." },
    { n: "04", title: "Signal over noise", body: "Less talk, more demos. We protect everyone's attention." },
  ],

  commitment: ["5-8 hrs / week", "6-month term", "Quarterly summit"],

  perks: [
    { title: "Access to founders & investors", blurb: "Warm intros to the operators and funds inside the AI Valley network." },
    { title: "Speaker & host opportunities", blurb: "Run events in your city and share the stage with people shipping real AI." },
    { title: "Travel & summit stipend", blurb: "We cover your way to the quarterly AI Valley summit." },
    { title: "A network of 2,000+ builders", blurb: "A private room with the most ambitious builders in AI." },
  ] as Perk[],

  timeline: [
    { n: "01", step: "Apply", note: "Two minutes. Tell us what you build." },
    { n: "02", step: "Interview", note: "A short call with the AI Valley team." },
    { n: "03", step: "Onboard", note: "Playbook, budget, and your first event." },
    { n: "04", step: "Launch", note: "Open your chapter and start hosting." },
  ],

  closing: "The next chapter of AI Valley gets written in your city. Lead it.",
  applyHref: "#apply",
} as const;

export type Ambassador = typeof ambassador;
