# FieldBourne Digital — Rugged Redesign

Rebuild the site with a modern-industrial dark aesthetic tailored to Aussie tradies. All copy is pulled verbatim from fieldbournedigital.com.au (scraped via Firecrawl); only the visual layer changes.

## Look & Feel

- **Palette**: `bg-slate-950` base, `slate-900/slate-800` surfaces, hairline `slate-800/60` borders. Primary accent **amber-500** for CTAs and key numbers; secondary **cyan-400** for highlights, icon strokes, and link hovers.
- **Typography**: Inter (via `@fontsource-variable/inter`, loaded through `<link>` in `__root.tsx` per Tailwind v4 rules). Massive tight hero (`text-5xl sm:text-7xl font-black tracking-tight`), uppercase eyebrow labels in amber, generous `leading-tight`.
- **Surfaces**: Rounded `rounded-2xl` cards with subtle glass (`bg-white/[0.03] backdrop-blur border border-white/10`), amber glow on hover, sharp corner accents on pricing cards for "industrial" feel.
- **Icons**: `lucide-react` throughout (Wrench, Zap, Inbox, Clock, ShieldCheck, etc.) replacing any emojis.
- **Motion**: Sticky nav with `backdrop-blur-xl bg-slate-950/70` after scroll; subtle fade-in on scroll for sections.
- **Mobile-first**: Full-width CTAs on mobile, `py-20 md:py-28` section rhythm, safe grid patterns (`grid-cols-[minmax(0,1fr)_auto]`).

## Routes (multi-page)

```
src/routes/
  __root.tsx          -> sticky nav shell, footer, Inter font, base meta
  index.tsx           -> Hero, problem/solution, social proof, primary CTA
  how-it-works.tsx    -> Process steps + integrations grid
  pricing.tsx         -> Path A / Path B cards + FAQ
  about.tsx           -> Story, values, founder
  contact.tsx         -> Book-a-chat CTA + form / calendar link
```

Each route ships its own `head()` with unique title, description, og:title, og:description.

## Shared Components

- `src/components/site/Nav.tsx` — sticky, blur on scroll, mobile drawer (Sheet).
- `src/components/site/Footer.tsx` — dark, amber divider, nav + contact.
- `src/components/site/CTAButton.tsx` — amber primary variant, full-width on mobile.
- `src/components/site/SectionHeader.tsx` — eyebrow + massive heading pattern.
- `src/components/site/FeatureCard.tsx`, `PricingCard.tsx`, `IntegrationBadge.tsx`.

## Design Tokens (src/styles.css)

Add semantic tokens layered over the existing shadcn setup:
- `--brand-amber: oklch(0.78 0.17 70)` → `bg-brand`, `text-brand`
- `--brand-cyan: oklch(0.82 0.13 210)` → `bg-accent-cyan`
- Dark defaults promoted (root uses slate-950 background, slate-50 foreground) so shadcn primitives inherit the industrial theme.

## Content Sourcing

1. Scrape fieldbournedigital.com.au via Firecrawl (`markdown` + `links` formats) once during build to capture copy for every section (hero, Path A/B, integrations, testimonials, footer).
2. Store copy as typed constants in `src/content/site.ts` — no CMS, no state, keeps text verbatim.
3. Preserve every existing `href` (booking link, mailto, socials).

## Technical Details

- Tailwind v4 tokens in `src/styles.css` via `@theme inline`; no `tailwind.config.js`.
- Inter loaded via `<link>` in `__root.tsx` head (never `@import` remote URL in CSS).
- Lucide icons already available in the shadcn setup.
- Sticky nav scroll state via `useEffect` + `scrollY` (no library needed).
- Sections use `grid-cols-[minmax(0,1fr)_auto]` on mobile per responsive rules.
- Firecrawl connector will be linked before build to pull the current copy; if unavailable, I'll ask you to paste the HTML instead.

## Out of Scope

- No copy changes, no new booking flow, no CMS, no backend.
- No analytics or form handling beyond keeping current links.

Approve to build, or tell me what to tweak (accent balance, extra route, hero imagery, etc.).