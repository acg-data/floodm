// Percent positions on the edited, uncropped 2:1 house image.
// Routes are illustrative connections, not an engineered installation plan.
export const homeDrainageSpots = [
  {
    title: 'Roof runoff', x: 31.6, y: 29,
    problem: 'An overflowing gutter drops roof water beside the house instead of carrying it to a downspout.',
    solution: 'Check the gutter and downspout, then give the collected water a clear discharge route away from the slab.',
    href: '/downspout-catch-basin-houston/', link: 'Explore downspout drainage',
    route: 'M316 290 L340 495 Q340 540 400 550 L610 570 Q730 580 810 710 L920 825',
  },
  {
    title: 'Water at the foundation', x: 40.2, y: 54,
    problem: 'A downspout ending at the wall concentrates rainwater right beside the foundation.',
    solution: 'A solid drain line can carry roof runoff to a suitable outlet. We check the slope and discharge point in person.',
    href: '/downspout-catch-basin-houston/', link: 'See downspout solutions',
    route: 'M402 540 Q440 585 535 595 L710 650 Q820 700 920 825',
  },
  {
    title: 'Low spots in the lawn', x: 22.5, y: 79,
    problem: 'Water settles in a low area and leaves the lawn soggy long after the rain stops.',
    solution: 'Grading, a surface inlet or a French drain may help, depending on where the water starts and where it can leave.',
    href: '/french-drain-installation-houston/', link: 'Explore yard and French drains',
    route: 'M225 790 Q335 860 510 840 L745 825 L920 825',
  },
  {
    title: 'Water trapped in planting beds', x: 53, y: 57,
    problem: 'Bed edging and low soil can hold water against plants and along the house.',
    solution: 'Adjust the surface drainage and create a path out of the bed, with an inlet where the site calls for one.',
    href: '/grading-drainage-houston/', link: 'See grading and runoff solutions',
    route: 'M530 570 Q590 620 685 650 Q810 715 920 825',
  },
  {
    title: 'Pooling on the patio', x: 14.3, y: 44,
    problem: 'Rainwater stays on the paving instead of flowing away from the places you walk and gather.',
    solution: 'A channel drain or a change in grading can collect surface water and carry it toward an appropriate outlet.',
    href: '/channel-drain-houston/', link: 'Explore channel and surface drains',
    route: 'M143 440 Q190 525 285 555 Q340 570 375 625 L510 755 Q665 820 920 825',
  },
  {
    title: 'A blocked surface drain', x: 91, y: 64,
    problem: 'Leaves, mulch and sediment cover the inlet and slow the escape of water from the driveway.',
    solution: 'Clear the inlet and check the line and outlet. Cleaning or hydro jetting may restore flow if the blockage is deeper.',
    href: '/drain-cleaning-services-houston/', link: 'See drain cleaning and maintenance',
    route: 'M910 640 Q940 720 920 825',
  },
] as const;
