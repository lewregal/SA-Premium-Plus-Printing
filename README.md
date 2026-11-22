# Rigal Astro starter

The starting point for every Rigal Media local service site. Astro 7, static output on Vercel, with one route (`/book`) rendered on request. A new client build is mostly a tokens file, a config file and copy.

What is in the box:

- `src/styles/tokens.css`: every brand decision by role (color roles, type faces and fluid scale, weights, radius, spacing, textures, motion, the hero effect choice). Comments say what each swap changes.
- Fonts: Astro's built in fonts feature (`fonts` in `astro.config.mjs`, `<Font />` in `Base.astro`). Astro downloads the families at build time, subsets them to Latin and serves them from `_astro/fonts/`; nothing is requested from Google or Fontshare at runtime. The faces come from the **type preset** named in `src/site.config.ts` (`type`: `plex` by default, `druk` or `screamer`; defined in `src/data/type-presets.ts`, the house shortlist Lou picked from `/type`). Three roles (display, body, accent) map onto `--f-display`, `--f-body` and `--f-accent` in `tokens.css`, and `<html data-type>` switches the matching scale, tracking and capitals. Modern by default; the client's own brand overrides (rigal-web-design `references/typography.md`).
- `src/site.config.ts`: `clientId`, `booking.enabled`, `frontDesk`. Both Rigal Booking and Rigal Front Desk are wired into every design from day one, so either can be switched on later with one flag and no redesign.
- `src/layouts/Base.astro`: head, skip link, header, phone menu, footer, the signature mobile action bar, the Front Desk tag.
- `src/sections/<archetype>/<Variant>.astro`: five hero variants, the marquee band that sits directly below the hero, the kinetic band and the inner sections. `CATALOG.md` lists each with its fingerprint; `/kit` renders them all with labels.
- `src/effects/`: the CSS only hero keyword moment (`Keyword.astro`, `KeywordHeadline.astro`), six GSAP effects below the hero (loaded lazily by `gsap-lazy.ts`, choreographed in `gsap-effects.ts`) and the plain CSS effects, each with a reduced motion fallback. Hero rules in `CATALOG.md`.
- `src/pages/`: a composed sample home page, services, service areas, about, reviews, contact, events, 404, thank you, the kit, and `/book`.
- `scripts/qa.mjs`: the QA gate. `scripts/preview.mjs`: static preview (the Vercel adapter does not support `astro preview`). `scripts/kit-shots.mjs`: catalog screenshots. `scripts/type-shots.mjs`: specimen screenshots into `docs/type/`.

## Start a client build

1. Create the repo from this template (`gh repo create lewregal/{slug} --private --template lewregal/rigal-astro-template --clone`), then `npm ci`.
2. `src/site.config.ts`: set `clientId` (from the domain, lowercase, hyphenated; it can never change), `booking.enabled` and `frontDesk` per the sale. The Front Desk tag ships either way and stays silent until the client row exists.
3. `src/data/site.ts`: every business fact from the GBP, character for character. `astro.config.mjs`: `site` to the production domain.
4. `src/site.config.ts` `type`: the house preset (`plex`, `druk` or `screamer`), or a new matched pairing added to `src/data/type-presets.ts` through the rigal-web-design typography method when the brand or a reference calls for it (Google Fonts by default; Fontshare when one of its faces is the closer match). `src/styles/tokens.css`: the client's colors by role, type scale tweaks, radius, textures from the trade. Delete the SPECIMEN list and `src/pages/type.astro` from a client build. Prove contrast with the audit, not by eye.
5. Compose pages from `CATALOG.md`: pick the hero variant and sections that match the client's screenshots (rigal-design-research), pass copy through the shared slot props, drop the client's own photos into `media`. Write each hero headline around the service or the city so the keyword moment lands on it (`keyword` names the word when the picker should not guess). The marquee band goes directly under the hero. Replace every placeholder (`[years]`, `[Placeholder review ...]`, `Client photo`) or the QA gate stops you.
6. `npm run build && npm run qa`, then `npm run preview` and run `rigal-site-audit` at 1440 and 390 on every page. Commit, push to `main`, and the preview deploys.

