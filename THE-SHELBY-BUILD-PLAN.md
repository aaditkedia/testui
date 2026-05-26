# BUILD PLAN — "The Shelby" production restaurant template

> **For:** Claude Code or any coding agent. Work **phase by phase, top to bottom**. Each phase has an acceptance gate; do not start the next phase until the current phase passes. Commit at the end of every phase.
>
> **Reference file in this repo:** `the-shelby-spec.md` is the source of truth for visual direction, page behavior, section copy, data contracts, and interaction details.
>
> This file is the source of truth for **architecture, implementation order, QA gates, and production readiness**.

---

## 0. Goal & scope

Build a **full production-style restaurant website template** inspired by **The Shelby** — not a one-screen landing page. The site must support discovery, menu browsing, high-intent conversion, local SEO, image storytelling, mobile ordering, and future content replacement for another restaurant in the same category.

**Template type:** upscale modern American / seasonal neighborhood restaurant template

**Core business goal:** turn photo-led discovery into reservations, online orders, brunch traffic, and repeat visits

**Primary CTAs:** Reserve Your Table, Order Online, Call, View Menu

**Source observations from the live site:** the live site exposes a Toast-powered order flow, a Resy reservation link, a welcome/gallery experience, location hours, phone, and a large Lunch & Dinner plus Brunch menu.

### In scope

- [ ] Multi-route restaurant site, not a single landing page.
- [ ] Home, menu, brunch, order, reservations, gallery, private/events placeholder, and contact routes.
- [ ] Toast ordering and Resy reservation link slots through environment variables.
- [ ] Data-driven menu with Lunch & Dinner and Brunch categories.
- [ ] Polished food photography system and gallery carousel.
- [ ] Restaurant schema, local SEO, accessibility, and mobile sticky CTAs.

### Out of scope for v1

- [ ] Building a custom POS, cart, or payment system.
- [ ] Scraping live Toast data at runtime.
- [ ] Real-time table availability.
- [ ] Account login or rewards in v1.
- [ ] Copying proprietary photography without client-provided rights.

---

