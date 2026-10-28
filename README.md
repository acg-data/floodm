# Flood Mitigators — floodmitigators.com

One-page website for **Flood Mitigators**, the family-owned Houston flood assessment and drainage company started by owner **Manny** after Hurricane Harvey.

The design is the “Flood Mitigators” page built in Claude (Plus Jakarta Sans, navy/blue/sky, the Flood Snapshot, report ladder, runoff calculator and booking dialog), moved here as a plain static site:

- `site/index.html` — the whole page: markup, styles and script in one file
- `site/assets/img/` — logo, hero, service, crew and truck photos
- `site/assets/fonts/` — Plus Jakarta Sans, self-hosted (SIL Open Font License)
- `site/assets/icons/`, `site/assets/og.jpg` — favicons and the link-preview image
- `site/_redirects` — sends the current floodmitigators.com page URLs (French drains, sump pumps, about, contact…) to the matching section
- `site/404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `_headers`

No build step and no dependencies to run it.

## Preview (including on your phone)

```sh
npm start
```

It prints two addresses: one for this computer and one for a phone on the same Wi-Fi. Needs Node.js 20+.

## Deploy

**Cloudflare Pages:** Workers & Pages → Create → Pages → Connect to Git → `acg-data/floodm`. Build command: *none*. Build output directory: `site`. `_redirects` and `_headers` are picked up automatically, and every branch gets its own preview link.

Or upload directly:

```sh
npx wrangler pages deploy site --project-name floodmitigators
```

Any static host works — just serve the `site/` folder.

## Common edits (all in `site/index.html`)

- **Form submissions.** Near the top of the `<script>` at the bottom, set `LEAD_ENDPOINT` to a URL that accepts a JSON POST (Formspree, a Supabase Edge Function, a Cloudflare Pages Function…). Until it’s set, the Snapshot and booking forms open the visitor’s email app addressed to `info@floodmitigators.com`, so no request is lost.
- **Manny’s photo.** Put it at `site/assets/img/manny.jpg` and, inside `<div class="manny-card">`, swap the logo `<img>` for `<img class="manny-photo" src="assets/img/manny.jpg" alt="Manny, owner of Flood Mitigators">` (there’s a comment marking the spot).
- **Phone, email, hours.** Search the file for `(281) 849-1082`, `tel:+12818491082` and `info@floodmitigators.com`; the structured data for Google is in the `application/ld+json` blocks in `<head>`.
- **Service areas.** The `<ul class="area-list">` in the “Where we work” section.

After changing the logo, hero photo or phone number, run `npm run og` to regenerate the link-preview image.

## Check before you ship

```sh
npm ci && npm test
```

Loads the page in Chromium and fails on missing files, console errors, broken in-page links, sideways scrolling anywhere from 320px phones to 1440px desktops, and accessibility problems (axe). It also drives the mobile menu, the two-step Flood Snapshot, the booking dialog and the runoff calculator. Needs Playwright with Chromium on the machine.
