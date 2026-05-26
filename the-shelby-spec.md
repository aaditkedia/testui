# Website Recreation / Template Spec — "The Shelby"

> This spec is meant to guide a **production-quality template website** inspired by the current public The Shelby website. It should preserve the restaurant's business model, content hierarchy, and conversion needs, while upgrading the experience into a reusable modern template.
>
> Treat live-site wording and menu items as seed content. The implementation must keep content in typed data files so the template can be re-skinned for another restaurant without component rewrites.

---

## 1. What this website is

A **upscale modern American / seasonal neighborhood restaurant template** for **The Shelby**. The site should feel like an upscale but approachable neighborhood restaurant: warm, confident, photo-driven, and seasonal without feeling stuffy.

The current live presence tells us this brand needs:

- [ ] A clear reservation path via Resy.
- [ ] A clear online ordering path via Toast.
- [ ] A menu system that handles starters, salads, sandwiches, mains, pizza, kids, dessert, and brunch.
- [ ] A location and hours module for Allentown guests.
- [ ] A gallery-forward homepage because the existing site leans heavily on imagery.

### Template positioning

This is not just a homepage. The finished template must include:

- [ ] Homepage with editorial hero and strong conversion CTAs.
- [ ] Full menu route with category tabs and brunch toggle.
- [ ] Dedicated order and reservation handoff pages.
- [ ] Gallery route with optimized images and captions.
- [ ] Contact/location page with hours, phone, map placeholder, and schema.

---

## 2. Source snapshot

| Field | Current content to support |
|---|---|
| Brand | The Shelby |
| Tagline / hero direction | Welcome to The Shelby |
| Address | 707 North Krocks Road, Suite 104, Allentown, PA 18106 |
| Phone | (610) 841-0808 |
| Email |  |
| Primary actions | Reserve Your Table, Order Online, Call, View Menu |
| Menu focus | modern American starters, salads, sandwiches, mains, pizzas, kids, dessert, and brunch features |
| Operational focus | pickup ordering, reservations, brunch discovery, location/hours, and social proof |

---

## 3. Design system

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#11100E` | deep espresso background for premium areas |
| `--surface` | `#F8F2E8` | warm ivory page surfaces |
| `--surface-alt` | `#EFE4D3` | secondary parchment panels |
| `--text` | `#191511` | primary text on light surfaces |
| `--text-inverse` | `#FFF7EC` | text on dark hero panels |
| `--muted` | `#6F6254` | secondary copy |
| `--accent` | `#B86F3C` | burnt copper CTA and hover accent |
| `--accent-2` | `#46664C` | herb green seasonal accent |
| `--line` | `rgba(25,21,17,.14)` | hairline dividers |

### Typography

Use `Cormorant Garamond` or `Libre Baskerville` for large editorial headlines, paired with `Inter` or `Source Sans 3` for body and interface. Headlines should be generous and restaurant-editorial; UI text should be crisp and legible. Use emphasized italic or small-caps sparingly for seasonal labels.

### Layout language

- [ ] Editorial two-column hero: large food/interior image plus reservation/order card.
- [ ] Warm ivory content sections alternating with dark espresso image bands.
- [ ] Menu pages use sticky category navigation and a readable single-column item list on mobile.
- [ ] Gallery uses large asymmetric crops, not tiny equal thumbnails.
- [ ] Conversion CTAs repeat at natural decision points: hero, menu preview, brunch, hours, footer.

### Buttons and links

- [ ] Primary button: filled copper, ivory text, rounded pill, strong hover darken.
- [ ] Secondary button: transparent with espresso border, copper hover fill.
- [ ] Text link: serif underline for editorial sections; arrow glyph optional.
- [ ] Phone/order CTAs must be large enough for mobile thumb use.

### Motion mood

Quiet upscale motion: slow image fades, subtle card lifts, no flashy parallax. Food photography is the hero.

---

## 4. Site map and section-by-section breakdown

