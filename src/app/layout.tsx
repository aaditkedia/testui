import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
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
