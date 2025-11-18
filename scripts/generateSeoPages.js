
/**
 * scripts/generateSeoPages.js
 *
 * Usage:
 *   node scripts/generateSeoPages.js
 *
 * What it does:
 *  - reads data/new-hotels.json and data/packages.json
 *  - generates SEO pages into public/generated-pages/
 *  - creates sitemap.xml and robots.txt
 *
 * Notes:
 *  - Keep images referenced by hotels as absolute URLs if you want them embedded.
 *  - Adjust SITE_BASE below for correct URL generation.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const OUT_DIR = path.join(ROOT, 'public', 'generated-pages');
const HOTEL_DIR = path.join(OUT_DIR, 'hotels');
const STATE_DIR = path.join(OUT_DIR, 'state');
const CITY_DIR = path.join(OUT_DIR, 'city');
const INTEREST_DIR = path.join(OUT_DIR, 'interest');
const MONTH_DIR = path.join(OUT_DIR, 'month');
const PACKAGE_DIR = path.join(OUT_DIR, 'packages');

const SITE_BASE = process.env.SITE_BASE || 'https://www.tripbookkar.com'; // change to your domain
const SITE_NAME = 'TripBookKar';
const AUTHOR = 'TripBookKar Team';
const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE || `${SITE_BASE}/assets/default-hotel.jpg`;
const MAX_PER_LIST = 30; // how many hotels to show on state/city lists

// helper functions
function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}
function slug(s = '') {
  return String(s || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function escapeHtml(s = '') {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function nowISO(){ return new Date().toISOString(); }

// load data
const hotelsPath = path.join(DATA_DIR, 'new-hotels.json');
const packagesPath = path.join(DATA_DIR, 'packages.json');
if (!fs.existsSync(hotelsPath)) {
  console.error('Missing data/new-hotels.json — create it first.');
  process.exit(1);
}
const hotels = JSON.parse(fs.readFileSync(hotelsPath, 'utf8'));
const packages = fs.existsSync(packagesPath) ? JSON.parse(fs.readFileSync(packagesPath, 'utf8')) : [];

// prepare output dirs
[OUT_DIR, HOTEL_DIR, STATE_DIR, CITY_DIR, INTEREST_DIR, MONTH_DIR, PACKAGE_DIR].forEach(ensureDir);

// utility: write page file
function writePage(filepath, html) {
  fs.writeFileSync(filepath, html, 'utf8');
  console.log('WROTE', path.relative(ROOT, filepath));
}

// generate hotel page (detailed)
function generateHotelPage(h) {
  const hotelSlug = h.id || slug(h.name);
  const url = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
  const title = (h.seo && h.seo.title) || `${h.name} — Best Hotels in ${h.city || h.state} | ${SITE_NAME}`;
  const desc = (h.seo && h.seo.description) || (h.about || '').slice(0, 160);
  const img = (h.images && h.images[0] && (h.images[0].src || h.images[0])) || DEFAULT_IMAGE;

  // JSON-LD Hotel schema (basic)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": h.name,
    "image": img,
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
    "description": desc,
    "aggregateRating": (h.meta && h.meta.rating) ? { "@type":"AggregateRating", "ratingValue": h.meta.rating, "reviewCount": (h.meta.reviewCount||0) } : undefined
  };

  const imagesHtml = (h.images || []).slice(0,6).map(it => {
    const src = (typeof it === 'string') ? it : (it.src || it);
    return `<figure><img loading="lazy" src="${src}" alt="${escapeHtml(h.name)}" style="max-width:100%;height:auto;border-radius:6px"/></figure>`;
  }).join('\n');

  const distances = h.distance || {};
  const distanceList = Object.keys(distances).map(k => `<li>${escapeHtml(k)}: ${escapeHtml(distances[k])}</li>`).join('\n');

  const rooms = (h.roomCategories || []).map(r => `<li>${escapeHtml(typeof r === 'string' ? r : (r.name || JSON.stringify(r)))}</li>`).join('\n');

  const html = `<!doctype html>
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
<meta property="og:image" content="${img}">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
<style>
body{font-family:Arial,Helvetica,sans-serif;max-width:980px;margin:0 auto;padding:20px;color:#111}
header{display:flex;gap:18px;align-items:center}
h1{margin:0 0 6px;font-size:24px}
.meta{color:#666;margin-bottom:12px}
.section{margin:18px 0;padding:14px;border-radius:8px;background:#fafafa}
a{color:#0b67ff}
</style>
</head>
<body>
<header>
  <div style="flex:1">
    <h1>${escapeHtml(h.name)}</h1>
    <div class="meta">${escapeHtml(h.address || '')} ${h.city?(', ' + escapeHtml(h.city)) : ''} ${h.state?(', ' + escapeHtml(h.state)) : ''}</div>
  </div>
  <div style="width:180px">${img?`<img src="${img}" alt="${escapeHtml(h.name)}" style="width:100%;border-radius:8px;object-fit:cover"/>`:''}</div>
</header>

<section class="section"><h2>About</h2><p>${escapeHtml(h.about || '')}</p></section>

<section class="section"><h3>Distances</h3><ul>${distanceList}</ul></section>

<section class="section"><h3>Rooms</h3><ul>${rooms}</ul></section>

<section class="section"><h3>Facilities</h3>
<ul>
<li>Pool: ${h.facilities && h.facilities.pool ? 'Yes' : 'No'}</li>
<li>Spa: ${h.facilities && h.facilities.spa ? 'Yes' : 'No'}</li>
<li>Pet Friendly: ${h.facilities && h.facilities.petFriendly ? 'Yes' : 'No'}</li>
<li>Check-in: ${escapeHtml((h.facilities && h.facilities.checkIn) || '—')} | Check-out: ${escapeHtml((h.facilities && h.facilities.checkOut) || '—')}</li>
</ul></section>

<section class="section"><h3>Gallery</h3>${imagesHtml}</section>

<footer style="margin-top:30px;color:#777">© ${SITE_NAME} — Generated ${nowISO()}</footer>
</body>
</html>`;

  const outPath = path.join(HOTEL_DIR, `${hotelSlug}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/hotels/${hotelSlug}.html`, lastmod: nowISO() };
}

// generate state page
function generateStatePage(state, hotelsInState) {
  const slugState = slug(state);
  const url = `${SITE_BASE}/generated-pages/state/${slugState}.html`;
  const title = `Best Hotels in ${state} — Top ${Math.min(hotelsInState.length, MAX_PER_LIST)} | ${SITE_NAME}`;
  const listHtml = hotelsInState.slice(0, MAX_PER_LIST).map(h => {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h.images && h.images[0] && (h.images[0].src || h.images[0])) || DEFAULT_IMAGE;
    return `<li style="margin:12px 0"><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a><br/><small>${escapeHtml(h.city||'')}</small><div><img loading="lazy" src="${thumb}" alt="${escapeHtml(h.name)}" style="width:260px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top hotels in ${escapeHtml(state)}"><link rel="canonical" href="${url}"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  const outPath = path.join(STATE_DIR, `${slugState}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/state/${slugState}.html`, lastmod: nowISO() };
}

// generate city page
function generateCityPage(state, city, hotelsInCity) {
  const slugState = slug(state);
  const slugCity = slug(city);
  const url = `${SITE_BASE}/generated-pages/city/${slugState}/${slugCity}.html`;
  ensureDir(path.join(CITY_DIR, slugState));
  const title = `Best Hotels in ${city}, ${state} — Top ${Math.min(hotelsInCity.length, MAX_PER_LIST)} | ${SITE_NAME}`;
  const listHtml = hotelsInCity.slice(0, MAX_PER_LIST).map(h => {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h.images && h.images[0] && (h.images[0].src || h.images[0])) || DEFAULT_IMAGE;
    return `<li style="margin:12px 0"><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a><br/><small>${escapeHtml(h.tags && h.tags.join(', ')||'')}</small><div><img loading="lazy" src="${thumb}" style="width:260px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top hotels in ${escapeHtml(city)}"><link rel="canonical" href="${url}"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  const outPath = path.join(CITY_DIR, slugState, `${slugCity}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/city/${slugState}/${slugCity}.html`, lastmod: nowISO() };
}

// generate interest pages (travel by interest e.g. 'beach', 'adventure')
function generateInterestPage(interest, hotelsForInterest) {
  const slugInterest = slug(interest);
  const url = `${SITE_BASE}/generated-pages/interest/${slugInterest}.html`;
  const title = `Best ${escapeHtml(interest)} Hotels in India — ${SITE_NAME}`;
  const listHtml = hotelsForInterest.slice(0, MAX_PER_LIST).map(h=> {
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h.images && h.images[0] && (h.images[0].src || h.images[0])) || DEFAULT_IMAGE;
    return `<li><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a> — ${escapeHtml(h.city || '')}<div><img loading="lazy" src="${thumb}" style="width:240px;max-width:100%;height:auto;border-radius:6px;margin-top:6px"/></div></li>`;
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="Top ${escapeHtml(interest)} hotels in India"></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  const outPath = path.join(INTEREST_DIR, `${slugInterest}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/interest/${slugInterest}.html`, lastmod: nowISO() };
}

// generate month pages (e.g. travel in January)
function generateMonthPage(monthName, hotelsForMonth) {
  const slugMonth = slug(monthName);
  const url = `${SITE_BASE}/generated-pages/month/${slugMonth}.html`;
  const title = `Where to Travel in ${monthName} — Top Picks | ${SITE_NAME}`;
  const listHtml = hotelsForMonth.slice(0, MAX_PER_LIST).map(h=>{
    const hotelSlug = h.id || slug(h.name);
    const href = `${SITE_BASE}/generated-pages/hotels/${hotelSlug}.html`;
    const thumb = (h.images && h.images[0] && (h.images[0].src || h.images[0])) || DEFAULT_IMAGE;
    return `<li><a href="${href}"><strong>${escapeHtml(h.name)}</strong></a>, ${escapeHtml(h.city || '')}</li>`;
  }).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body><h1>${escapeHtml(title)}</h1><ul>${listHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  const outPath = path.join(MONTH_DIR, `${slugMonth}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/month/${slugMonth}.html`, lastmod: nowISO() };
}

// generate package page
function generatePackagePage(p) {
  const pid = p.id || slug(p.name);
  const url = `${SITE_BASE}/generated-pages/packages/${pid}.html`;
  const title = (p.seo && p.seo.title) || `${p.name} | ${SITE_NAME}`;
  const desc = (p.seo && p.seo.description) || (p.itinerary && p.itinerary[0] && p.itinerary[0].description) || '';

  const daysHtml = (p.itinerary || []).map(it => `<li><strong>Day ${it.day}</strong>: ${escapeHtml(it.title || '')} - ${escapeHtml(it.description || '')}</li>`).join('\n');

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(desc)}"></head><body><h1>${escapeHtml(p.name)}</h1><p>Duration: ${p.days || ''} days</p><h3>Itinerary</h3><ul>${daysHtml}</ul><footer>© ${SITE_NAME}</footer></body></html>`;
  const outPath = path.join(PACKAGE_DIR, `${pid}.html`);
  writePage(outPath, html);
  return { url: `/generated-pages/packages/${pid}.html`, lastmod: nowISO() };
}

// Begin generation
console.log('Generating SEO pages...');

const sitemapEntries = [];

// 1) hotels
hotels.forEach(hRaw => {
  // normalize
  const h = Object.assign({}, hRaw);
  h.id = h.id || slug(h.name);
  if (!h.images) h.images = h.images || [];
  const ent = generateHotelPage(h);
  sitemapEntries.push({ loc: `${SITE_BASE}${ent.url}`, lastmod: ent.lastmod });
});

// 2) states & cities
const byState = {};
const byCity = {};
const interestsMap = {}; // interest => hotels
const monthsMap = {}; // month => hotels (based on tags or month field if exists)

hotels.forEach(h => {
  const state = h.state || 'Unknown';
  const city = h.city || 'Unknown';
  byState[state] = byState[state] || [];
  byState[state].push(h);

  byCity[state] = byCity[state] || {};
  byCity[state][city] = byCity[state][city] || [];
  byCity[state][city].push(h);

  // interests (tags or custom interests array)
  const tags = (h.tags || []).concat(h.interests || []);
  (tags || []).forEach(t => {
    if (!t) return;
    interestsMap[t] = interestsMap[t] || [];
    interestsMap[t].push(h);
  });

  // months: if hotel.availableMonths present or tags like "January", map them; else skip
  (h.availableMonths || []).forEach(m => {
    monthsMap[m] = monthsMap[m] || [];
    monthsMap[m].push(h);
  });
});

// create state pages
Object.keys(byState).forEach(state => {
  const ent = generateStatePage(state, byState[state]);
  sitemapEntries.push({ loc: `${SITE_BASE}${ent.url}`, lastmod: ent.lastmod });

  // city pages inside state
  const cities = byCity[state] || {};
  Object.keys(cities).forEach(city => {
    const ce = generateCityPage(state, city, cities[city]);
    sitemapEntries.push({ loc: `${SITE_BASE}${ce.url}`, lastmod: ce.lastmod });
  });
});

// interest pages
Object.keys(interestsMap).forEach(interest => {
  const ie = generateInterestPage(interest, interestsMap[interest]);
  sitemapEntries.push({ loc: `${SITE_BASE}${ie.url}`, lastmod: ie.lastmod });
});

// month pages
Object.keys(monthsMap).forEach(month => {
  const me = generateMonthPage(month, monthsMap[month]);
  sitemapEntries.push({ loc: `${SITE_BASE}${me.url}`, lastmod: me.lastmod });
});

// packages
packages.forEach(p => {
  const pe = generatePackagePage(p);
  sitemapEntries.push({ loc: `${SITE_BASE}${pe.url}`, lastmod: pe.lastmod });
});

// generate sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(e => {
  return `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`;
}).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(OUT_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('WROTE sitemap.xml');

// robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_BASE}/generated-pages/sitemap.xml
`;
fs.writeFileSync(path.join(OUT_DIR, 'robots.txt'), robots, 'utf8');
console.log('WROTE robots.txt');

console.log('✅ SEO Page generation complete. Pages are in public/generated-pages/');

    