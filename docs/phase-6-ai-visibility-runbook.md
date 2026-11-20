# Phase 6 — AI visibility and search performance measurement

**Measurement framework and public discovery snapshot: 20 November 2026.** Phase 6 separates public web discovery, private analytics and repeatable AI-assistant response tests. Search results are only a discovery snapshot; they are not proof of an AI platform's answer ranking.

## 1. Public discovery snapshot

### H2H facts visible in current public sources
- The official H2H site and owner-managed Google profile identify current locations in Dilsukhnagar, Hyderabad and Khammam. Dilsukhnagar is **Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060**, phone **+91 81219 99243**, hours **7:00 AM–7:00 PM daily**. Khammam is listed at **2nd floor, Star Complex, near New Bus Stand, Khammam, Telangana 507002**, phone **+91 81219 99243**; opening hours are not published until the owner confirms them.
- The owner-managed Dilsukhnagar Google profile screenshot on 20 November 2026 showed **4.9 / 239 reviews**, phone +91 81219 99243, Shop No. 90, and 7 AM–7 PM. Review totals change; the website no longer publishes a copied review number.
- A public Google Maps result named **Hair 2 Hair studio** appears at 747W+J69, Krishnapushpam, Raparthi Nagar, Khammam 507001, with a different phone (+91 85238 33028). This is not confirmed as the owner's Star Complex listing. Treat it as an unresolved identity/location question; do not merge, delete or edit it without verifying place ID, ownership, signage and address.
- In the current repository, the homepage previously still contained unsupported "15+ years", "1000+ transformations", "35% a year industry growth" and "6–12 months break-even" claims in the hero/franchise sections even though Phase 5 had removed related claims elsewhere. Phase 6 removes these leftover claims and adds regression checks. The homepage now foregrounds the two confirmed current locations and private consultation rooms. The franchise section asks interested visitors to contact the business for current details instead of asserting unsupported growth, tenure or payback figures.
- Search result snippets can lag a deployment or retain legacy text. After this branch is merged, the production site must be checked directly and Google Search Console URL Inspection used to request recrawling of the homepage. A GitHub merge/build alone does not prove that Cloudflare Pages has deployed the changes.
- A competitor discovery snapshot returned **RK Hair Studio** at NTR Circle, New Bus Stand Road, beside SBI Bank, Bank Colony, Khammam 507001 (public business result snapshot: 5.0 rating / 172 reviews; phone +91 99663 01113). Its own site also lists its Khammam branch. Another Hyderabad result returned **American Hair Club** in Madhapur as a hair replacement service. These are discovery leads for competitive monitoring, not audited quality rankings. Do not copy competitor claims or review text.

### Current local competitor observations — 20 November 2026

These are structured local-search snapshots, not a universal ranking. Ratings and review totals change and do not prove service quality.

| Target area | Business | Public snapshot | What it means for H2H |
|---|---|---|---|
| Dilsukhnagar | H2H Hair Patch Fixing Studio | 4.9 / 218 reviews; address Shop No. 90, 1st Floor, H2h Hair Studio, Temple beside Sai Baba, Gaddiannaram; phone +91 81219 99243; category hair replacement service | H2H has real local relevance. An owner screenshot on the same date showed 239 reviews, so the count conflicts across surfaces; do not publish a static total. |
| Dilsukhnagar | RK Hair Studio | 4.8 / 485 reviews; Dilsukhnagar Main Road, VR Colony, Chaitanyapuri; phone +91 88976 41507; hair replacement service | A nearby direct competitor with substantially more visible reviews in this snapshot. |
| Dilsukhnagar | Professional Hair Centre | No rating/review count returned; KK Arcade, opposite Konark Theatre, Gaddiannaram; phone +91 99633 97834 | Nearby direct hair-replacement service. |
| Kukatpally | Sudheer Hair Studio | 4.8 / 420 reviews; Pillar 808, Sai Vikram Towers, near Kukatpally Metro; phone +91 99128 80180; hair replacement, extensions and wig shop categories | An established local competitor; H2H must not imply it has a Kukatpally branch. |
| Kukatpally / KPHB | Thaswika Hair Extensions | 4.9 / 350 reviews; KPHB, Kukatpally; phone +91 99637 77514; hair extensions supplier | Relevant for extensions and some hair-patch discovery, but not identical to a dedicated hair-replacement studio. |
| Kukatpally | Wig Wonders Hair Studio | Its website advertises branches in Kukatpally and Secunderabad | A direct local competitor with a physical Kukatpally presence. Source: https://www.wigwondershairstudio.com/ |
| Khammam | RK Hair Studio | 5.0 / 172 reviews; NTR Circle, New Busstand Road, beside SBI Bank; phone +91 99663 01113; hair replacement service | Direct local competitor with a strong visible review profile. |
| Khammam | VCare Hair And Skin Clinic | 4.8 / 423 reviews; Khammam–Yellandu Road, Bank Colony; phone +91 73958 24242; clinic and hair-replacement categories | Adjacent clinical provider; distinguish medical treatments from non-surgical systems when comparing. |

