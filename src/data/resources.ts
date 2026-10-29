// Guides (Markdown pages in src/pages/resources/) and interactive tools.

export const guides = [
  { slug: 'houston-flood-zones-explained', title: 'Houston flood zones, explained', summary: 'What Zone AE, X and the rest mean for your home, insurance and lender.', icon: 'i-map' },
  { slug: 'which-drainage-fix-do-you-need', title: 'Which drainage fix does your yard need?', summary: 'French drain, sump pump, grading or downspouts — matched to the symptom.', icon: 'i-question' },
  { slug: 'houston-clay-soil-and-your-foundation', title: 'Houston clay and your foundation', summary: 'Why water at the slab matters on expansive clay, and what helps.', icon: 'i-house' },
  { slug: 'downspout-drainage-guide', title: 'Where your downspouts should send water', summary: 'The gallons involved, and the right way to move roof water away.', icon: 'i-downspout' },
  { slug: 'what-to-do-when-your-yard-floods', title: 'What to do when your yard floods', summary: 'Stay safe, document it, and fix the cause before the next storm.', icon: 'i-drop' },
] as const;

export const tools = [
  { href: '/runoff-calculator/', title: 'Runoff calculator', summary: 'How many gallons your roof sheds in a storm.', icon: 'i-calc' },
  { href: '/drainage-checkup/', title: 'Drainage checkup', summary: 'Tap what you’re seeing; get the likely fix.', icon: 'i-list' },
  { href: '/resources/hurricane-season-checklist/', title: 'Hurricane-season checklist', summary: 'Prep your drainage before June 1.', icon: 'i-storm' },
] as const;

export const guidePath = (slug: string) => `/resources/${slug}/`;
