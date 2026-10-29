// Drainage Checkup options and the services each one points to (weights).

export type Symptom = { id: string; label: string; icon: string; weights: Record<string, number> };

export const symptoms: Symptom[] = [
  { id: 'standing-water', label: 'Standing water in the lawn after rain', icon: 'i-drop', weights: { 'french-drain-installation-houston': 3, 'grading-drainage-houston': 2, 'sump-pump-installation-houston': 1 } },
  { id: 'foundation', label: 'Water collecting against the foundation', icon: 'i-house', weights: { 'grading-drainage-houston': 3, 'downspout-catch-basin-houston': 2, 'french-drain-installation-houston': 2 } },
  { id: 'downspouts', label: 'Downspouts dump at the house or gutters overflow', icon: 'i-downspout', weights: { 'downspout-catch-basin-houston': 3, 'drain-cleaning-services-houston': 1 } },
  { id: 'neighbor', label: 'Water runs in from a neighbor’s yard', icon: 'i-grade', weights: { 'french-drain-installation-houston': 3, 'grading-drainage-houston': 2, 'dry-creek-bed-houston': 1 } },
  { id: 'patio', label: 'Water pools on the patio, driveway or by the garage', icon: 'i-channel', weights: { 'channel-drain-houston': 3, 'grading-drainage-houston': 2 } },
  { id: 'erosion', label: 'Soil or mulch washes out when it rains', icon: 'i-creek', weights: { 'dry-creek-bed-houston': 3, 'grading-drainage-houston': 2, 'french-drain-installation-houston': 1 } },
  { id: 'clogged', label: 'Existing yard drains are slow or clogged', icon: 'i-grate', weights: { 'drain-cleaning-services-houston': 3, 'hydro-jetting-services-houston': 2 } },
  { id: 'roots', label: 'A drain line keeps clogging (roots or silt)', icon: 'i-jet', weights: { 'hydro-jetting-services-houston': 3, 'drain-cleaning-services-houston': 1 } },
  { id: 'ditch-backup', label: 'Water backs up at the driveway ditch', icon: 'i-ring', weights: { 'culvert-cleaning-houston': 3, 'culvert-installation-houston': 2 } },
  { id: 'culvert-damaged', label: 'Driveway culvert is crushed, rusted or buried', icon: 'i-culvert', weights: { 'culvert-installation-houston': 3 } },
  { id: 'storm-inlets', label: 'Storm inlets or grates packed with debris', icon: 'i-storm', weights: { 'stormwater-cleaning-houston': 3, 'drain-cleaning-services-houston': 1 } },
  { id: 'pump', label: 'Sump pump failing or running nonstop', icon: 'i-pump', weights: { 'sump-pump-installation-houston': 3 } },
];
