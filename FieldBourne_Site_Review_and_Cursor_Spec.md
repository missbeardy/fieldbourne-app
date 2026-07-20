# FieldBourne Marketing Site — Code Review & Cursor Spec

**Repo:** Lovable-built marketing site (TanStack Start + React 19 + Tailwind v4, `tanstack_start_ts` template)
**Date:** 18-07-2026 · **Decisions incorporated:** static prerender → GitHub Pages · case-study links → `/about` · "12 hrs/week" Nick claim signed off (keep)

---

## 1. Executive Summary

The bones are good. Five clean routes, a shared component set (`Nav`, `Footer`, `CTAButton`, `SectionHeader`), all copy centralised in `src/content/site.ts`, semantic Tailwind v4 tokens, self-hosted Inter, and the palette has already been re-themed off the dark "industrial" plan back to cream/teal/amber — roughly on-brand. No security exposure: no backend, no secrets, contact is a `mailto:` handoff.

Five problems stand between this and a launchable site:

1. **The root `<head>` is stock Lovable garbage.** Every page shares title "Lovable App", author "Lovable", twitter `@Lovable`, an og:image pointing at a Lovable R2 preview screenshot, and a description for a product called "FieldBourne Connect" (doesn't exist) that "streamlines" (banned word). This is what Google and every link preview sees.
2. **It's structurally coupled to the old site it replaces.** `bookingUrl`, both Path CTAs, and the case-study CTA all point at `fieldbournedigital.com.au/#contact`, `?path=solo#contact`, and `tvmagic.html` — URLs that die the moment this site takes over the domain. There is no case-study page in this repo.
3. **Claims discipline failures.** The integrations grid claims "Facebook & Instagram — Meta lead ads" (not built; Messenger via Botpress is what exists), "Google — Business & Ads" (no such integration), "Calendar — Google · Apple" (implies sync; reality is `.ics` invites), and marks Xero "Soon" when the Xero-compatible CSV export is shipped — the one place the site *under*claims. The hero's "Real workflow from our first live client" card shows invented Sydney suburbs over a South Brisbane client.
4. **Deploy target mismatch.** This is an SSR app (nitro, Cloudflare default target). Your call: prerender all five routes to static HTML and stay on GitHub Pages. That needs build config + a deploy workflow + `CNAME`/`.nojekyll` — none of which exist yet.
5. **SEO/a11y basics missing.** Four of five pages have no `<h1>` (SectionHeader always renders `h2`). No canonical URLs, no per-page `og:url`, no robots.txt, no sitemap, no structured data. Form labels aren't associated with inputs (`htmlFor`/`id` missing). Menu button has no `aria-expanded`.

Brand-spec gaps: headings should be Plus Jakarta Sans 700–800 (only Inter is loaded); the accent token is _named_ `--cyan-accent` but _holds_ golden yellow (hue 82) — and the true brand amber `#E8943A` is hue 63.6, noticeably more orange. `.lovable/plan.md` still describes the abandoned dark theme and will mislead any future LLM session.

**No schema, auth, RLS, or tenant-isolation surface exists in this repo — the standing disclosure rule is N/A here.** This is the marketing-site codebase, fully separate from the Companion app; nothing below touches the app repo.

---

## 2. Prioritized Action Plan

### HIGH — blocks launch

| #   | Item                                                                                                                                                                                                                                                                                           | Files                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| H1  | Replace stock Lovable meta: real title/description/author, drop `@Lovable` + R2 og:image, add `og:site_name`, `lang="en-AU"`, JSON-LD (`ProfessionalService` with ABN + Beaudesert address)                                                                                                    | `src/routes/__root.tsx`                                                |
| H2  | Decouple from the old site: `bookingUrl` → `/contact`, Path CTAs → `/contact?path=solo                                                                                                                                                                                                         | team`with prefill, case-study CTAs →`/about`, delete unused `aboutUrl` | `src/content/site.ts`, `src/routes/contact.tsx` |
| H3  | Claims-discipline pass on `content/site.ts` + hero card: fix integrations grid (Messenger not "Meta lead ads"; drop Google Ads; `.ics`-honest calendar wording; Xero = "CSV export today"; drop MYOB), remove banned "streamline", Brisbane-side suburbs in the mock feed, honest feed caption | `src/content/site.ts`, `src/routes/index.tsx`                          |
| H4  | Exactly one `<h1>` per page: `as` prop on SectionHeader, subpage heroes use `as="h1"`                                                                                                                                                                                                          | `SectionHeader.tsx`, 4 route files                                     |
| H5  | Canonical + `og:url` per route; `public/robots.txt`, `public/sitemap.xml`, `public/CNAME`, `public/.nojekyll`                                                                                                                                                                                  | all 5 routes, `public/`                                                |
| H6  | Static prerender + GitHub Pages deploy workflow (Phase 0 verification required — beta nitro)                                                                                                                                                                                                   | `vite.config.ts`, `.github/workflows/deploy.yml`                       |

### MEDIUM — before promoting the site

| #   | Item                                                                                                                                                                                                                                                                  | Files                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| M1  | Form a11y + UX: `htmlFor`/`id` on every field, remove dead `params` code, mailto-fallback copy, `?path` prefill banner + hidden field                                                                                                                                 | `src/routes/contact.tsx`                         |
| M2  | Nav a11y: `aria-expanded`, `aria-controls`, Escape-to-close, dynamic `aria-label`                                                                                                                                                                                     | `src/components/site/Nav.tsx`                    |
| M3  | Brand typography: add Plus Jakarta Sans Variable for headings per BRANDING.md                                                                                                                                                                                         | `package.json`, `src/styles.css`                 |
| M4  | Token truth-in-naming + colour alignment: rename `cyan-accent` → `accent-warm` repo-wide; set accent to true `#E8943A` (oklch 0.737 0.143 63.6); align `--background`/`--foreground` to `#F7F5F2`/`#1E2A2A`; brand hover to `#155757`; delete vestigial `.dark` block | `src/styles.css`, repo-wide class rename         |
| M5  | `prefers-reduced-motion`: gate smooth-scroll; `motion-safe:` on hover translates                                                                                                                                                                                      | `src/styles.css`, `CTAButton.tsx`, `contact.tsx` |

### LOW — hygiene, non-blocking

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                              | Note |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| L1  | Purge unused shadcn `ui/` folder (~45 components, zero used by site code) + ~20 unused deps (recharts, embla, react-hook-form, react-day-picker, cmdk, vaul, input-otp, sonner, zod, most radix). Tree-shaking already keeps them out of the bundle (`sideEffects: false`), so this is install-time + supply-chain hygiene only. **Do as its own later commit** — Lovable sync risk if the template expects them. |
| L2  | `package.json` name `tanstack_start_ts` → `fieldbourne-site`.                                                                                                                                                                                                                                                                                                                                                     |
| L3  | Copy nits: hero secondary CTA says "See the live board" but links to /how-it-works (no board there); `text-[10px]` labels → 11px minimum.                                                                                                                                                                                                                                                                         |
| L4  | Annotate or delete stale `.lovable/plan.md` (still describes the dark slate/cyan theme — will mislead future sessions). Plain commit, no history rewrite (AGENTS.md warning).                                                                                                                                                                                                                                     |

### Founder tasks (yours, not Cursor's)

- **og-image.png** — 1200×630, FieldBourne brand, into `public/`. Until it exists the spec wires the path and link previews show nothing (better than a Lovable screenshot).
- **favicon** — `public/favicon.ico` is the template default; replace with a FieldBourne mark.
- **DNS at cutover** — repo `CNAME` file covers GH Pages; leave Zoho MX records alone.
- Keep-or-veto the reworded hero-card caption and Brisbane suburbs (exact strings in the spec — they're copy changes to "verbatim" scraped copy, so they're yours to approve; defaults are written honest-first).

---

## 3. Cursor Spec — copy everything between the lines into one Composer chat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# SPEC: FieldBourne marketing site — launch-readiness pass (meta, links, claims, a11y, static deploy)

## Context

This repo is the FieldBourne Digital marketing site: TanStack Start + React 19 + Tailwind v4, built in Lovable from the `tanstack_start_ts` template. Five routes (`/`, `/about`, `/contact`, `/how-it-works`, `/pricing`), copy centralised in `src/content/site.ts`. It will replace the current static site at `https://fieldbournedigital.com.au`, deployed as a **fully prerendered static site to GitHub Pages**.

## Hard constraints

1. **Files you may modify:** `src/routes/*.tsx`, `src/components/site/*.tsx`, `src/content/site.ts`, `src/styles.css`, `vite.config.ts`, `package.json` (+ lockfile), and new files under `public/` and `.github/workflows/`.
2. **Files you must NOT touch:** anything under `src/components/ui/`, `src/lib/`, `src/hooks/`, `src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routeTree.gen.ts` (generated), `eslint.config.js`, `bunfig.toml`, `AGENTS.md`.
3. Never force-push, rebase, amend, or squash pushed commits — this repo syncs with Lovable (see AGENTS.md).
4. Copy rules: no exclamation marks in headlines/body, and none of these words anywhere in site copy or meta: revolutionize, game-changer, disrupt, unlock, supercharge, leverage (verb), seamless, synergy, best-in-class, cutting-edge, empower, elevate, streamline, "our solution".
5. Schema / auth / RLS disclosure: **N/A — this repo has no database, no auth, no server-side data handling.** If you find yourself adding any backend surface, stop and report instead.

## Phase 0 — STOP AND REPORT before writing any code

Report findings on all of the following, then wait for approval:

1. **Prerender mechanism.** Check the installed versions: `@tanstack/react-start@^1.168`, `nitro@3.0.260603-beta`, `@lovable.dev/vite-tanstack-config@2.7.0`. Determine the exact config keys to (a) enable prerendering of all five routes (TanStack Start exposes a `prerender` option on the start plugin in recent versions — verify the shape, e.g. `{ enabled: true, crawlLinks: true }`) and (b) produce a purely static output with no server function (nitro `static` or `github-pages` preset — verify which the Lovable wrapper's `defineConfig` accepts and how to pass nitro options through it). Report the exact config you intend to write and the **output directory** the static build lands in (likely `.output/public` — verify, the deploy workflow depends on it).
2. **404 page.** Confirm whether the chosen preset emits a `404.html` (GitHub Pages requires that filename for not-found handling). If not, report how you'll produce one from the existing `NotFoundComponent`.
3. **Head merging.** Confirm how route-level `head()` meta merges with `__root.tsx` meta in this TanStack Start version, so per-route `og:title`/`og:description` don't duplicate root values (the plan below keeps root og tags to `og:site_name`, `og:type`, `og:image` only — confirm that avoids duplicates).
4. **`useSearch` on a prerendered route.** Confirm `Route.useSearch()` with a `validateSearch` is safe under prerender (no window access at build time) for the `/contact?path=` prefill.
5. List any file outside the allowed set that you believe needs changing, with justification. Do not change it without approval.

## Implementation

### A. `src/content/site.ts` — replace with:

```ts
export const SITE_URL = "https://fieldbournedigital.com.au";

export const site = {
  name: "FieldBourne Digital",
  tagline: "Run your jobs. Not your inbox.",
  bookingUrl: "/contact",
  email: "admin@fieldbournedigital.com.au",
  abn: "22 324 219 568",
  location: "Beaudesert, QLD",
  caseStudyUrl: "/about",
};
```

(Delete `aboutUrl` — unused. Keep `nav`, `heroStats`, `problemStats`, `steps`, `outcomes`, `tradeTypes` unchanged.)

Update `paths` CTAs to internal URLs:

```ts
cta: { label: "Join self-serve waitlist", href: "/contact?path=solo" },   // Path A
cta: { label: "Book a free chat", href: "/contact?path=team" },          // Path B
```

Replace `integrations` in full (claims-accurate against the live product):

```ts
export const integrations = [
  { name: "SMS & phone", sub: "Twilio", icon: "MessageSquare" },
  { name: "Email & voicemail", sub: "Any provider", icon: "Mail" },
  { name: "Facebook Messenger", sub: "Enquiries captured", icon: "Share2" },
  { name: "Payments", sub: "Stripe — Pay Now on invoices", icon: "CreditCard" },
  { name: "Calendar invites", sub: "Works with Google & Apple (.ics)", icon: "Calendar" },
  { name: "Google reviews", sub: "Review requests, sent for you", icon: "Search" },
  { name: "Xero", sub: "CSV export today · live sync on the roadmap", icon: "Receipt" },
];
```

(MYOB tile removed. No item sets `soon` any more — leave the `soon` badge rendering code in `how-it-works.tsx` in place, it just won't render.)

In `pricingIncludes.services`, replace the banned-word line:
`"We streamline your workflow around how you already work"` → `"We shape the system around how you already work"`.

### B. `src/routes/__root.tsx` — head + shell

Add `import { SITE_URL } from "@/content/site";`. Replace the entire `head: () => ({ ... })` with:

```ts
head: () => ({
  meta: [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: "FieldBourne Digital — Run your jobs. Not your inbox." },
    {
      name: "description",
      content:
        "One system for leads, scheduling and follow-ups, built for Australian trade businesses. Aussie owned and operated.",
    },
    { name: "author", content: "FieldBourne Digital" },
    { property: "og:site_name", content: "FieldBourne Digital" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${SITE_URL}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
  ],
  links: [
    { rel: "stylesheet", href: appCss },
    { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
  ],
  scripts: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "FieldBourne Digital",
        url: SITE_URL,
        email: "admin@fieldbournedigital.com.au",
        slogan: "Run your jobs. Not your inbox.",
        identifier: { "@type": "PropertyValue", propertyID: "ABN", value: "22 324 219 568" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Beaudesert",
          addressRegion: "QLD",
          addressCountry: "AU",
        },
        areaServed: "AU",
      }),
    },
  ],
}),
```

In `RootShell`, change `<html lang="en">` → `<html lang="en-AU">`.
Do not put `og:title`/`og:description`/`twitter:title` at root — every route defines its own (Phase 0 item 3).

### C. Per-route canonical + og:url (all five routes)

In each route's `head()`, add to `meta`: `{ property: "og:url", content: `${SITE_URL}<path>` }` and add a `links` array: `[{ rel: "canonical", href: `${SITE_URL}<path>` }]`, importing `SITE_URL` from `@/content/site`. Paths: `""` (index — use `SITE_URL` alone with trailing slash `${SITE_URL}/`), `/about`, `/contact`, `/how-it-works`, `/pricing`. Keep each route's existing title/description/og:title/og:description.

While in `index.tsx` head, also fix the description's tail: it currently ends "Bespoke to your trade. Aussie owned." — keep as is (no banned words). No change needed beyond og:url/canonical.

### D. `src/components/site/SectionHeader.tsx` — heading level + accent rename

```ts
type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  accent?: "brand" | "warm";
  as?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow, title, subtitle, align = "left", accent = "brand", as: Heading = "h2",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const textCls = accent === "warm" ? "text-accent-warm" : "text-brand";
  const lineCls = accent === "warm" ? "bg-accent-warm" : "bg-brand";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <div className={`mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${textCls}`}>
          <span className={`h-px w-8 ${lineCls}`} aria-hidden="true" />
          {eyebrow}
        </div>
      )}
      <Heading className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
```

Then: (a) every existing `accent="yellow"` call site → `accent="warm"` (`index.tsx` ×2, `how-it-works.tsx` ×1, `pricing.tsx` ×1); (b) the **first** (hero) SectionHeader in `about.tsx`, `contact.tsx`, `how-it-works.tsx`, `pricing.tsx` gets `as="h1"`. `index.tsx` already has a real `<h1>` in `Hero` — do not add another. Result: exactly one h1 per page.

### E. `src/routes/index.tsx` — hero-card honesty (FOUNDER-APPROVED DEFAULTS — flag any deviation)

In `CompanionCard`'s `FeedRow`s, replace the invented Sydney suburbs with South-Brisbane-side ones (the live client is South Brisbane):

- `"Antenna install, Parramatta"` → `"Antenna install, Sunnybank"`
- `"Penrith · auto-reply sent"` → `"Springwood · auto-reply sent"`
- `"Tomorrow 9am, Mount Druitt"` → `"Tomorrow 9am, Mount Gravatt"`

Change the card's footer caption `"Real workflow from our first live client."` → `"Modelled on our first live client's real workflow."` (the rows are illustrative; the caption must not claim they're live data).

Change the hero secondary CTA label `"See the live board"` → `"See how it works"` (it links to /how-it-works; there is no live board there).

The `"12 hours a week"` figure in `FinalCTA` (and in `about.tsx`) is client-verified — leave both untouched.

### F. `src/routes/contact.tsx` — a11y, prefill, dead code

1. Add search-param validation to the route definition:

```ts
validateSearch: (search: Record<string, unknown>) => ({
  path: search.path === "solo" || search.path === "team" ? (search.path as "solo" | "team") : undefined,
}),
```

2. In `Contact`, read it: `const { path } = Route.useSearch();` and render a small banner directly above the form's "Book a free chat" label when set:
   - `solo`: `Self-serve waitlist — leave your details below and you're on it.`
   - `team`: `Team or franchise — tell us a bit about the operation and we'll come prepared.`
     Style: `mb-4 rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-foreground`.
3. Add `{path && <input type="hidden" name="enquiry_path" value={path} />}` inside the form so it lands in the mailto body.
4. Delete the dead `const params = new URLSearchParams(); data.forEach(...)` block in the submit handler (built, never used).
5. Label association — `Field` becomes:

```tsx
function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
      />
    </div>
  );
}
```

Give the trade `<select>` and the message `<textarea>` the same treatment: `id="contact-trade"` / `id="contact-message"` with `htmlFor` on their labels. 6. Replace the post-submit message `"Opening your email client — thanks!"` with:
`Opening your email app now. If nothing opens, email us directly at admin@fieldbournedigital.com.au.` (render the address as a `mailto:` link).

### G. `src/components/site/Nav.tsx` — menu a11y

- Menu button: `aria-expanded={open}`, `aria-controls="mobile-nav"`, `aria-label={open ? "Close menu" : "Open menu"}`.
- Drawer wrapper `<div>` gets `id="mobile-nav"`.
- Escape closes: add inside the component

```ts
useEffect(() => {
  if (!open) return;
  const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [open]);
```

### H. Brand typography + tokens — `package.json`, `src/styles.css`, repo-wide rename

1. Add dependency `"@fontsource-variable/plus-jakarta-sans": "^5.2.0"` (or current 5.x).
2. `src/styles.css` — at the top, after the Inter import, add `@import "@fontsource-variable/plus-jakarta-sans";`
3. In `@theme inline`, add `--font-heading: "Plus Jakarta Sans Variable", "Plus Jakarta Sans", var(--font-sans);` and rename `--color-cyan-accent: var(--cyan-accent);` → `--color-accent-warm: var(--accent-warm);`
4. In `:root`, apply exact brand values (BRANDING.md hexes, converted):

```css
--background: oklch(0.971 0.005 78); /* #F7F5F2 warm cream */
--foreground: oklch(0.274 0.016 196); /* #1E2A2A brand dark */
--brand: oklch(0.482 0.074 195); /* #1B6B6B brand teal */
--brand-glow: oklch(0.417 0.063 195); /* #155757 teal hover — now the darker hover state */
--accent-warm: oklch(0.737 0.143 63.6); /* #E8943A brand amber (was golden-yellow hue 82) */
```

Delete the old `--cyan-accent` line. Keep `--muted-foreground` at its current darker value (brand `--mid #6B7A7A` only hits ~4.6:1 on cream — the current value is safer for WCAG AA; intentional deviation). 5. Delete the vestigial `.dark { ... }` block and the `@custom-variant dark ...` line (site has no dark mode; the block duplicates light values). 6. In `@layer base`, add:

```css
h1,
h2,
h3,
h4 {
  font-family: var(--font-heading);
}
```

Note: `font-black` (900) will render at Plus Jakarta Sans's 800 cap — acceptable, no class changes needed. 7. Reduced motion — replace the bare `html { scroll-behavior: smooth; }` with:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

8. **Repo-wide class rename:** replace the string `cyan-accent` → `accent-warm` across `src/routes/` and `src/components/site/` (covers `text-cyan-accent`, `bg-cyan-accent`, `border-cyan-accent/…`, `via-cyan-accent/…`, `hover:*`). After the rename, `grep -r "cyan-accent" src` must return nothing.
9. In `CTAButton.tsx` and the contact submit button, change `hover:-translate-y-0.5` → `motion-safe:hover:-translate-y-0.5`.

### I. Static prerender + GitHub Pages deploy

1. `vite.config.ts`: using the exact keys verified in Phase 0, enable prerendering of all five routes and a static (no server function) output. Target shape (adjust to verified API):

```ts
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, crawlLinks: true },
  },
  // + nitro static/github-pages preset via the wrapper's verified passthrough
});
```

2. New `public/` files:
   - `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://fieldbournedigital.com.au/sitemap.xml
```

- `public/sitemap.xml` listing exactly: `https://fieldbournedigital.com.au/`, `/about`, `/contact`, `/how-it-works`, `/pricing` (standard urlset, no priorities needed).
- `public/CNAME` containing exactly `fieldbournedigital.com.au`.
- `public/.nojekyll` (empty file).

3. New `.github/workflows/deploy.yml` (adjust the artifact `path` to the output dir verified in Phase 0):

```yaml
name: Deploy site
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public # verify in Phase 0
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. Ensure a `404.html` exists in the static output (per Phase 0 item 2).

## Acceptance criteria (git diff scope)

- Changed: `src/content/site.ts`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/contact.tsx`, `src/routes/how-it-works.tsx`, `src/routes/pricing.tsx`, `src/components/site/SectionHeader.tsx`, `src/components/site/Nav.tsx`, `src/components/site/CTAButton.tsx`, `src/styles.css`, `vite.config.ts`, `package.json` + lockfile.
- Added: `public/robots.txt`, `public/sitemap.xml`, `public/CNAME`, `public/.nojekyll`, `.github/workflows/deploy.yml`.
- Nothing else in the diff. `src/components/ui/**`, `src/lib/**`, `src/server.ts`, `src/start.ts`, `src/router.tsx` unchanged (`routeTree.gen.ts` may regenerate — that's fine).

## Verification checklist (run before reporting done)

1. `bun run build` succeeds and emits static HTML files for all five routes + `404.html`; no server function in output.
2. `bun run lint` clean.
3. Greps all return empty on `src/`: `"Lovable App"`, `"@Lovable"`, `"FieldBourne Connect"`, `"r2.dev"`, `"streamlin"`, `"cyan-accent"`, `"tvmagic.html"`, `"about.html"`, `"#contact"` (as part of an external URL), `"Parramatta"`, `"Penrith"`, `"Mount Druitt"`.
4. View source of each built page: unique `<title>`, unique meta description, one `<h1>`, one canonical link, `og:url` matching the canonical, JSON-LD present, `lang="en-AU"`.
5. `bun run preview` (or serving the static output): mobile menu opens/closes with the button and Escape; button announces expanded state; every form label focuses its input when clicked; `/contact?path=solo` shows the waitlist banner and includes the hidden field in the mailto body.
6. Headings render in Plus Jakarta Sans; body remains Inter; primary buttons are teal `#1B6B6B` with the darker `#155757` hover; accents are amber `#E8943A` on the cream `#F7F5F2` background.

Report the Phase 0 findings first. Do not proceed to implementation until they're acknowledged.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## After Cursor ships this

1. Repo settings → Pages → Source: **GitHub Actions** (one-time).
2. Drop in your `og-image.png` (1200×630) and real favicon — the paths are already wired.
3. DNS cutover at VentraIP: point the apex at GitHub Pages (A records 185.199.108–111.153, or ALIAS), keep Zoho MX untouched. The `CNAME` file handles the custom-domain binding on the Pages side.
4. Later, separate commits: L1 dependency purge, L4 stale-plan cleanup, and a real `/case-study` page once you've pulled Nick's numbers (BUSINESS.md sales-assets item) — then flip `caseStudyUrl` from `/about` to it.
