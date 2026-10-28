// Single source of truth for business facts. Every page, the footer, the
// structured data and the quote form read from here — change a fact once.

export const site = {
  name: 'Flood Mitigators',
  legalName: 'Flood Mitigators',
  url: 'https://floodmitigators.com',
  tagline: "Houston's #1 yard drainage & flood mitigation team",
  description:
    'Family-owned Houston drainage contractor. French drains, sump pumps, culverts, drain and stormwater cleaning, and hydro jetting — designed for Houston clay and Houston storms, backed by a 3-year parts & labor limited warranty.',

  phone: {
    display: '(281) 849-1082',
    href: 'tel:+12818491082',
    e164: '+12818491082',
  },
  sms: 'sms:+12818491082',
  email: 'info@floodmitigators.com',

  address: {
    street: '8614 Pagewood Ln',
    city: 'Houston',
    region: 'TX',
    postalCode: '77063',
    country: 'US',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Flood+Mitigators+8614+Pagewood+Ln+Houston+TX+77063',
  },
  serviceAreaLabel: 'Greater Houston & surrounding communities',

  hours: {
    label: 'Mon–Fri, 6 am – 6 pm CT',
    emergency: '24/7 emergency response',
    // schema.org openingHoursSpecification
    spec: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '18:00' }],
  },

  warranty: {
    short: '3-Year Warranty',
    long: '3-year parts & labor limited warranty',
  },

  founded: {
    year: 2017,
    story: 'Founded in the wake of Hurricane Harvey',
  },

  social: {
    facebook: 'https://www.facebook.com/floodmitigators/',
    instagram: 'https://www.instagram.com/floodmitigators/',
  },

  // Owner profile. `photo` is a path under /public (e.g. '/images/manny.jpg');
  // leave it null and the site renders a monogram portrait instead.
  owner: {
    name: 'Manny',
    fullName: 'Manny',
    role: 'Owner & Founder',
    photo: null as string | null,
  },

  // Optional: a form-handling endpoint (Formspree, Web3Forms, a Cloudflare
  // Pages Function…). When empty, the quote form opens a pre-filled email to
  // `email` instead, so leads are never lost.
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
} as const;

export type Site = typeof site;
