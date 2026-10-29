# Flood Mitigators — floodmitigators.com

Website for **Flood Mitigators**, the family-owned Houston flood assessment and drainage company started by owner **Manny** after Hurricane Harvey.

The look is the original “Flood Mitigators” page designed in Claude — Plus Jakarta Sans, the navy/blue/sky palette, the Flood Snapshot, report ladder, runoff calculator and booking dialog — grown into a full site with [Astro](https://astro.build). It builds to plain static files.

## What’s on the site (53 pages in each language)

English pages have matching Spanish pages at `/es/`, with a language switch that keeps the current page. The build also generates English/Spanish canonical and language-alternate metadata and a combined sitemap. Each language has its own 404 page.

| Section | Pages |
| --- | --- |
| Home | `/` — the original page, now linking into everything below |
| Reports | `/reports/` and Flood Snapshot, Flood Intelligence, Expert Mitigation Plan |
| Services | `/services/` and 12 service pages, including Root Re-Router alongside drainage installation, cleaning and maintenance. Pages that already exist on floodmitigators.com keep their URLs. |
| Service areas | `/service-areas/` and 17 neighborhood pages (Memorial, Energy Corridor, Meyerland, Kingwood, Katy, Sugar Land…) |
| Resources | `/resources/`, 5 guides, the hurricane-season checklist, `/runoff-calculator/`, `/drainage-checkup/`, `/faq/` (60+ questions) |
| Company | `/about/` (Manny), `/contact/`, `/emergency/` (24/7), `/privacy/`, `/thank-you/`, 404 |
| Work & care | `/our-work/` with 16 project photographs, and `/warranty-and-care/` with testing, warranty and maintenance information |

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
- **Manny’s photo:** the current portrait is AI-generated and visibly labeled as temporary. Replace `site.owner.photo` in `src/data/site.ts` with the real photo path, set `photoIsPlaceholder` to false, and update the portrait alt text and caption in `src/components/Manny.astro`.
- **Project photographs and credentials:** `public/assets/source/` contains optimized copies of the current business site’s photographs, original logo and credential artwork. `src/data/media.ts` records source URLs and captions. The gallery describes visible work without inventing project locations or outcomes.
- **A service, area or guide:** edit its entry in `src/data/` or its `.md` file; pages, menus, footer, sitemap and structured data update automatically.
- **Share image:** after changing the logo, hero photo or phone number, run `npm run build && npm run og`.

## Run it

Needs Node.js 22.12+.

```sh
npm ci
npm run dev
```

`npm run dev` prints a Network address you can open on a phone on the same Wi-Fi. To preview the production build: `npm run build && npm start`.

## Spanish content

Spanish pages are generated from the same built HTML, so page structure, assets and controls stay in sync. All translations are saved in `src/i18n/es.json`; the site and normal builds do not call a translation service. Initial copy was machine-translated, with editorial overrides for navigation, forms, main copy and drainage terminology in `es-overrides.json`. A fluent editorial review is recommended before a production launch.

After adding English content, refresh the built source and sync missing public copy:

```sh
npx astro build --mode preview
npm run translations:sync
npm run build:preview
```

Review new translations before publishing. Normal builds fail on missing translations rather than silently showing English on a Spanish page. Form validation, confirmations, menu labels, quiz recommendations, calculator output and checklist progress are localized in the client code as well.

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

Type-checks and builds both languages, then loads all 106 content pages in Chromium to check links, files, console errors, titles, structured data, sideways scrolling from 320px phones to 1440px desktops, and accessibility (axe). It also drives the English and Spanish menus, Snapshot, booking, contact, calculator, quiz and checklist flows. Needs Playwright with Chromium on the machine.
