// QA gate for the built site. Runs against every HTML page in the build output plus src/.
// Checks: no em or en dashes anywhere (src and output), one <main> and one <h1> per page (kit page excepted),
// JSON-LD parses, internal links resolve, blocked phrases ("ADA compliant", "lawsuit proof", "guaranteed"),
// template remnants (the sample business name, phone and address) once CONFIG.clientId is not the sample.
// Exit code 1 on any failure. Extend the blocklist per client at kickoff.
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const OUT = '.vercel/output/static';
const BLOCK = [/ADA compliant/i, /lawsuit proof/i, /\bguaranteed\b/i];
const SAMPLE = ['Sample Roofing', '(210) 555 0100', '100 Example St', 'example.com'];
let fails = 0;
const fail = (m) => { fails++; console.log('FAIL ' + m); };

async function walk(dir, exts) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.git', '.astro', 'dist', '.vercel'].includes(e.name) || dir.startsWith(OUT)) out.push(...await walk(p, exts)); }
    else if (exts.includes(extname(e.name))) out.push(p);
  }
  return out;
}

const src = await walk('src', ['.astro', '.ts', '.css', '.md', '.json']);
const pages = await walk(OUT, ['.html']);
const config = await readFile('src/site.config.ts', 'utf8');
const isSample = /clientId:\s*'sample-roofing'/.test(config);

for (const f of [...src, 'README.md', 'CATALOG.md']) {
  const t = await readFile(f, 'utf8').catch(() => '');
  const dash = t.match(/[\u2013\u2014]/g);
  if (dash) fail(`${f}: ${dash.length} em or en dash(es)`);
}

const routes = new Set(pages.map((p) => '/' + p.slice(OUT.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '')));
routes.add('/book'); routes.add('/book/availability');
for (const p of pages) {
  const html = await readFile(p, 'utf8');
  const name = p.slice(OUT.length);
  const isKit = /\/kit\//.test(p);
  if (/[\u2013\u2014]/.test(html)) fail(`${name}: em or en dash in output`);
  const mains = (html.match(/<main\b/g) || []).length; if (mains !== 1) fail(`${name}: ${mains} <main>`);
  const h1s = (html.match(/<h1\b/g) || []).length; if (h1s !== 1 && !isKit) fail(`${name}: ${h1s} <h1>`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { fail(`${name}: JSON-LD does not parse`); } }
  for (const re of BLOCK) if (re.test(html.replace(/<[^>]+>/g, ' '))) fail(`${name}: blocked phrase ${re}`);
  if (!isSample) for (const s of SAMPLE) if (html.includes(s)) fail(`${name}: template remnant "${s}"`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const h = m[1].replace(/\/$/, '') || '/';
    if (/\.(svg|png|jpg|webp|css|js|xml|txt|ico|woff2)$/.test(h)) continue;
    if (!routes.has(h) && !routes.has(h.replace(/^\//, '/'))) fail(`${name}: link to ${h} has no page`);
  }
}
console.log(fails ? `${fails} problem(s)` : 'ALL CLEAR');
process.exit(fails ? 1 : 0);
