# Phase 6 — AI visibility and search performance measurement

**Baseline framework created: 20 November 2026.** This phase separates public search discovery, private account analytics and direct AI-assistant answer tests.

## What has been measured so far

### Public search/discovery snapshot (not the same as an AI-assistant benchmark)
- Search discovery returned the official H2H domain for brand/service searches, with homepage content showing hair patches, wigs, extensions, and Dilsukhnagar + Khammam addresses. The indexed snippet still showed "4.9 / 86 Google reviews", "15+ years", and "1000+ transformations". Compare that with the live business discovery snapshot and current source code; the difference may be crawl/index lag or conflicting source data. Do not overwrite it with a new number unless the relevant profile is verified.
- Dilsukhnagar business discovery returned "H2H Hair Patch Fixing Studio" at Shop No 90, 1st Floor, H2H Hair Studio, beside Sai Baba Temple, Gaddiannaram/Dilsukhnagar, phone +91 81219 99243, with a 4.9 rating and 218-review snapshot. Confirm storefront business name/address match before changing the website or listings.
- Khammam discovery returned a Hair 2 Hair listing associated with Star Complex / New Bus Station area, while a second similarly named Hair 2 Hair listing also appeared in Raparthi Nagar with a different phone/address. These may be separate businesses or a duplicate/identity collision. Do not merge/edit/delete either listing until the owner verifies the correct Maps place ID and physical location.
- RK Hair Studio has an official Khammam location page and a listed Khammam branch, and appeared prominently in local discovery. H2H should compete through precise local information, real customer evidence and a clearly described service experience—not copied claims or review manipulation.

Source URLs inspected:
- H2H official website: https://hair2hair.in/
- H2H Hyderabad page: https://hair2hair.in/hair-replacement-hyderabad/
- H2H Khammam page: https://hair2hair.in/hair-replacement-khammam/
- RK Hair Studio Khammam page: https://rkhairstudio.com/hair-patch-fixing-in-khammam/
- RK Hair Studio branches: https://rkhairstudio.com/about-us/
- Justdial Khammam hair-fixing category: https://www.justdial.com/Khammam/Hair-Fixing-Services/nct-11980776

This snapshot is a discovery sample, not a measured ChatGPT/Gemini/Perplexity answer-position report.

## AI-assistant test design

The generator creates 50 balanced prompts × 3 platforms = 150 rows:
- ChatGPT Search
- Gemini with search
- Perplexity

Run:
```bash
npm run benchmark:geo
```
Default output: `h2h-ai-visibility-benchmark.csv`

For a dated run:
```bash
npm run benchmark:geo -- h2h-ai-visibility-2026-11.csv 2026-11-baseline
```

### Test controls
1. Use a clean, non-personalized session where possible; record sign-in state.
2. Test with India/Telangana as the target market; the operator may physically be outside India. Record the visible location/context setting instead of assuming it.
3. Use equivalent search-enabled modes on each platform, record the exact mode/interface label, date and locale.
4. Run the same exact prompts on all three platforms. Do not rewrite prompts for a preferred brand.
5. Save answer text or a screenshot and capture every cited URL. Record absence of an answer as a completed test with "no" for H2H mention.
6. Avoid rating an answer solely by whether it mentions H2H. A correct answer may appropriately recommend another provider when that best fits the query.
7. Repeat a subset on a second day and the full set monthly. AI responses vary by location, personalization, model, search mode and available sources.

### Scoring guide
- `completed`: yes/no; response was actually run and recorded.
- `h2h_mentioned`: yes/no; business is explicitly named.
- `h2h_recommendation`: yes/no/unclear; assistant actually recommends H2H, not merely mentions it.
- `brand_position_1_to_10`: order in the first ten organic/recommendation entries; leave blank if absent or position cannot be assigned.
- `official_site_cited`: yes/no; answer has a clickable citation to hair2hair.in.
- `official_page_url`: exact cited H2H page, if any.
- `third_party_sources`: exact independent domains cited, semicolon-separated.
- `correct_branch_0_to_2`: 0 wrong/absent; 1 partially correct; 2 correctly distinguishes Dilsukhnagar, Khammam and planned Kukatpally.
- `correct_service_0_to_2`: 0 incorrect; 1 partially correct; 2 accurate to the prompt and current service list.
- `correct_contact_0_to_1`: 0 wrong/absent when relevant; 1 correct or not applicable (leave blank if not asked).
- `unsupported_or_wrong_claim`: yes if the response invents an active Kukatpally branch, price, certification, review figure, guarantee, medical outcome or other material fact.
- `notes`: mention any other hallucination, stale data, or ambiguity.

Summarize a completed run:
```bash
npm run summarize:geo -- h2h-ai-visibility-2026-11.csv h2h-ai-visibility-summary.json
```
The summary calculates mention, recommendation, official citation, top-three presence, accuracy and unsupported-claim rates per platform. Blank rows are excluded. Do not compare runs with different prompt sets as if they were identical.

## Search Console baseline

Google Search Console is the source for Google organic search metrics, not AI-assistant answer mentions. Open https://search.google.com/search-console/ and select the Domain property `hair2hair.in`.

Export the Search results Performance report for:
- Last 28 days versus previous 28 days
- Search type: Web
- Dimensions: Query, Page, Country, Device
- Metrics: Clicks, Impressions, CTR, Average position

Export all rows available (or use Search Analytics API) and populate `docs/phase-6-search-console-template.csv`. For branch-level analysis, filter pages to:
- `/hair-replacement-hyderabad/`
- `/hair-replacement-khammam/`
- `/hair-replacement-services/`

Also track the homepage, selection guide, maintenance guide and Telugu page. Segment queries into branded (Hair 2 Hair / H2H) and non-branded service + location queries. Compare trends, not just a single average-position value: Search Console defines clicks, impressions, CTR and position separately and position is an average over impressions.

Official sources:
- Performance report: https://support.google.com/webmasters/answer/7576553
- Common Performance report tasks: https://support.google.com/webmasters/answer/17010961
- Data aggregation details: https://support.google.com/webmasters/answer/17011364

Private Search Console data cannot be read from this public repository. No values are prefilled or invented.

## Business Profile verification

Fill `docs/phase-6-business-profile-verification-template.csv` using the actual owner-controlled Google Business Profile and Bing Places accounts. Record screenshots/evidence and check:
- exact business name matches permanent signage and real-world usage;
- address and pin match customer entrance and staffed premises;
- phone connects to that branch (use unique branch phone where available);
- hours match actual branch operation;
- primary category is the narrowest accurate category;
- website link points to the matching location page;
- services and photos are current.

Google permits profiles for actual eligible locations and requires accurate real-world representation, precise addresses, appropriate categories and no duplicate profiles. Kukatpally must not be listed as an operating branch until it opens and is eligible.

Official Google guidelines:
- https://support.google.com/business/answer/3038177
- https://support.google.com/business/answer/13762416

Bing Places:
- https://www.bingplaces.com/
- https://support.microsoft.com/en-us/bing/add-and-manage-your-business-listing

## Monthly scorecard
Report these separately:
1. AI brand mention rate (all prompts and non-branded discovery prompts).
2. Explicit recommendation rate.
3. Official H2H citation rate.
4. First-three recommendation presence.
5. Correct branch/service/contact information rate.
6. Unsupported/wrong claim rate.
7. Search Console clicks/impressions/CTR/position by page and query type.
8. Business Profile completeness and unresolved identity conflicts.

Do not state "ranked #1 in ChatGPT" based on a few sample prompts. The goal is repeatable visibility and accurate recommendations, not guaranteed placement.
