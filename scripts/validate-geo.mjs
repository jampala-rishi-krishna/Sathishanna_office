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
  { file: 'public/women.html', url: 'https://hair2hair.in/women', name: "Women's hair patches, toppers and wigs" },
  { file: 'public/services.html', url: 'https://hair2hair.in/services', name: 'Hair bonding, weaving and extension services' },
  { file: 'public/wholesale.html', url: 'https://hair2hair.in/wholesale', name: 'Wholesale hair products for salons and trade buyers' },
];
for (const route of commercialRoutes) {
  const html = read(route.file);
  assert(html.includes(`<link rel="canonical" href="${route.url}">`), `Incorrect canonical URL: ${route.file}`);
  assert(html.includes(`<title>${route.name}`) || html.includes(route.name), `Missing route-specific service content: ${route.file}`);
  assert(sitemap.includes(`<loc>${route.url}</loc>`), `Missing commercial URL in sitemap: ${route.url}`);
  const schemaBlock = html.match(/<script type="application\\/ld\\+json">([\\s\\S]*?)<\\/script>/);
  assert(schemaBlock, `Missing JSON-LD: ${route.file}`);
  const schema = JSON.parse(schemaBlock[1]);
  assert(schema['@graph'].some((item) => item['@type'] === 'Service'), `Missing Service schema: ${route.file}`);
  assert(schema['@graph'].some((item) => item['@type'] === 'FAQPage'), `Missing FAQPage schema: ${route.file}`);
  assert(html.includes('Frequently asked questions'), `Missing visible FAQ content: ${route.file}`);
  assert(html.includes('wa.me/918121999243') && html.includes('/booking'), `Missing enquiry paths: ${route.file}`);
}

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
