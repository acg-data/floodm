// Content shapes shared by the data files and the page templates.

export type Faq = { q: string; a: string };
export type Step = { title: string; body: string };

/** Photos in public/assets/img (width × height in px). */
export const photos = {
  'hero-house': { src: '/assets/img/hero-house.jpg', w: 449, h: 507, alt: 'Two-story stone house in a Houston neighborhood with a landscaped front yard' },
  'french-drain': { src: '/assets/source/drainage-system.webp', w: 960, h: 960, alt: 'Catch basin, drain pipe and trench from the Flood Mitigators project library' },
  'sump-pump': { src: '/assets/source/pump-excavation.webp', w: 680, h: 510, alt: 'Flood Mitigators crew excavating a pump basin' },
  grading: { src: '/assets/img/service-grading.jpg', w: 293, h: 116, alt: 'Regraded yard with a stone retaining edge and rock swale' },
  'downspout-catch-basin': { src: '/assets/img/service-downspout-catch-basin.jpg', w: 567, h: 338, alt: 'Downspout connected to a catch basin in a stone bed' },
  'surface-drain': { src: '/assets/img/service-surface-drain.jpg', w: 461, h: 217, alt: 'Square drain grate set into a lawn' },
  'dry-creek': { src: '/assets/img/service-dry-creek.jpg', w: 461, h: 217, alt: 'River-rock drainage channel beside a stone patio' },
  technician: { src: '/assets/img/technician.jpg', w: 444, h: 194, alt: 'Flood Mitigators technician inspecting a garden bed beside a stone house' },
  truck: { src: '/assets/source/van-in-action.webp', w: 1440, h: 1080, alt: 'Flood Mitigators service van at a residential property' },
  'root-rerouter': { src: '/assets/source/restored-lawn.webp', w: 680, h: 510, alt: 'Crew members working with turf and soil in a residential yard' },
  polo: { src: '/assets/img/crew-polo.jpg', w: 304, h: 252, alt: 'Navy Flood Mitigators crew polo shirt' },
} as const;
export type PhotoName = keyof typeof photos;

/** Cross-section diagrams drawn in src/components/Diagram.astro. */
export type DiagramName = 'french-drain' | 'sump-pump' | 'culvert' | 'yard' | 'hydro-jet' | 'grading' | 'downspout';

/** Icons in the sprite (src/components/Sprite.astro). */
export type ServiceIcon =
  | 'i-french'
  | 'i-pump'
  | 'i-grade'
  | 'i-downspout'
  | 'i-channel'
  | 'i-creek'
  | 'i-culvert'
  | 'i-grate'
  | 'i-storm'
  | 'i-ring'
  | 'i-jet';

export type Service = {
  /** URL is /{slug}/ */
  slug: string;
  /** Card and page name, sentence case: "Yard & French drains" */
  name: string;
  /** Short name for menus: "French drains" */
  navName: string;
  group: 'install' | 'maintain';
  icon: ServiceIcon;
  /** Card photo (and hero photo when there is no diagram). */
  photo?: PhotoName;
  /** Hero visual for the service page. */
  diagram?: DiagramName;
  /** ≤ 52 chars; the layout appends " | Flood Mitigators". */
  metaTitle: string;
  /** 120–160 chars. */
  metaDescription: string;
  /** Small caps label above the headline: "French drains · Houston, TX" */
  eyebrow: string;
  /** Two-line hero headline: first line ink, second line blue. */
  headline: [string, string];
  /** 1–2 sentences under the headline. */
  lede: string;
  /** One sentence for cards (≤ 110 chars). */
  summary: string;
  /** 2–3 paragraphs. */
  intro: string[];
  /** 5–7 short “signs you need this” items. */
  signs: string[];
  /** Exactly 4 points explaining how the system/service works. */
  howItWorks: Step[];
  /** 5–8 items. */
  included: string[];
  /** Exactly 3 steps. */
  process: [Step, Step, Step];
  /** 4–6 questions. */
  faqs: Faq[];
  /** 3 related service slugs. */
  related: string[];
};

export type Area = {
  /** URL is /service-areas/{slug}/ */
  slug: string;
  name: string;
  region: 'Inner Loop' | 'West Houston' | 'Southwest' | 'North' | 'Northeast' | 'South & Bay Area' | 'West & Fort Bend';
  county: string;
  /** Only waterways that are well established for the area. */
  waterways: string[];
  /** 120–160 chars. */
  metaDescription: string;
  /** 1–2 sentences. */
  lede: string;
  /** 2 paragraphs specific to this area. */
  local: string[];
  /** 4 yard-drainage issues worth watching for here. */
  issues: string[];
  /** 4 service slugs most relevant here. */
  services: string[];
  /** 3 nearby area slugs. */
  nearby: string[];
};

export type Report = {
  slug: string;
  name: string;
  step: string;
  price: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline: [string, string];
  lede: string;
  includes: Step[];
  goodFor: string[];
  howItWorks: Step[];
  faqs: Faq[];
  cta: { label: string; book?: 'intel' | 'expert'; snapshot?: boolean };
};
