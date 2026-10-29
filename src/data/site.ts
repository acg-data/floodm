// Business facts used across every page, the footer and the structured data.

export const site = {
  name: 'Flood Mitigators',
  url: 'https://floodmitigators.com',
  description:
    'Family-owned yard drainage and flood mitigation for Houston homes. French drains, grading, downspout lines, cleaning and property assessments from Manny’s local team.',
  phone: { display: '(281) 849-1082', href: 'tel:+12818491082', e164: '+12818491082' },
  sms: 'sms:+12818491082',
  email: 'info@floodmitigators.com',
  city: 'Houston',
  region: 'TX',
  address: { street: '8614 Pagewood Ln', city: 'Houston', region: 'TX', postalCode: '77063' },
  hours: { label: 'Mon–Fri, 6 am–6 pm CT', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '18:00' },
  emergency: '24/7 emergency response',
  warranty: '3-year parts & labor limited warranty',
  social: {
    facebook: 'https://www.facebook.com/floodmitigators/',
    instagram: 'https://www.instagram.com/floodmitigators/',
  },
  owner: { name: 'Manny', role: 'Owner & Founder', photo: '/assets/source/manny-placeholder.webp', photoIsPlaceholder: true },
  booking: 'https://schedule.floodmitigators.com',
  maintenance: 'Two maintenance visits per year with new-system support',
  /**
   * Where form submissions go: any URL that accepts a JSON POST (Formspree,
   * a Supabase Edge Function, a Cloudflare Pages Function…). Leave empty and
   * forms open the visitor's email app addressed to `email` instead.
   */
  leadEndpoint: (import.meta.env.PUBLIC_LEAD_ENDPOINT as string | undefined) ?? '',
} as const;