## 1. Stack (locked — do not casually substitute)

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
npm i framer-motion lucide-react zod react-hook-form @hookform/resolvers
npm i next-sitemap schema-dts clsx tailwind-merge
npm i @vercel/analytics @vercel/speed-insights
npm i -D prettier
```

| Concern | Library / approach |
|---|---|
| Framework | Next.js App Router + React Server Components where possible |
| Styling | Tailwind + CSS variables in `globals.css`; no heavy UI kit unless explicitly approved |
| Animation | `framer-motion` for section reveals, drawers, cards, and route transitions |
| Icons | `lucide-react` |
| Data | Local typed data files in `src/data/*.ts` first; CMS-ready interfaces, no hard-coded menu cards in JSX |
| Forms | `react-hook-form` + `zod`; server actions stubbed for contact/catering/jobs |
| SEO | `generateMetadata`, JSON-LD restaurant schema, OpenGraph images, sitemap |
| Analytics | Vercel Analytics + event tracking wrappers for order/reservation/catering clicks |
| Deployment | Vercel, with environment variables for ordering/reservation/form endpoints |
```

**Do not add:** a large UI kit, a CMS client, a map SDK, carousel libraries, date-picker libraries, or animation libraries beyond Framer Motion unless a phase explicitly asks for it. Keep the template easy to clone and re-skin.

Node 20+. Pin versions in `package.json` after install.

---

## 2. Final file structure

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    menu/page.tsx
    catering/page.tsx
    reservations/page.tsx
    order/page.tsx
    gift-cards/page.tsx
    events/page.tsx
    gallery/page.tsx
    contact/page.tsx
    about/page.tsx
    not-found.tsx
  components/
    nav/SiteHeader.tsx
    nav/MobileMenu.tsx
    footer/SiteFooter.tsx
    sections/
      Hero.tsx
      FeaturedItems.tsx
      StoryBlock.tsx
      MenuPreview.tsx
      CateringCTA.tsx
      Reviews.tsx
      GalleryRail.tsx
      HoursLocation.tsx
      FinalCTA.tsx
    ui/
      Button.tsx
      Eyebrow.tsx
      SectionHeader.tsx
      DishCard.tsx
      MenuCategoryTabs.tsx
      PromoCard.tsx
      ImageReveal.tsx
      ReservationBar.tsx
      ContactForm.tsx
      CateringInquiryForm.tsx
      DietaryPill.tsx
      StickyCTA.tsx
  data/
    brand.ts
    navigation.ts
    menu.ts
    promotions.ts
    gallery.ts
    testimonials.ts
    hours.ts
    schema.ts
  lib/
    cn.ts
    analytics.ts
    schema.ts
    format.ts
public/
  images/
  logos/
  og/
```

### Route contract

- `/` — Homepage with hero, menu previews, brunch, story, gallery, hours, final CTA
- `/menu` — Full menu with Lunch & Dinner, Brunch, filters, and deep links
- `/brunch` — Dedicated brunch story and menu module
- `/reservations` — Reservation explainer with Resy redirect
- `/order` — Order-online handoff with Toast CTA and popular pickup items
- `/gallery` — Food/interior image gallery
- `/events` — Private dining / events inquiry placeholder
- `/contact` — Hours, phone, directions, contact form

Routes may be hidden from the nav when the current brand does not need them, but keep the route components in place because this is a template library.

---

## 3. Data contracts

Build components against data contracts first. Never hard-code restaurant facts inside UI components.

### `src/data/brand.ts`

```ts
export const brand = {
  name: "The Shelby",
  shortName: "Shelby",
  tagline: "Welcome to The Shelby",
  description: "Seasonal modern American dining with brunch, dinner, cocktails, and polished casual hospitality.",
  phone: "(610) 841-0808",
  email: "",
  address: {
    street: "707 North Krocks Road, Suite 104",
    city: "Allentown",
    region: "PA",
    postalCode: "18106",
  },
  orderingUrl: process.env.NEXT_PUBLIC_ORDERING_URL,
  reservationUrl: process.env.NEXT_PUBLIC_RESERVATION_URL,
  social: { instagram: "", facebook: "", x: "" },
} as const;
```

### `src/data/menu.ts`

```ts
export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  prices?: { label: string; price: string }[];
  category: string;
  image?: string;
  tags?: ("popular" | "vegetarian" | "vegan" | "gluten-free" | "spicy" | "signature")[];
  modifiers?: string[];
};

export type MenuCategory = {
  id: string;
  label: string;
  eyebrow?: string;
  description?: string;
  items: MenuItem[];
};
```

### `src/data/promotions.ts`

```ts
export type Promo = {
  id: string;
  title: string;
  eyebrow?: string;
  description: string;
  schedule?: string;
  price?: string;
  image: string;
  cta: { label: string; href: string };
};
```

### Required component contracts

| Component | Contract |
|---|---|
| `SectionHeader` | `{ eyebrow, title, lead, align }`; title supports `<strong>` spans for emphasized words. |
| `DishCard` | Renders image, name, description, prices, tags, add-to-order CTA. It must work in grid and horizontal-scroll contexts. |
| `MenuCategoryTabs` | Sticky desktop tab rail + mobile select; reads categories from `menu.ts`. |
| `ReservationBar` | Sticky conversion strip with order/reserve/call buttons and today's hours. |
| `PromoCard` | Used for specials/events/catering cards, with schedule and pricing slots. |
| `HoursLocation` | Address, phone, map embed placeholder, weekly hours, directions CTA. |
| `CateringInquiryForm` | zod-validated form with name, email, phone, date, guest count, event type, notes. |

---

## 4. Build phases

### Phase 0 — Scaffold + data spine
- [ ] Create the Next.js project with the locked stack and exact folder structure.
- [ ] Add typed `brand`, `navigation`, `hours`, `menu`, `gallery`, and `promotions` data files before building UI.
- [ ] Load the chosen Google fonts and define brand CSS variables in `globals.css`.
- [ ] Render placeholder route shells for Home, Menu, Catering, Reservations, Order, Gallery, About, Contact, and Events/Gift Cards when applicable.
- [ ] Wire metadata defaults, favicon, robots policy, sitemap config, and base JSON-LD restaurant schema.
- [ ] Gate: `npm run dev` works, every route loads, no hydration warnings, and all data is imported through typed data modules.

### Phase 1 — Design system + global shell
- [ ] Build `SiteHeader`, `MobileMenu`, `SiteFooter`, `Button`, `Eyebrow`, `SectionHeader`, `StickyCTA`, and `ReservationBar` primitives.
- [ ] Create consistent spacing utilities: page gutters, max-width containers, section block padding, image radius tokens, and shadow tokens.
- [ ] Implement the header in transparent-over-hero and solid-after-scroll states.
- [ ] Footer must include location, hours summary, primary CTAs, social links, legal links, and attribution placeholders.
- [ ] Gate: the site already feels branded with empty content sections, responsive nav works at 375px, and keyboard focus states are visible.

### Phase 2 — Home page production sections
- [ ] Replace placeholders with final homepage section order from the spec.
- [ ] Use real data objects for featured dishes, promos, testimonials, and calls-to-action.
- [ ] Add image aspect-ratio wrappers so layout shift stays near zero even before real photography arrives.
- [ ] Gate: Home is fully navigable top-to-bottom, every CTA has a valid link or clearly marked environment-variable placeholder.

### Phase 3 — Menu system
- [ ] Build menu category tabs, mobile select fallback, dish cards, price variants, modifiers, tags, and allergen/dietary notes.
- [ ] Support deep links like `/menu#starters`, `/menu#sandwiches`, `/menu#brunch`, and preserve active state on scroll.
- [ ] Add search/filter for categories when the menu is long.
- [ ] Gate: Menu renders from data only, no duplicate content in JSX, all categories are keyboard navigable.

### Phase 4 — Conversion pages and integrations
- [ ] Build Order, Reservations, Catering, Gift Cards/Events/Jobs pages required by the brand.
- [ ] External ordering/reservation links open with analytics tracking and accessible labels.
- [ ] Forms validate client-side and server-side; server actions can initially log/stub submission but must expose the integration point.
- [ ] Gate: all conversion flows are tested on desktop and mobile; broken external links are not allowed.

### Phase 5 — Story, gallery, reviews, and trust
- [ ] Build About/Story content with editorial image pairing.
- [ ] Build Gallery with masonry or rail layout, modal lightbox, image captions, and alt text.
- [ ] Build Reviews section with sourced quote placeholders and schema-safe markup.
- [ ] Gate: visual pages are polished, images are optimized through `next/image`, and captions/alt text are meaningful.

### Phase 6 — Motion, polish, and responsive QA
- [ ] Add framer-motion reveals with reduced-motion fallbacks.
- [ ] Polish hover states for cards, nav links, menu tabs, forms, and CTA buttons.
- [ ] Check tablet and phone layouts: header, sticky CTA, image crops, menu tabs, forms, and footer.
- [ ] Gate: no animation blocks content, reduced motion disables non-essential movement, and the site feels complete at 375px.

### Phase 7 — SEO, accessibility, performance
- [ ] Add page-level metadata, OG images, local business JSON-LD, menu structured data where safe, and FAQ schema where present.
- [ ] Run accessibility checks: headings, landmarks, color contrast, keyboard order, form errors, focus trap in mobile menu and lightbox.
- [ ] Run Lighthouse and bundle analysis; image optimization and route splitting must be verified.
- [ ] Gate: Lighthouse targets: Performance ≥90 desktop / ≥80 mobile, Accessibility ≥95, SEO ≥95, Best Practices ≥95.

### Phase 8 — Definition of Done
- [ ] All production routes render without console errors.
- [ ] Every menu, promo, hour, address, and CTA lives in data files or env variables.
- [ ] All content can be replaced for another restaurant template without rewriting components.
- [ ] Deployment succeeds on Vercel and the README documents content-editing workflow.

---

## 5. Brand-specific implementation notes

- [ ] Keep the Shelby template elegant and editorial, not loud.
- [ ] Homepage should prioritize reservation and order actions equally.
- [ ] Menu structure must support both Lunch & Dinner and Brunch without duplicating dish-card components.
- [ ] Use a restrained seasonal accent system so menu photos stay dominant.
- [ ] Include a private dining/events placeholder even if the current site only exposes reservations and order links.

---

## 6. QA checklist

- [ ] Homepage contains all sections listed in `the-shelby-spec.md`.
- [ ] Menu page supports category deep links, mobile tabs, tags, prices, and item images.
- [ ] Header CTAs match the business model: Reserve Your Table, Order Online, Call, View Menu.
- [ ] Contact and location information matches the data file, not JSX literals.
- [ ] JSON-LD validates as Restaurant/LocalBusiness with address, phone, hours, and sameAs links.
- [ ] All external order/reservation/gift-card links use `rel="noopener noreferrer"` and analytics tracking.
- [ ] Images have reserved aspect ratios and descriptive alt text.
- [ ] Forms include visible error messages and success states.
- [ ] Reduced-motion mode disables non-essential section reveals.
- [ ] Lighthouse and accessibility gates pass before deploy.

---

## 7. Suggested commit sequence

`chore: scaffold restaurant template` →
`feat: Shelby design tokens and shell` →
`feat: homepage sections` →
`feat: menu system` →
`feat: conversion routes and forms` →
`feat: story gallery reviews` →
`polish: responsive motion seo accessibility` →
`chore: qa and deploy`

---

## 8. Stretch goals

- [ ] Toast menu sync adapter behind a server route.
- [ ] Resy availability widget embed.
- [ ] Seasonal menu badge automation.
- [ ] Chef notes / ingredient origin modules.
- [ ] Email capture tied to reservation confirmation flow.
