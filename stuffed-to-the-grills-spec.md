# Website Recreation / Template Spec — "Stuffed to the Grills"

> This spec is meant to guide a **production-quality template website** inspired by the current public Stuffed to the Grills website. It should preserve the restaurant's business model, content hierarchy, and conversion needs, while upgrading the experience into a reusable modern template.
>
> Treat live-site wording and menu items as seed content. The implementation must keep content in typed data files so the template can be re-skinned for another restaurant without component rewrites.

---

## 1. What this website is

A **homemade sandwich cafe + catering template** for **Stuffed to the Grills**. The site should feel like a cheerful, homemade neighborhood sandwich shop: bold, warm, easy to use, and built for lunch decisions and catering leads.

The current live presence tells us this brand needs:

- [ ] Online ordering through Toast plus phone pickup instructions.
- [ ] A strong catering route with trays, servings, sizes, and inquiry form.
- [ ] Best-seller promotion for Funky Cubano, Sweet Chili Shrimp Po Boy, and house-made meatloaf.
- [ ] A menu system that supports small/large prices and sandwich styles.
- [ ] A personal About story centered on the two sisters and homemade food.

### Template positioning

This is not just a homepage. The finished template must include:

- [ ] Homepage with hero, best sellers, order CTA, catering CTA, and story.
- [ ] Full cafe menu with sizes and sandwich style notes.
- [ ] Full catering route with tray sizes and inquiry form.
- [ ] Contact page with hours, phone, email, and map placeholder.
- [ ] Reusable menu data model for cafes with many variants.

---

## 2. Source snapshot

| Field | Current content to support |
|---|---|
| Brand | Stuffed to the Grills |
| Tagline / hero direction | A unique twist on a traditional sandwich shop |
| Address | 6750 Iroquios Trail, Allentown, PA 18104 |
| Phone | 484-274-6760 |
| Email | stuffedtothegrills@gmail.com |
| Primary actions | Order Online, View Cafe Menu, Request Catering, Call for Pickup |
| Menu focus | hot and cold sandwiches, wraps, appetizers, salads, homemade chips/dips, baked goods, catering trays, box lunches, entrees/sides |
| Operational focus | pickup, curbside, take-home kits, catering, phone orders, hours, contact email |

---

## 3. Design system

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFF7EA` | warm deli paper background |
| `--surface` | `#FFFFFF` | clean card surface |
| `--surface-alt` | `#F2E2C3` | sandwich paper / kraft tan |
| `--text` | `#2A2018` | ink-brown text |
| `--muted` | `#765F4A` | secondary copy |
| `--accent` | `#D6452F` | tomato red CTA |
| `--accent-2` | `#4B7F38` | pickle/herb green |
| `--accent-3` | `#F2B84B` | cheddar yellow highlights |
| `--line` | `rgba(42,32,24,.15)` | paper-like dividers |

### Typography

Use `Fraunces` or `Cooper Black`-inspired display for big friendly headings, paired with `Nunito Sans` or `Work Sans` for readable body/UI. Menu item names should be bold and compact. Use marker/label styles sparingly for specials.

### Layout language

- [ ] Bright paper background with bold food/photo cards.
- [ ] Hero can use a collage: sandwich, chips, catering tray, baked goods.
- [ ] Menu uses practical cards/lists with size price columns.
- [ ] Catering route uses tray-size comparison cards and inquiry form.
- [ ] Story section uses warm portrait/photo block and handwritten-feeling accent labels.

### Buttons and links

- [ ] Primary: tomato-red filled rounded rectangle/pill.
- [ ] Secondary: white button with ink border and subtle shadow.
- [ ] Catering CTA: green accent to distinguish from daily order CTA.
- [ ] Phone CTA: large tap-friendly text/button, especially on mobile.

### Motion mood

Friendly and snappy: small card lifts, sticker-like labels, gentle image reveals. Avoid heavy luxury motion.

---

## 4. Site map and section-by-section breakdown

| # | Page / route | Purpose | Required sections | Notes |
|---|---|---|---|---|
| 1 | **Home `/`** | Fast lunch/catering decision. | Hero, order/call CTAs, best sellers, sandwich styles, catering teaser, about/story, hours/contact. | Must answer “what do they sell?” immediately. |
| 2 | **Cafe Menu `/menu`** | Browse full daily menu. | Category tabs, item cards, small/large prices, sandwich style notes, order CTA. | Do not bury ordering. |
| 3 | **Catering `/catering`** | Generate catering leads. | Tray categories, serving sizes, pricing, inquiry form, phone/email CTA. | Show medium/large serving ranges. |
| 4 | **Order `/order`** | Send to Toast or phone pickup. | Toast CTA, phone pickup, best sellers, hours. | Phone number should be copyable. |
| 5 | **About `/about`** | Humanize sister-owned cafe. | Story, values, homemade/catering roots, photo. | Keep copy warm and local. |
| 6 | **Contact `/contact`** | Practical details. | Address, hours, phone, email, map, socials. | Current hours should be data-driven. |

