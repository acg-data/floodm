# Flood Mitigators — floodmitigators.com

Website for **Flood Mitigators**, a family-owned Houston yard drainage and flood mitigation company founded after Hurricane Harvey and run by owner **Manny**.

Built with [Astro](https://astro.build) as a fully static site: fast on phones, no database, deployable anywhere that serves files.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero with drainage diagram, signs, services, why Houston floods, process, Meet Manny, Drainage Checkup, areas, FAQ, quote form |
| `/services/` | All eight services |
| `/french-drain-installation-houston/` and 7 more | One page per service (signs, what’s included, diagram, process, FAQ, related) |
| `/about-us/` | Story, Manny, values |
| `/drainage-checkup/` | Interactive self-assessment that recommends services and pre-fills the quote form |
| `/flood-tips/` | Hurricane-season checklist (saves checkmarks on the device, printable) |
| `/service-areas/` | Greater Houston communities |
| `/faq/` | All FAQs, grouped, with FAQ structured data |
| `/contact-us/` | Contact options and the full quote form |

Service URLs match the existing floodmitigators.com URLs so search rankings carry over. Old URLs that moved (`/flood-tips-faq-2/`, `/rootrerouter/`) redirect via `astro.config.mjs` and `public/_redirects`.

## Edit content

Almost everything lives in `src/data/`:

- `site.ts` — phone, email, address, hours, warranty, social links, **owner (Manny) name, title and photo**
- `services.ts` — every service page’s copy, signs, process, inclusions and FAQs
- `faqs.ts` — general FAQs
- `areas.ts` — service-area communities
- `symptoms.ts` — Drainage Checkup options and how they map to services

**Add Manny’s photo:** put the image in `public/images/` (e.g. `manny.jpg`, portrait, at least 560×680) and set `owner.photo: '/images/manny.jpg'` in `src/data/site.ts`. Until then the site shows a branded monogram.

After changing the phone number or tagline, run `npm run assets` to regenerate the social share image and icons in `public/`.

## Quote form

Set `PUBLIC_FORM_ENDPOINT` (see `.env.example`) to any service that accepts a form POST — Formspree, Web3Forms, or a Cloudflare Pages Function — and submissions go there, then to `/thank-you/`. Without it, the form opens the visitor’s email app with the request pre-filled to `info@floodmitigators.com`, so no lead is lost.

## Develop

Requires Node.js 22.12+.

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
```

Runs the type check, a production build, and `scripts/qa.mjs`, which loads every page in Chromium and fails on broken internal links, missing/oversized titles and descriptions, invalid structured data, horizontal scrolling at 320–1440px, console errors and axe accessibility violations, then exercises the Drainage Checkup → quote form flow and the mobile menu. (Uses the Playwright install available on the machine.)

## Deploy

Static output goes to `dist/`.

- **Cloudflare Pages / Netlify:** build command `npm run build`, output directory `dist`. `public/_redirects` and `public/_headers` are picked up automatically.
- Any other static host works too; redirects then fall back to the generated redirect pages.
