# Houston onsite service focus

October 29, 2026: the home page now centers on in-person drainage assessments, installation and aftercare. The report ladder, Snapshot signup, remote-report FAQs and neighborhood grid were removed. Reports no longer appear in the main navigation or footer, and core service/location/contact/tool pages direct visitors to an onsite visit. Existing report URLs remain available without breaking their product-specific request flow.

Locations is a keyboard- and touch-operable dropdown with the 17 existing community pages and a coverage hub link. The footer no longer repeats the neighborhood list. Links have no underlines; inline links use stronger font weight, with the existing keyboard focus outline preserved.

The Google Business Profile is Flood Mitigators, 8614 Pagewood Ln, Houston, TX 77063, phone (281) 849-1082. The public listing was checked directly in Google Maps on October 29, 2026: 4.8 stars and 56 reviews. `src/data/google-business.ts` stores the listing URL and the iframe URL obtained from Google's Share → Embed a map dialog. Home and contact pages embed this official Google card, which includes Google's rating/review entry point and business pin. Address links in the footer and business `hasMap` schema use the same verified listing.

The official iframe is served by Google. The three selected review excerpts and the surrounding rating/count are a dated snapshot, not an automatically refreshed text-review feed. Their original words and author names remain in English, and the source/check date stays visible. No self-serving AggregateRating markup or third-party widget account was added. The iframe switches to Spanish on Spanish pages and has a direct Google Maps link available underneath it.

The light brand palette, compact credentials directly below the hero, Houston home imagery, rain facts and interactive tools remain in place. The homeowner's future house/pooling image has not been substituted or fabricated.

Validation: Astro check and bilingual build; home removals, original review excerpts, dropdown behavior and language-preserving location links; ten viewport widths; keyboard rainfall table; form validation and honest email-app fallback; English and Spanish interactive flows; full route crawl and accessibility checks; static SEO audit. The embedded Google card was additionally inspected in a regular browser, where Google rendered the actual business address, pin, 4.8 rating and 56-review entry point. Headless screenshots can leave Google's externally rendered iframe blank while the site's content and direct link remain available.

Design detector warnings about the existing Plus Jakarta Sans font and an older decorative border were reviewed: the typeface is explicitly specified by the user's brand board, and neither warning concerns a new component.
