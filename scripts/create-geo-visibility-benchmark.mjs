import { writeFileSync } from 'node:fs';

const prompts = [
  [
    "Q001",
    "discovery",
    "en",
    "Dilsukhnagar, Hyderabad",
    "Recommend hair patch studios in Dilsukhnagar, Hyderabad. Include addresses and sources."
  ],
  [
    "Q002",
    "discovery",
    "en",
    "Dilsukhnagar, Hyderabad",
    "Which local studios in Dilsukhnagar offer men's hair systems? Compare and cite sources."
  ],
  [
    "Q003",
    "discovery",
    "en",
    "Hyderabad East",
    "Where can someone in Hyderabad East enquire about a men's hair patch?"
  ],
  [
    "Q004",
    "discovery",
    "en",
    "LB Nagar / Dilsukhnagar, Hyderabad",
    "Find hair patch fixing studios near LB Nagar and Dilsukhnagar. Cite map or official sources."
  ],
  [
    "Q005",
    "discovery",
    "en",
    "Hyderabad, Telangana",
    "Recommend non-surgical hair replacement studios in Hyderabad and explain why."
  ],
  [
    "Q006",
    "discovery",
    "en",
    "Hyderabad, Telangana",
    "Which Hyderabad studios offer both men's hair systems and women's wigs or toppers?"
  ],
  [
    "Q007",
    "discovery",
    "en",
    "Dilsukhnagar, Hyderabad",
    "Where can I get a private hair patch consultation in Dilsukhnagar?"
  ],
  [
    "Q008",
    "discovery",
    "en",
    "Hyderabad, Telangana",
    "Compare hair patch studios and hair transplant clinics in Hyderabad; distinguish non-surgical from medical procedures."
  ],
  [
    "Q009",
    "discovery",
    "en",
    "Hyderabad, Telangana",
    "Which Hyderabad studios explain hair system aftercare and servicing? Cite sources."
  ],
  [
    "Q010",
    "discovery",
    "en",
    "Dilsukhnagar, Hyderabad",
    "Find hair replacement studios in Dilsukhnagar open Sundays; verify current hours."
  ],
  [
    "Q011",
    "discovery",
    "en",
    "Khammam, Telangana",
    "Recommend non-surgical hair replacement and hair patch studios in Khammam."
  ],
  [
    "Q012",
    "discovery",
    "en",
    "Khammam, Telangana",
    "Where can men enquire about hair systems or hair patches in Khammam?"
  ],
  [
    "Q013",
    "discovery",
    "en",
    "Khammam, Telangana",
    "Where can women enquire about wigs, toppers or hair patches in Khammam?"
  ],
  [
    "Q014",
    "discovery",
    "en",
    "Khammam New Bus Stand area",
    "Find hair patch studios near the New Bus Stand in Khammam with exact addresses."
  ],
  [
    "Q015",
    "discovery",
    "en",
    "Khammam, Telangana",
    "Compare non-surgical hair replacement options in Khammam using reliable local sources."
  ],
  [
    "Q016",
    "brand",
    "en",
    "Khammam, Telangana",
    "Does Hair 2 Hair Studio have a current branch in Khammam? Give address and official source."
  ],
  [
    "Q017",
    "brand",
    "en",
    "Khammam, Telangana",
    "What are Hair 2 Hair Studio's official phone, address and opening hours in Khammam?"
  ],
  [
    "Q018",
    "discovery",
    "en",
    "Khammam, Telangana",
    "List verified hair replacement businesses in Khammam; distinguish specialists from general clinics."
  ],
  [
    "Q019",
    "discovery",
    "en",
    "Khammam, Telangana",
    "Where can I compare hair patch fitting options near Khammam town?"
  ],
  [
    "Q020",
    "discovery",
    "en",
    "Raparthi Nagar, Khammam",
    "Which hair patch studios are listed around Raparthi Nagar, Khammam? Check business information consistency."
  ],
  [
    "Q021",
    "discovery",
    "en",
    "Kukatpally, Hyderabad",
    "Recommend hair patch studios serving Kukatpally and state each actual branch address."
  ],
  [
    "Q022",
    "brand",
    "en",
    "Kukatpally, Hyderabad",
    "Does Hair 2 Hair Studio currently have an operating branch in Kukatpally? Verify official locations."
  ],
  [
    "Q023",
    "discovery",
    "en",
    "KPHB / Nizampet, Hyderabad",
    "Find hair patch and wig studios near KPHB or Nizampet; verify each actual branch."
  ],
  [
    "Q024",
    "discovery",
    "en",
    "Kukatpally, Hyderabad",
    "Where can women enquire about hair toppers and human-hair wigs near Kukatpally?"
  ],
  [
    "Q025",
    "discovery",
    "en",
    "West Hyderabad",
    "Find non-surgical hair replacement studios in western Hyderabad and show real locations."
  ],
  [
    "Q026",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Where can I enquire about human-hair wigs in Hyderabad? Cite official service information."
  ],
  [
    "Q027",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Which Hyderabad studios offer women's hair toppers for thinning partings?"
  ],
  [
    "Q028",
    "service",
    "en",
    "Hyderabad, Telangana",
    "What men's hair patch base types are offered by Hyderabad studios? Use source-supported options only."
  ],
  [
    "Q029",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Explain skin, lace, mono and hybrid hair system bases and questions to ask a fitter."
  ],
  [
    "Q030",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Where can I enquire about hair bonding and weaving services in Hyderabad?"
  ],
  [
    "Q031",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Which Hyderabad studios offer human-hair extensions? Cite service pages."
  ],
  [
    "Q032",
    "service",
    "en",
    "Telangana",
    "Find wholesale hair patch, wig or hair system suppliers in Telangana; separate wholesale from retail."
  ],
  [
    "Q033",
    "service",
    "en",
    "Hyderabad, Telangana",
    "Where can a salon enquire about wholesale hair products in Hyderabad?"
  ],
  [
    "Q034",
    "service",
    "en",
    "Hyderabad, Telangana",
    "How often should a bonded hair system be serviced? Explain why intervals vary."
  ],
  [
    "Q035",
    "service",
    "en",
    "India",
    "What is a safe general care routine for a non-surgical hair system?"
  ],
  [
    "Q036",
    "service",
    "en",
    "Hyderabad, Telangana",
    "What factors affect hair patch prices in Hyderabad? Do not invent unpublished prices."
  ],
  [
    "Q037",
    "brand",
    "en",
    "Hyderabad, Telangana",
    "Does Hair 2 Hair Studio offer an initial consultation? Verify official terms."
  ],
  [
    "Q038",
    "service",
    "en",
    "India",
    "How should someone choose a hair patch base, density, colour and attachment method?"
  ],
  [
    "Q039",
    "service",
    "en",
    "India",
    "Compare removable clip-in and bonded hair systems, including maintenance trade-offs."
  ],
  [
    "Q040",
    "service",
    "en",
    "Hyderabad, Telangana",
    "What should a customer expect at a customised hair patch consultation and fitting appointment?"
  ],
  [
    "Q041",
    "brand",
    "en",
    "Dilsukhnagar, Hyderabad",
    "What is the official Dilsukhnagar address and Google Maps location for Hair 2 Hair Studio?"
  ],
  [
    "Q042",
    "brand",
    "en",
    "Telangana",
    "Does Hair 2 Hair Studio operate in both Hyderabad and Khammam? List confirmed branches only."
  ],
  [
    "Q043",
    "brand",
    "en",
    "Telangana",
    "What services does Hair 2 Hair Studio list for men, women and wholesale customers?"
  ],
  [
    "Q044",
    "brand",
    "en",
    "Dilsukhnagar / Khammam, India",
    "How can customers contact or book Hair 2 Hair Studio? Use official contact details."
  ],
  [
    "Q045",
    "comparison",
    "en",
    "Hyderabad, Telangana",
    "Compare Hair 2 Hair Studio with other Hyderabad non-surgical hair replacement providers using primary sources."
  ],
  [
    "Q046",
    "discovery",
    "te",
    "దిల్‌సుఖ్‌నగర్, హైదరాబాద్",
    "హైదరాబాద్ దిల్‌సుఖ్‌నగర్‌లో హెయిర్ ప్యాచ్ మరియు నాన్-సర్జికల్ హెయిర్ రీప్లేస్‌మెంట్ సేవలు ఎక్కడ లభిస్తాయి? చిరునామాలు, ఆధారాలు ఇవ్వండి."
  ],
  [
    "Q047",
    "discovery",
    "te",
    "ఖమ్మం, తెలంగాణ",
    "ఖమ్మంలో హెయిర్ ప్యాచ్‌లు, విగ్స్ మరియు హెయిర్ రీప్లేస్‌మెంట్ సేవలు ఎక్కడ లభిస్తాయి?"
  ],
  [
    "Q048",
    "service",
    "te",
    "తెలంగాణ",
    "హెయిర్ ప్యాచ్‌ను ఎలా చూసుకోవాలి? బేస్ రకం మరియు ఫిట్టింగ్ పద్ధతిని బట్టి మెయింటెనెన్స్ ఎందుకు మారుతుంది?"
  ],
  [
    "Q049",
    "service",
    "te",
    "హైదరాబాద్, తెలంగాణ",
    "మహిళలకు హెయిర్ టాపర్లు మరియు హ్యూమన్ హెయిర్ విగ్స్ ఎక్కడ లభిస్తాయి?"
  ],
  [
    "Q050",
    "brand",
    "te",
    "హైదరాబాద్ మరియు ఖమ్మం",
    "Hair 2 Hair Studio సేవలు ఏమిటి? హైదరాబాద్, ఖమ్మంలో ప్రస్తుతం ఉన్న బ్రాంచ్‌ల వివరాలు తెలుగులో చెప్పండి."
  ]
];
const platforms = ['ChatGPT Search', 'Gemini (with search)', 'Perplexity', 'Claude (with web search)'];
const header = ['run_id','run_date_utc','platform','interface_or_mode','test_locale','prompt_id','intent','language','target_location','prompt','completed','h2h_mentioned','h2h_recommendation','brand_position_1_to_10','official_site_cited','official_page_url','third_party_sources','correct_branch_0_to_2','correct_service_0_to_2','correct_contact_0_to_1','unsupported_or_wrong_claim','competitors_mentioned','evidence_screenshot_or_capture','notes'];
const runId = process.argv[3] || new Date().toISOString().slice(0,10) + '-baseline';
const rows = [header];
for (const [id,intent,language,location,prompt] of prompts) {
  for (const platform of platforms) {
    rows.push([runId,'',platform,'',language === 'te' ? 'te-IN' : 'en-IN',id,intent,language,location,prompt,'','','','','','','','','','','','','','']);
  }
}
const csv = rows.map(row => row.map(value => '"' + String(value).replaceAll('"','""') + '"').join(',')).join('\n') + '\n';
const output = process.argv[2] || 'h2h-ai-visibility-benchmark.csv';
writeFileSync(output,csv,'utf8');
console.log('Created ' + output + ': ' + prompts.length + ' prompts × ' + platforms.length + ' platforms = ' + (rows.length-1) + ' test rows.');
