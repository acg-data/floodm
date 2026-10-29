import type { Area } from './types';

// Houston-area communities with their own service-area page. Local notes stick
// to well-established geography; yard drainage handles water that falls on and
// runs across a lot — it does not stop bayou, street or reservoir flooding.

export const areas: Area[] = [
  {
    slug: 'memorial',
    name: 'Memorial',
    region: 'West Houston',
    county: 'Harris',
    waterways: ['Buffalo Bayou'],
    metaDescription:
      'Yard drainage and flood assessments for Memorial homes in west Houston. French drains, grading and downspout lines built for Buffalo Bayou-area lots.',
    lede: 'Big lots, mature trees and Buffalo Bayou running through the neighborhood. Memorial yards need drainage designed around all three.',
    local: [
      'Memorial sits along Buffalo Bayou, downstream of the Addicks and Barker reservoirs. During Harvey, water released from those reservoirs flooded homes along the bayou — a reminder that some flood risk here comes from the bayou itself, not from the yard. A free Flood Snapshot shows where an address sits relative to the bayou and its flood zones, so you know which kind of water you are dealing with.',
      'On the lot itself, the problems are usually quieter. Large live oaks and pines shade lawns that stay soggy, roots work into old drain lines, and decades of additions, pools and patios have changed how water leaves the property. Many homes have been rebuilt or raised on lots whose grading was never redesigned to match. We map how water actually moves across the yard today, then design drains and grading around it.',
    ],
    issues: [
      'Shaded lawns that stay wet for days after rain',
      'Tree roots clogging older drain and downspout lines',
      'Pools, patios and additions trapping water against the house',
      'Rebuilt homes sitting on grading that no longer fits the lot',
    ],
    services: ['french-drain-installation-houston', 'grading-drainage-houston', 'downspout-catch-basin-houston', 'hydro-jetting-services-houston'],
    nearby: ['energy-corridor', 'spring-branch', 'river-oaks'],
  },
  {
    slug: 'energy-corridor',
    name: 'Energy Corridor',
    region: 'West Houston',
    county: 'Harris',
    waterways: ['Buffalo Bayou', 'Addicks Reservoir', 'Barker Reservoir'],
    metaDescription:
      'Flood assessments and yard drainage for Energy Corridor homes in west Houston, next to Addicks and Barker reservoirs and Buffalo Bayou.',
    lede: 'Homes here sit beside Addicks and Barker reservoirs and Buffalo Bayou. Knowing your address’s flood context comes first; then we fix the water on your lot.',
    local: [
      'The Energy Corridor borders the Addicks and Barker reservoirs, with Buffalo Bayou running east toward downtown. In Harvey, homes here flooded as the reservoirs filled and as water was released downstream. That kind of flooding is a regional problem that yard drainage can’t solve, and we will say so plainly. A free Flood Snapshot lays out your address’s flood zone, nearby waterways and how your lot sits relative to the street.',
      'What drainage can fix is the everyday water: rain that ponds in flat backyards, side yards that never dry out, and downspouts that dump right at the slab. Many neighborhoods here are built on very flat ground with heavy clay, so water needs a deliberate path to the street. We design that path — French drains, catch basins, regrading or a pump where gravity can’t do it.',
    ],
    issues: [
      'Flat backyards where water has nowhere to run',
      'Side yards that stay muddy between houses',
      'Downspouts discharging at the foundation',
      'Low spots that sit below the street or curb',
    ],
    services: ['french-drain-installation-houston', 'sump-pump-installation-houston', 'downspout-catch-basin-houston', 'grading-drainage-houston'],
    nearby: ['memorial', 'katy', 'spring-branch'],
  },
  {
    slug: 'spring-branch',
    name: 'Spring Branch',
    region: 'West Houston',
    county: 'Harris',
    waterways: ['Buffalo Bayou (downstream)'],
    metaDescription:
      'Yard drainage, culvert work and French drains for Spring Branch homes in Houston, from older ranch lots to new builds on open-ditch streets.',
    lede: 'Older ranch homes, new builds squeezed onto the same lots, and streets with open ditches. Spring Branch drainage takes a little of everything.',
    local: [
      'Spring Branch drains south toward Buffalo Bayou, and parts of it still have streets with open roadside ditches instead of curb and gutter. On those streets, the culvert under your driveway is part of the drainage system: when it silts up, sinks or was set at the wrong grade, water backs up into the front yard. Cleaning or resetting that culvert is often the first fix.',
      'The neighborhood is also changing fast. Two-story new builds now sit next to 1950s and ’60s ranch homes, and a taller house with more roof and more paving sends more water toward its neighbors. If your yard started flooding after the lot next door was rebuilt, an intercepting French drain or swale along the property line is usually the answer.',
    ],
    issues: [
      'Silted or crushed driveway culverts on open-ditch streets',
      'New construction next door sending runoff into your yard',
      'Older lots with little or no slope toward the street',
      'Downspouts and patios draining toward the slab',
    ],
    services: ['culvert-cleaning-houston', 'culvert-installation-houston', 'french-drain-installation-houston', 'grading-drainage-houston'],
    nearby: ['memorial', 'the-heights', 'energy-corridor'],
  },
  {
    slug: 'river-oaks',
    name: 'River Oaks',
    region: 'Inner Loop',
    county: 'Harris',
    waterways: ['Buffalo Bayou'],
    metaDescription:
      'Discreet, well-designed yard drainage for River Oaks homes in Houston: French drains, downspout lines and dry creek beds for mature, landscaped lots.',
    lede: 'Established lots, mature oaks and serious landscaping. River Oaks drainage has to work hard and stay out of sight.',
    local: [
      'River Oaks sits just south of Buffalo Bayou, on some of the oldest and most heavily landscaped lots in the city. Mature oaks shade the ground and send roots through old clay and cast-iron drain lines, and generations of beds, hardscape and additions have rerouted where water goes. Problems often show up as beds that stay waterlogged or water that collects along the foundation behind the plantings.',
      'Homeowners here usually want drainage that disappears into the landscape. We route downspouts underground, set channel drains into patios and drives, and use dry creek beds that look like part of the garden design. Each plan is worked out around root zones and existing beds so the fix protects the trees and the landscaping instead of tearing them out.',
    ],
    issues: [
      'Root intrusion in older drain and downspout lines',
      'Planting beds that hold water against the foundation',
      'Patios and drives that pitch toward the house',
      'Drainage that needs to stay hidden in finished landscaping',
    ],
    services: ['downspout-catch-basin-houston', 'channel-drain-houston', 'dry-creek-bed-houston', 'hydro-jetting-services-houston'],
    nearby: ['memorial', 'the-heights', 'west-university-place'],
  },
  {
    slug: 'the-heights',
    name: 'The Heights',
    region: 'Inner Loop',
    county: 'Harris',
    waterways: ['White Oak Bayou'],
    metaDescription:
      'Yard and foundation drainage for Houston Heights homes: pier-and-beam and slab houses, narrow lots and White Oak Bayou-area flood context.',
    lede: 'Narrow lots, raised bungalows next to new slab builds, and White Oak Bayou close by. Heights drainage is a puzzle of tight spaces.',
    local: [
      'The Heights sits near White Oak Bayou, and its mix of houses makes drainage unusual. Raised pier-and-beam bungalows stand next to new slab-on-grade builds, and water that pools under an older house behaves differently from water pressing against a slab. Narrow lots leave little room for slope, so side yards often turn into channels that carry everything from the roof and the neighbors toward the back.',
      'The fixes have to fit tight spaces: compact channel drains along side yards, downspout lines tied into a shared outlet, and careful regrading so water moves away from crawlspaces and slabs alike. Your Flood Snapshot covers the bayou and flood-zone side of things; our plan handles the water that lands on and crosses your lot.',
    ],
    issues: [
      'Water collecting under raised pier-and-beam homes',
      'Narrow side yards that funnel runoff',
      'New builds next door changing how water drains',
      'Little room for slope between house and property line',
    ],
    services: ['channel-drain-houston', 'french-drain-installation-houston', 'downspout-catch-basin-houston', 'grading-drainage-houston'],
    nearby: ['river-oaks', 'spring-branch', 'memorial'],
  },
  {
    slug: 'bellaire',
    name: 'Bellaire',
    region: 'Southwest',
    county: 'Harris',
    waterways: ['Brays Bayou watershed'],
    metaDescription:
      'Flood assessments and yard drainage for Bellaire homes near Houston, in the Brays Bayou watershed. French drains, pumps and downspout systems.',
    lede: 'Bellaire is in the Brays Bayou watershed, and many homes have been rebuilt or raised. The yard drainage has to catch up.',
    local: [
      'Bellaire lies in the Brays Bayou watershed, where repeated floods in the last decade led many owners to rebuild, raise or replace their homes. A raised or rebuilt house changes everything around it: new slab heights, new patios and bigger roofs all shift where water goes, and the original yard grading rarely matches. The Flood Snapshot gives you the watershed and flood-zone context for your address before you spend a dollar on fixes.',
      'On the lot, we often find yards that now drain toward the house, new downspouts tied into nothing, and low backyards that sit below the street, where only a pump can move the water out. We design those pieces together so roof, patio and lawn water all leave the property by a reliable route.',
    ],
    issues: [
      'Rebuilt or raised homes on grading that no longer fits',
      'Backyards lower than the street or curb',
      'Downspouts dumping onto patios and beds',
      'Neighboring lots draining onto yours after rebuilding',
    ],
    services: ['sump-pump-installation-houston', 'french-drain-installation-houston', 'downspout-catch-basin-houston', 'grading-drainage-houston'],
    nearby: ['west-university-place', 'meyerland', 'river-oaks'],
  },
  {
    slug: 'west-university-place',
    name: 'West University Place',
    region: 'Southwest',
    county: 'Harris',
    waterways: ['Brays Bayou watershed'],
    metaDescription:
      'Yard drainage for West University Place homes in Houston: tight lots, large new builds and Brays Bayou watershed context. French drains and more.',
    lede: 'Big houses on small lots leave very little ground to absorb rain. In West U, almost every gallon needs a pipe.',
    local: [
      'West University Place is in the Brays Bayou watershed and is known for large homes replacing original cottages on compact lots. More roof and more paving on the same footprint means far less soil to soak up rain, and the clay underneath doesn’t take much anyway. Side yards between two-story homes often stay wet, and backyards with pools and patios have little lawn left to spread water out.',
      'Because space is tight, good drainage here is mostly underground: downspouts piped to the curb, catch basins in low corners, and channel drains across patios and driveways. Where a backyard sits too low for gravity, a sump system lifts water out. We design the whole system at once so each piece has a reliable outlet.',
    ],
    issues: [
      'Large roofs on small lots producing heavy runoff',
      'Wet, shaded side yards between two-story homes',
      'Pool decks and patios with nowhere to drain',
      'Backyards sitting lower than the street',
    ],
    services: ['downspout-catch-basin-houston', 'channel-drain-houston', 'sump-pump-installation-houston', 'french-drain-installation-houston'],
    nearby: ['bellaire', 'river-oaks', 'meyerland'],
  },
  {
    slug: 'meyerland',
    name: 'Meyerland',
    region: 'Southwest',
    county: 'Harris',
    waterways: ['Brays Bayou'],
    metaDescription:
      'Flood assessments and yard drainage for Meyerland homes in Houston, along Brays Bayou. Know your flood context, then fix the water on your lot.',
    lede: 'Meyerland sits along Brays Bayou and flooded in 2015, 2016 and 2017. Start with a clear picture of your address, then fix what your lot can control.',
    local: [
      'Few Houston neighborhoods know flooding like Meyerland. Along Brays Bayou, homes here flooded in 2015, again in 2016 and again during Harvey in 2017, and many have since been raised, rebuilt or sold. That history makes it important to separate two kinds of water: bayou and street flooding, which is a regional problem, and rain that falls on and runs across your lot. The free Flood Snapshot lays out your address’s flood zone and position relative to the bayou.',
      'Yard drainage handles the second kind. Raised homes often leave the surrounding yard lower than ever, with new stairs, patios and downspouts that send water where it never used to go. We design drainage around the house you have now, so everyday storms move off the property instead of sitting against it.',
    ],
    issues: [
      'Raised homes with yards and patios left at the old grade',
      'Low backyards that hold water after every storm',
      'Downspouts and stairs directing water toward the slab',
      'Confusion between bayou flooding and lot drainage',
    ],
    services: ['sump-pump-installation-houston', 'grading-drainage-houston', 'french-drain-installation-houston', 'downspout-catch-basin-houston'],
    nearby: ['bellaire', 'west-university-place', 'river-oaks'],
  },
  {
    slug: 'katy',
    name: 'Katy',
    region: 'West & Fort Bend',
    county: 'Harris, Fort Bend & Waller',
    waterways: ['Barker Reservoir (nearby)'],
    metaDescription:
      'Yard drainage for Katy and Cinco Ranch homes west of Houston: builder-graded lots, tight side yards and Barker Reservoir flood context.',
    lede: 'Newer subdivisions, builder grading and tight side yards, with parts of the area near the Barker Reservoir flood pool.',
    local: [
      'Parts of the Katy area, including sections of Cinco Ranch, sit in or near the Barker Reservoir flood pool, which flooded during Harvey. That is reservoir flooding, and yard drainage won’t stop it. A free Flood Snapshot shows where your address sits relative to the reservoir and FEMA flood zones, so you know your real risk before deciding what to fix.',
      'Most Katy drainage calls are about the lot itself. Newer subdivisions were graded quickly by builders, sod settles, and narrow side yards between slab-on-grade homes become rivers in a heavy rain. Add a patio extension or a pool and the original swales often stop working. We restore the slope, tie downspouts into buried lines and add French drains or channel drains where the builder’s plan falls short — within any HOA rules that apply.',
    ],
    issues: [
      'Builder grading that settled or was changed by patios and pools',
      'Narrow side yards that flood between homes',
      'Downspouts discharging into flowerbeds at the slab',
      'Driveway culverts silting up on streets with open ditches',
    ],
    services: ['grading-drainage-houston', 'french-drain-installation-houston', 'downspout-catch-basin-houston', 'culvert-cleaning-houston'],
    nearby: ['energy-corridor', 'sugar-land', 'cypress'],
  },
  {
    slug: 'sugar-land',
    name: 'Sugar Land',
    region: 'West & Fort Bend',
    county: 'Fort Bend',
    waterways: ['Brazos River', 'Oyster Creek'],
    metaDescription:
      'Yard drainage for Sugar Land homes southwest of Houston. Levees protect much of the city; your lot still needs water to drain away from the house.',
    lede: 'Levee districts protect much of Sugar Land from the Brazos. The water in your backyard is still your lot’s job.',
    local: [
      'Sugar Land sits along the Brazos River and Oyster Creek, and much of the city is protected by levee improvement districts that manage river and creek water. That protection is regional. It doesn’t change how rain moves across your own yard, and a lot with poor grading will still pond, wash out beds and send water toward the slab. The Flood Snapshot summarizes your address’s flood-zone context alongside the lot-level picture.',
      'Many Sugar Land homes are in master-planned communities with established landscaping, mature trees and HOA standards. Drainage here tends to mean tidy, well-hidden fixes: buried downspout lines, catch basins in low corners, dry creek beds that read as landscaping, and regrading where beds and lawns have built up against the house over the years.',
    ],
    issues: [
      'Beds and mulch built up against the foundation over time',
      'Downspouts splashing onto walks and beds',
      'Low corners of backyards that pond after storms',
      'Drainage that needs to meet HOA appearance standards',
    ],
    services: ['downspout-catch-basin-houston', 'dry-creek-bed-houston', 'grading-drainage-houston', 'french-drain-installation-houston'],
    nearby: ['katy', 'meyerland', 'pearland'],
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    region: 'North',
    county: 'Harris',
    waterways: ['Cypress Creek', 'Little Cypress Creek'],
    metaDescription:
      'Yard drainage and culvert work for Cypress homes northwest of Houston, near Cypress Creek. French drains, grading, culverts and catch basins.',
    lede: 'Fast-growing subdivisions near Cypress Creek and Little Cypress Creek, with flat lots and plenty of open ditches.',
    local: [
      'Cypress is named for Cypress Creek, and Little Cypress Creek runs through the area too. The creeks carry regional flood risk that yard drainage can’t change, so the Flood Snapshot starts by showing where your address sits relative to the creeks and FEMA flood zones. From there, the work is about the water your lot handles every storm.',
      'Much of Cypress is newer construction on very flat ground. Builder grading settles, sod sinks along foundations and fences, and backyards with little fall hold water for days. On streets with open ditches, a driveway culvert that has silted up or was set too high can back water into the front yard. We correct grades, add French drains and catch basins, and clean or reset culverts so water keeps moving.',
    ],
    issues: [
      'Flat backyards that hold water for days',
      'Settled builder grading along foundations and fences',
      'Silted or undersized driveway culverts on open-ditch streets',
      'Gutters and downspouts overflowing in heavy rain',
    ],
    services: ['french-drain-installation-houston', 'grading-drainage-houston', 'culvert-installation-houston', 'culvert-cleaning-houston'],
    nearby: ['spring', 'katy', 'the-woodlands'],
  },
  {
    slug: 'spring',
    name: 'Spring',
    region: 'North',
    county: 'Harris',
    waterways: ['Spring Creek', 'Cypress Creek'],
    metaDescription:
      'Yard drainage, culvert cleaning and French drains for Spring homes north of Houston, between Cypress Creek and Spring Creek.',
    lede: 'Between Cypress Creek and Spring Creek, with wooded lots, older subdivisions and streets with open ditches.',
    local: [
      'Spring sits between Cypress Creek and Spring Creek. Like the rest of north Harris County, creek flooding is a regional issue, and your Flood Snapshot shows where your address stands relative to both creeks and their flood zones. Yard drainage takes care of the rain that falls on your property and the runoff that crosses it.',
      'The area mixes older subdivisions under tall pines with newer communities, and many streets still drain to open roadside ditches. Pine needles and leaves fill catch basins and gutters fast, roots find their way into drain lines, and culverts under driveways silt up. Regular cleaning, hydro jetting and properly set culverts keep the system working, and French drains handle the wet spots that never dry.',
    ],
    issues: [
      'Pine needles and leaves clogging gutters and catch basins',
      'Roots growing into yard drain lines',
      'Driveway culverts silting up on streets with open ditches',
      'Wet, shaded yards under heavy tree cover',
    ],
    services: ['drain-cleaning-services-houston', 'culvert-cleaning-houston', 'french-drain-installation-houston', 'hydro-jetting-services-houston'],
    nearby: ['cypress', 'the-woodlands', 'kingwood'],
  },
  {
    slug: 'the-woodlands',
    name: 'The Woodlands',
    region: 'North',
    county: 'Montgomery',
    waterways: ['Spring Creek'],
    metaDescription:
      'Yard drainage for The Woodlands homes north of Houston: wooded lots, root-clogged lines and runoff. French drains, dry creek beds and line cleaning.',
    lede: 'Wooded lots and natural landscaping, with Spring Creek along the southern edge. Drainage has to work with the trees, not against them.',
    local: [
      'The Woodlands was planned around its forest, and Spring Creek runs along its southern edge. Creek flooding is regional, and your Flood Snapshot covers that context for your address. On the lot, the forest is what shapes drainage: heavy shade keeps soil wet, leaf litter and pine needles fill gutters and grates, and roots push into anything buried.',
      'Homeowners here often prefer fixes that look natural. Dry creek beds can carry runoff through wooded yards in a way that fits the setting, and French drains routed around root zones handle wet areas without damaging trees. Existing lines that have slowed down usually respond well to cleaning or hydro jetting before anything needs to be dug up.',
    ],
    issues: [
      'Leaf litter and pine needles clogging gutters and grates',
      'Roots slowing or blocking buried drain lines',
      'Shaded areas where soil never dries out',
      'Runoff cutting channels through wooded yards',
    ],
    services: ['dry-creek-bed-houston', 'french-drain-installation-houston', 'hydro-jetting-services-houston', 'drain-cleaning-services-houston'],
    nearby: ['spring', 'cypress', 'kingwood'],
  },
  {
    slug: 'kingwood',
    name: 'Kingwood',
    region: 'Northeast',
    county: 'Harris',
    waterways: ['San Jacinto River (West Fork)', 'Lake Houston'],
    metaDescription:
      'Flood assessments and yard drainage for Kingwood homes in northeast Houston, near Lake Houston and the San Jacinto River. French drains and more.',
    lede: 'Kingwood sits along the West Fork of the San Jacinto River and Lake Houston. Harvey made flood risk here impossible to ignore.',
    local: [
      'Kingwood lies along the West Fork of the San Jacinto River and Lake Houston, and Harvey flooded thousands of homes and businesses here. River and lake flooding is a regional problem that no yard drain will stop, so the first step is understanding your address: the Flood Snapshot shows your flood zone and how your lot sits relative to the street and nearby water.',
      'Day to day, Kingwood’s wooded lots bring their own drainage problems. Heavy tree cover keeps yards damp, roots invade buried lines, and leaves fill gutters and catch basins every fall. Some streets drain to open ditches with culverts under each driveway. We clear and jet existing lines, reset or clean culverts, and add French drains and grading where water lingers near the house.',
    ],
    issues: [
      'Shaded, wooded yards that stay wet',
      'Roots and leaves clogging drain lines and gutters',
      'Culverts under driveways on streets with open ditches',
      'Uncertainty about river versus lot flooding risk',
    ],
    services: ['french-drain-installation-houston', 'hydro-jetting-services-houston', 'culvert-cleaning-houston', 'grading-drainage-houston'],
    nearby: ['the-woodlands', 'spring', 'cypress'],
  },
  {
    slug: 'pearland',
    name: 'Pearland',
    region: 'South & Bay Area',
    county: 'Brazoria',
    waterways: ['Clear Creek'],
    metaDescription:
      'Yard drainage for Pearland homes south of Houston, near Clear Creek. French drains, grading, culverts and downspout systems for flat, clay lots.',
    lede: 'Flat land, heavy clay and Clear Creek running through. Pearland yards need a clear path for water to leave.',
    local: [
      'Clear Creek runs through Pearland, and the surrounding land is some of the flattest in the region. Creek flooding is a regional issue, and your Flood Snapshot shows where your address sits relative to Clear Creek and its flood zones. For everything that happens on the lot, the main challenge is simple: with so little natural slope, rain has nowhere to go unless the yard is built to move it.',
      'Many Pearland homes are in newer subdivisions with builder grading that settles over time, while older areas and acreage lots may drain to open roadside ditches with driveway culverts. We regrade yards, add French drains and catch basins, pipe downspouts to a proper outlet, and clean or reset culverts so the water you do get moves off the property quickly.',
    ],
    issues: [
      'Very flat yards with little natural fall',
      'Settled builder grading near foundations',
      'Driveway culverts silting up on streets with open ditches',
      'Downspouts dumping into beds along the slab',
    ],
    services: ['grading-drainage-houston', 'french-drain-installation-houston', 'downspout-catch-basin-houston', 'culvert-cleaning-houston'],
    nearby: ['friendswood', 'clear-lake', 'sugar-land'],
  },
  {
    slug: 'friendswood',
    name: 'Friendswood',
    region: 'South & Bay Area',
    county: 'Galveston & Harris',
    waterways: ['Clear Creek'],
    metaDescription:
      'Yard drainage and flood assessments for Friendswood homes south of Houston, along Clear Creek. French drains, pumps, grading and culvert work.',
    lede: 'Clear Creek winds through Friendswood. Know your address’s flood context, then give the water on your lot a way out.',
    local: [
      'Friendswood sits along Clear Creek, and creek flooding is a regional risk that yard drainage can’t control. The free Flood Snapshot gives you your address’s flood zone and position relative to the creek, which helps you separate creek risk from the drainage problems you can actually fix.',
      'Those fixable problems are familiar here: mature trees and large lots in established neighborhoods, newer subdivisions with flat builder grading, and some streets with open ditches and driveway culverts. Backyards that sit lower than the street may need a sump system to move water out, while beds and side yards usually respond to regrading, buried downspout lines and French drains.',
    ],
    issues: [
      'Backyards that sit lower than the street or curb',
      'Mature trees shading lawns and rooting into lines',
      'Driveway culverts on streets with open ditches',
      'Flat builder grading in newer subdivisions',
    ],
    services: ['sump-pump-installation-houston', 'french-drain-installation-houston', 'grading-drainage-houston', 'culvert-cleaning-houston'],
    nearby: ['pearland', 'clear-lake', 'sugar-land'],
  },
  {
    slug: 'clear-lake',
    name: 'Clear Lake',
    region: 'South & Bay Area',
    county: 'Harris',
    waterways: ['Clear Creek', 'Armand Bayou', 'Clear Lake'],
    metaDescription:
      'Yard drainage for Clear Lake homes in southeast Houston near Clear Creek, Armand Bayou and Galveston Bay. Grading, French drains and more.',
    lede: 'Clear Creek, Armand Bayou and the lake itself, close to Galveston Bay. Low, flat ground makes every inch of slope count.',
    local: [
      'Clear Lake sits where Clear Creek and Armand Bayou meet the lake near Galveston Bay. Low elevation and nearby water bring regional and coastal flood risk that yard drainage doesn’t address, and the Flood Snapshot shows your address’s FEMA flood zone and nearby waterways so you can see that side clearly.',
      'On the lot, the ground here is low and flat, and many neighborhoods date back decades, with mature trees and older drain lines. Water that can’t fall to the street sits in lawns and beds, and old lines lose capacity to roots and silt. We clean and jet existing systems, correct grading, and add French drains or a pump where a low yard has no gravity outlet.',
    ],
    issues: [
      'Low, flat lots with little room for slope',
      'Older drain lines slowed by roots and silt',
      'Yards that sit below the street with no gravity outlet',
      'Beds and lawns holding water near the foundation',
    ],
    services: ['grading-drainage-houston', 'sump-pump-installation-houston', 'hydro-jetting-services-houston', 'french-drain-installation-houston'],
    nearby: ['friendswood', 'pearland', 'sugar-land'],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
export const areaPath = (a: Pick<Area, 'slug'>) => `/service-areas/${a.slug}/`;
export const regions = [...new Set(areas.map((a) => a.region))];
