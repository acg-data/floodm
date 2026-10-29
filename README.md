# Flood Mitigators — floodmitigators.com

Website for **Flood Mitigators**, the family-owned Houston flood assessment and drainage company started by owner **Manny** after Hurricane Harvey.

The look is the original “Flood Mitigators” page designed in Claude — Plus Jakarta Sans, the navy/blue/sky palette, the Flood Snapshot, report ladder, runoff calculator and booking dialog — grown into a full site with [Astro](https://astro.build). It builds to plain static files.

## What’s on the site (50 pages)

| Section | Pages |
| --- | --- |
| Home | `/` — the original page, now linking into everything below |
| Reports | `/reports/` and Flood Snapshot, Flood Intelligence, Expert Mitigation Plan |
| Services | `/services/` and 11 service pages (French drains, sump pumps, grading, downspouts & catch basins, channel drains, dry creek beds, culvert installation, drain cleaning, stormwater cleaning, culvert cleaning, hydro jetting). Pages that already exist on floodmitigators.com keep their URLs. |
| Service areas | `/service-areas/` and 17 neighborhood pages (Memorial, Energy Corridor, Meyerland, Kingwood, Katy, Sugar Land…) |
| Resources | `/resources/`, 5 guides, the hurricane-season checklist, `/runoff-calculator/`, `/drainage-checkup/`, `/faq/` (60+ questions) |
| Company | `/about/` (Manny), `/contact/`, `/emergency/` (24/7), `/privacy/`, `/thank-you/`, 404 |

Every page has its own title, description, share image and structured data (business, services, FAQs, breadcrumbs, articles) for Google.

## Where things live

- `src/data/` — the content: `site.ts` (phone, email, hours, owner), `services.ts`, `areas.ts`, `reports.ts`, `resources.ts`, `symptoms.ts` (drainage checkup)
- `src/pages/resources/*.md` — the guides, in Markdown
- `src/styles/fm.css` — the original design’s CSS; `pages.css` — styles for the added page types, built from the same tokens
- `src/components/` — sections lifted from the original page (hero, trust strip, report ladder, service cards, steps, FAQ, Manny, crew, runoff calculator, booking dialog…)
- `public/` — images, fonts, icons, `_redirects`, `_headers`, `robots.txt`

## Common edits

- **Phone, email, hours, warranty wording:** `src/data/site.ts`.
- **Form submissions:** set `PUBLIC_LEAD_ENDPOINT` (in Cloudflare Pages environment variables, or a `.env` file) to any URL that accepts a JSON POST — Formspree, a Supabase Edge Function, a Cloudflare Pages Function. Until then, the Snapshot, booking and contact forms open the visitor’s email app addressed to info@floodmitigators.com, so no request is lost.
- **Manny’s photo:** add `public/assets/img/manny.jpg` and, in `src/components/Manny.astro`, swap the logo `<img>` for `<img class="manny-photo" src="/assets/img/manny.jpg" alt="Manny, owner of Flood Mitigators">` (there’s a comment at the spot).
- **A service, area or guide:** edit its entry in `src/data/` or its `.md` file; pages, menus, footer, sitemap and structured data update automatically.
- **Share image:** after changing the logo, hero photo or phone number, run `npm run build && npm run og`.

## Run it

Needs Node.js 22.12+.

```sh
npm ci
npm run dev
```

`npm run dev` prints a Network address you can open on a phone on the same Wi-Fi. To preview the production build: `npm run build && npm start`.

## Deploy

The mobile preview is hosted on Cloudflare Workers at https://floodmitigators-preview.justin-b75.workers.dev. Update it with:

```sh
npm run build:preview
npx wrangler deploy --name floodmitigators-preview --assets ./dist --compatibility-date 2026-10-28
```

The preview build adds `noindex` to every page while retaining the approved floodmitigators.com canonicals. Use the normal `npm run build` for production. Publishing the preview is currently manual; pushing this branch does not deploy it automatically.

**Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → `acg-data/floodm`. Framework preset Astro (build command `npm run build`, output directory `dist`). `_redirects` and `_headers` are picked up automatically, and every branch gets its own preview link.

## Check before you ship

```sh
npm test
```

Type-checks, builds, then loads all 50 pages in Chromium and fails on broken links or files, console errors, bad titles/descriptions, invalid structured data, sideways scrolling from 320px phones to 1440px desktops, and accessibility problems (axe). It also drives the menus, Flood Snapshot, booking dialog, contact form, runoff calculator, drainage checkup and checklist. Needs Playwright with Chromium on the machine.
