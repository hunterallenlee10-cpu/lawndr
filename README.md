# Lawn Doctor: website redesign

A ground-up redesign of [lawndoctor.com](https://www.lawndoctor.com/). It keeps the brand's real content, claims and URL structure and replaces the presentation, interaction and conversion flow.

## Stack

- **Next.js 16** (App Router, React Server Components, every page statically generated)
- **Tailwind CSS v4**, with design tokens defined as CSS variables in `app/globals.css`
- **Motion** (`motion/react`) for entrance, scroll and state transitions. All of it respects `prefers-reduced-motion`.
- **Phosphor Icons**, plus Bricolage Grotesque (display) and Geist (text) loaded through `next/font`

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

## Design system

| | |
|---|---|
| Palette | "Forest" family. Cool sage neutrals and one green accent: deep `#1d7638` in light mode, bright `#8fd662` in dark mode. One forest color block (`#10291b`) is reserved for the guarantee and the footer. |
| Type | Bricolage Grotesque for headlines (tight tracking, balanced wrapping) and Geist for body copy |
| Shape | Buttons and inputs are full pills. Cards and media use a 22px radius. |
| Themes | Light and dark follow the system setting, with a manual Light / System / Dark switch in the footer |
| Motion | Hero clip-path reveal with scroll parallax, a sticky "how it works" image swap, scroll reveals, and a hover-pausable review marquee |

## Pages

Every existing URL is kept as is, trailing slash included, so current rankings and inbound links still resolve.

| Route | Page |
|---|---|
| `/` | Home |
| `/lawn-care/`, `/pest_control/` | Category hubs |
| `/lawn-fertilization/`, `/lawn_seeding/`, `/mosquito-control/`, `/tick-control/`, `/mosquito-yard-spray/`, `/perimeter-pest-control/` | Service pages (one template, driven by data in `lib/content.ts`) |
| `/annual-programs/` and `/annual-programs/{fertilization-and-weed-plans,mosquito-control-plans,tick-control-plans}/` | Programs |
| `/why-choose-lawn-doctor/`, `/customer_testimonials/`, `/company_history/`, `/our_guarantee/`, `/careers/` | Company pages |
| `/quote/` | **New.** A three-step quote flow. It keeps the original form field names (`zip`, `name`, `email`, `phone`, `address`). |
| `/locations/` | **New.** ZIP-based local expert finder |

SEO: each page has its own metadata, and the site includes Organization, Service and FAQPage JSON-LD.

## Before launch

- [ ] Replace the placeholder mark in `components/Logo.tsx` with the official green-thumb logo SVG.
- [ ] Connect the quote flow to the real lead endpoint or CRM. The submit step is marked with `TODO` in the quote component.
- [ ] Connect `/locations` to the real franchise locator API. It is also marked with `TODO`.
- [ ] Swap the stock photography for real Lawn Doctor crews, trucks and Turf Tamer equipment wherever possible.
- [ ] Have marketing and legal confirm the stats and claims: 4.8 rating, 30,000+ reviews, 600+ locations, 40+ states, since 1967, highest retention and review score.

## Content sources

- Copy, facts, guarantee terms and the review excerpts (quoted word for word) come from the live lawndoctor.com pages.
- Photography is from [Pexels](https://www.pexels.com/license/) and is free for commercial use. `public/images/manifest.json` lists each photo's source URL and photographer.
