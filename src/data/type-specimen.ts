// The 12 pairings /type renders. Each one is a look seen on a1.gallery (mostly set in paid faces) matched to the
// closest face in Google Fonts or Fontshare. Every family named here is listed under SPECIMEN in astro.config.mjs,
// which is what makes its CSS variable exist. Lou picked the house shortlist from this page on 2026-11-08: #12 Screamer,
// #6 Druk and #4 Plex, now the presets in src/data/type-presets.ts (set `type` in src/site.config.ts).
//
// Keys: `var` is the Astro font variable; `w` the display weight; `ls` display tracking; `lh` display line height;
// `scale` nudges the headline size for faces that run small or large; `upper` sets the headline in capitals;
// `stretch` sets font-stretch for a width axis family; `accent` is the optional third face for numbers.
export type Face = { family: string; var: string; source: 'Google Fonts' | 'Fontshare' };
export type Pairing = {
  n: number;
  name: string;
  inspiration: { reads: string; site: string; url: string };
  display: Face & { w: number; ls?: string; lh?: number; scale?: number; upper?: boolean; stretch?: string };
  body: Face & { w?: number; strong?: number };
  accent?: Face;
  relationship: string;
  tags: string[];
};

const G = 'Google Fonts' as const;
const F = 'Fontshare' as const;
const a1 = (slug: string) => `https://www.a1.gallery/website/${slug}`;

