// Screenshots of /kit at 1440 and 390 into docs/catalog/, one full page image per width plus one crop per
// section label, so CATALOG.md entries can be checked against what the kit renders. Also shoots the home page
// hero (home-{w}.png). Writes png; convert to webp before committing (the committed set is webp, under 2 MB in all).
// Needs the preview server running (npm run preview) and Playwright Chromium (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers,
// PLAYWRIGHT_MODULE_PATH=/opt/npm-tools/node_modules when playwright is not installed here).
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
const req = createRequire(import.meta.url);
const pwPath = (() => { try { return req.resolve('playwright'); } catch { return req.resolve('playwright', { paths: [process.env.PLAYWRIGHT_MODULE_PATH || ''] }); } })();
const pw = await import(pwPath);
const { chromium } = pw.chromium ? pw : pw.default;
const BASE = process.argv[2] || 'http://localhost:4321';
await mkdir('docs/catalog', { recursive: true });
const browser = await chromium.launch();
for (const w of [1440, 390]) {
  // motion on, so the hero keyword moment is caught in its settled state and GSAP sections show their finished text
  const page = await browser.newPage({ viewport: { width: w, height: w > 600 ? 900 : 844 }, isMobile: w < 600, hasTouch: w < 600 });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(1800);
  await page.screenshot({ path: `docs/catalog/home-${w}.png` });
  await page.goto(`${BASE}/kit`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(800);
  await page.addStyleTag({ content: '.site-header, .skip { display: none !important; }' });
  const items = await page.$$('.kit-item, .fx');
  for (const it of items) {
    const id = await it.getAttribute('id');
    await it.scrollIntoViewIfNeeded(); await page.waitForTimeout(w > 600 ? 2000 : 1500);
    await it.screenshot({ path: `docs/catalog/${id}-${w}.png` });
  }
  await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300);
  await page.screenshot({ path: `docs/catalog/kit-${w}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log('Catalog screenshots written to docs/catalog/');
