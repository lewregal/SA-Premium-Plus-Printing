// Google reviews for the GR sections (GR1, GR2, GR3). Real reviews only, copied word for word from the client's own
// verified Google Business Profile. `highlight` lists phrases from the review text to mark (exact substrings; never
// reworded). `service` is optional context shown under the name. Placeholders stay in square brackets until replaced.
import { SITE } from './site';
export interface Review { text: string; author: string; when?: string; service?: string; highlight?: string[]; url?: string }
export const REVIEWS: Review[] = [
  { text: '[Placeholder review 1. Replace with a real Google review, word for word.]', author: '[Reviewer name]', when: '[Month year]', highlight: ['real Google review'], url: SITE.googleReviews },
  { text: '[Placeholder review 2. Replace with a real Google review, word for word. Longer reviews wrap and the card grows.]', author: '[Reviewer name]', service: '[Service]', highlight: ['word for word'], url: SITE.googleReviews },
  { text: '[Placeholder review 3. Replace with a real Google review, word for word.]', author: '[Reviewer name]', when: '[Month year]', url: SITE.googleReviews },
  { text: '[Placeholder review 4. Replace with a real Google review, word for word.]', author: '[Reviewer name]', service: '[Service]', url: SITE.googleReviews },
  { text: '[Placeholder review 5. Replace with a real Google review, word for word.]', author: '[Reviewer name]', when: '[Month year]', url: SITE.googleReviews },
];
