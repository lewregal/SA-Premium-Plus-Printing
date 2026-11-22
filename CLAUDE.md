# SA Premium Plus Printing website

Client build from the Rigal Astro starter. Portfolio site, no ecommerce. Partnership: Rigal's own investment to test
selling websites through the shop (Lou, 2026-11-22).

- Production domain: not confirmed yet. `https://sapremiumplusprinting.com` is a provisional placeholder in
  `astro.config.mjs` and `src/data/site.ts`; change both when Raymond confirms.
- Vercel: project `sa-premium-plus-printing` in team Rigal Media Clients (team_aagKt6Kz9xmnKPtS404Icmot). Preview https://sa-premium-plus-printing.vercel.app (Vercel Authentication on; the Vercel MCP can fetch it). Push to `main` deploys.
- Client id `sa-premium-plus-printing`. Booking ON (label "Book a call"), Front Desk ON (`src/site.config.ts`).
  Both stay silent or fall back to the call button until the client rows exist in the Booking and Front Desk services.
- Design: mockup C, poster wall (Lou picked 2026-11-22). Type preset screamer with Permanent Marker as the accent.
- Page tree and the 15 service names come word for word from https://claude.ai/artifact/B7CUvsbFtaJDz1KFjKvWnV
  (`src/data/categories.ts`). A service added or removed on the Google profile is added or removed here too.
- Photos are Unsplash stock until Raymond sends real ones. Reviews stay in brackets until copied word for word.
- Shop inbox unknown: `SITE.email` is empty, so the contact form is hidden.
- Redirects and headers live only in the root `vercel.json` (prelaunch noindex is on). Keys never go in the repo.
- Third party embeds the accessibility scan skips: the Google Maps frame on /contact.
- Harvest candidates: `src/sections/poster/*` (PosterHero, CrossingBands, IndexList, PolaroidWall, ArchFeature,
  BigRating, PosterCta).
- Local builds in the cloud container need `NODE_USE_ENV_PROXY=1` to reach Google Fonts.

## Starter rules

This is the template every client build starts from. It holds no client. See README.md for the build flow and CATALOG.md for every section and effect.

- Edit `src/` and `public/`, never `.vercel/output/` or `dist/`.
- `npm run build` then `npm run qa` before every commit. QA must print ALL CLEAR.
- `npm run preview` serves the static build at http://localhost:4321 for screenshots and the audit.
- No em dashes or en dashes anywhere (QA checks src and output). No "guaranteed", "ADA compliant" or "lawsuit proof".
- Placeholder copy stays obviously placeholder: no client names, no invented stats, reviews in square brackets.
- No stock photos of real people. Placeholders are SVG textures in `public/placeholders/`.
- Every effect: transform and opacity only, fires once on scroll into view, finished state under reduced motion.
- Heroes render complete at first paint: headline, proof and buttons visible in the first frame, never opacity 0, never waiting on a script. The only hero motion is the CSS `Keyword` moment (one, at most two) on the service or city word. No GSAP in any hero.
- GSAP (npm, bundled) drives the effects below the hero and loads lazily through `src/effects/gsap-lazy.ts`: never in the initial load, only when the first `[data-gsap]` section nears the viewport. The real sentence stays one text node; GSAP animates an aria-hidden copy.
- The marquee is its own band directly below the hero (`sections/marquee/MarqueeBand`), never inside the hero.
- Booking and Front Desk are wired in from day one through `src/site.config.ts`; never remove the slots or the tag.
- Fonts load only through Astro's `fonts` config (`astro.config.mjs` HOUSE, built from the type preset in `src/site.config.ts`: plex, druk or screamer, defined in `src/data/type-presets.ts`) and the `<Font />` components in `Base.astro`. No `@font-face` by hand, no files in `public/fonts/`, no runtime requests to Google or Fontshare. Google Fonts is the default library; Fontshare when its face is clearly the closer match. Two families at most plus an optional accent, variable files, Latin only, preload only the display and body. Modern by default; the client's brand overrides. Never Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Nunito, Oswald, Bebas Neue, Playfair Display, DM Sans, Manrope, Space Grotesk or Plus Jakarta Sans as a primary face.
- The eyebrow and kicker pills carry text only: no dot, no icon.
- `/type` is the pairing specimen (`src/data/type-specimen.ts`, SPECIMEN in `astro.config.mjs`). A client build deletes both.
- Harvest: a new section or effect from a client build arrives stripped, rendered on `/kit`, and listed in CATALOG.md.
