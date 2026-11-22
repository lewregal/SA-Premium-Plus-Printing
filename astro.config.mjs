// Rigal Astro starter. Static output deployed by Vercel on every push to main.
// Client build: set `site` to the production domain (apex, no www unless the GBP says www).
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { CONFIG } from './src/site.config';
import { TYPE_PRESETS } from './src/data/type-presets';

// Fonts load through Astro's built in fonts feature: Astro fetches the files at build time, subsets them
// (Google: Latin only), hashes them into _astro/fonts/ and serves them from the site. Nothing is requested
// from Google or Fontshare at runtime. Each family exposes one CSS variable; tokens.css maps the starter's
// --f-display, --f-body and --f-accent roles onto the HOUSE variables below, and Base.astro renders the three
// <Font /> components (display and body preloaded, the accent not).
//
// Speed rules for every client build: two families at most plus an optional accent, variable files where the
// family has them, Latin subset only, preload only the display and body faces (normal style). Modern by default;
// the client's own brand overrides (rigal-web-design references/typography.md).
//
// Sources: Google Fonts is the default library. Fontshare (fontProviders.fontshare()) is allowed when one of its
// faces is clearly the closer match for the look we are after (Switzer, Satoshi, Boska and the like). Both are
// served from the site the same way.
const google = fontProviders.google();
const fontshare = fontProviders.fontshare();
const ax = (variableAxis) => ({ experimental: { variableAxis } });

// ---------- HOUSE FACES ----------
// The three roles every section reads (--font-display, --font-body, --font-accent). They come from the type preset
// named in src/site.config.ts (`type`: plex, druk or screamer; the house shortlist Lou picked from /type), defined in
// src/data/type-presets.ts. Swap the preset there and the fonts, the --f-* tokens and the data-type token overrides
// in tokens.css all follow. A preset's accent is either a mono face for numbers or a script face for handwritten notes.
const preset = TYPE_PRESETS[CONFIG.type] || TYPE_PRESETS.plex;
const providerOf = (f) => (f.provider === 'fontshare' ? fontshare : google);
const face = (f, cssVariable) => ({
  provider: providerOf(f), name: f.name, cssVariable, weights: f.weights, fallbacks: f.fallbacks,
  ...(f.styles ? { styles: f.styles } : {}),
  ...(f.axes ? { options: ax(f.axes) } : {}),
});
const HOUSE = [
  face(preset.display, '--font-display'),
  face(preset.body === 'display' ? preset.display : preset.body, '--font-body'),
  face(preset.accent || { provider: 'google', name: 'Caveat', weights: ['400 700'], styles: ['normal'], fallbacks: ['cursive'] }, '--font-accent'),
];

// ---------- TYPE SPECIMEN ----------
// Every family /type renders (src/data/type-specimen.ts names which card uses which). These are downloaded at
// build time and sit in the output, but a page only loads the ones its <Font /> components name, so they cost
// nothing on client pages. A client build deletes this list and src/pages/type.astro together.
const SPECIMEN = [
  // Fontshare
  { provider: fontshare, name: 'Switzer', cssVariable: '--font-switzer', weights: ['100 900'] },
  { provider: fontshare, name: 'Satoshi', cssVariable: '--font-satoshi', weights: ['300 900'] },
  { provider: fontshare, name: 'Boska', cssVariable: '--font-boska', weights: ['200 900'], fallbacks: ['serif'] },
  // Google
  { provider: google, name: 'Instrument Serif', cssVariable: '--font-instrument-serif', weights: [400], fallbacks: ['serif'] },
  { provider: google, name: 'IBM Plex Sans', cssVariable: '--font-plex-sans', weights: [400, 500, 600] },
  { provider: google, name: 'IBM Plex Mono', cssVariable: '--font-plex-mono', weights: [400, 500], styles: ['normal'], fallbacks: ['monospace'] },
  { provider: google, name: 'Fragment Mono', cssVariable: '--font-fragment-mono', weights: [400], styles: ['normal'], fallbacks: ['monospace'] },
  { provider: google, name: 'Archivo', cssVariable: '--font-archivo', weights: ['100 900'], options: ax({ wdth: [[100, 125]] }) },
  { provider: google, name: 'Big Shoulders', cssVariable: '--font-big-shoulders', weights: ['100 900'], styles: ['normal'], options: ax({ opsz: [[10, 72]] }), fallbacks: ['Arial Narrow', 'sans-serif'] },
  { provider: google, name: 'Host Grotesk', cssVariable: '--font-host-grotesk', weights: ['300 800'] },
  { provider: google, name: 'Anton', cssVariable: '--font-anton', weights: [400], styles: ['normal'], fallbacks: ['Impact', 'sans-serif'] },
  { provider: google, name: 'Albert Sans', cssVariable: '--font-albert-sans', weights: ['100 900'] },
  { provider: google, name: 'Atkinson Hyperlegible Next', cssVariable: '--font-atkinson', weights: ['200 800'] },
  { provider: google, name: 'Fraunces', cssVariable: '--font-fraunces', weights: ['100 900'], options: ax({ opsz: [[9, 144]], SOFT: [50], WONK: [1] }), fallbacks: ['serif'] },
  { provider: google, name: 'Funnel Sans', cssVariable: '--font-funnel-sans', weights: ['300 800'] },
  { provider: google, name: 'Sofia Sans Extra Condensed', cssVariable: '--font-sofia-xc', weights: ['1 1000'], styles: ['normal'], fallbacks: ['Arial Narrow', 'sans-serif'] },
  { provider: google, name: 'Sofia Sans', cssVariable: '--font-sofia-sans', weights: ['1 1000'] },
];

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  // The /book route (src/pages/book/[...path].astro) renders on request through the adapter; everything else stays static.
  adapter: vercel(),
  compressHTML: true,
  fonts: [...HOUSE, ...SPECIMEN],
  integrations: [sitemap({ filter: (page) => !/\/(thank-you|404|kit|type|book|launch)/.test(page.replace(/\/$/, '')) })],
});
