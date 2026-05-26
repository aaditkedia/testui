# Website Recreation / Template Spec — "Westside Grill"

> This spec is meant to guide a **production-quality template website** inspired by the current public Westside Grill website. It should preserve the restaurant's business model, content hierarchy, and conversion needs, while upgrading the experience into a reusable modern template.
>
> Treat live-site wording and menu items as seed content. The implementation must keep content in typed data files so the template can be re-skinned for another restaurant without component rewrites.

---

## 1. What this website is

A **modern steakhouse / polished dining / promotions-heavy restaurant template** for **Westside Grill**. The site should feel like a polished steakhouse: rich, elegant, confident, warm, and organized around reservation-worthy dining occasions.

The current live presence tells us this brand needs:

- [ ] OpenTable booking and ChowNow ordering in the header.
- [ ] A promotions system because the current site highlights wine dinners, happy hour, brunch, and Prime Rib Sunday.
- [ ] Deep menu navigation for lunch, dinner, dessert, bar, and wine.
- [ ] A private dining/events lead path.
- [ ] Newsletter/social prompts without cluttering the premium look.

### Template positioning

This is not just a homepage. The finished template must include:

- [ ] Homepage with hero, reservation CTA, promo cards, menu preview, story, gallery, hours.
- [ ] Dedicated promotions route.
- [ ] Dedicated menus route with long-form wine/bar support.
- [ ] Events/private dining inquiry route.
- [ ] Gift card route or branded handoff page.

---

## 2. Source snapshot

| Field | Current content to support |
|---|---|
| Brand | Westside Grill |
| Tagline / hero direction | A modern steakhouse with a new age twist |
| Address | 621 Grange Rd, Allentown, PA 18106 |
| Phone | (610) 508-4500 |
| Email |  |
| Primary actions | Book A Table, Order Online, Gift Card, Call |
| Menu focus | steaks, seafood, lunch entrees, Sunday brunch buffet, desserts, bar plates, cocktails, wines by glass and bottle |
| Operational focus | reservations, online ordering, happy hour, brunch, private dining, events, newsletter, social following |

---

## 3. Design system

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#150F0D` | deep steakhouse mahogany/black |
| `--surface` | `#F7F0E4` | warm tablecloth ivory |
| `--surface-dark` | `#241814` | dark panel background |
| `--text` | `#1B120F` | primary text |
| `--text-inverse` | `#FFF3E4` | cream on dark |
| `--muted` | `#76675A` | secondary text |
| `--accent` | `#9B1F1F` | wine red CTAs and labels |
| `--gold` | `#C8A46A` | aged brass dividers and premium accents |
| `--line` | `rgba(27,18,15,.16)` | light surface hairlines |

### Typography

Use `Playfair Display` or `Cormorant Garamond` for elegant steakhouse display headings; pair with `Montserrat` or `Inter` for nav, buttons, and body. Menu item names can use a semi-bold sans to stay readable across long lists.

### Layout language

- [ ] Dark cinematic hero with reservation panel layered over a dining-room/steak photo.
- [ ] Promo cards use rich image backgrounds, schedule badges, and price chips.
- [ ] Menu route supports long scroll with sticky category rail and collapsible wine sections.
- [ ] About/story pages use wide image bands and centered editorial copy.
- [ ] Gallery uses masonry with rich shadows and dark modal lightbox.

### Buttons and links

- [ ] Primary: wine-red filled pill with cream text.
- [ ] Secondary: ivory outline on dark or dark outline on light.
- [ ] Premium link: gold underline with arrow.
- [ ] Promo CTAs may use schedule/price chips before the button.

### Motion mood

Refined restaurant motion: slow crossfades, subtle zoom-in on hero image, card hover lifts. No playful bounce.

---

## 4. Site map and section-by-section breakdown

| # | Page / route | Purpose | Required sections | Notes |
|---|---|---|---|---|
| 1 | **Home `/`** | High-level conversion for reservations and specials. | Hero, reservation strip, featured promos, welcome/story, menu preview, gallery rail, hours, final reservation CTA. | Promos should be visible above mid-scroll. |
| 2 | **Menus `/menus`** | Long-form menu browsing. | Category nav, brunch/lunch/dinner/dessert/bar/wine sections, order/reserve CTA. | Wine list can use accordions. |
| 3 | **Promotions `/promotions`** | Market recurring offers. | Wine Dinner, Happy Hour, Sunday Brunch Buffet, Prime Rib Sunday. | Each promo gets image, schedule, price, CTA. |
| 4 | **Gift Card `/gift-card`** | Sell gift cards or handoff. | Gift hero, occasions, purchase CTA, FAQ. | Provider TBD. |
| 5 | **Events `/events`** | Private dining inquiries. | Event hero, private room, capacity, inquiry form. | Current site notes private room up to 25 guests. |
| 6 | **About `/about`** | Approachable fine dining story. | Story, dining rooms, menu philosophy, parking/location. | Include Route 222 / I-78 convenience if approved. |
| 7 | **Gallery `/gallery`** | Show atmosphere and dishes. | Masonry gallery and modal. | Avoid tiny repetitive thumbnails. |
| 8 | **Hours & Directions `/hours-directions`** | Practical visit info. | Lunch/brunch/dinner/bar hours, address, parking, map, reservation CTA. | Indexable. |
| 9 | **Contact `/contact`** | General inquiries. | Contact form, phone, address, social links. | Newsletter can appear here. |

