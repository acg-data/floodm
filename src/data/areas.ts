// Communities listed on the service-area page and in structured data.
// The business serves Greater Houston — add or remove names freely.

export const areaGroups: { region: string; places: string[] }[] = [
  {
    region: 'Inner Loop & Central',
    places: ['River Oaks', 'The Heights', 'Montrose', 'Upper Kirby', 'Rice Military', 'Garden Oaks', 'Oak Forest'],
  },
  {
    region: 'West Houston',
    places: ['Memorial', 'Spring Branch', 'Energy Corridor', 'Westchase', 'Briar Forest', 'Tanglewood', 'Hunters Creek Village', 'Piney Point Village'],
  },
  {
    region: 'Southwest',
    places: ['Bellaire', 'West University Place', 'Meyerland', 'Braeswood', 'Sharpstown', 'Missouri City', 'Sugar Land'],
  },
  {
    region: 'North & Northwest',
    places: ['Cypress', 'Jersey Village', 'Tomball', 'Spring', 'The Woodlands', 'Kingwood', 'Humble'],
  },
  {
    region: 'South & Southeast',
    places: ['Pearland', 'Friendswood', 'Clear Lake', 'League City', 'Pasadena'],
  },
  {
    region: 'Far West',
    places: ['Katy', 'Cinco Ranch', 'Fulshear', 'Richmond'],
  },
];

export const allAreas = areaGroups.flatMap((g) => g.places);
