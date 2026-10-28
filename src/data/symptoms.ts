// Shared by the Drainage Checkup and the quote form, so a checkup result can
// pre-fill the form. Weights point each symptom at the services that fix it.

export type Symptom = {
  id: string;
  label: string;
  icon: string;
  weights: Record<string, number>;
};

export const symptoms: Symptom[] = [
  {
    id: 'standing-water',
    label: 'Standing water in the lawn after rain',
    icon: 'puddle',
    weights: { 'french-drain-installation-houston': 3, 'yard-drainage-houston': 2, 'sump-pump-installation-houston': 1 },
  },
  {
    id: 'foundation',
    label: 'Water collecting against the foundation',
    icon: 'foundation',
    weights: { 'yard-drainage-houston': 3, 'french-drain-installation-houston': 2 },
  },
  {
    id: 'flowerbeds',
    label: 'Flowerbeds flood or wash out',
    icon: 'erosion',
    weights: { 'yard-drainage-houston': 3, 'french-drain-installation-houston': 1 },
  },
  {
    id: 'downspouts',
    label: 'Downspouts dump at the house or gutters overflow',
    icon: 'gutter',
    weights: { 'yard-drainage-houston': 3, 'drain-cleaning-services-houston': 1 },
  },
  {
    id: 'neighbor',
    label: 'Water runs in from a neighbor’s yard',
    icon: 'rain',
    weights: { 'french-drain-installation-houston': 3, 'yard-drainage-houston': 2 },
  },
  {
    id: 'garage',
    label: 'Water creeps toward the garage, patio or doors',
    icon: 'garage',
    weights: { 'yard-drainage-houston': 3, 'french-drain-installation-houston': 2 },
  },
  {
    id: 'clogged',
    label: 'Existing yard drains are slow or clogged',
    icon: 'backup',
    weights: { 'drain-cleaning-services-houston': 3, 'hydro-jetting-services-houston': 2 },
  },
  {
    id: 'roots',
    label: 'A drain line keeps clogging (roots or silt)',
    icon: 'hydro-jet',
    weights: { 'hydro-jetting-services-houston': 3, 'drain-cleaning-services-houston': 1 },
  },
  {
    id: 'ditch-backup',
    label: 'Water backs up at the driveway ditch',
    icon: 'culvert',
    weights: { 'culvert-cleaning-houston': 3, 'culvert-installation-houston': 2 },
  },
  {
    id: 'culvert-damaged',
    label: 'Driveway culvert is crushed, rusted or buried',
    icon: 'culvert-cleaning',
    weights: { 'culvert-installation-houston': 3 },
  },
  {
    id: 'storm-inlets',
    label: 'Storm inlets or grates packed with debris',
    icon: 'stormwater',
    weights: { 'stormwater-cleaning-houston': 3, 'drain-cleaning-services-houston': 1 },
  },
  {
    id: 'pump',
    label: 'Sump pump failing or running nonstop',
    icon: 'sump-pump',
    weights: { 'sump-pump-installation-houston': 3 },
  },
];
