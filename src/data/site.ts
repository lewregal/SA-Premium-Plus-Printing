// Business facts for SA Premium Plus Printing, from the Google Business Profile (read 2026-11-11 and 2026-11-20)
// and confirmed by Lou (phone, 2026-11-22). Name, address, phone and hours match the profile character for character.
// Open items (ask Raymond): the domain, the inbox for form messages, the full GBP services list, prices.
export const SITE = {
  name: 'SA Premium Plus Printing',
  short: 'SA Premium',
  category: 'Screen printing shop',   // GBP primary category
  logo: '/images/brand/logo-green.png',
  city: 'San Antonio',
  region: 'TX',
  domain: 'https://sapremiumprints.com',
  phone: '(210) 999-5638',
  phoneE164: '+12109995638',
  email: '',                          // the shop inbox for form messages; empty hides the form
  address: { street: '4135 Stahl Rd, Suite 6', city: 'San Antonio', region: 'TX', zip: '78217' },
  // spans: each one is a set of weekdays (0 Sunday) with an open and close time in the shop's time zone
  hours: {
    days: [1, 2, 3, 4, 5], open: '11:00', close: '19:00', tz: 'America/Chicago',
    spans: [{ days: [1, 2, 3, 4, 5], open: '11:00', close: '19:00' }, { days: [6], open: '12:00', close: '15:00' }],
    text: 'Monday to Friday 11 AM to 7 PM, Saturday 12 PM to 3 PM',
  },
  placeId: 'ChIJYVSsC1uLXIYRcSSDGbqwmuI',
  googleReviews: 'https://www.google.com/maps/place/?q=place_id:ChIJYVSsC1uLXIYRcSSDGbqwmuI',
  rating: '4.8',
  reviewCount: 124,
  instagram: { handle: '@sapremiumplusprinting', href: 'https://www.instagram.com/sapremiumplusprinting/', dm: 'https://ig.me/m/sapremiumplusprinting' },
  booking: '/book',
  primaryAction: { label: 'Get a quote', href: '/contact' },
  areas: [] as string[],
  nav: [
    { label: 'Screen printing', href: '/screen-printing' },
    { label: 'Custom T-shirts', href: '/custom-t-shirts' },
    { label: 'Digital printing', href: '/digital-printing' },
    { label: 'Stickers', href: '/stickers-and-labels' },
    { label: 'Print shop', href: '/print-shop' },
    { label: 'Signs', href: '/signs' },
    { label: 'Websites', href: '/websites' },
    { label: 'Contact', href: '/contact' },
  ],
  locations: [
    { name: 'SA Premium Plus Printing', street: '4135 Stahl Rd, Suite 6', city: 'San Antonio, TX 78217', phone: '(210) 999-5638', tel: '+12109995638', map: '/placeholders/map.svg' },
  ],
  social: [{ label: 'Instagram', href: 'https://www.instagram.com/sapremiumplusprinting/' }],
  published: '2026-11-22',
  modified: '2026-11-22',
};

export const directionsUrl = (loc = SITE.locations[0]) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.name}, ${loc.street}, ${loc.city}`)}${SITE.placeId ? `&destination_place_id=${SITE.placeId}` : ''}`;