`npm run build` writes `.vercel/output/` (static files under `static/`, the `/book` function under `functions/`). `dist/` holds only the client bundle. Never edit either by hand.

## Booking and Front Desk

- Booking off: the primary button in every hero, banner, CTA band and the action bar pill goes to `SITE.primaryAction`. On: the same slot goes to `/book` and shows the next open windows under it (`src/components/NextOpen.astro`, filled from `/book/availability`). `/book` is a thin window onto `book.rigalmedia.com/{clientId}` (`src/pages/book/[...path].astro`, ported from the Century Pest build); no keys live in this repo.
- Booking decision (Lou, 2026-11-08): booking stays on the client's own domain at `/book`, never a link out to book.rigalmedia.com. Every build ships with it off: `/book` is noindex, out of the sitemap and linked from nowhere. Turn it on for a 30 day trial when the client wants to try it; if they keep it, it stays on and the Google profile's Appointments link points to `/book`; if not, switch it back off.
- Front Desk: one script tag in `Base.astro` with `data-client-id`. The launcher mounts bottom right; `global.css` reserves that corner and lifts it above the action bar on phones. Nothing else goes there.

## Type specimen and presets

`/type` (noindex, not in the sitemap) sets 12 font pairings twice each, as a bar and as a roofer, in real local business copy. Each pairing is a look from a1.gallery (usually set in a paid face such as Neue Montreal, Druk or GT Alpina) matched to the closest family in Google Fonts or Fontshare, and the card names the inspiration, the faces, their source and the relationship. Pairings live in `src/data/type-specimen.ts`; their families are the SPECIMEN list in `astro.config.mjs`. Speed rules for every pairing: at most two families plus an optional accent, variable files, Latin only, preload only the display and body faces.

Lou picked three as the house shortlist (2026-11-08), marked on `/type` and built as presets in `src/data/type-presets.ts`:

| Preset | Card | Display | Body | Accent | Suits |
|---|---|---|---|---|---|
| `plex` (default) | #4 Plex | IBM Plex Sans | IBM Plex Sans | Caveat for notes | Steady, engineered: contractors, clinics, pest |
| `druk` | #6 Druk | Big Shoulders, capitals | Host Grotesk | Caveat for notes | Bold or kinetic: bars, auto, contractors after a storm |
| `screamer` | #12 Screamer | Sofia Sans Extra Condensed, capitals | Sofia Sans | Caveat for notes | Bold or kinetic: bars, auto, contractors after a storm |

Set `type` in `src/site.config.ts` and the fonts, tokens and headline case follow. Screenshots of the home hero in each preset are in `docs/type/presets/`.

## Launch splash

`/launch` is a full screen page for launch day, in the client's branding with nothing to set up: the logo from `SITE.logo` (the wordmark when it is empty), the ground from `--deep` into `--brand`, the button and underline from `--accent`, and confetti from the color roles. Once the domain is live, open `https://{domain}/launch` on a laptop at the client's office. The client presses Launch site, confetti bursts and the page reads "Congratulations, you are now live" for 3 seconds, then forwards to the home page. Every load, and the Back button, starts at a fresh splash, so rehearse it before the meeting. It is desktop and laptop first. The page is not linked anywhere, is noindex, and stays out of the sitemap; it uses `Base` with `bare` (no header, footer, action bar or Front Desk tag). Delete `src/pages/launch.astro` after the client presses the button. Bilingual clients add their second language line to the page.

## Harvest rule

When a client build passes the audit and contains a section or effect this starter does not have, strip the client's copy, photos, logo and facts, add it under `src/sections/` or `src/effects/`, render it on `/kit`, and add one line to `CATALOG.md` with its fingerprint. The starter grows one proven piece at a time; the next client starts with it.

## Template gate

Before this starter becomes the kickoff default (rigal-local-site-build), build it with sample content, deploy the preview, and run PageSpeed Insights on mobile and desktop. Record the scores here:

- Desktop: pending
- Mobile: pending
- Audit (rigal-site-audit, home page, `/kit` and `/services/roof-repair`, 1440 and 390): 0 fail at both widths on 2026-11-08, both audit scripts, including the hero motion, first frame, pill and font loading checks.
