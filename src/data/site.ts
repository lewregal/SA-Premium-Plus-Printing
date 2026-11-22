// Business facts. Every value here is a placeholder; a client build replaces all of them from the GBP,
// character for character (name, address, phone, hours). Nothing in a section hardcodes these.
export const SITE = {
  name: 'Sample Roofing Co',          // legal or GBP name
  short: 'Sample Roofing',            // header and footer wordmark
  category: 'Roofing Contractor',     // GBP primary category, drives the kicker H1
  logo: '',                           // optional: the client's logo under public/ (e.g. '/images/brand/logo-512.png'). '' shows the wordmark
  city: 'San Antonio',
  region: 'TX',
  domain: 'https://example.com',
  phone: '(210) 555 0100',
  phoneE164: '+12105550100',
  email: 'office@example.com',
  address: { street: '100 Example St', city: 'San Antonio', region: 'TX', zip: '78201' },
  hours: { days: [1, 2, 3, 4, 5], open: '08:00', close: '17:00', tz: 'America/Chicago', text: 'Monday to Friday, 8 AM to 5 PM' },
  placeId: '',                        // Google place id for the directions link, when known
  googleReviews: 'https://www.google.com/maps',
  rating: '5.0',                      // from the GBP, never typed from memory
  reviewCount: 0,                     // 0 shows the "read our reviews" fallback instead of a count
  booking: '/contact',                // the client's own booking link, or the contact page
  primaryAction: { label: 'Get a free estimate', href: '/contact' },  // the fallback action when booking is off (site.config.ts)
  areas: ['Alamo Heights', 'Stone Oak', 'Helotes', 'Boerne', 'Schertz', 'New Braunfels'],
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Service areas', href: '/service-areas' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ],
  locations: [
    { name: 'Sample Roofing, San Antonio', street: '100 Example St', city: 'San Antonio, TX 78201', phone: '(210) 555 0100', tel: '+12105550100', map: '/placeholders/map.svg' },
  ],
  social: [] as { label: string; href: string }[],
  published: '2026-01-01',
  modified: '2026-01-01',
};

export const directionsUrl = (loc = SITE.locations[0]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.name}, ${loc.street}, ${loc.city}`)}${SITE.placeId ? `&destination_place_id=${SITE.placeId}` : ''}`;
