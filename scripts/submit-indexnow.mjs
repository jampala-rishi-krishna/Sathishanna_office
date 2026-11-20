import { readFile } from 'node:fs/promises';

const host = 'hair2hair.in';
const keyFileName = '38f9703343584960b7323ff92d4ac749.txt';
const key = (await readFile(new URL(`../public/${keyFileName}`, import.meta.url), 'utf8')).trim();

if (!/^[a-f0-9]{32}$/.test(key) || key !== keyFileName.replace(/\.txt$/, '')) {
  throw new Error('IndexNow key file must contain the 32-character key matching its filename.');
}

const keyLocation = `https://${host}/${keyFileName}`;
const sitemapUrl = `https://${host}/sitemap.xml`;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function verifyHostedKey() {
  // Cloudflare Pages may still be deploying the commit that adds the key file.
  // Retry for up to five minutes before failing the workflow.
  for (let attempt = 1; attempt <= 20; attempt += 1) {
    try {
      const response = await fetch(keyLocation, { cache: 'no-store' });
      const body = (await response.text()).trim();

      if (response.ok && body === key) {
        console.log(`IndexNow key file verified at ${keyLocation}`);
        return;
      }

      console.log(`Key file not ready yet (attempt ${attempt}/20, HTTP ${response.status}).`);
    } catch (error) {
      console.log(`Key file check failed (attempt ${attempt}/20): ${error.message}`);
    }

    if (attempt < 20) await wait(15000);
  }

  throw new Error(`IndexNow key file was not publicly available or did not match after five minutes: ${keyLocation}`);
}

await verifyHostedKey();

const sitemapResponse = await fetch(sitemapUrl, { cache: 'no-store' });
if (!sitemapResponse.ok) {
  throw new Error(`Unable to fetch sitemap (${sitemapResponse.status}): ${sitemapUrl}`);
}

const sitemapXml = await sitemapResponse.text();
const urlList = [...sitemapXml.matchAll(new RegExp('<loc>\\\\s*([^<]+?)\\\\s*</loc>', 'gi'))]
  .map((match) => match[1].trim())
  .filter((url, index, all) => {
    const parsed = new URL(url);
    return parsed.protocol === 'https:'
      && parsed.hostname === host
      && all.indexOf(url) === index;
  });

if (urlList.length === 0) {
  throw new Error('No valid hair2hair.in URLs were found in the sitemap.');
}

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

const responseBody = await response.text();
if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow submission failed: HTTP ${response.status} ${responseBody}`);
}

console.log(`IndexNow accepted ${urlList.length} URLs from ${sitemapUrl} (HTTP ${response.status}).`);
if (responseBody.trim()) console.log(responseBody);
