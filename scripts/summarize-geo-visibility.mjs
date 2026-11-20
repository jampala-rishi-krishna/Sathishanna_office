import { readFileSync, writeFileSync } from 'node:fs';

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i+1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim() !== ''));
}
const input = process.argv[2] || 'h2h-ai-visibility-benchmark.csv';
const output = process.argv[3] || 'h2h-ai-visibility-summary.json';
const table = parseCsv(readFileSync(input,'utf8'));
if (table.length < 2) throw new Error('CSV has no data rows.');
const [header,...data] = table;
const ix = Object.fromEntries(header.map((h,i)=>[h,i]));
const get = (r,k) => (r[ix[k]] ?? '').trim();
const yes = (v) => ['yes','y','true','1'].includes(v.toLowerCase());
const completed = data.filter((r)=>yes(get(r,'completed')) || ['yes','no'].includes(get(r,'h2h_mentioned').toLowerCase()));
const platforms = [...new Set(data.map(r=>get(r,'platform')).filter(Boolean))];
const rate = (n,d) => d ? Number((n/d*100).toFixed(1)) : null;
const summaries = platforms.map((platform)=>{
  const rows=completed.filter(r=>get(r,'platform')===platform);
  const n=rows.length;
  const mentioned=rows.filter(r=>yes(get(r,'h2h_mentioned')));
  const recommended=rows.filter(r=>get(r,'h2h_recommendation').toLowerCase()==='yes');
  const official=rows.filter(r=>yes(get(r,'official_site_cited')));
  const top3=rows.filter(r=>Number(get(r,'brand_position_1_to_10'))>0 && Number(get(r,'brand_position_1_to_10'))<=3);
  const errors=rows.filter(r=>yes(get(r,'unsupported_or_wrong_claim')));
  const branchScores=rows.map(r=>Number(get(r,'correct_branch_0_to_2'))).filter(Number.isFinite);
  const serviceScores=rows.map(r=>Number(get(r,'correct_service_0_to_2'))).filter(Number.isFinite);
  const contactScores=rows.map(r=>Number(get(r,'correct_contact_0_to_1'))).filter(Number.isFinite);
  const avg=(a)=>a.length?Number((a.reduce((s,v)=>s+v,0)/a.length).toFixed(2)):null;
  return {
    platform,
    completed_tests:n,
    brand_mention_rate_pct:rate(mentioned.length,n),
    explicit_recommendation_rate_pct:rate(recommended.length,n),
    official_site_citation_rate_pct:rate(official.length,n),
    top_3_brand_presence_pct:rate(top3.length,n),
    unsupported_or_wrong_claim_rate_pct:rate(errors.length,n),
    mean_branch_accuracy_0_to_2:avg(branchScores),
    mean_service_accuracy_0_to_2:avg(serviceScores),
    mean_contact_accuracy_0_to_1:avg(contactScores)
  };
});
const allN=completed.length;
const overall={
  input_file:input,
  generated_at_utc:new Date().toISOString(),
  total_prompt_platform_rows:data.length,
  completed_tests:allN,
  completion_rate_pct:rate(allN,data.length),
  platforms:summaries,
  note:'Metrics describe only manually recorded responses in this CSV. Empty rows are excluded. This report does not represent an official ranking or guarantee of AI recommendation.'
};
writeFileSync(output,JSON.stringify(overall,null,2)+'\n','utf8');
console.log(JSON.stringify(overall,null,2));
