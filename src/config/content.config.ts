/**
 * All page copy lives here, ordered. Sections read from this object and stay
 * "dumb". To repurpose the template, edit this file (and site.config.ts) only.
 *
 * NOTE: the original pravah.com copy is a reference for structure. Swap the
 * verbatim wording when deploying this for a real product.
 */

export type FloatingCardData = {
  variant: "critical" | "advisory" | "normal";
  badge: string;
  title: string;
  body: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
};

export type ProblemCard = { heading: string; body: string };

export type VizKind = "forecast" | "graph" | "asset" | "rltree";

export type VisionBlockData = {
  eyebrow: string;
  title: string;
  body: string;
  viz: VizKind;
  reverse: boolean;
};

export type Marker = { name: string; coordinates: [number, number]; status: "live" | "pilot" };

export type ResearchPaper = { title: string; venue: string; href: string };

export const content = {
  hero: {
    lines: ["The grid is at its limits.", "We build the intelligence to push past them."],
    sub: "Pravāh is an AI lab building forecasting, control, and planning models for the electric grid, so operators see failures before they happen and act in seconds, not hours.",
    cta: { label: "Get In Touch", href: "/get-in-touch" },
    cards: [
      {
        variant: "critical",
        badge: "Critical",
        title: "Transformer T-17 overload in 42 min",
        body: "Feeder 12 load exceeds thermal limit before system peak.",
        position: { top: "10%", right: "3%" },
        delay: 0.4,
      },
      {
        variant: "advisory",
        badge: "Advisory",
        title: "Solar dropoff forecast, 18:40",
        body: "Cloud front cuts 240 MW PV output across the western cluster.",
        position: { top: "42%", right: "14%" },
        delay: 0.7,
      },
      {
        variant: "normal",
        badge: "Stable",
        title: "70°F, clear skies",
        body: "Demand tracking 2.1% under day-ahead forecast.",
        position: { bottom: "10%", right: "5%" },
        delay: 1.0,
      },
    ] as FloatingCardData[],
  },

  problem: {
    eyebrow: "The problem",
    title: "Demand is accelerating. The grid was not built for it.",
    cards: [
      {
        heading: "Load is exploding",
        body: "Data centers, electrification, and EVs are adding load faster than capacity can be built. Peaks are sharper and harder to predict.",
      },
      {
        heading: "Supply got volatile",
        body: "Wind and solar swing with the weather. Operators balance a system that changes by the minute with tools built for steady baseload.",
      },
      {
        heading: "Decisions are too slow",
        body: "Critical calls still rely on spreadsheets and intuition. By the time a human spots a cascade, the window to act has closed.",
      },
      {
        heading: "Failures cascade",
        body: "One overloaded transformer trips the next. Localized faults turn into regional blackouts within seconds.",
      },
    ] as ProblemCard[],
  },

  technology: {
    eyebrow: "Technology",
    title: "Four models, one operating picture.",
    blocks: [
      {
        eyebrow: "Forecasting",
        title: "See load and generation before they arrive.",
        body: "Probabilistic forecasts for demand and renewable output, with calibrated confidence bands so operators know exactly how much headroom they have.",
        viz: "forecast",
        reverse: false,
      },
      {
        eyebrow: "Network intelligence",
        title: "Model the grid as the graph it actually is.",
        body: "A graph neural network watches every node and line, flags stress in real time, and traces how a single fault would propagate through the network.",
        viz: "graph",
        reverse: true,
      },
      {
        eyebrow: "Asset perception",
        title: "Map every asset from above.",
        body: "Computer vision over satellite and drone imagery inventories transformers, lines, and solar capacity, then keeps the digital twin current.",
        viz: "asset",
        reverse: false,
      },
      {
        eyebrow: "Planning",
        title: "Search thousands of futures, pick the safe one.",
        body: "A reinforcement-learning planner rolls out grid trajectories under uncertainty and recommends the dispatch that keeps every branch inside limits.",
        viz: "rltree",
        reverse: true,
      },
    ] as VisionBlockData[],
  },

  deployments: {
    eyebrow: "Deployments",
    title: "Running where the grid is under the most strain.",
    body: "From dense industrial corridors to renewable-heavy regions, our models run alongside operators in production.",
    markers: [
      { name: "Bengaluru, India", coordinates: [77.59, 12.97], status: "live" },
      { name: "Munich, Germany", coordinates: [11.58, 48.14], status: "live" },
      { name: "Austin, USA", coordinates: [-97.74, 30.27], status: "pilot" },
    ] as Marker[],
    stats: [
      { value: "1,000", label: "nodes monitored", tone: "normal" },
      { value: "102", label: "advisories / day", tone: "advisory" },
      { value: "82", label: "critical events caught", tone: "critical" },
    ],
  },

  research: {
    eyebrow: "Research",
    title: "We publish what we learn.",
    papers: [
      {
        title: "Calibrated probabilistic load forecasting under extreme demand growth",
        venue: "arXiv 2026",
        href: "https://arxiv.org",
      },
      {
        title: "Graph neural networks for real-time cascade prediction in power networks",
        venue: "arXiv 2025",
        href: "https://arxiv.org",
      },
      {
        title: "Risk-aware reinforcement learning for grid dispatch",
        venue: "NeurIPS 2025",
        href: "https://arxiv.org",
      },
    ] as ResearchPaper[],
  },

  investors: {
    eyebrow: "Backed by",
    logos: ["Sequoia", "a16z", "Lux Capital", "Lowercarbon", "DCVC", "Breakthrough"],
  },

  finalCta: {
    title: "The next decade of the grid runs on models. Let us build yours.",
    cta: { label: "Get In Touch", href: "/get-in-touch" },
  },
} as const;

export type Content = typeof content;
