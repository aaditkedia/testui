/**
 * Brand-level config. Swap these to repurpose the template for another product.
 * Nothing in components hardcodes the brand name; everything reads from here.
 */
export const siteConfig = {
  name: "AI Valley",
  tagline: "Where people building AI meet.",
  description:
    "AI Valley is the network for the people building AI: founders, researchers, and operators, connected city by city.",
  url: "https://example.com",
  email: "hello@example.com",
  nav: [
    { label: "Problem", href: "#problem" },
    { label: "Technology", href: "#technology" },
    { label: "Deployments", href: "#deployments" },
    { label: "Ambassadors", href: "/ambassador" },
  ],
  cta: { label: "Get In Touch", href: "/get-in-touch" },
  socials: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
