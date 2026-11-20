import { writeFileSync } from 'node:fs';

const platforms = [
  'Google Business Profile',
  'Bing Places',
  'Justdial',
  'Sulekha',
  'Facebook Page',
  'Instagram profile',
  'Apple Business Connect',
];
const branches = [
  {
    name: 'Dilsukhnagar, Hyderabad',
    phone: '+91 81219 99243',
    address: 'Shop No. 90, 1st Floor, beside Sai Baba Temple, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana 500060',
    hours: 'Every day, 7:00 AM–7:00 PM',
    notes: 'Owner-managed Google profile; confirm NAP and category against this record.',
  },
  {
    name: 'Khammam',
    phone: '+91 81219 99243',
    address: '2nd floor, Star complex, Near new bus stand, Khammam, Telangana 507002',
    hours: 'Owner confirmation required; do not assume hours from third-party records.',
    notes: 'Verify Star Complex map pin and phone. Do not merge with Balaji Nagar/Raparthi listings without place ID and owner verification.',
  },
];
const header = ['branch','platform','listing_url','display_name','phone','address','hours','primary_category','website_url','claimed_by_h2h','platform_verified','status','discrepancy','last_checked_utc','evidence_screenshot_url','owner','notes'];
const rows = [header];
for (const branch of branches) {
  for (const platform of platforms) {
    rows.push([
      branch.name, platform, '', '', branch.phone, branch.address,
      branch.hours, '', 'https://hair2hair.in/',
      '', '', 'not yet audited', '', '', '', '',
      branch.notes,
    ]);
  }
}
const csv = rows
  .map((row) => row.map((cell) => '"' + String(cell).replaceAll('"', '""') + '"').join(','))
  .join('\n') + '\n';
const output = process.argv[2] || 'h2h-directory-citation-audit.csv';
writeFileSync(output, csv, 'utf8');
console.log('Created ' + output + ' with ' + (rows.length - 1) + ' branch/platform audit rows.');
