// Site switches. Set once at kickoff (rigal-local-site-build). Every design ships with Rigal Booking and
// Rigal Front Desk wired in, so either can be switched on later without a redesign.
//
// clientId   chosen at build time, used by Front Desk (data-client-id) and Rigal Booking (the slug under
//            book.rigalmedia.com). It can never change once chosen. Lowercase, hyphenated, from the domain.
// booking    enabled: the primary action in heroes, CTA bands and the action bar goes to /book. Off: the same
//            slot falls back to the call or contact action in site.ts (no layout change).
// frontDesk  enabled only controls whether the launcher is expected to show; the script tag always ships and
//            stays silent until the client row exists in the Front Desk service. domain is the service host.
// type       the house type preset: 'plex' (default), 'druk' or 'screamer' (src/data/type-presets.ts). It sets the
//            HOUSE fonts in astro.config.mjs and the matching tokens through data-type on <html>. A matched pairing
//            outside the shortlist is added to type-presets.ts first, then named here.
export const CONFIG = {
  clientId: 'sample-roofing',
  type: 'plex' as 'plex' | 'druk' | 'screamer' | (string & {}),
  booking: { enabled: false, label: 'Book online', service: 'https://book.rigalmedia.com' },
  frontDesk: { enabled: false, domain: 'https://front-desk.rigalmedia.com' },
};

export const bookingAction = (fallback: { label: string; href: string }) =>
  CONFIG.booking.enabled ? { label: CONFIG.booking.label, href: '/book' } : fallback;
