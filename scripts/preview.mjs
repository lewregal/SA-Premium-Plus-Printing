// Static preview for QA and the audit loop. The Vercel adapter (needed for the on request /book route) does
// not support `astro preview`, so this serves the static part of the build at http://localhost:4321.
// /book is rendered on Vercel only; here it answers with the booking fallback page so links do not 404.
// Usage: node scripts/preview.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const PORT = Number(process.argv[2] || 4321);
const ROOT = '.vercel/output/static';
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.ico': 'image/x-icon' };
const exists = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };
const fallbackBook = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Book online (preview)</title></head><body style="font-family:system-ui;padding:48px;max-width:640px;margin:auto"><h1>Book online</h1><p>This route renders on request on Vercel through src/pages/book/[...path].astro. The local preview does not run it.</p><p><a href="/">Back to the home page</a></p></body></html>`;

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.startsWith('/book')) { res.writeHead(200, { 'content-type': TYPES['.html'] }); return res.end(path === '/book/availability' ? '{"slots":[]}' : fallbackBook); }
  let file = join(ROOT, path);
  if (path.endsWith('/')) file = join(file, 'index.html');
  if (!(await exists(file))) { if (await exists(file + '.html')) file += '.html'; else if (await exists(join(file, 'index.html'))) file = join(file, 'index.html'); else { file = join(ROOT, '404.html'); res.statusCode = 404; } }
  try { const data = await readFile(file); res.setHeader('content-type', TYPES[extname(file)] || 'application/octet-stream'); res.end(data); }
  catch { res.statusCode = 404; res.end('Not found'); }
}).listen(PORT, () => console.log(`Preview at http://localhost:${PORT} (serving ${ROOT})`));