export const PAIRINGS: Pairing[] = [
  {
    n: 1, name: 'Haas',
    inspiration: { reads: 'Neue Haas Grotesk, the plain Helvetica revival that half of a1 runs on', site: 'Signal-A Studio', url: a1('signal-a-studio') },
    display: { family: 'Hanken Grotesk', var: '--font-body', source: G, w: 700, ls: '-0.035em', lh: 0.96 },
    body: { family: 'Hanken Grotesk', var: '--font-body', source: G },
    relationship: 'One neutral grotesk carried through; all the contrast comes from weight and size, nothing else.',
    tags: ['neutral grotesk'],
  },
  {
    n: 2, name: 'Montreal',
    inspiration: { reads: 'Neue Montreal with Geist Mono for the numbers', site: 'PostGeneric', url: a1('postgeneric') },
    display: { family: 'Switzer', var: '--font-switzer', source: F, w: 600, ls: '-0.035em', lh: 0.96 },
    body: { family: 'Switzer', var: '--font-switzer', source: F },
    accent: { family: 'Fragment Mono', var: '--font-fragment-mono', source: G },
    relationship: 'A grotesk with display spirit at two weights, with a mono face taking every number so prices and hours line up.',
    tags: ['grotesk', 'mono accent'],
  },
  {
    n: 3, name: 'Editorial',
    inspiration: { reads: 'Editorial New over Neue Montreal, the most copied serif and sans pair on a1', site: 'Blunarova', url: a1('blunarova') },
    display: { family: 'Instrument Serif', var: '--font-instrument-serif', source: G, w: 400, ls: '-0.015em', lh: 0.98, scale: 1.08 },
    body: { family: 'Switzer', var: '--font-switzer', source: F },
    relationship: 'A narrow contemporary serif headline, light and sharp, over a neutral grotesk that stays out of the way.',
    tags: ['contemporary serif'],
  },
  {
    n: 4, name: 'Plex',
    inspiration: { reads: 'IBM Plex Sans with Plex Mono, the second most used pairing on a1', site: 'Arta Labs', url: a1('arta-labs-2026') },
    display: { family: 'IBM Plex Sans', var: '--font-plex-sans', source: G, w: 600, ls: '-0.035em', lh: 0.98 },
    body: { family: 'IBM Plex Sans', var: '--font-plex-sans', source: G },
    accent: { family: 'IBM Plex Mono', var: '--font-plex-mono', source: G },
    relationship: 'One superfamily: the sans for words, the mono for numbers and labels, so they share bone structure.',
    tags: ['grotesk', 'mono accent'],
  },
  {
    n: 5, name: 'Extended',
    inspiration: { reads: 'Monument Grotesk Extended and GT Pressura, wide headlines over a normal width body', site: 'Valiente', url: a1('valiente') },
    display: { family: 'Archivo', var: '--font-archivo', source: G, w: 800, ls: '-0.02em', lh: 0.96, stretch: '125%', scale: 0.92 },
    body: { family: 'Archivo', var: '--font-archivo', source: G },
    relationship: 'One family at two widths: the headline pulled wide and heavy, the body at normal width and regular weight.',
    tags: ['wide display'],
  },
  {
    n: 6, name: 'Druk',
    inspiration: { reads: 'Druk, the tall heavy condensed display face', site: 'Brikkenco', url: a1('brikkenco') },
    display: { family: 'Big Shoulders', var: '--font-big-shoulders', source: G, w: 800, ls: '0', lh: 0.9, upper: true, scale: 1.18 },
    body: { family: 'Host Grotesk', var: '--font-host-grotesk', source: G },
    relationship: 'A tall condensed display face in capitals over a wide, calm grotesk body; built for a bar sign.',
    tags: ['condensed display', 'bar'],
  },
  {
    n: 7, name: 'Impact',
    inspiration: { reads: 'Anton with Bricolage Grotesque, exactly the pair Munch runs', site: 'Munch', url: a1('munch') },
    display: { family: 'Anton', var: '--font-anton', source: G, w: 400, ls: '0.01em', lh: 0.95, upper: true, scale: 1.1 },
    body: { family: 'Bricolage Grotesque', var: '--font-display', source: G },
    relationship: 'A poster weight condensed headline over a grotesk with some quirk in it; loud up top, friendly below.',
    tags: ['condensed display', 'bar'],
  },
  {
    n: 8, name: 'Aeonik',
    inspiration: { reads: 'Aeonik, the geometric grotesk, over a plain sans body (Aeonik and Inter is a top a1 pair)', site: 'Caliper Studios', url: a1('caliper-studios') },
    display: { family: 'Satoshi', var: '--font-satoshi', source: F, w: 700, ls: '-0.035em', lh: 0.96 },
    body: { family: 'Switzer', var: '--font-switzer', source: F },
    relationship: 'A geometric headline face with round bowls over a neutral grotesk body; crisp and current without being cold.',
    tags: ['geometric'],
  },
  {
    n: 9, name: 'Degular',
    inspiration: { reads: 'Degular, a warm humanist display sans, over a plain body (Degular and Inter)', site: 'Zapier', url: a1('zapier') },
    display: { family: 'Albert Sans', var: '--font-albert-sans', source: G, w: 700, ls: '-0.03em', lh: 0.96 },
    body: { family: 'Atkinson Hyperlegible Next', var: '--font-atkinson', source: G },
    relationship: 'A warm humanist headline over a body face drawn for legibility first; approachable, reads well small.',
    tags: ['humanist'],
  },
  {
    n: 10, name: 'Fraunces',
    inspiration: { reads: 'Fraunces, the soft wonky serif, as Zoah and Outseta set it', site: 'Zoah', url: a1('zoah') },
    display: { family: 'Fraunces', var: '--font-fraunces', source: G, w: 600, ls: '-0.02em', lh: 0.98 },
    body: { family: 'Funnel Sans', var: '--font-funnel-sans', source: G },
    relationship: 'A soft contemporary serif with a little wonk in the headline over a quiet geometric sans; food and drink energy.',
    tags: ['contemporary serif', 'bar'],
  },
  {
    n: 11, name: 'Alpina',
    inspiration: { reads: 'GT Alpina, the sharp high contrast serif, with a plain sans', site: 'Graza', url: a1('graza') },
    display: { family: 'Boska', var: '--font-boska', source: F, w: 500, ls: '-0.015em', lh: 0.98, scale: 1.06 },
    body: { family: 'Satoshi', var: '--font-satoshi', source: F },
    relationship: 'A high contrast serif headline with hairline joins over a geometric sans body; premium, not bookish.',
    tags: ['contemporary serif'],
  },
  {
    n: 12, name: 'Screamer',
    inspiration: { reads: 'FK Screamer, the extra condensed display face', site: 'Partech', url: a1('partech') },
    display: { family: 'Sofia Sans Extra Condensed', var: '--font-sofia-xc', source: G, w: 800, ls: '0.005em', lh: 0.9, upper: true, scale: 1.22 },
    body: { family: 'Sofia Sans', var: '--font-sofia-sans', source: G },
    relationship: 'One superfamily squeezed and released: extra condensed capitals up top, the same drawing at full width below.',
    tags: ['condensed display', 'bar'],
  },
];
