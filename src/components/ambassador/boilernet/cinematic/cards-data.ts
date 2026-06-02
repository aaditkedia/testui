export interface CinematicCard {
  title: string;
  subtitle: string;
  year: string;
  pos: [number, number, number];
  accent: string;
  category: string;
}

export const CARDS: CinematicCard[] = [
  {
    title: "PROMETHEUS",
    subtitle: "WebGL · Particle Physics",
    year: "2024",
    pos: [0, 0, -10],
    accent: "#ff6418",
    category: "INSTALLATION",
  },
  {
    title: "CHILE 2018",
    subtitle: "Interactive Installation",
    year: "2018",
    pos: [-8, 4, -30],
    accent: "#4dc8ff",
    category: "AR / VR",
  },
  {
    title: "E.C.H.O",
    subtitle: "Multiplayer AR Experience",
    year: "2023",
    pos: [10, -3, -50],
    accent: "#daaa00",
    category: "MULTIPLAYER",
  },
  {
    title: "VANTAGE",
    subtitle: "AI · Generative Art",
    year: "2025",
    pos: [-7, 2, -75],
    accent: "#c33dff",
    category: "AI",
  },
  {
    title: "BOILERNET",
    subtitle: "The line that ships founders",
    year: "2026",
    pos: [6, -1, -100],
    accent: "#ffb84d",
    category: "WEBSITE",
  },
];
