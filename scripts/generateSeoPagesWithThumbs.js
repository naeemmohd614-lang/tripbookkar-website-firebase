/**
 * scripts/generateSeoPagesWithThumbs.js
 *
 * - Generates SEO static pages into public/generated-pages/
 * - Downloads/reads images and generates thumbnails (webp, width 400px)
 * - Thumbnails saved to public/generated-pages/assets/hotels/<hotel-slug>/
 * - Use SITE_BASE env or default: https://www.tripbookkar.com
 *
 * Run:
 *   SITE_BASE="https://www.tripbookkar.com" node scripts/generateSeoPagesWithThumbs.js
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const sharp = require('sharp');
const pLimit = require('p-limit');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const OUT_DIR = path.join(ROOT, 'public', 'generated-pages');
const ASSETS_DIR = path.join(OUT_DIR, 'assets', 'hotels');

const HOTEL_DIR = path.join(OUT_DIR, 'hotels');
const STATE_DIR = path.join(OUT_DIR, 'state');
const CITY_DIR = path.join(OUT_DIR, 'city');
const INTEREST_DIR = path.join(OUT_DIR, 'interest');
const MONTH_DIR = path.join(OUT_DIR, 'month');
const PACKAGE_DIR = path.join(OUT_DIR, 'packages');

const SITE_BASE = process.env.SITE_BASE || 'https://www.tripbookkar.com';
const SITE_NAME = 'TripBookKar';
const AUTHOR = 'TripBookKar Team';
const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE || `${SITE_BASE}/assets/default-hotel.jpg`;

const MAX_PER_LIST = 30;
const THUMB_WIDTH = 400;
const CONCURRENCY = 6;
const FETCH_TIMEOUT = 30000; // ms

// helpers
function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function slug(s = '') { return String(s || '').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''); }
function escapeHtml(s = '') { return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function nowISO(){ return new Date().toISOString(); }
function basenameNoExt(p){ return path.basename(p).split('.').slice(0,-1).join('.') || path.basename(p); }

// Prepare paths
[OUT_DIR, HOTEL_DIR, STATE_DIR, CITY_DIR, INTEREST_DIR, MONTH_DIR, PACKAGE_DIR, ASSETS_DIR].forEach(ensureDir);

// load data
const hotelsPath = path.join(DATA_DIR, 'new-hotels.json');
const packagesPath = path.join(DATA_DIR, 'packages.json');
if (!fs.existsSync(hotelsPath)) {
  console.error('Missing data/new-hotels.json — create it first.');
  process.exit(1);
}
const hotels = JSON.parse(fs.readFileSync(hotelsPath, 'utf8'));
const packages = fs.existsSync(packagesPath) ? JSON.parse(fs.readFileSync(packagesPath, 'utf8')) : [];

// concurrency limiter
const limit = pLimit(CONCURRENCY);

// download remote image with timeout
async function downloadBuffer(url) {
  try {
    const controller = new (require('abort-controller'))();
    const id = setTimeout(()=>controller.abort(), FETCH_TIMEOUT);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.buffer();
    return buf;
  } catch (e) {
    console.warn('Download failed:', url, e.message || e);
    return null;
  }
}

// read local image path (relative to project root or data/images/<hotel-id>/)
function readLocalImage(hotelSlug, src) {
  // if absolute or relative path is provided, check existence
  const localCandidate1 = path.join(ROOT, src); // e.g. data/images/...
  const localCandidate2 = path.join(ROOT, 'data', 'images', hotelSlug, src); // e.g. "1.jpg"
  const localCandidate3 = path.join(ROOT, 'data', 'images', src); // fallback
  const tries = [localCandidate1, localCandidate2, localCandidate3];
  for (const p of tries) if (fs.existsSync(p)) return fs.readFileSync(p);
  return null;
}

// create thumbnail webp and save under assets dir, return relative url (from SITE_BASE)
async function makeThumbnail(hotelSlug, srcUrlOrPath, index = 0) {
  try {
    let buffer = null;
    const isUrl = /^https?:\/\//i.test(srcUrlOrPath);
    if (isUrl) {
      buffer = await downloadBuffer(srcUrlOrPath);
      if (!buffer) return null;
    } else {
      buffer = readLocalImage(hotelSlug, srcUrlOrPath);
      if (!buffer) return null;
    }

    // ensure hotel asset dir
    const hotelAssetDir = path.join(ASSETS_DIR, hotelSlug);
    ensureDir(hotelAssetDir);

    // filename: <hotelSlug>-<timestamp>-<index>.webp
    const fileBase = `${hotelSlug}-${Date.now()}-${index}`;
    const outName = `${fileBase}.webp`;
    const outPath = path.join(hotelAssetDir, outName);

    // create webp thumbnail
    await sharp(buffer).resize({ width: THUMB_WIDTH }).webp({ quality: 78 }).toFile(outPath);

    // return URL path relative to SITE_BASE (we serve public/generated-pages)
    const relativeUrl = `${SITE_BASE}/generated-pages/assets/hotels/${hotelSlug}/${outName}`;
    return relativeUrl;
  } catch (e) {
    console.warn('makeThumbnail error for', srcUrlOrPath, e.message || e);
    return null;
  }
}

// utility: save page
function writePage(filepath, html) {
  fs.writeFileSync(filepath, html, 'utf8');
  console.log('WROTE', path.relative(ROOT, filepath));
}

// HTML generators (use thumbnail URLs when possible)
function hotelHtml(h, heroThumb, thumbs) {
  const hotelSlug = h.id || slug(h.name);
  const url = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
  const title = (h.seo && h.seo.title) || `${h.name} — Best Hotels in ${h.city || h.state} | ${SITE_NAME}`;
  const desc = (h.seo && h.seo.description) || (h.about || '').slice(0,160);
  const hero = heroThumb || (h.images && (typeof h.images[0] === 'string' ? h.images[0] : (h.images[0] && (h.images[0].src || h.images[0])))) || DEFAULT_IMAGE;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": h.name,
    "image": hero,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": h.city || '',
      "addressRegion": h.state || '',
      "streetAddress": h.address || ''
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": (h.location && h.location.lat) || '',
      "longitude": (h.location && h.location.lng) || ''
    },
    "description": desc
  };

  const imagesHtml = (thumbs || []).map(u => `<figure style="display:inline-block;margin:8px"><img loading="lazy" src="${u}" alt="${escapeHtml(h.name)}" style="width:240px;height:auto;border-radius:6px"/></figure>`).join('\n');

  const distances = h.distance || {};
  const distanceList = Object.keys(distances).map(k => `<li>${escapeHtml(k)}: ${escapeHtml(distances[k])}</li>`).join('\n');

  const rooms = (h.roomCategories || []).map(r => `<li>${escapeHtml(typeof r === 'string' ? r : (r.name || JSON.stringify(r)))}</li>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${url}">
<meta name="author" content="${AUTHOR}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${hero}">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>body{font-family:Arial,Helvetica,sans-serif;max-width:980px;margin:0 auto;padding:20px;color:#111}header{display:flex;gap:18px;align-items:center}h1{margin:0 0 6px;font-size:24px}.meta{color:#666;margin-bottom:12px}.section{margin:18px 0;padding:14px;border-radius:8px;background:#fafafa}a{color:#0b67ff}</style>
</head>
<body>
<header>
  <div style="flex:1">
    <h1>${escapeHtml(h.name)}</h1>
    <div class="meta">${escapeHtml(h.address || '')} ${h.city?(', ' + escapeHtml(h.city)):''} ${h.state?(', ' + escapeHtml(h.state)):''}</div>
  </div>
  <div style="width:180px">${hero?`<img src="${hero}" alt="${escapeHtml(h.name)}" style="width:100%;border-radius:8px;object-fit:cover"/>`:''}</div>
</header>

<section class="section"><h2>About</h2><p>${escapeHtml(h.about || '')}</p></section>
<section class="section"><h3>Distances</h3><ul>${distanceList}</ul></section>
<section class="section"><h3>Rooms</h3><ul>${rooms}</ul></section>
<section class="section"><h3>Facilities</h3><ul>
<li>Pool: ${h.facilities && h.facilities.pool ? 'Yes' : 'No'}</li>
<li>Spa: ${h.facilities && h.facilities.spa ? 'Yes' : 'No'}</li>
<li>Pet Friendly: ${h.facilities && h.facilities.petFriendly ? 'Yes' : 'No'}</li>
<li>Check-in: ${escapeHtml((h.facilities && h.facilities.checkIn) || '—')} | Check-out: ${escapeHtml((h.facilities && h.facilities.checkOut) || '—')}</li>
</ul></section>

<section class="section"><h3>Gallery</h3>${imagesHtml}</section>
<footer style="margin-top:30px;color:#777">© ${SITE_NAME} — Generated ${nowISO()}</footer>
</body></html>`;
}

// generation functions
async function generateHotelPage(h) {
  const hotelSlug = h.id || slug(h.name);
  const outPath = path.join(HOTEL_DIR, `${hotelSlug}.html`);

  // ensure images array
  const rawImages = h.images || [];

  // make thumbnails concurrently (limit)
  const thumbPromises = rawImages.map((it, idx) => limit(() => {
    const src = (typeof it === 'string') ? it : (it.src || it);
    return makeThumbnail(hotelSlug, src, idx);
  }));

  const thumbsResolved = (await Promise.all(thumbPromises)).filter(Boolean);

  // choose hero as first thumbnail or default
  const hero = thumbsResolved[0] || DEFAULT_IMAGE;

  const html = hotelHtml(h, hero, thumbsResolved);
  writePage(outPath, html);
  return { url: `/generated-pages/hotels/${hotelSlug}.html`, lastmod: nowISO() };
}

function generateStatePage(state, hotelsInState) {
  const slugState = slug(state);
  const outPath = path.join(STATE_DIR, `${slugState}.html`);
  const title = `Best Hotels in ${state} — Top ${Math.min(hotelsInState.length, MAX_PER_LIST)} | ${SITE_NAME}`;
  const listHtml = hotelsInState.slice(0, MAX_PER_LIST).map(h => {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h._generatedThumb && h._generatedThumb[0]) || ((h.images && (typeof h.images[0]==='string' ? h.images[0] : (h.images[0] && (h.images[0].src || h.images[0])))) || DEFAULT_IMAGE);
    return `<li style="margin:12px 0"><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a><br/><small>${escapeHtml(h.city||'')}</small><div><img loading="lazy" src="${thumb}" alt="${escapeHtml(h.name)}" style="width:260px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top hotels in ${escapeHtml(state)}"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  writePage(outPath, html);
  return { url: `/generated-pages/state/${slugState}.html`, lastmod: nowISO() };
}

function generateCityPage(state, city, hotelsInCity) {
  const slugState = slug(state);
  const slugCity = slug(city);
  const cityDir = path.join(CITY_DIR, slugState);
  ensureDir(cityDir);
  const outPath = path.join(cityDir, `${slugCity}.html`);
  const title = `Best Hotels in ${city}, ${state} — Top ${Math.min(hotelsInCity.length, MAX_PER_LIST)} | ${SITE_NAME}`;
  const listHtml = hotelsInCity.slice(0, MAX_PER_LIST).map(h => {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h._generatedThumb && h._generatedThumb[0]) || DEFAULT_IMAGE;
    return `<li style="margin:12px 0"><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a><br/><small>${escapeHtml(h.tags && h.tags.join(', ')||'')}</small><div><img loading="lazy" src="${thumb}" style="width:260px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top hotels in ${escapeHtml(city)}"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  writePage(outPath, html);
  return { url: `/generated-pages/city/${slugState}/${slugCity}.html`, lastmod: nowISO() };
}

function generateInterestPage(interest, hotelsForInterest) {
  const slugInterest = slug(interest);
  const outPath = path.join(INTEREST_DIR, `${slugInterest}.html`);
  const title = `Best ${escapeHtml(interest)} Hotels in India — ${SITE_NAME}`;
  const listHtml = hotelsForInterest.slice(0, MAX_PER_LIST).map(h=> {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h._generatedThumb && h._generatedThumb[0]) || DEFAULT_IMAGE;
    return `<li><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a> — ${escapeHtml(h.city || '')}<div><img loading="lazy" src="${thumb}" style="width:240px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top ${escapeHtml(interest)} hotels in India"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  writePage(outPath, html);
  return { url: `/generated-pages/interest/${slugInterest}.html`, lastmod: nowISO() };
}

function generateMonthPage(monthName, hotelsForMonth) {
  const slugMonth = slug(monthName);
  const outPath = path.join(MONTH_DIR, `${slugMonth}.html`);
  const title = `Where to Travel in ${monthName} — Top Picks | ${SITE_NAME}`;
  const listHtml = hotelsForMonth.slice(0, MAX_PER_LIST).map(h=>{
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    return `<li><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a>, ${escapeHtml(h.city || '')}</li>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  writePage(outPath, html);
  return { url: `/generated-pages/month/${slugMonth}.html`, lastmod: nowISO() };
}

function generatePackagePage(p) {
  const pid = p.id || slug(p.name);
  const outPath = path.join(PACKAGE_DIR, `${pid}.html`);
  const title = (p.seo && p.seo.title) || `${p.name} | ${SITE_NAME}`;
  const desc = (p.seo && p.seo.description) || (p.itinerary && p.itinerary[0] && p.itinerary[0].description) || '';
  const daysHtml = (p.itinerary || []).map(it => `<li><strong>Day ${it.day}</strong>: ${escapeHtml(it.title || '')} - ${escapeHtml(it.description || '')}</li>`).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(desc)}"></head><body><h1>${escapeHtml(p.name)}</h1><p>Duration: ${p.days || ''} days</p><h3>Itinerary</h3><ul>${daysHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  writePage(outPath, html);
  return { url: `/generated-pages/packages/${pid}.html`, lastmod: nowISO() };
}

// MAIN flow
(async function main(){
  console.log('Starting SEO page generation with thumbnail creation...');
  const sitemapEntries = [];

  // normalize hotels and prepare thumbnail tasks mapping
  for (const hRaw of hotels) {
    const h = Object.assign({}, hRaw);
    h.id = h.id || slug(h.name);
    // ensure images array of strings or objects with src
    if (!Array.isArray(h.images)) h.images = [];
    // kick off thumbnail generation when generating hotel page
    try {
      const ent = await generateHotelPage(h);
      sitemapEntries.push({ loc: `${SITE_BASE}${ent.url}`, lastmod: ent.lastmod });
      // store generated first thumb for state/city pages later
      // read the generated assets dir to find thumbs (best-effort)
      const assetDir = path.join(ASSETS_DIR, h.id);
      if (fs.existsSync(assetDir)) {
        const files = fs.readdirSync(assetDir).filter(f => f.endsWith('.webp')).map(f => `${SITE_BASE}/generated-pages/assets/hotels/${h.id}/${f}`);
        if (files.length) h._generatedThumb = files; // attach to hotel object
      }
    } catch (e) {
      console.error('Failed to process hotel', h.name, e.message || e);
    }
  }

  // group by state/city/interests/months
  const byState = {};
  const byCity = {};
  const interestsMap = {};
  const monthsMap = {};

  hotels.forEach(h => {
    const state = h.state || 'Unknown';
    const city = h.city || 'Unknown';
    byState[state] = byState[state] || [];
    byState[state].push(h);

    byCity[state] = byCity[state] || {};
    byCity[state][city] = byCity[state][city] || [];
    byCity[state][city].push(h);

    const tags = (h.tags || []).concat(h.interests || []);
    (tags || []).forEach(t => {
      if (!t) return;
      interestsMap[t] = interestsMap[t] || [];
      interestsMap[t].push(h);
    });

    (h.availableMonths || []).forEach(m => {
      monthsMap[m] = monthsMap[m] || [];
      monthsMap[m].push(h);
    });
  });

  // generate state & city pages
  Object.keys(byState).forEach(state => {
    const ent = generateStatePage(state, byState[state]);
    sitemapEntries.push({ loc: `${SITE_BASE}${ent.url}`, lastmod: ent.lastmod });

    const cities = byCity[state] || {};
    Object.keys(cities).forEach(city => {
      const ce = generateCityPage(state, city, cities[city]);
      sitemapEntries.push({ loc: `${SITE_BASE}${ce.url}`, lastmod: ce.lastmod });
    });
  });

  // generate interest & month pages
  Object.keys(interestsMap).forEach(int => {
    const ie = generateInterestPage(int, interestsMap[int]);
    sitemapEntries.push({ loc: `${SITE_BASE}${ie.url}`, lastmod: ie.lastmod });
  });
  Object.keys(monthsMap).forEach(m => {
    const me = generateMonthPage(m, monthsMap[m]);
    sitemapEntries.push({ loc: `${SITE_BASE}${me.url}`, lastmod: me.lastmod });
  });

  // packages
  packages.forEach(p => {
    const pe = generatePackagePage(p);
    sitemapEntries.push({ loc: `${SITE_BASE}${pe.url}`, lastmod: pe.lastmod });
  });

  // sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => {
    return `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`;
  }).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('WROTE sitemap.xml');

  // robots
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_BASE}/generated-pages/sitemap.xml\n`;
  fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots, 'utf8');
  console.log('WROTE robots.txt');

  console.log('✅ Done. Generated pages are in public/generated-pages/ and thumbnails in public/generated-pages/assets/hotels/');
})().catch(e => { console.error('Fatal error', e); process.exit(1); });

    