import type { Config } from "tailwindcss";

/**
 * Colors are wired to CSS variables defined in src/app/globals.css so the
 * whole theme can be re-skinned from one place. The same raw values live in
 * src/config/theme.tokens.ts for use inside D3 / canvas viz code.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        critical: "var(--critical)",
        advisory: "var(--advisory)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
      spacing: {
        section: "clamp(80px, 12vw, 160px)",
      },
      maxWidth: {
        container: "1200px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
