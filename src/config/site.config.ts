/**
 * Brand-level config. Swap these to repurpose the template for another product.
 * Nothing in components hardcodes the brand name; everything reads from here.
 */
export const siteConfig = {
  name: "Pravāh",
  tagline: "An AI lab for the power grid.",
  description:
    "Pravāh is an AI lab building forecasting, control, and planning models that keep the electric grid stable as demand outpaces it.",
  url: "https://example.com",
  email: "hello@example.com",
  nav: [
    { label: "Problem", href: "#problem" },
    { label: "Technology", href: "#technology" },
    { label: "Deployments", href: "#deployments" },
    { label: "Research", href: "#research" },
  ],
  cta: { label: "Get In Touch", href: "/get-in-touch" },
  socials: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
