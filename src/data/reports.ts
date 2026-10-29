import type { Report } from './types';

// The three-step assessment ladder from the original design.
export const reports: Report[] = [
  {
    slug: 'flood-snapshot',
    name: 'Flood Snapshot',
    step: 'Step 1 · Instant read',
    price: 'Free',
    summary: 'A one-page read on your address so you know whether to worry, and what to ask next.',
    metaTitle: 'Free Flood Snapshot for Any Houston Address',
    metaDescription:
      'Get a free Flood Snapshot of any Houston-area address: FEMA flood zone, nearest waterways, elevation vs. your street, roof runoff and a drainage risk rating.',
    headline: ['Know your flood risk', 'before the next storm.'],
    lede: 'A free, one-page read on your address. Enter it, tell us where to send it, and the Snapshot lands in your inbox.',
    includes: [
      { title: 'FEMA flood zone', body: 'Which flood zone your property sits in, and what that zone actually means for you.' },
      { title: 'Nearest waterways', body: 'The closest bayous, creeks and channels, and how far your lot is from them.' },
      { title: 'Elevation vs. your street', body: 'Whether your lot sits above or below the street, which decides where water wants to go.' },
      { title: 'Roof runoff', body: 'How many gallons your roof sheds in a typical heavy Houston storm.' },
      { title: 'Drainage risk rating', body: 'A simple Low / Moderate / High read so you know whether to dig deeper.' },
    ],
    goodFor: [
      'Buying or selling a home and wanting a quick read',
      'Wondering whether that puddle is a real problem',
      'Checking a rental, a parent’s house or a new build',
      'Deciding whether a full report is worth it',
    ],
    howItWorks: [
      { title: 'Enter your address', body: 'Any address in the Houston area. No card, no account.' },
      { title: 'Tell us where to send it', body: 'Your Snapshot goes to the email you give us.' },
      { title: 'Read it in two minutes', body: 'One page, plain English. If it raises questions, Flood Intelligence answers them.' },
    ],
    faqs: [
      { q: 'Is the Flood Snapshot really free?', a: 'Yes. Enter your address and email and we send it. No card and no obligation.' },
      { q: 'What areas can I get a Snapshot for?', a: 'Any Houston-area address — your home, one you’re thinking of buying, or a family member’s.' },
      { q: 'Does the Snapshot tell me how to fix a problem?', a: 'It tells you whether you likely have one and why it matters. Flood Intelligence goes deeper, and the Expert Mitigation Plan turns it into a written fix.' },
      { q: 'Will you call me after I request one?', a: 'Only if you ask us to. The Snapshot is yours either way.' },
    ],
    cta: { label: 'Get my free Snapshot', snapshot: true },
  },
  {
    slug: 'flood-intelligence-report',
    name: 'Flood Intelligence',
    step: 'Step 2 · Deep dive',
    price: 'Full report',
    summary: 'The complete picture for your address, built by our analysis engine and organized so you can act on it.',
    metaTitle: 'Flood Intelligence Report for Houston Homes',
    metaDescription:
      'Flood Intelligence: flood and rainfall history around your block, how water moves across your lot, insurance and flood-zone context, and fixes ranked by impact.',
    headline: ['The complete picture', 'for your address.'],
    lede: 'Flood Intelligence goes past “do I have a problem?” to why — and what to do about it, ranked so you can act.',
    includes: [
      { title: 'Flood and rainfall history', body: 'What has happened around your block in past storms, organized so you can see the pattern.' },
      { title: 'How water moves across your lot', body: 'Where water enters, where it collects and where it could leave.' },
      { title: 'Insurance and flood-zone context', body: 'What your zone means for flood insurance and lender requirements, in plain language.' },
      { title: 'Fixes ranked by impact and effort', body: 'The changes that matter most for your property, in the order worth doing them.' },
    ],
    goodFor: [
      'Homes with standing water, foundation pooling or a flood history',
      'Buyers doing due diligence before closing',
      'Owners weighing a bigger drainage project',
      'Anyone who wants the reasoning, not just a rating',
    ],
    howItWorks: [
      { title: 'Order the report', body: 'Tell us the address and where to send it.' },
      { title: 'We build it from your address', body: 'Our analysis engine assembles the report in the same format for every address.' },
      { title: 'Act on it', body: 'Use the ranked fixes yourself, or book an Expert Mitigation Plan to turn them into a written plan.' },
    ],
    faqs: [
      { q: 'How is Flood Intelligence different from the Snapshot?', a: 'The Snapshot tells you whether you have a problem. Flood Intelligence tells you why, with flood and rainfall history near your block, how water moves across your lot, and a ranked list of fixes.' },
      { q: 'Does someone visit my property?', a: 'No. Flood Intelligence is built remotely from your address. If you want a specialist to look at specific problem spots, the Expert Mitigation Plan is a video call where you show us on your phone.' },
      { q: 'Is it the same format for every address?', a: 'Yes. Every report follows the same structure, so it’s easy to compare properties.' },
      { q: 'Can I use it to plan the work?', a: 'Yes. The ranked fixes are written to act on. If you want us to build them, we turn the plan into a fixed install scope.' },
    ],
    cta: { label: 'Order Flood Intelligence', book: 'intel' },
  },
  {
    slug: 'expert-mitigation-plan',
    name: 'Expert Mitigation Plan',
    step: 'Step 3 · Expert plan',
    price: '45-min call',
    summary: 'A mitigation specialist reviews your report and property with you over video, then leaves you a written plan.',
    metaTitle: 'Expert Mitigation Plan · Video Consultation',
    metaDescription:
      'A 45-minute video consultation with a Flood Mitigators specialist. Walk your property on your phone and get a prioritized, written drainage and mitigation plan.',
    headline: ['A specialist, your phone,', 'and a written plan.'],
    lede: 'A 45-minute video call with a mitigation specialist. You walk the problem areas on your phone; we leave you a prioritized, written plan.',
    includes: [
      { title: '45-minute virtual consultation', body: 'Time with a specialist to go through your report and your questions.' },
      { title: 'A property walk on your phone', body: 'Show us where water sits, where it comes from and what you’ve already tried.' },
      { title: 'A prioritized, written plan', body: 'What to do, in what order, and why — yours to keep.' },
      { title: 'Install scope if you want it', body: 'If you want us to build it, the plan becomes a fixed install scope for our crew.' },
    ],
    goodFor: [
      'Problems you can see but can’t explain',
      'Yards that need more than one fix working together',
      'Getting a clear plan before spending on installation',
      'Owners who want a second opinion on a quote',
    ],
    howItWorks: [
      { title: 'Book a time', body: 'Pick the consultation in the booking form and we’ll set up the call.' },
      { title: 'Walk the property together', body: 'On your phone, during the call. Rainy-day photos and video help a lot.' },
      { title: 'Get your plan', body: 'A written, prioritized plan follows the call. No site visit needed.' },
    ],
    faqs: [
      { q: 'Do I need a Flood Intelligence report first?', a: 'It helps, because the specialist reviews it with you, but you can book the consultation on its own.' },
      { q: 'What should I have ready for the call?', a: 'Your phone with a good connection outside, and any photos or video of the yard during or right after rain.' },
      { q: 'Do I have to use your crew for the work?', a: 'No. The plan is yours. If you want us to build it, we turn it into a fixed install scope and schedule the crew.' },
      { q: 'Is there a site visit?', a: 'No — the consultation is done entirely over video. Our crew comes out once you have a plan and want it installed.' },
    ],
    cta: { label: 'Book a consultation', book: 'expert' },
  },
];

export const reportPath = (r: Pick<Report, 'slug'>) => `/reports/${r.slug}/`;
