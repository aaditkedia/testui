# Website Recreation / Template Spec — "Lazeez Fresh Mediterranean Grill"

> This spec is meant to guide a **production-quality template website** inspired by the current public Lazeez Fresh Mediterranean Grill website. It should preserve the restaurant's business model, content hierarchy, and conversion needs, while upgrading the experience into a reusable modern template.
>
> Treat live-site wording and menu items as seed content. The implementation must keep content in typed data files so the template can be re-skinned for another restaurant without component rewrites.

---

## 1. What this website is

A **fresh Mediterranean fast-casual + ordering + rewards template** for **Lazeez Fresh Mediterranean Grill**. The site should feel like fresh, colorful, fast, and trustworthy: Mediterranean food made from scratch with strong online ordering and local SEO.

The current live presence tells us this brand needs:

- [ ] Fast order-online path and menu category browsing.
- [ ] Featured popular items: shawarma wraps, rice bowls, falafel, hummus, baklava.
- [ ] Catering CTA for events.
- [ ] Rewards/app signup promotion.
- [ ] Reviews, FAQ, and local keyword content for Mediterranean food in Allentown.
- [ ] Gift cards and careers routes.

### Template positioning

This is not just a homepage. The finished template must include:

- [ ] Homepage with order CTA, featured menu, freshness story, catering, reviews, rewards, FAQ, location.
- [ ] Menu route with category filters and dietary tags.
- [ ] Catering route.
- [ ] Gift card route.
- [ ] Careers route with application form.
- [ ] Rewards/app landing or module.

---

## 2. Source snapshot

| Field | Current content to support |
|---|---|
| Brand | Lazeez Fresh Mediterranean Grill |
| Tagline / hero direction | Authentic Mediterranean flavors, crafted the traditional way |
| Address | 4666 Broadway, Allentown, PA 18104 |
| Phone | (610) 351-6897 |
| Email | lazeezgrill@gmail.com |
| Primary actions | Order Online, View Menu, Catering, Join Rewards, Gift Cards |
| Menu focus | shawarma wraps, falafel wraps, rice bowls, fry bowls, salad bowls, hummus, baba ghanouj, baklava, drinks |
| Operational focus | pickup, delivery, online ordering, rewards, app, catering, gift cards, hiring, FAQ, local SEO |

---

## 3. Design system

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FFF8EC` | pita/cream background |
| `--surface` | `#FFFFFF` | card surface |
| `--surface-alt` | `#F4E5C6` | warm hummus/beige panels |
| `--text` | `#1C2418` | deep olive-black text |
| `--muted` | `#65705C` | secondary olive text |
| `--accent` | `#2F7D32` | olive green primary CTA |
| `--accent-2` | `#C7422F` | sumac/red secondary accent |
| `--accent-3` | `#E0A722` | turmeric/gold highlight |
| `--line` | `rgba(28,36,24,.14)` | soft olive hairlines |

### Typography

Use `Sora` or `Manrope` for modern fast-casual headings and UI, paired with `Noto Sans` for broad glyph support. Headlines should be bold, friendly, and clean. Use small all-caps category labels for menu filters.

### Layout language

- [ ] Bright hero with colorful Mediterranean food photography and strong Order Online CTA.
- [ ] Featured menu cards use high-saturation food images and dietary tags.
- [ ] Story sections alternate food closeups with short freshness claims.
- [ ] Reviews and FAQ are structured for trust and SEO.
- [ ] Rewards/app CTA uses phone mockup or QR-style card near the footer.

### Buttons and links

- [ ] Primary: olive green filled pill/rounded rectangle.
- [ ] Secondary: sumac-red outline or text CTA.
- [ ] Menu category chips use cream background and olive active state.
- [ ] Rewards/app CTA can use dark panel with green/gold accents.

### Motion mood

Fresh and efficient: quick fades, card lifts, horizontal rails. Avoid slow luxury transitions; this is fast-casual.

---

## 4. Site map and section-by-section breakdown

| # | Page / route | Purpose | Required sections | Notes |
|---|---|---|---|---|
| 1 | **Home `/`** | Drive online orders and trust. | Hero, featured items, award/trust strip, scratch-made story, menu gallery, order CTA, catering, reviews, features, rewards, FAQ, location. | Order button must be above fold. |
| 2 | **Menu `/menu`** | Browse and order popular categories. | Popular, hot wraps, salads, rice bowls, fry bowls, salad bowls, kids, sides, desserts, drinks. | Dietary tags and popular items matter. |
| 3 | **Catering `/catering`** | Convert event/office catering. | Catering hero, package examples, inquiry CTA, trust copy. | Can initially handoff to contact/order. |
| 4 | **Story `/story`** | Freshness/family positioning. | Rooted in freshness, something for everyone, hospitality, serving Lehigh Valley. | Use real story copy as seed. |
| 5 | **Rewards `/rewards`** | App/rewards signup. | Benefits, app QR/download, order history/rewards explanation. | May link to Owner app. |
| 6 | **Gift Cards `/gift-cards`** | Sell gift cards. | Gift card hero, amounts, occasion cards, provider handoff. | Do not implement payment unless provider exists. |
| 7 | **Careers `/careers`** | Hiring applications. | Why work with us, location, application form, thank-you state. | Resume upload support can be stubbed. |
| 8 | **Contact `/contact`** | Location and support. | Hours, address, phone, email, map, order CTA. | Closed Sunday, Mon-Sat hours seed data. |