| # | Page / route | Purpose | Required sections | Notes |
|---|---|---|---|---|
| 1 | **Home `/`** | Convert hungry local visitors into reservation/order actions. | Hero, quick actions, menu highlights, brunch feature, story strip, gallery rail, hours/location, final CTA. | Hero must mention order and reservations above fold. |
| 2 | **Menu `/menu`** | Full browsable menu. | Category tabs, menu item list, dietary tags, brunch switch, order CTA. | Lunch & Dinner and Brunch can be tab groups. |
| 3 | **Brunch `/brunch`** | Market weekend brunch and special brunch dishes. | Brunch hero, featured brunch dishes, hours, reservation CTA. | Can be hidden if client does not want dedicated route. |
| 4 | **Reservations `/reservations`** | Explain dining experience and send to Resy. | Reservation hero, dining room images, policy notes, Resy CTA, phone fallback. | No custom booking engine. |
| 5 | **Order `/order`** | Send users to Toast ordering. | Pickup note, popular dishes, Toast CTA, hours, FAQs. | Track clicks. |
| 6 | **Gallery `/gallery`** | Show food/interior atmosphere. | Masonry gallery, lightbox, captions. | Use client-supplied rights-cleared assets. |
| 7 | **Events `/events`** | Private events lead capture. | Event packages placeholder, inquiry form, contact CTA. | Template route even if current site is sparse. |
| 8 | **Contact `/contact`** | Practical local info. | Hours, phone, address, map placeholder, contact form, socials. | Must be indexable. |

---

## 5. Homepage narrative order

- [ ] Nav with Reserve and Order buttons.
- [ ] Hero: seasonal food/interior image, headline, tagline, CTA group.
- [ ] Quick action cards: Reserve, Order Pickup, View Menu, Call.
- [ ] Menu highlights: starters/mains/brunch/dessert cards.
- [ ] Brunch module with separate CTA.
- [ ] Story / hospitality strip.
- [ ] Gallery rail.
- [ ] Hours + location.
- [ ] Footer conversion CTA.

---

## 6. Menu architecture

The menu must be data-driven, category-first, and conversion-friendly. Search, category sticky state, and item tags should work with the categories below.

- **Lunch & Dinner starters**: Malanga chips, cheese curds, wings, pierogies, hummus, mussels.
- **Salads**: House, Caesar, Greek, Waldorf, berry beet, quinoa Tex-Mex.
- **Sandwiches**: Shelby burger, turkey burger BLT, beef Cubano, crispy chicken, cod.
- **Mains**: Chicken parm, paella, salmon, short rib, ribeye, curry, cioppino.
- **Pizzas / kids / sides**: Butcher pie, garden pizza, kids tenders, fries, tots.
- **Brunch**: Benedict, chicken & waffle, short rib hash, pancakes, breakfast pizza.
- **Dessert / ice cream**: Cheesecake, cookies, carrot cake trifle, custard pie, Batch ice cream.

### Menu UX rules

- [ ] Dish cards may display single price or multiple size prices.
- [ ] Brunch must be separable from the default menu.
- [ ] Popular items should be manually curated, not inferred.
- [ ] If the item has no image, use a refined placeholder texture, not a generic stock photo.
- [ ] Order CTA appears after every 8–10 items on mobile.

---

## 7. Core components

- **SeasonalHero** — Large editorial hero with dark overlay, CTA group, and hours/reservation card.
- **QuickActionGrid** — Four compact action cards for Reserve, Order, Menu, Call.
- **MenuHighlightRail** — Horizontal cards for featured menu items.
- **BrunchFeature** — Dedicated brunch module with photo, hours, menu teaser.
- **ReservationHandoff** — Resy explanation card with phone fallback.
- **ToastOrderHandoff** — Toast order link card with pickup-only note.
- **GalleryMasonry** — Responsive image grid with lightbox.
- **HoursLocation** — Address, phone, hours, map placeholder, directions CTA.

---

