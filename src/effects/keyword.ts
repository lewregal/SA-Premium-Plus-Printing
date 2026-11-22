// Picks the hero keyword from the page's own data. The keyword is the service or the city the Google Business
// Profile ranks for, as it appears inside the headline, so the motion moment lands on the words that matter
// for the search and never on filler. Candidates are tried in order; the first one found in the headline wins.
import { SITE } from '../data/site';

const stem = (w: string) => w.toLowerCase().replace(/(ing|ers|er|es|s)$/, '');
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** The default candidate list: the city, the GBP category and its words, then every service name. */
export function keywordCandidates(extra: string[] = []): string[] {
  const cat = SITE.category;
  const services = (SITE as any).services as string[] | undefined;
  return [...extra, SITE.city, cat, ...cat.split(/\s+/), ...(services || []), ...(services || []).flatMap((s) => s.split(/\s+/))]
    .map((s) => s.trim()).filter((s) => s.length >= 4);
}

/** Returns the substring of `headline` (original casing) that matches a candidate, or '' when none does. */
export function pickKeyword(headline: string, candidates: string[] = keywordCandidates()): string {
  for (const c of candidates) {
    const full = new RegExp(`\\b${escape(c)}\\b`, 'i').exec(headline);
    if (full) return full[0];
  }
  for (const c of candidates) {
    if (/\s/.test(c)) continue;
    const st = stem(c);
    if (st.length < 4) continue;
    const m = new RegExp(`\\b${escape(st)}[a-z]*\\b`, 'i').exec(headline);
    if (m) return m[0];
  }
  return '';
}

/** Splits a headline around the keyword: [before, keyword, after]. The keyword is '' when it is not in the headline. */
export function splitKeyword(headline: string, keyword: string): [string, string, string] {
  if (!keyword) return [headline, '', ''];
  const i = headline.toLowerCase().indexOf(keyword.toLowerCase());
  if (i < 0) return [headline, '', ''];
  // trailing punctuation stays glued to the word so it can never wrap onto its own line
  let end = i + keyword.length;
  while (end < headline.length && /[,.;:!?]/.test(headline[end])) end++;
  return [headline.slice(0, i), headline.slice(i, end), headline.slice(end)];
}
