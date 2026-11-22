// Splits a review into plain and marked parts for the highlight phrases. Phrases must be exact substrings of the
// review; anything that does not match is ignored, so a review is never altered.
export function marked(text: string, phrases: string[] = []) {
  const hits = phrases.filter(Boolean).map((p) => ({ p, i: text.indexOf(p) })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i);
  const out: { t: string; m: boolean }[] = [];
  let at = 0;
  for (const { p, i } of hits) { if (i < at) continue; if (i > at) out.push({ t: text.slice(at, i), m: false }); out.push({ t: p, m: true }); at = i + p.length; }
  if (at < text.length) out.push({ t: text.slice(at), m: false });
  return out;
}
