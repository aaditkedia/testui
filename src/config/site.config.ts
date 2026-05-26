/**
 * Brand-level config. Swap these to repurpose the template for another product.
 * Nothing in components hardcodes the brand name; everything reads from here.
 */
export const siteConfig = {
  name: "Template Lab",
  tagline: "Reusable landing pages and website systems.",
  description:
    "A working gallery of reusable landing pages and website templates built from spec sheets and build plans.",
  url: "https://example.com",
  email: "hello@example.com",
  nav: [
    { label: "Templates", href: "/" },
    { label: "Contact", href: "/get-in-touch" },
    { label: "Team", href: "/our-team" },
  ],
  cta: { label: "Open Templates", href: "/" },
  socials: [
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
