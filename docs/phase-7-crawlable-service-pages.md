# Phase 7 — Crawlable commercial service pages

**Prepared: 20 November 2026**

## Objective

Make H2H's primary customer and trade service pages available as complete HTML documents at the existing public routes, rather than relying on the React app shell to generate all page content. This improves the initial HTML response for crawlers that do not execute JavaScript and keeps the existing human-facing URLs.

## Pages added

Cloudflare Pages serves matching `.html` files at extensionless URLs, so the following files back the existing public routes:

| Source file | Public URL | Main intent |
|---|---|---|
| `public/men.html` | https://hair2hair.in/men | Men's hair patches and hair systems |
| `public/women.html` | https://hair2hair.in/women | Women's patches, toppers, wigs and extensions |
| `public/services.html` | https://hair2hair.in/services | Bonding, weaving, clip-ins, extensions and maintenance |
| `public/wholesale.html` | https://hair2hair.in/wholesale | Wholesale enquiries from salons and trade buyers |

Existing canonical URLs and sitemap entries were retained. React Router's route metadata uses the same extensionless canonical URLs.

## Page content and trust controls

Each page includes:
- A unique title, meta description, canonical URL, Open Graph and Twitter summary.
- Full HTML content, not text inserted only after JavaScript execution.
- A specific `Service` entity connected to the existing H2H organization entity.
- Breadcrumb structured data and FAQPage structured data that corresponds to the visible FAQ content.
- Navigation to other H2H routes and direct links to the booking, WhatsApp, phone and contact paths.
- Both current H2H location details, with Kukatpally clearly described as planned rather than an operating branch.
- Explicit prompts to confirm current inventory, product specifications, suitability, pricing and appointment availability with the business.

No new prices, opening-hour claims, performance guarantees, product stock statements, certifications, branch addresses or review counts were invented. Technical fitting and aftercare descriptions are general guidance and should be checked by the H2H service team before being treated as product-specific advice.

## Internal discovery

The main React footer already links to `/men`, `/women`, `/services` and `/wholesale`; those links now resolve to static HTML documents on Cloudflare Pages. `public/llms.txt` already references these same extensionless service URLs. The XML sitemap already includes all four routes and retains them.

## Automated quality checks

`npm run validate:geo` now validates all four commercial pages for:
- Presence and syntax of JSON-LD.
- Exact canonical URL and sitemap entry.
- Service and FAQPage schema.
- Visible FAQ content and booking/WhatsApp enquiry paths.

The existing workflow still runs GEO validation, benchmark generator/summary smoke checks, citation audit generation, TypeScript type-checking, ESLint and production build.

## Deployment and indexing checklist

After merge and Cloudflare deployment:
1. Open all four extensionless public URLs and confirm the expected page (not the React app-shell fallback) appears.
2. Check HTTP status, canonical tag, title, meta description and rendered page source.
3. Use Google's Rich Results Test or Schema Markup Validator to check JSON-LD syntax; structured data does not guarantee a rich result.
4. In Google Search Console URL Inspection, inspect each route and request indexing where appropriate.
5. Confirm the sitemap is submitted and processed, and monitor indexed pages, impressions and queries.
6. Check Search Console for duplicate/canonical selection or soft-404 issues after the pages become crawlable.
7. Verify Cloudflare's cache and security settings do not serve stale HTML or block search crawlers.

## Implementation references

- Cloudflare Pages — route matching and extensionless URLs: https://developers.cloudflare.com/pages/configuration/serving-pages/
- Google Search Central — JavaScript SEO basics and static/pre-rendered HTML: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central — canonical URL consolidation: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

Static HTML makes page content available in the initial response; it does not guarantee crawling, indexing, ranking, AI citations or recommendations. Search performance must be measured using the Phase 6 benchmark and Search Console exports.
