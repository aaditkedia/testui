/**
 * Theme config for the two "MAIN" scroll-driven WebGL concepts.
 * D = warm/cream/gold, E = dark/chrome/cyan. Same scene engine, two moods.
 */
export type MainVariant = "warm" | "dark";

export type MainTheme = {
  variant: MainVariant;
  pageBg: string;
  glow: string; // radial glow behind the canvas (CSS)
  ink: string; // headline text
  inkDim: string; // body / captions
  // 3D
  env: "warm" | "cool";
  core: string; // emissive core color
  metal: string; // chrome / ribbon tint
  fringe: number; // chromatic aberration on glass
  tile: string; // icon-field tile color
  particle: string;
};

export const MAIN_THEMES: Record<MainVariant, MainTheme> = {
  warm: {
    variant: "warm",
    pageBg: "linear-gradient(180deg,#EAE7DE 0%,#F3F0E8 100%)",
    glow: "radial-gradient(42% 42% at 50% 46%, rgba(242,201,140,0.95) 0%, rgba(217,160,99,0.45) 34%, rgba(234,231,222,0) 70%)",
    ink: "#2A2722",
    inkDim: "rgba(42,39,34,0.62)",
    env: "warm",
    core: "#F2C98C",
    metal: "#C4733A",
    fringe: 0.28,
    tile: "#3A3732",
    particle: "#F2C98C",
  },
  dark: {
    variant: "dark",
    pageBg: "linear-gradient(180deg,#06080C 0%,#0A0E16 100%)",
    glow: "radial-gradient(44% 44% at 50% 44%, rgba(14,165,233,0.55) 0%, rgba(56,120,180,0.25) 36%, rgba(6,8,12,0) 70%)",
    ink: "#EAF2F7",
    inkDim: "rgba(234,242,247,0.55)",
    env: "cool",
    core: "#7DD3FC",
    metal: "#9FB6C6",
    fringe: 0.18,
    tile: "#11161F",
    particle: "#7DD3FC",
  },
};