---

## 5. Homepage narrative order

- [ ] Header with logo, Menus, Promotions, Gift Card, Book A Table, Order Online.
- [ ] Hero: steakhouse atmosphere, tagline, booking CTA.
- [ ] Promotion cards row.
- [ ] Welcome/story block: modern steakhouse with new age twist.
- [ ] Menu preview: steak, seafood, brunch, cocktails/wine.
- [ ] Gallery rail.
- [ ] Hours/location and private dining teaser.
- [ ] Footer with newsletter and social links.

---

## 6. Menu architecture

The menu must be data-driven, category-first, and conversion-friendly. Search, category sticky state, and item tags should work with the categories below.

- **Sunday Brunch Buffet**: Omelette station, carving station, breakfast/lunch entrees, shrimp, smoked salmon, desserts.
- **Lunch appetizers**: Ahi tuna, bang bang shrimp, mozzarella, hummus, wings, oysters, baked brie.
- **Lunch handhelds / entrées**: Westside burger, turkey burger, lobster roll, ribeye French dip, filet, tenderloin tips, salmon.
- **Dinner**: Steakhouse mains, seafood, shared appetizers, sides.
- **Desserts**: Cheesecake, crème brûlée, carrot cake, fudge brownie, ice cream board.
- **Bar**: Bar plates, cocktails, wines by glass, extensive bottle list.
- **Promotions**: Happy hour, Prime Rib Sunday, wine dinner series.

### Menu UX rules

- [ ] Long menus need collapsible groups on mobile.
- [ ] Wine list should be searchable/filterable by style or region when data allows.
- [ ] Promo pricing must be in promo data, not menu data.
- [ ] Gluten-free and raw/undercooked disclaimers must remain visible near relevant menu sections.
- [ ] Reservation CTA appears between large menu sections, not after every item.

---

## 7. Core components

- **SteakhouseHero** — Dark hero with reservation widget-style card and background image.
- **PromotionGrid** — Image cards for recurring specials with schedule/price chips.
- **LongMenuSection** — Handles large menus with subsections, dotted price leaders, and notes.
- **WineListAccordion** — Collapsible wine list by glass/bottle and region.
- **PrivateDiningInquiry** — Capacity, event type, date, party size form.
- **NewsletterSignup** — Compact email capture with consent note.
- **OpenTableHandoff** — Trackable booking CTA component.
- **ChowNowHandoff** — Trackable order-online CTA component.

---

## 8. Core effects and code patterns

### Promo card hover
On hover, image scales 1.03, overlay darkens slightly, CTA slides up 4px. Respect reduced motion.
### Dotted menu leaders
Desktop menu items can show dotted leader lines between dish names and prices using CSS grid/pseudo-elements; mobile stacks without leaders.
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

- [ ] Use “Book A Table” and “Order Online” consistently.
- [ ] Do not use fake testimonials; replace lorem ipsum with real quotes or remove.
- [ ] Promotions must include schedule and changeability note when applicable.
- [ ] Keep steakhouse tone polished, not trendy.
- [ ] Mark all menu pricing as editable seed content.

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

- [ ] Logo wordmark in SVG/PNG.
- [ ] Hero dining room or plated steak photo.
- [ ] Promo images for wine dinner, happy hour, brunch, prime rib.
- [ ] Gallery set: dining room, patio, bar, steak, seafood, desserts, cocktails.
- [ ] OG image template with wine-red/gold palette.

---

## 14. Performance notes

- [ ] Use `next/image` for all local imagery; reserve aspect ratios.
- [ ] Lazy-load gallery below the fold and avoid shipping all gallery images on initial route.
- [ ] Keep animation JS lightweight and disable expensive scroll listeners on mobile where possible.
- [ ] No map SDK in initial load; use static embed placeholder and lazy iframe after interaction.
- [ ] Menu data can be statically generated; avoid client-only rendering for SEO content.

---

## 15. The five things that make this template look right

- [ ] Rich steakhouse color palette with wine/gold accents.
- [ ] Promotions treated as first-class content.
- [ ] Reservation CTA visible throughout.
- [ ] Long menu handled elegantly with tabs/accordions.
- [ ] Private dining path and local hours/directions are easy to find.
