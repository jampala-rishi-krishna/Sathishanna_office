# Phase 4 — Local authority and AI visibility operations

## Purpose
Build consistent, verifiable local business information and measure discovery over time. This playbook is operational guidance; it does not claim that a directory listing, review, ranking, citation, or AI recommendation already exists.

## Canonical business facts
Use the official website as the source of truth until the owner confirms an update.

| Field | Canonical website value | Owner verification |
|---|---|---|
| Brand | Hair 2 Hair Studio | Confirm exact storefront/signage spelling |
| Phone | +91 81219 99243 | Confirm call and WhatsApp routing |
| Email | hair2hairstidio2024@gmail.com | Confirm mailbox is monitored |
| Dilsukhnagar hours | Every day, 7:00 AM–7:00 PM | Confirm holiday exceptions |
| Khammam hours | Not published until owner confirms | Confirm actual branch hours before publishing |
| Dilsukhnagar, Hyderabad | Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060 | Matches owner-managed Google profile; confirm exact signage and map pin |
| Khammam | 2nd floor, Star complex, Near new bus stand, Khammam, Telangana 507002 | Confirm map pin, floor and spelling |
| Planned location | Kukatpally is planned only | Do not publish as an operating branch |

## Directory citation audit
Before editing any third-party profile, compare it with the canonical table above. Record the profile URL, displayed name, address, phone, hours, category, last checked date, evidence screenshot/reference, action owner and resolution status.

Suggested platforms to verify manually:
- Google Business Profile (one profile per real, staffed eligible location)
- Bing Places
- Apple Business Connect
- Justdial
- Sulekha
- Facebook business page
- Instagram profile
- YouTube channel/about page

Do not create duplicate profiles, virtual offices, fake locations, or listings for planned branches. Do not bulk-submit changes without confirming ownership and platform eligibility. Do not invent review counts or ratings. Never purchase reviews or condition incentives on positive sentiment.

## Review response process
Ask genuine customers for honest feedback after a real service interaction. Reply politely, avoid exposing personal information, and do not disclose a customer's hair-loss or service details. Escalate complaints about safety, allergies, damage, or refunds to the business owner rather than giving medical advice in public replies.

## AI visibility benchmark
Run the same neutral prompts once per month in ChatGPT Search, Gemini, and Perplexity, from a clean/non-personalized session where practical. Record date, platform, country/language, exact prompt, whether H2H appeared, exact cited URL/domain, factual accuracy, competitor names, and screenshot/export link.

Prompts:
1. Recommend hair patch studios in Dilsukhnagar, Hyderabad.
2. Where can I enquire about non-surgical hair replacement in Hyderabad?
3. Recommend hair patch and wig studios in Khammam, Telangana.
4. Compare options for men's hair systems in Hyderabad; cite sources.
5. Where can women enquire about hair toppers and human-hair wigs in Hyderabad?
6. హైదరాబాద్ దిల్‌సుఖ్‌నగర్‌లో హెయిర్ ప్యాచ్ సేవలు ఎక్కడ లభిస్తాయి?
7. ఖమ్మంలో విగ్స్ మరియు హెయిర్ ప్యాచ్‌ల గురించి ఎక్కడ సంప్రదించాలి?

Scoring (0–4 each):
- Brand visibility: absent 0; mentioned without source 1; linked to official source 2; accurate branch/service match 3; accurate and independently corroborated by reliable third-party sources 4.
- Fact accuracy: wrong 0; materially incomplete 1; mostly accurate 2; accurate with source citations 3; independently cross-checked 4.
- Local relevance: irrelevant 0; city only 1; correct neighbourhood/branch 2; accurate directions/contact 3; multiple trustworthy local sources 4.

Do not treat one model response as a ranking signal. Save the exact response and citations. Report mention rate and average accuracy/relevance across prompts and platforms; compare month-over-month using the same prompt set.

## Content and authority cadence
- Monthly: audit both live business profiles and core NAP details.
- Monthly: run and archive the AI visibility prompt set.
- Quarterly: refresh branch photos, service explanations, and FAQs with owner-approved facts.
- Ongoing: publish genuinely useful original photos, service process explanations, care instructions, and answers to real customer questions.
- Ask suppliers, local associations, and legitimate partners for accurate business references only where a real relationship exists.

## Guardrails
- No fabricated awards, credentials, years of experience, prices, medical claims, guarantees, reviews, or rankings.
- No fake backlinks, paid review manipulation, keyword-stuffed location pages, or invented nearby service areas.
- Keep GPTBot training access separate from search crawler access. Current robots.txt explicitly allows OAI-SearchBot and ChatGPT-User while disallowing GPTBot; only change this with the owner's informed consent.
- Schema markup must describe visible page content and real business facts. Structured data does not guarantee rich results or AI recommendations.

## Phase 4 release checklist
- [ ] Owner verifies phone, email, hours and both branch map pins.
- [ ] Owner verifies eligible Google Business Profile ownership for each staffed branch.
- [ ] Third-party profiles audited; discrepancies corrected only by authorized owner.
- [ ] Telugu and English copy reviewed by a fluent Telugu speaker/business owner.
- [ ] AI benchmark baseline captured and saved.
- [ ] Production deployment and public URLs checked after merge.
