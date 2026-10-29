// Observed directly on the public Google Maps listing on 2026-10-29.
// Review excerpts intentionally stay brief. Keep original wording and attribution.
// This is a dated snapshot, not a live review feed. Do not add rating schema.
export const reviewSummary = {
  provider: 'Google',
  rating: 4.8,
  count: 56,
  checked: 'October 29, 2026',
  checkedISO: '2026-10-29',
  url: 'https://www.google.com/maps?cid=6538590619509756704',
} as const;

export const reviews = [
  { author: 'Yandy Fidalgo', initials: 'YF', rating: 5, excerpt: 'John and Manny were incredibly helpful from day one', observedDate: '3 months ago', topic: 'Helpful from the start' },
  { author: 'Tiana Rodgers (Marvelous Peacock)', initials: 'TR', rating: 5, excerpt: 'the communication was great. He was very knowledgeable.', observedDate: '2 months ago', topic: 'Clear answers and advice' },
  { author: 'Sarah Pearson', initials: 'SP', rating: 5, excerpt: 'their integrity and transparency', observedDate: 'a month ago', topic: 'An honest assessment' },
] as const;
