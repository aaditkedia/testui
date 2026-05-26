# Concept B (Cinematic) — image slots

`ConceptB.tsx` looks for these files. Until a file exists, that slot shows the
original duotone gradient (graceful fallback), so the page never breaks.

The component already applies the cinematic look — a duotone color wash
(`mix-blend: soft-light`), film grain, and a vignette — on top of each photo.
So generate **natural-color, slightly moody photos**; do not pre-tint them.

| File | Aspect | Subject |
|------|--------|---------|
| `hero.jpg` | 16:9 (wide, ~2400×1350) | Network summit stage at night, crowd silhouettes, dramatic stage light |
| `demo-day.jpg` | 4:5 (portrait, ~1600×2000) | A founder presenting on stage at a demo day, laptop/slide glow |
| `portrait.jpg` | 16:9 (wide) | An ambassador hosting a packed founder dinner / fireside, warm room |
| `perk-1.jpg` | 16:9 (wide) | Two people shaking hands / a warm intro at a tech mixer |
| `perk-2.jpg` | 16:9 (wide) | A speaker mid-talk on a lit stage, audience in foreground |
| `perk-3.jpg` | 16:9 (wide) | Travel / arrival at a global summit — airport, skyline, or venue exterior |
| `perk-4.jpg` | 16:9 (wide) | A dense crowd of builders networking, laptops and conversation |
| `event-1.jpg` | 16:9 | Demo Day, San Francisco — startup pitch energy |
| `event-2.jpg` | 16:9 | Founder Dinner, New York — intimate candlelit dinner table |
| `event-3.jpg` | 16:9 | Summit, Lisbon — large conference hall / coastal city |
| `event-4.jpg` | 16:9 | Hack Night, Bangalore — late-night coding session, screens glowing |

## Suggested base prompt

> Cinematic editorial photograph, [SUBJECT], shallow depth of field, moody
> low-key lighting, teal-and-amber color palette, 35mm film look, high detail,
> no text, no watermark, no logos.

Keep faces non-identifiable or use clearly synthetic people to avoid likeness
issues. Web-optimize before committing (e.g. `.jpg`, ~70–80% quality, <300 KB).
