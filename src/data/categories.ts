// The page tree, mirrored from the Google Business Profile (GBP Core Alignment). Each GBP category gets a page; 
// tree and the 15 service names come word for word from the doc https://claude.ai/artifact/B7CUvsbFtaJDz1KFjKvWnV
// (Lou, 2026-11-22). A service with an empty slug is the category page itself (Custom T-Shirts).
// Everything a visitor reads here is a plain description of what the shop prints. Unknowns stay in brackets.
export interface Category {
  slug: string; label: string; gbp: string[]; kicker: string; headline: string; keyword: string; line: string;
  blurb: string; img: string; imgAlt: string; items: { name: string; slug?: string; text: string }[]; faq: { q: string; a: string }[];
  parent?: string; web?: boolean;
}
const ask = { q: 'How much does it cost?', a: '[Starting prices to confirm with the shop.] Every job is priced on the quantity, the colors and the item, so send the details by phone, Instagram or a booked call and you get a price before anything prints.' };
const order = { q: 'How do I order?', a: 'Call (210) 999-5638, send a DM on Instagram at @sapremiumplusprinting, or book a call at a time that works for you. You can also stop by the shop at 4135 Stahl Rd, Suite 6, during open hours.' };
export const CATEGORIES: Category[] = [
  {
    slug: 'screen-printing', label: 'Screen printing', gbp: ['Screen printing shop'],
    kicker: 'Screen printing in San Antonio, TX', headline: 'Screen printed shirts for your whole crew', keyword: 'Screen printed',
    line: 'Team shirts, event shirts and business uniforms, printed at the shop on Stahl Road.',
    blurb: 'Team and event shirts, business uniforms', img: '/images/work/pull.webp', imgAlt: 'Squeegee pulling ink across a screen',
    items: [
      { name: 'Custom Screen Printing', slug: 'custom-screen-printing', text: 'Screen printed shirts and apparel from 12 pieces up, printed in our San Antonio shop on Stahl Rd. Send your art or let us set it up.' },
      { name: 'Team Shirts with Names and Numbers', slug: 'team-shirts', text: 'Team and event shirts with individual names and numbers in 2 to 10 inch sizes.' },
      { name: 'Business and Work Shirts', slug: 'work-shirts', text: 'Shirts with your logo for staff, crews and events.' },
    ],
    faq: [order, ask, { q: 'What is the smallest order?', a: '[Minimum order to confirm with the shop.]' }, { q: 'How long does a run take?', a: '[Turnaround to confirm with the shop.] Ask when you order and the shop gives you a date.' }],
  },
  {
    slug: 'custom-t-shirts', label: 'Custom T-shirts', gbp: ['Custom t-shirt store'],
    kicker: 'Custom T-shirts in San Antonio, TX', headline: 'Your idea, on a shirt you will actually wear', keyword: 'shirt',
    line: 'Bring a logo, a sketch or just the idea, and walk out with the shirts.',
    blurb: 'Custom shirts for teams, events and brands', img: '/images/work/rack2.webp', imgAlt: 'Printed shirts hanging on a rack',
    items: [
      { name: 'Custom T-Shirts', slug: '', text: 'Custom printed t-shirts for businesses, families, teams and events in San Antonio.' },
      { name: 'Small Batch T-Shirt Printing', slug: 'small-batch', text: 'Short runs and one-off shirts for birthdays, reunions and gifts.' },
    ],
    faq: [order, ask, { q: 'Can I bring my own design?', a: 'Yes. Send your file or a photo of the idea by DM or bring it to the shop. [File types to confirm with the shop.]' }],
  },
  {
    slug: 'digital-printing', label: 'Digital printing', gbp: ['Digital printer'],
    kicker: 'Digital printing in San Antonio, TX', headline: 'Full color DTF transfers that press on anything', keyword: 'DTF',
    line: 'Full color direct to film transfers for shirts, hats and bags, plus canvas prints.',
    blurb: 'DTF transfers and canvas prints', img: '/images/work/heatpress.webp', imgAlt: 'Heat press applying a transfer',
    items: [
      { name: 'DTF Transfers', slug: 'dtf-transfers', text: 'Full color direct to film (DTF) transfers for shirts, hats and bags.' },
      { name: 'Canvas Prints', slug: 'canvas-prints', text: 'Photos and artwork printed on canvas.' },
    ],
    faq: [order, ask, { q: 'What is DTF?', a: 'Direct to film. The design is printed in full color on a film, then heat pressed onto the garment, so it works on cotton, blends and dark colors.' }],
  },
  {
    slug: 'stickers-and-labels', label: 'Stickers and labels', gbp: ['Digital printing service'],
    kicker: 'Stickers and labels in San Antonio, TX', headline: 'Stickers, labels and magnets for your brand', keyword: 'Stickers',
    line: 'Stickers, labels and magnets for your brand, your products and your truck.',
    blurb: 'Custom stickers, labels and magnets', img: '/images/work/stickerprinter.webp', imgAlt: 'Sticker printer printing a sheet',
    items: [
      { name: 'Custom Stickers', slug: 'custom-stickers', text: 'Custom stickers in your shape and size, for brands, events and giveaways.' },
      { name: 'Custom Labels', slug: 'custom-labels', text: 'Product and package labels printed to your size.' },
      { name: 'Custom Magnets', slug: 'custom-magnets', text: 'Custom printed magnets for vehicles, promotions and giveaways.' },
    ],
    faq: [order, ask],
  },
  {
    slug: 'print-shop', label: 'Print shop', gbp: ['Print shop'],
    kicker: 'Print shop in San Antonio, TX', headline: 'Business cards, printed close to home', keyword: 'printed',
    line: 'The everyday printing a business needs, from the same counter as your shirts.',
    blurb: 'Business cards printed in San Antonio', img: '/images/work/redink.webp', imgAlt: 'Red ink on a printing screen',
    items: [
      { name: 'Business Cards', slug: 'business-cards', text: 'Business cards printed in San Antonio. Bring your design or we can set it up.' },
    ],
    faq: [order, ask],
  },
  {
    slug: 'signs', label: 'Signs', gbp: ['Sign shop'],
    kicker: 'Sign shop in San Antonio, TX', headline: 'Signs and banners people see from the street', keyword: 'Signs',
    line: 'Banners, signs, window graphics and vehicle wraps for storefronts, job sites and events.',
    blurb: 'Banners, signs, window graphics, vehicle wraps', img: '/images/work/wideprinter.webp', imgAlt: 'Wide format printer printing a banner',
    items: [
      { name: 'Banners', slug: 'banners', text: 'Custom vinyl banners for storefronts, events and grand openings.' },
      { name: 'Custom Signs', slug: 'custom-signs', text: 'Signs for businesses, events and job sites.' },
      { name: 'Window Graphics', slug: 'window-graphics', text: 'Printed graphics and lettering for shop and office windows.' },
      { name: 'Vehicle Wraps', slug: 'vehicle-wraps', text: 'Vehicle wraps printed by us and installed by our installer partner.' },
    ],
    faq: [order, ask],
  },
];
export const WEBSITES: Category = {
  slug: 'websites', label: 'Websites', gbp: [], web: true,
  kicker: 'Websites for San Antonio businesses', headline: 'Shirts on your crew. Your shop on Google.', keyword: 'Google',
  line: 'Order a website at the same counter where you order your shirts, built with our web partner Rigal Media.',
  blurb: 'Get your business found on Google and Maps', img: '/images/work/laptop.webp', imgAlt: 'Laptop on a desk',
  items: [
    { name: 'Built from scratch', text: 'Fresh code for your business, never a template. Fast and made for phones first.' },
    { name: 'Matched to your Google profile', text: 'Same name, address and phone everywhere, and a page for each service your profile lists, so Google and AI tools read one clear business.' },
    { name: 'Ready for AI search', text: 'Structured data and a plain language summary so assistants like ChatGPT and Gemini can describe what you do.' },
    { name: 'Looked after', text: 'Hosting and automated health checks after launch.' },
  ],
  faq: [
    { q: 'How much is a website?', a: '[Website pricing to confirm.] Book a call and you get a clear price for your business before anything starts.' },
    { q: 'Who builds it?', a: 'Our web partner Rigal Media, a San Antonio agency that builds sites for local service businesses. You order and talk with us at the shop.' },
    { q: 'How do I start?', a: 'Book a call, call (210) 999-5638 or send a DM on Instagram at @sapremiumplusprinting.' },
  ],
};
export const ALL = [...CATEGORIES, WEBSITES];
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Service pages: every item under a GBP category (not Websites) gets its own page at /{category}/{service}.
export const SERVICES = CATEGORIES.flatMap((c) => c.items.filter((it) => it.slug !== '').map((it) => ({ ...it, slug: it.slug || slugify(it.name), cat: c })));
export const itemHref = (c: Category, it: { slug?: string; name: string }) => (it.slug === '' ? `/${c.slug}` : `/${c.slug}/${it.slug || slugify(it.name)}`);
