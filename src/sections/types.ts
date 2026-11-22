// Shared slot props for every section. Heroes and banners take all of them; smaller sections take a subset.
export interface Action { label: string; href: string }
export interface Media { src?: string; alt?: string; label?: string; pos?: string; video?: string; poster?: string }
export interface SectionProps {
  eyebrow?: string;        // short label above the headline (the kicker H1 on GBP aligned pages)
  headline?: string;       // the big line; one emphasized phrase goes in `emphasis`
  emphasis?: string;       // the phrase inside headline that gets the effect
  line?: string;           // one line of context: who it is for, what it does
  proof?: string;          // trust line text (rating and count, licensed, years). Empty hides it.
  primary?: Action;        // the one solid button
  secondary?: Action;      // outline button beside the primary, never alone
  media?: Media;           // photo, footage or placeholder
  effect?: string;         // which text effect the headline uses; see src/effects/
  id?: string;
}
