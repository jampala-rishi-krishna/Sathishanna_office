import { writeFileSync } from 'node:fs';

const prompts = [
  ['en', 'Dilsukhnagar Hyderabad', 'Recommend hair patch studios in Dilsukhnagar, Hyderabad.'],
  ['en', 'Hyderabad', 'Where can I enquire about non-surgical hair replacement in Hyderabad?'],
  ['en', 'Khammam', 'Recommend hair patch and wig studios in Khammam, Telangana.'],
  ['en', 'Hyderabad', 'Compare options for men\'s hair systems in Hyderabad; cite sources.'],
  ['en', 'Hyderabad', 'Where can women enquire about hair toppers and human-hair wigs in Hyderabad?'],
  ['te', 'Dilsukhnagar Hyderabad', 'హైదరాబాద్ దిల్‌సుఖ్‌నగర్‌లో హెయిర్ ప్యాచ్ సేవలు ఎక్కడ లభిస్తాయి?'],
  ['te', 'Khammam', 'ఖమ్మంలో విగ్స్ మరియు హెయిర్ ప్యాచ్‌ల గురించి ఎక్కడ సంప్రదించాలి?'],
];
const header = ['date_utc','platform','language','location_intent','prompt','h2h_mentioned','official_source_cited','fact_accuracy_0_4','local_relevance_0_4','competitors_mentioned','evidence_url','notes'];
const rows = [header, ...prompts.map(([lang, loc, prompt]) => ['', '', lang, loc, prompt, '', '', '', '', '', '', ''])];
const csv = rows.map((row) => row.map((value) => '"' + String(value).replaceAll('"','""') + '"').join(',')).join('\n') + '\n';
const output = process.argv[2] || 'geo-visibility-baseline.csv';
writeFileSync(output, csv, 'utf8');
console.log('Created ' + output + ' with ' + prompts.length + ' repeatable AI visibility prompts.');
