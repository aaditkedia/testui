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
    bg: "#0A0A0B", // near-black, slightly warm
    bgElevated: "#121214",
    text: "#F5F5F0", // off-white, slightly warm
    textMuted: "#8A8A85",
    border: "rgba(255,255,255,0.08)",
    accent: "#9FFFB0", // soft mint/lime
    critical: "#FF5C5C",
    advisory: "#FFC857",
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
