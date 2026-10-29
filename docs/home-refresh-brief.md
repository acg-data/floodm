# Home page refresh — October 29, 2026

The later user-supplied brand board supersedes this brief's dark palette and aerial hero. Current color, logo and below-hero placement decisions are documented in `light-palette-refresh.md`; the source/content and functional requirements below still apply.

The user supplied the Neal Roofing desktop screenshot (1789 × 873) and asked for a mixture of the earlier home imagery and the current site, with clearer benefits of moving water and healthy outdoor space. Remove the Houston-operated crew overlay. Include actual, researched reviews. Preserve all existing English and Spanish routes, tools, business content and project photography.

## Reference and content contract

Reference: user attachment `codex-clipboard-425c25a5-efab-47f2-aa87-43b74d207fc6.png`. Supporting existing capture pack: `../drainscape-solutions-neal-clone/reference-pack/capture-manifest.json` and `design-system/design-system.json`. The screenshot is visual reference only: no Neal text, media, marks, license, ratings or warranty claims may be reused.

Adapt the blue contact strip, near-black navigation, dark residential photo hero, left proof/headline/service links, and bordered estimate form on the right. Continue the established light editorial sections below. Typography stays self-hosted Plus Jakarta Sans. Tokens and responsive rules for the refreshed shell and sections live in `src/styles/home-refresh.css`.

Business facts: Flood Mitigators' own website. Review facts: Google Maps listing CID 6538590619509756704, observed October 29, 2026: 4.8/5, 56 reviews. Three selected five-star excerpts, combined 22 quoted words, retain author attribution, source links and English originals in both locales. No self-serving aggregate-rating schema. Review evidence is recorded in typed data; counts are a dated snapshot rather than a live feed.

Photography: owner-provided project images plus licensed Unsplash residential photos, with creator/license/provenance stored alongside assets. Stock residences are illustrative, never labeled completed projects. Retain the clearly labeled temporary portrait.

## Acceptance

Desktop reference composition at 1789 × 873; implementation also tested at 1440, 1280, 1081, 1024, 768, 414, 390, 375 and 320 pixels. Mobile is an intentional stacked adaptation because no phone reference was supplied. No clipping, overflow, missing images or console errors. Header and dropdowns remain keyboard and touch accessible. Forms have accessible labels, correct validation and bilingual success/error states. The estimate form preserves the existing email-app fallback honestly.

Run Astro type/build checks, saved translation sync, site crawler and axe accessibility checks, estimate-form flows in both languages, existing Spanish tools and navigation checks, and static SEO audit. Batch desktop/mobile inspection and one repair confirmation if needed. Image comparison metrics are diagnostic, not a pixel-match threshold: branding, business copy, licensed photos and contrast corrections intentionally differ. Deploy only the already-authorized Cloudflare preview after verification and push to the existing branch.