---

## 5. Homepage narrative order

- [ ] Header with Menu, Order Online, Catering, Contact.
- [ ] Hero: tagline, homemade food promise, order/call buttons.
- [ ] Best-sellers: Funky Cubano, Sweet Chili Shrimp Po Boy, house-made meatloaf.
- [ ] Sandwich system: 21 hot/cold sandwiches, Pittsburgh style, Cannon style.
- [ ] Catering CTA with tray examples.
- [ ] About: two sisters story.
- [ ] Hours/location/contact block.
- [ ] Footer with order/catering repeat CTAs.

---

## 6. Menu architecture

The menu must be data-driven, category-first, and conversion-friendly. Search, category sticky state, and item tags should work with the categories below.

- **Appetizers**: Irish Nachos, Bacon Cheddar Ranch Fries, Cooper Cheese Bombs, Brie Bites, homemade chips, fries, pierogis.
- **Salads**: Caesar, Chef, Antipasti, Garden, Caprese.
- **Cold sandwiches**: Italian hoagie, honey mustard ham/turkey, prosciutto mozzarella peppers, pesto turkey, roast beef, BLT, Caprese.
- **Wraps**: Chicken Caesar, Turkey Bacon Ranch, Chipotle Turkey, The Tuscan.
- **Hot sandwiches**: Italian melt, Chicken Florentine, Turkey Bacon Melt, Prosciutto Chicken, Funky Cubano.
- **Signature / best sellers**: Funky Cubano, Sweet Chili Shrimp Po Boy, house-made meatloaf, Irish nachos, Brie bites.
- **Catering appetizer trays**: Cheese/crackers, fruit, vegetables, antipasti, shrimp cocktail, chips/dip.
- **Catering meals**: Box lunches, sandwich trays, wrap trays, entrees, sides, desserts.

### Menu UX rules

- [ ] Support small/large prices and per-person/per-tray pricing.
- [ ] Show sandwich style notes globally and on menu item cards where relevant.
- [ ] Use category filters for Cafe Menu vs Catering Menu.
- [ ] Catering items need serving ranges and minimum notes.
- [ ] Call-for-pickup CTA appears in sticky mobile bar.

---

## 7. Core components

- **CafeHero** — Food collage hero with order/catering/call CTAs.
- **BestSellerCards** — Three large cards with image, short description, and order CTA.
- **SandwichStyleExplainer** — Pittsburgh vs Cannon style visual comparison.
- **SizePriceMenuItem** — Menu row/card with small/large prices.
- **CateringTrayCard** — Tray item with medium/large servings/prices.
- **CateringInquiryForm** — Lead form with date, guest count, tray needs, notes.
- **SistersStoryBlock** — About section with portrait/image and warm copy.
- **PickupCallout** — Phone pickup/call card used on home, order, and menu.

---

## 8. Core effects and code patterns

### Sticker labels
Use small rotated label chips for “Best Seller”, “Homemade”, “Catering Favorite”. Keep rotations subtle: max 2 degrees.
### Menu filter chips
Cafe/Catering/category chips snap horizontally on mobile and become sticky under the header.
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

- [ ] Keep language friendly and specific: homemade, sisters, catering, pickup.
- [ ] Do not over-premiumize; this should feel accessible.
- [ ] Preserve exact phone/email/address in data.
- [ ] Menu item descriptions should be concise and practical.
- [ ] Catering copy should explain serving ranges clearly.

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

- [ ] Logo image/vector.
- [ ] Hero sandwich collage or 4–6 dish photos.
- [ ] Best-seller photos.
- [ ] Catering tray photos.
- [ ] Sisters/about photo if available.
- [ ] Paper texture or subtle pattern SVG.

---

## 14. Performance notes

- [ ] Use `next/image` for all local imagery; reserve aspect ratios.
- [ ] Lazy-load gallery below the fold and avoid shipping all gallery images on initial route.
- [ ] Keep animation JS lightweight and disable expensive scroll listeners on mobile where possible.
- [ ] No map SDK in initial load; use static embed placeholder and lazy iframe after interaction.
- [ ] Menu data can be statically generated; avoid client-only rendering for SEO content.

---

## 15. The five things that make this template look right

- [ ] Immediate clarity: sandwiches, catering, pickup.
- [ ] Warm homemade deli-paper visual system.
- [ ] Best sellers front and center.
- [ ] Catering route with serving/pricing clarity.
- [ ] Phone and order CTAs always easy to reach.
