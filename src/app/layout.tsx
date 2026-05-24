import type { Metadata } from "next";
import { Inter, Inter_Tight, Fraunces, JetBrains_Mono, Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";
import SmoothScroll from "@/lib/smooth-scroll";
import { ThemeProvider } from "@/lib/theme";
import { themeInitScript } from "@/lib/theme-config";
import Nav from "@/components/ui/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Concepts G (NGPES) + H (Berco): modern humanist sans with tight letterforms.
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

// Editorial serif (Concepts B + C display) and mono labels.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Concept D (Corn): bold condensed all-caps display.
const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-condensed",
  display: "swap",
});

// Concept F (HELIOS): thin elegant serif display.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-serif-thin",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}: ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name}: ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${fraunces.variable} ${jetbrainsMono.variable} ${bebas.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <SmoothScroll>
            <Nav />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