---

## 5. Homepage narrative order

- [ ] Header with Menu, Catering, Story, Hiring, Gift Cards, Order Online.
- [ ] Hero: “Best Mediterranean Food in Allentown, PA,” subtitle, order/menu CTAs.
- [ ] Featured popular dishes.
- [ ] Award/trust strip.
- [ ] Welcome/scratch-made story.
- [ ] Menu highlights gallery.
- [ ] Order fresh/fast/easy online CTA.
- [ ] Catering CTA.
- [ ] Reviews carousel.
- [ ] Features/dietary/service icons.
- [ ] Rewards/app section.
- [ ] FAQ and location/hours.

---

## 6. Menu architecture

The menu must be data-driven, category-first, and conversion-friendly. Search, category sticky state, and item tags should work with the categories below.

- **Popular**: Chicken Shawarma Wrap, Chicken Shawarma Rice Bowl, Vegetarian Rice Bowl, Chicken Shawarma Fry Bowl, Beef Shawarma Rice Bowl.
- **Hot Wraps**: Chicken shawarma, beef shawarma, sejok, arnabeet, falafel.
- **Salads**: Tabouleh, fattoush.
- **Rice Bowls**: Chicken shawarma, beef shawarma, vegetarian.
- **French Fry Bowls**: Chicken, beef, vegan fry bowls.
- **Salad Bowls**: Chicken shawarma fattoush, beef shawarma fattoush, vegan fattoush.
- **Kids Meal**: Chicken breast chunks with fries, shawarma with rice.
- **Side Orders**: Hummus, baba ghanouj, falafel, arnabeet, rice, fries.
- **Desserts / Drinks**: Baklava, namoora, bottled water, Arabic coffee/tea, soda, ayran.

### Menu UX rules

- [ ] Popular category appears first and repeats order CTA.
- [ ] Every vegan/vegetarian item gets a visible tag.
- [ ] Allow add-on notes like feta, garlic, tahini, hot sauce.
- [ ] Menu cards should be image-ready but not require images for every item.
- [ ] Ordering unavailable states must be handled gracefully.

---

## 7. Core components

- **FastCasualHero** — Colorful hero with order/menu buttons and popular dish image.
- **FeaturedMenuGrid** — Popular dish cards with price, tags, quick order CTA.
- **FreshnessStory** — No-preservatives/from-scratch story module.
- **DietaryFeaturePills** — Catering, delivery, takeout, dine-in, vegan options, kids menu.
- **ReviewsCarousel** — Star reviews with names and source placeholder.
- **RewardsAppCard** — Rewards/app CTA with QR/download links.
- **FAQAccordion** — Indexable FAQ module with schema support.
- **CareersApplicationForm** — Hiring form with resume upload field stub.

---

## 8. Core effects and code patterns

### Fresh menu card hover
Cards lift 4px, image scales 1.04, dietary tags remain stable. Do not obscure item name or price.
### FAQ schema-friendly accordion
Use semantic buttons and panels; content remains in DOM for SEO and accessibility.
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

- [ ] Always foreground scratch-made, fresh, authentic Mediterranean flavor.
- [ ] Do not overuse “best” except where the page heading/source uses it or client approves.
- [ ] Use dietary language carefully and accurately.
- [ ] Rewards/app copy should be benefit-led: save time, earn points, get deals.
- [ ] Keep local service areas and FAQ factual and editable.

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

- [ ] Logo SVG/PNG.
- [ ] Hero shawarma/rice bowl photo.
- [ ] Menu item photos: wraps, hummus, fry bowl, baklava, rice bowl, falafel.
- [ ] Award badges only if client supplies rights/verification.
- [ ] App/rewards QR or phone mockup.
- [ ] OG image templates with olive/sumac palette.

---

## 14. Performance notes

- [ ] Use `next/image` for all local imagery; reserve aspect ratios.
- [ ] Lazy-load gallery below the fold and avoid shipping all gallery images on initial route.
- [ ] Keep animation JS lightweight and disable expensive scroll listeners on mobile where possible.
- [ ] No map SDK in initial load; use static embed placeholder and lazy iframe after interaction.
- [ ] Menu data can be statically generated; avoid client-only rendering for SEO content.

---

## 15. The five things that make this template look right

- [ ] Order Online above the fold.
- [ ] Colorful food photography and fresh Mediterranean palette.
- [ ] Popular menu cards with dietary tags.
- [ ] Rewards/app module near conversion points.
- [ ] SEO-rich FAQ/location content for Allentown Mediterranean searches.
