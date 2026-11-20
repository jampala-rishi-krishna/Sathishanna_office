import { readFileSync, writeFileSync } from 'node:fs';

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  if (quoted) throw new Error('CSV contains an unterminated quoted field.');
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}

const input = process.argv[2] || 'h2h-ai-visibility-benchmark.csv';
const output = process.argv[3] || 'h2h-ai-visibility-summary.json';
const table = parseCsv(readFileSync(input, 'utf8'));
if (table.length < 2) throw new Error('CSV has no data rows.');
const [header, ...data] = table;
const ix = Object.fromEntries(header.map((h, i) => [h, i]));
for (const key of ['completed','platform','h2h_mentioned','h2h_recommendation','official_site_cited','unsupported_or_wrong_claim']) {
  if (!(key in ix)) throw new Error('Missing required column: ' + key);
}
const get = (r, key) => (r[ix[key]] ?? '').trim();
const yes = (v) => ['yes','y','true','1'].includes(v.toLowerCase());
const completed = data.filter((r) => yes(get(r, 'completed')));
const platforms = [...new Set(data.map((r) => get(r, 'platform')).filter(Boolean))];
const rate = (n, d) => d ? Number((n / d * 100).toFixed(1)) : null;
const numericScores = (rows, key) => rows
  .map((r) => get(r, key))
  .filter((v) => v !== '')
  .map(Number)
  .filter(Number.isFinite);
const average = (values) => values.length
  ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
  : null;

const summaries = platforms.map((platform) => {
  const rows = completed.filter((r) => get(r, 'platform') === platform);
  const n = rows.length;
  const mentioned = rows.filter((r) => yes(get(r, 'h2h_mentioned')));
  const recommended = rows.filter((r) => get(r, 'h2h_recommendation').toLowerCase() === 'yes');
  const official = rows.filter((r) => yes(get(r, 'official_site_cited')));
  const top3 = rows.filter((r) => {
    const position = get(r, 'brand_position_1_to_10');
    return position !== '' && Number(position) >= 1 && Number(position) <= 3;
  });
  const errors = rows.filter((r) => yes(get(r, 'unsupported_or_wrong_claim')));
  return {
    platform,
    completed_tests: n,
    brand_mention_rate_pct: rate(mentioned.length, n),
    explicit_recommendation_rate_pct: rate(recommended.length, n),
    official_site_citation_rate_pct: rate(official.length, n),
    top_3_brand_presence_pct: rate(top3.length, n),
    unsupported_or_wrong_claim_rate_pct: rate(errors.length, n),
    mean_branch_accuracy_0_to_2: average(numericScores(rows, 'correct_branch_0_to_2')),
    mean_service_accuracy_0_to_2: average(numericScores(rows, 'correct_service_0_to_2')),
    mean_contact_accuracy_0_to_1: average(numericScores(rows, 'correct_contact_0_to_1'))
  };
});
const overall = {
  input_file: input,
  generated_at_utc: new Date().toISOString(),
  total_prompt_platform_rows: data.length,
  completed_tests: completed.length,
  completion_rate_pct: rate(completed.length, data.length),
  platforms: summaries,
  note: 'Metrics summarize only manually recorded completed responses. Empty and incomplete rows are excluded. This does not represent an official ranking or guarantee of AI recommendation.'
};
writeFileSync(output, JSON.stringify(overall, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(overall, null, 2));
