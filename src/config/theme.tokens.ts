/**
 * Design tokens (pixel-clone targets from the build plan, §3).
 *
 * These raw values are mirrored as CSS variables in src/app/globals.css.
 * Tailwind reads the CSS vars; D3 / canvas viz import the values from here
 * because they need real color strings at runtime, not `var(--x)`.
 *
 * Re-skin the template by editing both this file and the :root block in
 * globals.css (keep them in sync).
 */
export const tokens = {
  color: {
    bg: "#F6F6F2", // warm off-white page
    bgElevated: "#FFFFFF", // elevated surfaces sit lighter than the page
    text: "#17171A", // near-black
    textMuted: "#6B6B64", // warm gray
    border: "rgba(20,20,25,0.1)",
    accent: "#047857", // emerald-700, readable on light
    critical: "#DC2626",
    advisory: "#B45309",
  },
  font: {
    display: "var(--font-display)",
    body: "var(--font-body)",
  },
  motion: {
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
  },
} as const;

export type Tokens = typeof tokens;
