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
]) assert(sitemap.includes(`<loc>${url}</loc>`), `Missing sitemap URL: ${url}`);

const llms = read('public/llms.txt');
assert(llms.includes('Dilsukhnagar, Hyderabad') && llms.includes('Khammam'), 'llms.txt must list both current branches');
assert(llms.includes('planned expansion') && llms.includes('Kukatpally'), 'llms.txt must distinguish planned Kukatpally expansion');

const robots = read('public/robots.txt');
assert(/User-agent: OAI-SearchBot[\s\S]*?Allow: \/[\s\S]*?Sitemap:/m.test(robots), 'robots.txt must allow OAI-SearchBot and declare the sitemap');
assert(existsSync(join(root, 'public/llms.txt')), 'public/llms.txt must exist');

console.log('GEO validation passed: JSON-LD, canonicals, sitemap, llms.txt and crawler rules.');
