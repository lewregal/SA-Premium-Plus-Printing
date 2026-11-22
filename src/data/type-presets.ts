// House type presets. One setting in src/site.config.ts (`type`) picks a preset; astro.config.mjs turns the
// preset's faces into the HOUSE fonts list and Base.astro sets data-type on <html>, which switches the matching
// tokens in src/styles/tokens.css (sizes, tracking, line height, weights, capitals for the condensed faces).
//
// The three presets are the house shortlist Lou picked from /type (cards 4, 6 and 12 in src/data/type-specimen.ts):
//   plex      #4  IBM Plex Sans for words and numbers, Caveat for notes. Steady, engineered. Contractors, clinics, pest.
//   druk      #6  Big Shoulders capitals over Host Grotesk. Tall condensed display. Bars, auto, bold contractors.
//   screamer  #12 Sofia Sans Extra Condensed capitals over Sofia Sans. One superfamily squeezed and released.
// Any preset fits any industry; the condensed pair suits bold or kinetic directions, Plex suits steady ones.
// A new pairing outside the shortlist is allowed when the brand or a reference calls for it: add it here through
// the same method (rigal-web-design references/typography.md) and point `type` at it.
//
// Speed rules every preset keeps: two families at most plus one optional accent, variable files where the family
// has them, Latin only, display and body preloaded (normal style), the accent not preloaded.

export type Provider = 'google' | 'fontshare';
export interface FaceSpec {
  provider: Provider;
  name: string;
  weights: (string | number)[];     // a range string ('100 900') asks for the variable file
  styles?: ('normal' | 'italic')[];  // omit for both
  axes?: Record<string, number[] | [number, number][]>;  // extra variable axes (opsz, wdth) to keep
  fallbacks: string[];
}
export interface TypePreset {
  id: string;
  n: number;              // its card number on /type
  label: string;
  display: FaceSpec;
  body: FaceSpec | 'display';          // 'display' means the display family also sets the body
  accent?: FaceSpec & { kind: 'mono' | 'script' };  // mono: numbers and labels; script: handwritten notes only
  relationship: string;
}

const caveat: FaceSpec & { kind: 'script' } = { kind: 'script', provider: 'google', name: 'Caveat', weights: ['400 700'], styles: ['normal'], fallbacks: ['cursive'] };

// SA Premium: Permanent Marker replaces Caveat as the screamer accent (tape labels, Lou 2026-11-22).
const marker: FaceSpec & { kind: 'script' } = { kind: 'script', provider: 'google', name: 'Permanent Marker', weights: [400], styles: ['normal'], fallbacks: ['cursive'] };
export const TYPE_PRESETS: Record<string, TypePreset> = {
  plex: {
    id: 'plex', n: 4, label: 'Plex',
    display: { provider: 'google', name: 'IBM Plex Sans', weights: ['100 700'], axes: { wdth: [[85, 100]] }, fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'] },
    body: 'display',
    accent: caveat,
    relationship: 'One family does the work: Plex Sans for words and numbers (tabular figures), Caveat for the one handwritten note (Lou, 2026-11-08).',
  },
  druk: {
    id: 'druk', n: 6, label: 'Druk',
    display: { provider: 'google', name: 'Big Shoulders', weights: ['100 900'], styles: ['normal'], axes: { opsz: [[10, 72]] }, fallbacks: ['Arial Narrow', 'Impact', 'sans-serif'] },
    body: { provider: 'google', name: 'Host Grotesk', weights: ['300 800'], fallbacks: ['system-ui', 'sans-serif'] },
    accent: caveat,
    relationship: 'A tall condensed display face in capitals over a wide, calm grotesk body; built for a bar sign.',
  },
  screamer: {
    id: 'screamer', n: 12, label: 'Screamer',
    display: { provider: 'google', name: 'Sofia Sans Extra Condensed', weights: ['1 1000'], styles: ['normal'], fallbacks: ['Arial Narrow', 'Impact', 'sans-serif'] },
    body: { provider: 'google', name: 'Sofia Sans', weights: ['1 1000'], fallbacks: ['system-ui', 'sans-serif'] },
    accent: marker,
    relationship: 'One superfamily squeezed and released: extra condensed capitals up top, the same drawing at full width below.',
  },
};

export const HOUSE_SHORTLIST = Object.values(TYPE_PRESETS).map((p) => p.n);
