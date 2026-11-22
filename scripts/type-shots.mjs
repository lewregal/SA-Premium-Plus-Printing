// Screenshots of /type into docs/type/: the full page at 1440 plus one image per pairing (header and both cards)
// at 1440, and the full page at 390. Needs the preview server running (npm run preview) and Playwright Chromium
// (PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers, PLAYWRIGHT_MODULE_PATH=/opt/npm-tools/node_modules when playwright is not installed here). Writes png; convert to webp before committing.
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
// playwright is not a dependency of the starter; it is resolved from the project if installed, else from
// PLAYWRIGHT_MODULE_PATH (for example /opt/npm-tools/node_modules on the Rigal build machine).
const req = createRequire(import.meta.url);
const pwPath = (() => { try { return req.resolve('playwright'); } catch { return req.resolve('playwright', { paths: [process.env.PLAYWRIGHT_MODULE_PATH || ''] }); } })();
const pw = await import(pwPath);
const { chromium } = pw.chromium ? pw : pw.default;
const BASE = process.argv[2] || 'http://localhost:4321';
await mkdir('docs/type', { recursive: true });
const browser = await chromium.launch();
for (const w of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 600 ? 900 : 844 }, isMobile: w < 600, hasTouch: w < 600, reducedMotion: 'reduce' });
  await page.goto(`${BASE}/type`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `docs/type/type-${w}.png`, fullPage: true });
  if (w === 1440) {
    // per pairing crops: the sticky header and the skip link would otherwise land on top of the crop
    await page.addStyleTag({ content: '.site-header, .skip { display: none !important; }' });
    for (const sec of await page.$$('.ty-pair')) {
      const id = await sec.getAttribute('id');
      const name = await sec.$eval('.ty-title', (el) => el.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
      await sec.scrollIntoViewIfNeeded(); await page.waitForTimeout(100);
      await sec.screenshot({ path: `docs/type/${id.replace('p-', '').padStart(2, '0')}-${name.replace(/^\d+-/, '')}.png` });
    }
  }
  await page.close();
}
await browser.close();
console.log('Type screenshots written to docs/type/');