**Practical implications**
- Dilsukhnagar: strengthen the existing H2H Google profile's completeness, categories, current photos, appointment/contact details and external citations. Do not buy reviews or add keywords to the business name.
- Kukatpally: H2H has no confirmed operating branch there. The truthful strategy is to explain current branch locations and confirm whether enquiries can be served from a current studio; a fake address or false “near me” claim would weaken trust.
- Khammam: verify/claim the correct Star Complex Justdial and Google records and reconcile address, postcode, phone and hours before attempting merges.
- Across all areas: publish real fitter-led explanations, product comparisons and consented customer experiences. Avoid city-page duplication or keyword-stuffed service-area claims.

### Sources used for this snapshot
- H2H official homepage and current location snippets: https://hair2hair.in/
- H2H Hyderabad location page: https://hair2hair.in/hair-replacement-hyderabad/
- H2H Khammam location page: https://hair2hair.in/hair-replacement-khammam/
- H2H Dilsukhnagar map profile: https://maps.app.goo.gl/w4wrJEm8rgbL19vB7
- H2H Khammam map profile supplied by the owner: https://maps.app.goo.gl/cHGQB3nsq2i19qLZ9
- RK Hair Studio Khammam service page: https://rkhairstudio.com/hair-patch-fixing-in-khammam/
- RK Hair Studio branch page: https://rkhairstudio.com/about-us/

Justdial public results also show an H2H listing at Flat 201, near RK Bar and Restaurant, Star Complex, with 5.0 / 1,169 ratings and 8 AM–10 PM; the displayed postal code is 507001 and must be checked against the owner-provided 507002. A separate Balaji Nagar Hair 2 Hair Studio result (4.9 / 77) may be another business or duplicate; verify the map pin before merging. The owner-provided Star Complex Maps URL remains the official Khammam reference until clarified.

## 2. AI-assistant benchmark

The benchmark generator creates **50 prompts × 4 platforms = 200 test rows**:
- ChatGPT Search
- Gemini with search
- Perplexity
- Claude with web search enabled

The prompt set covers non-branded discovery, services, local competition, brand facts, branch accuracy and Telugu. It includes Kukatpally queries to ensure assistants do not hallucinate a branch that is only planned. The four platforms are ChatGPT Search, Gemini with search, Perplexity and Claude with web search.

Run:
```bash
npm run benchmark:geo
```
Default output: `h2h-ai-visibility-benchmark.csv`.

For a dated run:
```bash
npm run benchmark:geo -- h2h-ai-visibility-2026-11.csv 2026-11-baseline
```

