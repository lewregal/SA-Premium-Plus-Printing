// Share cards (Open Graph, 1200x630) with a call to action, one per page.
// Run after `npm run build`: NODE_USE_ENV_PROXY=1 npm run og, then build again so each page points at its card.
// Reads the built pages in dist/client, writes public/images/og/<slug>.jpg. Fonts are fetched for the render only;
// the site itself still loads its fonts through Astro's fonts config.
import { createRequire } from 'node:module';
const req = createRequire(import.meta.url);
const pwPath = (() => { try { return req.resolve('playwright'); } catch { return req.resolve('playwright', { paths: [process.env.PLAYWRIGHT_MODULE_PATH || ''] }); } })();
const pw = await import(pwPath);
const { chromium } = pw.chromium ? pw : pw.default;
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist/client';
const OUT = 'public/images/og';
const SKIP = new Set(['/404/', '/thank-you/', '/book/']);
const PHONE = '(210) 999-5638';
const IG = '@sapremiumplusprinting';
const DOMAIN = 'sapremiumprints.com';
const PROOF = '4.8 stars, 124 Google reviews';
const HEAD = { '/': 'Screen printing, shirts, signs and stickers', '/contact/': 'Call, book a call or DM us' };

const FONTS = [
  ['Sofia Sans Extra Condensed', 900, 'https://fonts.gstatic.com/s/sofiasansextracondensed/v6/raxdHjafvdAIOju4GcIfJH0i7zi50X3zRtuLNiMS0d6iDr-MD5Si9NGLM2-0eDON_ZuWxW3d.woff2'],
  ['Sofia Sans', 500, 'https://fonts.gstatic.com/s/sofiasans/v20/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69BIsJ3qpPOgW08lTLU.woff2'],
  ['Sofia Sans', 700, 'https://fonts.gstatic.com/s/sofiasans/v20/Yq6E-LCVXSLy9uPBwlAThu1SY8Cx8rlT69Cdt53qpPOgW08lTLU.woff2'],
  ['Permanent Marker', 400, 'https://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004La2Cf5b6jlg.woff2'],
];

const b64 = (file) => fs.readFileSync(file).toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]*>/g, '').trim();

function pages(dir = DIST) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('_')) out.push(...pages(p));
    else if (e.name === 'index.html') out.push(p);
  }
  return out;
}

const faces = [];
for (const [fam, w, url] of FONTS) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  faces.push(`@font-face{font-family:'${fam}';font-weight:${w};src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2')}`);
}
const logo = `data:image/png;base64,${b64('public/images/brand/logo-green.png')}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const file of pages()) {
  const route = '/' + path.relative(DIST, path.dirname(file)).split(path.sep).join('/') + '/';
  const r = route.replace('//', '/');
  if (SKIP.has(r)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const head = HEAD[r] || h1.replace(/ in San Antonio, TX$/, '');
  const img = (html.match(/(\/images\/work\/[a-z0-9-]+\.webp)/) || [])[1] || '/images/work/press.webp';
  const photo = `data:image/webp;base64,${b64('public' + img)}`;
  const slug = r === '/' ? 'home' : r.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  await page.setContent(`<!doctype html><html><head><style>${faces.join('')}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;background:#0B0B0D;color:#F4F5EF;font-family:'Sofia Sans';overflow:hidden;position:relative}
.l{position:absolute;left:64px;top:56px;width:620px;height:518px;display:flex;flex-direction:column}
.logo{height:62px;width:auto;align-self:flex-start}
.pill{align-self:flex-start;margin-top:30px;border:2px solid #A1D94E;color:#A1D94E;border-radius:999px;padding:7px 18px 6px;font-weight:700;font-size:20px;letter-spacing:.08em;text-transform:uppercase}
h1{font-family:'Sofia Sans Extra Condensed';font-weight:900;text-transform:uppercase;line-height:.9;letter-spacing:-.005em;margin-top:18px;font-size:120px}
.cta{margin-top:auto;display:flex;align-items:center;gap:22px}
.btn{background:#A1D94E;color:#0B0B0D;font-weight:700;font-size:32px;padding:16px 28px 14px;border-radius:999px;box-shadow:6px 6px 0 #FF4FA8;white-space:nowrap}
.dm{color:#A9ACA3;font-size:22px;line-height:1.25;font-weight:500}.dm b{color:#F4F5EF;font-weight:700}
.dom{position:absolute;left:64px;bottom:22px;color:#A9ACA3;font-size:19px;font-weight:500;letter-spacing:.04em}
.ph{position:absolute;right:58px;top:58px;width:400px;height:480px;background:#fff;padding:14px 14px 56px;transform:rotate(3deg);box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ph img{width:100%;height:100%;object-fit:cover;display:block}
.tape{position:absolute;right:78px;bottom:52px;transform:rotate(-4deg);font-family:'Permanent Marker';background:#A1D94E;color:#0B0B0D;padding:8px 18px 6px;font-size:24px;box-shadow:5px 5px 0 #FF4FA8;white-space:nowrap}
</style></head><body>
<div class="l"><img class="logo" src="${logo}" alt=""><span class="pill">San Antonio, TX</span><h1>${esc(head)}</h1>
<div class="cta"><span class="btn">Call ${PHONE}</span><span class="dm">or DM us on Instagram<br><b>${IG}</b></span></div></div>
<div class="dom">${DOMAIN}</div>
<div class="ph"><img src="${photo}" alt=""></div><span class="tape">${PROOF}</span>
</body></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const h = document.querySelector('h1'); const cta = document.querySelector('.cta');
    let s = 120;
    while (s > 56 && (h.scrollWidth > h.clientWidth + 1 || cta.getBoundingClientRect().top - h.getBoundingClientRect().bottom < 28)) { s -= 4; h.style.fontSize = s + 'px'; }
  });
  await page.screenshot({ path: `${OUT}/${slug}.jpg`, type: 'jpeg', quality: 84 });
  n++;
}
await browser.close();
console.log(`og: wrote ${n} cards to ${OUT}`);
