// Coverage groups use the existing service-area records; no additional offices
// or service areas are implied. Local context: Harris County Flood Control
// District, https://www.hcfcd.org/About/Flooding-and-Floodplains/Drainage-Network
export const houstonCoverage = [
  {
    name: 'Houston neighborhoods',
    description: 'Drainage around established homes, mature trees, patios and changing lot grades.',
    slugs: ['memorial', 'river-oaks', 'the-heights', 'bellaire', 'west-university-place', 'meyerland'],
  },
  {
    name: 'West Houston & Katy',
    description: 'From open-ditch streets to subdivision yards, start with a clear path for water to leave.',
    slugs: ['energy-corridor', 'spring-branch', 'katy'],
  },
  {
    name: 'North & northeast Houston',
    description: 'Find your community for local drainage concerns and the services that may help.',
    slugs: ['cypress', 'spring', 'the-woodlands', 'kingwood'],
  },
  {
    name: 'Southwest & south Houston',
    description: 'Plan for roof runoff, soggy side yards and water collecting near the slab.',
    slugs: ['sugar-land', 'pearland', 'friendswood', 'clear-lake'],
  },
] as const;

// Additional coverage listed on the current business contact page.
export const additionalCoverage = [
  "Jersey Village",
  "Hunters Creek Village",
  "Montrose",
  "Richmond",
  "Rosenberg",
  "Memorial Villages",
  "Bunker Hill Village",
  "Carlton Woods",
  "Southside Place",
  "Tanglewood",
  "Southampton",
  "Spring Valley Village",
  "Memorial Park",
  "Braeswood Place",
  "Frostwood",
  "Highland Village",
  "Southgate",
  "Upper Kirby",
  "Lakes of Parkway",
  "Briargrove",
  "Magnolia",
  "Tomball",
  "Cinco Ranch",
  "Royal Oaks",
  "Afton Oaks",
  "Greenway",
  "Timbergrove",
  "Westchase",
  "Museum District",
  "Lazybrook",
  "Texas Medical Center",
  "Oak Forest",
  "Garden Oaks",
  "Rice Village",
  "Klein",
  "Nottingham Country",
  "Washington Avenue"
] as const;
