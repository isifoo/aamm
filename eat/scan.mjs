// eat. weekly Google Maps scan. GitHub Actions runs this (see .github/workflows/eat-scan.yml)
// with the Places API key in the EAT_GOOGLE_KEY secret, so the key never reaches the web page.
//
// Which neighborhoods to scan, and the monthly request ceiling, live in scan-config.json.
// Zone names are the keys of ZONES in core.js (williamsburg, midtown, eastvillage, ...).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { ZONES, scanArea } from './core.js';

const here = new URL('./', import.meta.url);
const dataDir = new URL('data/', here);
const PER_ZONE_MAX = 150; // a scan never sends more than this many requests for one neighborhood

const key = process.env.EAT_GOOGLE_KEY;
if (!key) {
  console.error('::error::Add your Google Places API key as the EAT_GOOGLE_KEY repository secret (Settings > Secrets and variables > Actions).');
  process.exit(1);
}

const config = JSON.parse(await readFile(new URL('scan-config.json', here), 'utf8'));
const limit = config.monthlyLimit ?? 900;
await mkdir(dataDir, { recursive: true });
let index = { zones: {}, usage: {} };
try { index = JSON.parse(await readFile(new URL('index.json', dataDir), 'utf8')); } catch {}
index.zones ??= {}; index.usage ??= {};
const month = new Date().toISOString().slice(0, 7);

let failed = false;
for (const zone of config.zones) {
  const z = ZONES[zone];
  if (!z) { console.log(`::warning::Unknown neighborhood "${zone}" in scan-config.json. Skipping it.`); continue; }
  const used = index.usage[month] || 0;
  const room = Math.min(PER_ZONE_MAX, limit - used);
  if (room < 40) { console.log(`::warning::Skipping ${z.name}: ${used} of ${limit} Google requests already used in ${month}.`); continue; }
  console.log(`Scanning ${z.name} (up to ${room} requests)…`);
  try {
    // The Referer lets a key that is restricted to the website also work here.
    const { found, calls, capped } = await scanArea(key, z.b, { maxCalls: room, headers: { Referer: 'https://isifoo.github.io/' } });
    index.usage[month] = used + calls;
    const places = Object.values(found).sort((a, b) => a.id.localeCompare(b.id));
    if (!places.length) { console.log(`::warning::Google returned no places for ${z.name}.`); continue; }
    const scanned = new Date().toISOString();
    await writeFile(new URL(`${zone}.json`, dataDir), JSON.stringify({ zone, name: z.name, scanned, places }) + '\n');
    index.zones[zone] = { scanned, count: places.length };
    console.log(`  ${places.length} places from ${calls} requests${capped ? ' (stopped at the request cap)' : ''}.`);
  } catch (e) {
    failed = true;
    console.log(`::error::${z.name}: ${e.message}`);
    if (e.status === 403 || e.status === 400) break; // a key problem will fail every zone
  }
}
// keep only zones still configured, and the last 3 months of usage
for (const k of Object.keys(index.zones)) if (!config.zones.includes(k)) delete index.zones[k];
index.usage = Object.fromEntries(Object.entries(index.usage).sort().slice(-3));
index.monthlyLimit = limit;
index.updated = new Date().toISOString();
await writeFile(new URL('index.json', dataDir), JSON.stringify(index, null, 2) + '\n');
console.log(`Google requests used in ${month}: ${index.usage[month] || 0} of ${limit}.`);
if (failed) process.exit(1);