### Test controls
1. Use a clean, non-personalized session where possible; record sign-in state and platform mode.
2. Test the Indian/Telangana market consistently. The operator may be physically outside India; record the visible location/context setting instead of assuming the platform is using Hyderabad.
3. Use equivalent search-enabled modes on each platform and record the exact mode/interface label, date and locale. For Claude, explicitly enable Web Search (or record the experience's automatic search mode) and keep it consistent across the run.
4. Run the same prompts on all platforms without rewriting them to favour H2H.
5. Save answer text or screenshots, capture cited URLs, and record an explicit "no" for H2H mention when a completed response does not mention it.
6. Do not score an answer as poor only because it recommends a competitor. A correct, source-supported recommendation can be better than an inaccurate H2H mention.
7. Redact client names, phone numbers and other personal data from any evidence capture.
8. Repeat a subset on a second day and the full set monthly. Responses vary by location, personalization, model, search mode and available sources.

### Scoring guide
- `completed`: yes only when the response was actually run and recorded.
- `h2h_mentioned`: yes/no; business is explicitly named.
- `h2h_recommendation`: yes/no/unclear; assistant actually recommends H2H, not merely mentions it.
- `brand_position_1_to_10`: order in the first ten recommendation entries; leave blank if absent or position cannot be assigned.
- `official_site_cited`: yes/no; answer has a clickable citation to hair2hair.in.
- `official_page_url`: exact cited H2H page.
- `third_party_sources`: independent source domains cited, semicolon-separated.
- `correct_branch_0_to_2`: 0 wrong/absent; 1 partially correct; 2 correctly distinguishes Dilsukhnagar, Khammam and planned Kukatpally.
- `correct_service_0_to_2`: 0 incorrect; 1 partially correct; 2 accurate to the prompt and current service list.
- `correct_contact_0_to_1`: 0 wrong/absent when relevant; 1 correct; leave blank when not asked.
- `unsupported_or_wrong_claim`: yes if it invents an active Kukatpally branch, price, certification, review figure, guarantee, medical outcome or other material fact.
- `notes`: record hallucinations, outdated data or ambiguous ownership/location information.

Summarize a completed run:
```bash
npm run summarize:geo -- h2h-ai-visibility-2026-11.csv h2h-ai-visibility-summary.json
```
The summary calculates mention, recommendation, official citation, top-three presence, accuracy and unsupported-claim rates per platform. Only rows marked `completed=yes` are included. This is a controlled sample, not an official model ranking or guarantee of recommendation.

## 3. Google Search Console baseline

Google Search Console measures Google organic search performance, not AI-assistant answer mentions. Open https://search.google.com/search-console/ and select the Domain property `hair2hair.in`.

Export the Search results Performance report for:
- Last 28 days compared with the previous 28 days.
- Search type: Web.
- Dimensions: Query, Page, Country and Device.
- Metrics: Clicks, Impressions, CTR and Average position.

Use the Search Console export directly or paste rows into `docs/phase-6-search-console-template.csv`. For branch-level analysis, filter pages to:
- `/hair-replacement-hyderabad/`
- `/hair-replacement-khammam/`
- `/hair-replacement-services/`

Also track the homepage, selection guide, maintenance guide and Telugu page. Segment branded (Hair 2 Hair / H2H) from non-branded service + location queries. Compare trends over matched periods. Average position is an impression-weighted average/topmost result metric, not a fixed rank for every user or search. Search Console's aggregation mode (property vs page) also changes the totals.

Official sources:
- Performance report overview: https://support.google.com/webmasters/answer/7576553
- Common tasks and use cases: https://support.google.com/webmasters/answer/17010961
- Data aggregation and freshness: https://support.google.com/webmasters/answer/17011364

Private Search Console data is not available through this public repository. No clicks, impressions or rankings have been invented or prefilled.

## 4. Business Profile and crawler checks

Fill `docs/phase-6-business-profile-verification-template.csv` from the owner-controlled Google Business Profile and Bing Places accounts. Record a date and evidence URL for each branch. Check:
- Business name matches real-world signage and is not stuffed with keywords.
- Address and map pin match the staffed customer entrance.
- Phone connects to the relevant branch; resolve shared/wrong phone numbers.
- Hours match actual operation.
- Primary category is accurate.
- Website link points to the matching location page.
- Services, photos and appointment/contact details are current.
- No duplicate or unowned profile is edited or removed before identity is confirmed.

Google requires accurate real-world business representation and precise addresses. Its duplicate-profile guidance says one profile should represent each business; however, two eligible distinct businesses may share an address under the policy conditions. This is why the Raparthi listing must be owner-verified before any consolidation action. Kukatpally must not be represented as an active H2H branch until it opens and is eligible.

Official Google guidance:
- Representing your business: https://support.google.com/business/answer/3038177
- Duplicate profiles and ownership: https://support.google.com/business/answer/12756178
- Add or claim a profile: https://support.google.com/business/answer/2911778

### OpenAI search crawler access
The site's `robots.txt` already allows `OAI-SearchBot`. OpenAI's guidance also says the hosting provider/CDN must allow its published search crawler IP addresses. Therefore, after the Phase 6 merge, verify Cloudflare WAF/Bot settings and logs; the robots.txt rule alone does not prove the CDN is allowing crawler requests.
- OpenAI: https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt

Bing Places: https://www.bingplaces.com/

## 5. Monthly scorecard
Report these separately:
1. AI brand mention rate (all prompts and non-branded discovery prompts).
2. Explicit recommendation rate.
3. Official H2H citation rate.
4. First-three recommendation presence.
5. Correct branch/service/contact information rate.
6. Unsupported/wrong claim rate.
7. Search Console clicks, impressions, CTR and average position by landing page and query type.
8. Business Profile completeness and unresolved identity conflicts.
9. Production deployment and OAI-SearchBot crawl accessibility.

Do not state "ranked #1 in ChatGPT" based on a few prompts. The goal is repeatable visibility, accurate branch facts and trustworthy citations, not guaranteed placement.