## 8. Core effects and code patterns

### Editorial image masks
Major images use `border-radius: 28px` and an optional top-left label chip. Avoid over-dark overlays except in hero.
### Menu category progress
A slim progress bar at top of menu page can show scroll progress through categories. Keep it subtle and tied to category tab state.
### Sticky header state
Header starts transparent over the hero. After 80px scroll, add a solid background, subtle shadow, and compressed vertical padding. Use a small hook with `window.scrollY`, throttled through `requestAnimationFrame`.
### Image reveal
Wrap major food/interior images in `ImageReveal`. On first view, reveal with a 10px upward motion and opacity fade. Under `prefers-reduced-motion`, render instantly.
### Sticky conversion bar
On mobile, show a bottom bar with two primary actions. On desktop, show a compact CTA group in the header plus a contextual reservation/order strip below hero.
### Menu active category
Use `IntersectionObserver` over category headings to update the active tab. Clicking a tab scrolls to the category with an offset for the sticky header.

---

## 9. Content rules

- [ ] Keep copy ingredient-forward and polished, never gimmicky.
- [ ] Do not invent awards or chef claims.
- [ ] Prices and hours are seed data and should be marked editable.
- [ ] Use “Reserve Your Table” and “Order Online” language consistently.
- [ ] Avoid exact menu duplication in homepage; use curated highlights.

---

## 10. SEO / local search requirements

- [ ] Use `Restaurant` JSON-LD with address, phone, openingHoursSpecification, servesCuisine, priceRange, acceptsReservations, and menu URL.
- [ ] Create route-level titles: Home, Menu, Catering, Reservations/Order, Gallery, Contact, About.
- [ ] Generate OG images for the homepage and menu page using brand colors and a hero food photo.
- [ ] Use local keywords naturally in headings and metadata, especially Allentown, PA and cuisine/category terms.
- [ ] Add canonical URLs, sitemap, robots, and image alt text that describes the actual food/interior.

---

## 11. Accessibility requirements

- [ ] Every page starts with exactly one `h1`.
- [ ] Header, nav, main, footer landmarks are present.
- [ ] Mobile menu and lightbox trap focus and close with Escape.
- [ ] Food images have useful alt text or empty alt only when decorative.
- [ ] Buttons are buttons, links are links; external ordering CTAs have clear labels.
- [ ] Forms expose error messages through `aria-describedby` and success/failure states.

---

## 12. Mobile behavior

- [ ] Nav collapses to a bottom-friendly hamburger/drawer; main CTA remains visible.
- [ ] Hero shifts to single column with CTA buttons above the fold.
- [ ] Menu tabs become horizontally scrollable chips or a select input.
- [ ] Cards become one-column or horizontal scroll rails with peeking next card.
- [ ] Forms use large tap targets and mobile keyboard-friendly inputs.
- [ ] Footer stacks into accordions or simple columns, with phone/order buttons prominent.

---

## 13. Asset checklist

- [ ] Logo SVG or high-res transparent PNG.
- [ ] Hero food/interior photo, 2400px wide.
- [ ] At least 12 food/gallery images.
- [ ] OG image templates for home and menu.
- [ ] Favicon derived from logo mark.

---

## 14. Performance notes

- [ ] Use `next/image` for all local imagery; reserve aspect ratios.
- [ ] Lazy-load gallery below the fold and avoid shipping all gallery images on initial route.
- [ ] Keep animation JS lightweight and disable expensive scroll listeners on mobile where possible.
- [ ] No map SDK in initial load; use static embed placeholder and lazy iframe after interaction.
- [ ] Menu data can be statically generated; avoid client-only rendering for SEO content.

---

## 15. The five things that make this template look right

- [ ] Editorial food photography with warm dark/light contrast.
- [ ] Balanced Reserve + Order conversion model.
- [ ] A readable, data-driven menu with brunch separation.
- [ ] Upscale serif headline system.
- [ ] Prominent hours/location modules for local search and decisions.
