/**
 * Design tokens for both themes.
 *
 * These raw values are mirrored as CSS variables in src/app/globals.css
 * (`:root` = light, `.dark` = dark). Tailwind reads the CSS vars and flips
 * automatically with the `.dark` class on <html>.
 *
 * D3 / canvas viz can't read `var(--x)`, so they pull the active palette from
 * here via the useThemeColors() hook (src/lib/theme.tsx). Keep these values in
 * sync with globals.css when re-skinning.
 */
export const palettes = {
  light: {
    bg: "#F6F6F2", // warm off-white page
    bgElevated: "#FFFFFF", // elevated surfaces sit lighter than the page
    text: "#17171A", // near-black
    textMuted: "#6B6B64", // warm gray
    border: "rgba(20,20,25,0.1)",
    accent: "#047857", // emerald-700, readable on light
    critical: "#DC2626",
    advisory: "#B45309",
  },
  dark: {
    bg: "#0A0A0B", // near-black, slightly warm
    bgElevated: "#121214", // elevated surfaces sit lighter than the page
    text: "#F5F5F0", // off-white, slightly warm
    textMuted: "#8A8A85",
    border: "rgba(255,255,255,0.08)",
    accent: "#9FFFB0", // soft mint/lime
    critical: "#FF5C5C",
    advisory: "#FFC857",
  },
} as const;

export type ThemeName = keyof typeof palettes;
export type Palette = (typeof palettes)[ThemeName];

/** Motion tokens (theme-independent). */
export const motion = {
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;
