import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const htmlFiles = [
  'index.html',
  'public/about-hair2hair/index.html',
  'public/hair-replacement-hyderabad/index.html',
  'public/hair-replacement-khammam/index.html',
  'public/hair-replacement-services/index.html',
  'public/hair-patch-telugu/index.html',
  'public/hair-patch-selection-guide/index.html',
  'public/hair-system-maintenance-guide/index.html',
  'public/editorial-policy/index.html',
  'public/men.html',
  'public/women.html',
  'public/services.html',
  'public/wholesale.html',
];

for (const file of htmlFiles) {
  const html = read(file);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert(blocks.length > 0, `Missing JSON-LD block: ${file}`);
  for (const [, json] of blocks) {
    const data = JSON.parse(json);
    assert(data['@context'] === 'https://schema.org', `Invalid schema context: ${file}`);
    assert(Array.isArray(data['@graph']) && data['@graph'].length > 0, `Missing schema graph: ${file}`);
  }
  assert(/<link rel="canonical" href="https:\/\/hair2hair\.in/.test(html), `Missing hair2hair.in canonical: ${file}`);
}

const homepage = JSON.parse(read('index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const types = homepage['@graph'].map((item) => item['@type']);
assert(types.includes('Organization'), 'Homepage schema must identify the organization');
assert(types.includes('WebSite'), 'Homepage schema must identify the website');
assert(types.includes('HairSalon'), 'Homepage schema must include branch entities');
assert(types.includes('FAQPage'), 'Homepage schema must include visible FAQs');

const sitemap = read('public/sitemap.xml');
for (const url of [
  'https://hair2hair.in/about-hair2hair/',
  'https://hair2hair.in/hair-replacement-hyderabad/',
  'https://hair2hair.in/hair-replacement-khammam/',
  'https://hair2hair.in/hair-replacement-services/',
  'https://hair2hair.in/hair-patch-telugu/',
  'https://hair2hair.in/hair-patch-selection-guide/',
  'https://hair2hair.in/hair-system-maintenance-guide/',
  'https://hair2hair.in/editorial-policy/',
]) {
  assert(sitemap.includes(`<loc>${url}</loc>`), `Missing sitemap URL: ${url}`);
}

const commercialRoutes = [
  { file: 'public/men.html', url: 'https://hair2hair.in/men', name: "Men's hair patches and hair systems" },
  { file: 'public/women.html', url: 'https://hair2hair.in/women', name: "Women's Hair Patches, Toppers &amp; Human Hair Wigs in Hyderabad and Khammam | H2H Hair Studio" },
  { file: 'public/services.html', url: 'https://hair2hair.in/services', name: 'Hair Bonding, Weaving &amp; Extensions in Hyderabad and Khammam | H2H Hair Studio' },
  { file: 'public/wholesale.html', url: 'https://hair2hair.in/wholesale', name: 'Wholesale Hair Patches, Wigs &amp; Systems in Hyderabad | H2H Hair Studio' },
];
for (const route of commercialRoutes) {
  const html = read(route.file);
  assert(html.includes(`<link rel="canonical" href="${route.url}">`), `Incorrect canonical URL: ${route.file}`);
  assert(html.includes(`<title>${route.name}`) || html.includes(route.name), `Missing route-specific service content: ${route.file}`);
  assert(sitemap.includes(`<loc>${route.url}</loc>`), `Missing commercial URL in sitemap: ${route.url}`);
  const schemaBlock = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(schemaBlock, `Missing JSON-LD: ${route.file}`);
  const schema = JSON.parse(schemaBlock[1]);
  assert(schema['@graph'].some((item) => item['@type'] === 'Service'), `Missing Service schema: ${route.file}`);
  assert(schema['@graph'].some((item) => item['@type'] === 'FAQPage'), `Missing FAQPage schema: ${route.file}`);
  assert(html.includes('Frequently asked questions'), `Missing visible FAQ content: ${route.file}`);
  assert(html.includes('wa.me/918121999243') && html.includes('/booking'), `Missing enquiry paths: ${route.file}`);
}


const branchData = read('src/lib/site.ts');
assert(branchData.includes("Every day, 7:00 AM–7:00 PM"), 'Dilsukhnagar hours must match the owner-managed Google profile');
assert(branchData.includes('Shop No. 90, 1st Floor'), 'Dilsukhnagar canonical address must include Shop No. 90');
assert(branchData.includes('Contact the studio to confirm current hours'), 'Khammam hours must remain unpublished until owner confirmation');
assert(!branchData.includes('reviewCount') && !branchData.includes("hours: 'Every day, 9:"), 'Do not reintroduce stale site-wide hours or copied review counts');

const homeSchema = homepage['@graph'].filter((item) => item['@type'] === 'HairSalon');
const dilsukhnagarSchema = homeSchema.find((item) => item['@id'] === 'https://hair2hair.in/#dilsukhnagar');
const khammamSchema = homeSchema.find((item) => item['@id'] === 'https://hair2hair.in/#khammam');
assert(dilsukhnagarSchema?.openingHours === 'Mo-Su 07:00-19:00', 'Dilsukhnagar structured hours must be 07:00–19:00');
assert(!khammamSchema?.openingHours, 'Do not publish unconfirmed Khammam structured hours');
assert(dilsukhnagarSchema?.address?.streetAddress?.includes('Shop No. 90'), 'Dilsukhnagar schema must include Shop No. 90');

const reviewComponent = read('src/components/GoogleReviews.tsx');
assert(!reviewComponent.includes('reviewCount') && !reviewComponent.includes('218'), 'Do not display a stale static Google review count');
const hyderabadLocation = read('public/hair-replacement-hyderabad/index.html');
const khammamLocation = read('public/hair-replacement-khammam/index.html');
assert(hyderabadLocation.includes('Every day, 7:00 AM–7:00 PM'), 'Hyderabad location page must show verified 7 AM opening');
assert(khammamLocation.includes('Contact the studio to confirm current opening hours'), 'Khammam location page must not invent opening hours');
assert(!khammamLocation.includes('09:00-19:00') && !khammamLocation.includes('9:00 AM–7:00 PM'), 'Khammam location page must not retain unconfirmed 9 AM hours');

const homeComponent = read('src/pages/Home.tsx');
assert(homeComponent.includes('href={b.mapsUrl} target="_blank"'), 'Homepage branch directions link must be valid JSX');
assert(!homeComponent.includes('href={b.mapsUrl target='), 'Homepage branch directions link must not contain malformed JSX');

const homepageSource = read('src/pages/Home.tsx');
for (const unsupportedClaim of ['15+ years', 'over 15 years', '1000+', '35% a year', '6–12 months']) {
  assert(!homepageSource.includes(unsupportedClaim), `Homepage must not reintroduce unsupported claim: ${unsupportedClaim}`);
}

const llms = read('public/llms.txt');
assert(llms.includes('Dilsukhnagar, Hyderabad') && llms.includes('Khammam'), 'llms.txt must list both current branches');
assert(llms.includes('planned expansion') && llms.includes('Kukatpally'), 'llms.txt must distinguish planned Kukatpally expansion');
for (const url of [
  'https://hair2hair.in/hair-patch-selection-guide/',
  'https://hair2hair.in/hair-system-maintenance-guide/',
  'https://hair2hair.in/editorial-policy/',
]) assert(llms.includes(url), `llms.txt is missing ${url}`);

const robots = read('public/robots.txt');
assert(/User-agent: OAI-SearchBot[\s\S]*?Allow: \/[\s\S]*?Sitemap:/m.test(robots), 'robots.txt must allow OAI-SearchBot and declare the sitemap');
assert(existsSync(join(root, 'public/llms.txt')), 'public/llms.txt must exist');

for (const file of [
  'public/hair-patch-selection-guide/index.html',
  'public/hair-system-maintenance-guide/index.html',
]) {
  const html = read(file);
  assert(html.includes('Frequently asked questions'), `Missing visible FAQ section: ${file}`);
  const faqBlock = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(faqBlock, `Missing JSON-LD: ${file}`);
  const jsonLd = JSON.parse(faqBlock[1]);
  assert(jsonLd['@graph'].some((item) => item['@type'] === 'FAQPage'), `Missing FAQ schema: ${file}`);
}

assert(existsSync(join(root, 'docs/phase-5-external-authority.md')), 'Missing Phase 5 authority playbook');
assert(existsSync(join(root, 'docs/phase-5-directory-citation-audit-template.csv')), 'Missing directory citation audit template');
assert(existsSync(join(root, 'scripts/create-geo-citation-audit.mjs')), 'Missing citation audit generator');

console.log('GEO validation passed: JSON-LD, canonicals, sitemap, llms.txt, crawler rules and Phase 5 authority assets.');
