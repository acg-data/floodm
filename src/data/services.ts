// Service catalogue. Slugs keep the URLs the current floodmitigators.com
// already ranks for, so search traffic carries over to the new site.

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string;
  /** How the service reads mid-sentence: “Signs you need French drains”. */
  noun: string;
  group: 'install' | 'maintain';
  icon: IconName;
  diagram: DiagramName;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  intro: string[];
  signs: string[];
  process: { title: string; body: string }[];
  included: string[];
  faqs: Faq[];
  related: string[];
};

export type IconName =
  | 'french-drain'
  | 'sump-pump'
  | 'culvert'
  | 'yard'
  | 'drain-cleaning'
  | 'stormwater'
  | 'culvert-cleaning'
  | 'hydro-jet';

export type DiagramName = 'french-drain' | 'sump-pump' | 'culvert' | 'yard' | 'hydro-jet';

export const services: Service[] = [
  {
    slug: 'french-drain-installation-houston',
    name: 'French Drain Installation',
    short: 'French Drains',
    noun: 'French drains',
    group: 'install',
    icon: 'french-drain',
    diagram: 'french-drain',
    metaTitle: 'French Drain Installation in Houston, TX',
    metaDescription:
      'Custom French drain systems for Houston yards and foundations. Site evaluation, itemized proposal, clean installation and a 3-year parts & labor limited warranty.',
    headline: 'French drains engineered for Houston clay',
    summary:
      'A gravel-and-perforated-pipe trench that collects surface and groundwater and carries it away from your lawn, beds and foundation.',
    intro: [
      "Houston's dense clay soil barely absorbs water, and much of the city is close to flat. After a heavy storm, water that has nowhere to go sits in the lawn, soaks the flowerbeds and pushes against the slab.",
      'A French drain gives that water a path. We design each system around how water actually moves across your property — where it collects, where it enters, and the best place to release it — then build it to carry the volume a Houston downpour delivers.',
    ],
    signs: [
      'Standing water in the lawn a day or more after rain',
      'Soggy, spongy turf or dying grass in the same spots',
      'Water collecting against the foundation or slab',
      'Mulch and soil washing out of flowerbeds',
      'Mosquitoes breeding in low areas',
      'Water creeping toward the garage or patio door',
    ],
    process: [
      { title: 'Map the water', body: 'We walk the property (or review photos and video virtually) to find where water pools, where it enters, and the best discharge point.' },
      { title: 'Design the run', body: 'Trench path, depth, slope, pipe size and outlet are designed for your lot and laid out in an itemized proposal with a timeline.' },
      { title: 'Build it right', body: 'Trench graded to fall, lined with filter fabric, bedded in washed gravel with perforated pipe, then tied into a pop-up emitter, curb outlet or sump.' },
      { title: 'Restore and test', body: 'We backfill, restore the surface, flow-test the system with water and walk you through it before we leave.' },
    ],
    included: [
      'Property drainage assessment',
      'Custom route and slope design',
      'Filter fabric, washed gravel and perforated pipe',
      'Catch basins and downspout tie-ins where needed',
      'Outlet to curb, pop-up emitter or sump',
      'Flow test and surface restoration',
      '3-year parts & labor limited warranty',
    ],
    faqs: [
      { q: 'What is a French drain?', a: 'A trench filled with gravel or rock around a perforated pipe. Water from the surface and the surrounding soil enters the trench, drops into the pipe and is carried away from your home to a safe outlet.' },
      { q: 'Will a French drain work in Houston clay?', a: 'Yes — when it is designed for it. Clay drains slowly, so the system has to collect water where it gathers and move it by slope or pump to an outlet, rather than relying on the soil to soak it up. That is exactly what we design for.' },
      { q: 'How long does installation take?', a: 'It depends on the length of the run, access and the outlet. Your itemized proposal includes a timeline before any work begins, so you know what to expect.' },
      { q: 'Do French drains need maintenance?', a: 'Over time soil fines and roots can slow a drain down. Filter fabric keeps most sediment out, and if a line ever slows, hydro jetting clears it without digging.' },
    ],
    related: ['yard-drainage-houston', 'sump-pump-installation-houston', 'hydro-jetting-services-houston'],
  },
  {
    slug: 'sump-pump-installation-houston',
    name: 'Sump Pump Installation',
    short: 'Sump Pumps',
    noun: 'a sump pump',
    group: 'install',
    icon: 'sump-pump',
    diagram: 'sump-pump',
    metaTitle: 'Sump Pump Installation & Repair in Houston, TX',
    metaDescription:
      'Yard sump pump systems for low Houston lots where gravity drainage can’t reach the street. Sized, installed and warranted by a family-owned Houston drainage team.',
    headline: 'When gravity can’t get the water out, we pump it out',
    summary:
      'An outdoor sump basin and pump that lifts water from low spots and pushes it to the street or another safe outlet.',
    intro: [
      'Some Houston lots sit lower than the street, the alley or the neighbor’s yard. A drain alone can’t move water uphill — it needs a pump.',
      'We install yard sump systems that collect water from your drains and low areas into a buried basin, then automatically pump it out through a discharge line when the level rises. We size the pump for your lot and your drainage system, and we repair or replace pumps that have failed.',
    ],
    signs: [
      'Your yard is lower than the street or curb',
      'Drains back up or never empty after storms',
      'A low corner of the yard floods every heavy rain',
      'An existing pump runs constantly, cycles or has failed',
      'Water reaches the foundation even with gutters and drains',
    ],
    process: [
      { title: 'Measure the lift', body: 'We check elevations from the low point to the outlet so the pump is sized for the real height and distance, not a guess.' },
      { title: 'Place the basin', body: 'The sump basin goes where your drains can feed it by gravity, out of the way of foot traffic and mowing.' },
      { title: 'Pump and discharge', body: 'Pump, float switch, check valve and solid discharge line are installed and routed to the curb or another approved outlet.' },
      { title: 'Prove it', body: 'We fill the basin, watch the pump cycle, check the discharge and show you what normal operation looks and sounds like.' },
    ],
    included: [
      'Elevation and flow assessment',
      'Correctly sized pump and float switch',
      'Buried sump basin with service lid',
      'Check valve and solid discharge line',
      'Tie-in to new or existing drains',
      'Operational test and walkthrough',
      '3-year parts & labor limited warranty',
    ],
    faqs: [
      { q: 'Do I need a sump pump or a French drain?', a: 'If water can flow downhill from the problem area to the street or another outlet, a gravity drain is usually enough. If the low spot sits below every outlet, a sump pump is needed to lift the water. Many systems combine both, and the evaluation tells us which you need.' },
      { q: 'Can you repair or replace an existing sump pump?', a: 'Yes. We diagnose failed or short-cycling pumps, replace pumps and floats, and fix discharge lines that are clogged, crushed or draining back into the yard.' },
      { q: 'What happens if the power goes out?', a: 'A standard pump needs power to run. If your property is especially vulnerable, ask us about options during your evaluation.' },
    ],
    related: ['french-drain-installation-houston', 'yard-drainage-houston', 'drain-cleaning-services-houston'],
  },
  {
    slug: 'culvert-installation-houston',
    name: 'Culvert Installation',
    short: 'Culverts',
    noun: 'culvert work',
    group: 'install',
    icon: 'culvert',
    diagram: 'culvert',
    metaTitle: 'Driveway Culvert Installation in Houston, TX',
    metaDescription:
      'Driveway and ditch culvert installation for Houston open-ditch neighborhoods. Correct sizing, grade and headwalls so roadside water flows instead of backing up.',
    headline: 'Culverts that keep the ditch flowing',
    summary:
      'Properly sized and graded culvert pipe under driveways and crossings so roadside ditch water keeps moving.',
    intro: [
      'In Houston’s open-ditch neighborhoods, the culvert under your driveway is part of the street’s drainage system. If it is undersized, set at the wrong grade, crushed or rusted through, water backs up into your yard — and your neighbor’s.',
      'We replace and install driveway culverts set to the ditch’s flow line, bedded and backfilled correctly, and finished so the driveway can carry a vehicle and the ditch can carry a storm.',
    ],
    signs: [
      'Water backs up at your driveway after storms',
      'The culvert pipe is crushed, rusted or partly buried',
      'The driveway edge is sinking or washing out',
      'Standing water sits in the ditch long after rain',
      'You are widening or replacing a driveway over a ditch',
    ],
    process: [
      { title: 'Read the ditch', body: 'We check the ditch flow line upstream and downstream so the new pipe sits at the right grade and doesn’t create a dam.' },
      { title: 'Size and permit', body: 'Pipe diameter and length are matched to the ditch. Work in a public right-of-way can require a city or county permit — we’ll flag it in your proposal.' },
      { title: 'Set the pipe', body: 'Old pipe out, base prepared, new culvert set to grade, bedded and compacted in lifts so it holds up under traffic.' },
      { title: 'Finish the ends', body: 'Ends are finished and the ditch is reshaped so water enters and exits cleanly instead of eroding the bank.' },
    ],
    included: [
      'Ditch grade and flow assessment',
      'Removal of failed or undersized pipe',
      'New culvert pipe sized to the ditch',
      'Proper bedding and compacted backfill',
      'End finishing and ditch reshaping',
      '3-year parts & labor limited warranty',
    ],
    faqs: [
      { q: 'Who is responsible for my driveway culvert?', a: 'In many Houston-area open-ditch neighborhoods, the homeowner is responsible for the culvert under their driveway, while the ditch itself may be maintained by the city or county. Rules vary by jurisdiction — we’ll help you sort out what applies to your property.' },
      { q: 'Why does the culvert grade matter so much?', a: 'A culvert set too high acts like a dam and backs water up; one set too low fills with silt. Matching the pipe to the ditch flow line is what keeps the whole street draining.' },
      { q: 'Can a clogged culvert be cleaned instead of replaced?', a: 'Often, yes. If the pipe is structurally sound, our culvert cleaning service can restore flow without replacement.' },
    ],
    related: ['culvert-cleaning-houston', 'stormwater-cleaning-houston', 'yard-drainage-houston'],
  },
  {
    slug: 'yard-drainage-houston',
    name: 'Yard & Foundation Drainage',
    short: 'Yard Drainage',
    noun: 'yard drainage',
    group: 'install',
    icon: 'yard',
    diagram: 'yard',
    metaTitle: 'Yard & Foundation Drainage Solutions in Houston, TX',
    metaDescription:
      'Catch basins, channel drains, downspout tie-ins, grading and flowerbed drainage for Houston homes. One designed system instead of piecemeal fixes.',
    headline: 'One system for the whole yard — not a patchwork',
    summary:
      'Catch basins, channel drains, downspout tie-ins, grading and flowerbed drainage, designed together as one system.',
    intro: [
      'Most drainage problems have more than one cause: a downspout dumping at the slab, a flowerbed that holds water like a bathtub, a patio that slopes the wrong way, a low corner with nowhere to go.',
      'We design yard and foundation drainage as a single system — catch basins where water gathers, channel drains across patios and driveways, buried downspout extensions, flowerbed drains and grading corrections — all tied to a reliable outlet.',
    ],
    signs: [
      'Downspouts dump water right at the foundation',
      'Flowerbeds stay flooded and plants rot',
      'Patios or driveways slope toward the house',
      'Water sheets across the yard from a neighbor’s lot',
      'Soil is eroding or the slab edge is exposed',
    ],
    process: [
      { title: 'Find every source', body: 'Roof runoff, neighboring lots, hardscape and low spots — we trace each source of water, not just the puddle.' },
      { title: 'Design one system', body: 'Basins, channel drains, downspout lines and grading are laid out together with one outlet plan and an itemized proposal.' },
      { title: 'Install cleanly', body: 'Lines are trenched and graded to fall, fittings are glued and tested, and turf and beds are restored.' },
      { title: 'Walk the result', body: 'We water-test the system with you so you can see each part working before the next storm does it for you.' },
    ],
    included: [
      'Catch basins and grates',
      'Channel (trench) drains for patios and driveways',
      'Buried downspout extensions',
      'Flowerbed and foundation drainage',
      'Grading and swale corrections',
      'Pop-up emitters and curb outlets',
      '3-year parts & labor limited warranty',
    ],
    faqs: [
      { q: 'Should I just bury my downspouts?', a: 'Burying downspouts into a solid pipe that carries roof water to a proper outlet is one of the most effective upgrades a Houston home can make. Done wrong — into the yard with no outlet — it just moves the puddle.' },
      { q: 'Is foundation drainage really about the foundation?', a: 'Yes. Houston’s expansive clay swells when wet and shrinks when dry. Keeping water from collecting at the slab helps reduce the moisture swings that stress foundations.' },
      { q: 'Can you fix water coming from a neighbor’s yard?', a: 'Often, yes — with a swale, catch basins or a French drain along the property line that intercepts the water before it reaches your home.' },
    ],
    related: ['french-drain-installation-houston', 'sump-pump-installation-houston', 'drain-cleaning-services-houston'],
  },
  {
    slug: 'drain-cleaning-services-houston',
    name: 'Drain Cleaning',
    short: 'Drain Cleaning',
    noun: 'drain cleaning',
    group: 'maintain',
    icon: 'drain-cleaning',
    diagram: 'hydro-jet',
    metaTitle: 'Yard Drain Cleaning Services in Houston, TX',
    metaDescription:
      'Clogged yard drains, catch basins, downspout lines and French drains cleared fast. Houston drain cleaning from a family-owned drainage specialist.',
    headline: 'Clogged yard drains, cleared before the next storm',
    summary:
      'Clearing silt, leaves and roots from yard drains, catch basins and downspout lines so they carry water again.',
    intro: [
      'Even a well-built drainage system slows down over time. Leaves, grass clippings, silt and roots find their way into catch basins and lines until the yard floods like the system isn’t there.',
      'We locate the blockage, clear it with the right tool for the job, and flush the line so it runs freely to the outlet — and we’ll tell you honestly if the line has a bigger problem.',
    ],
    signs: [
      'Catch basins hold water instead of draining',
      'Pop-up emitters never pop up during rain',
      'Gutters overflow even when they are clean',
      'A drain that used to work now floods',
      'Gurgling or water backing up out of grates',
    ],
    process: [
      { title: 'Locate', body: 'We find where the line is restricted and what’s causing it — debris, silt, roots or a damaged section.' },
      { title: 'Clear', body: 'Debris is removed from basins, and lines are cleared mechanically or with hydro jetting depending on the blockage.' },
      { title: 'Flush and verify', body: 'We run water through the system and confirm it reaches the outlet at full flow.' },
    ],
    included: [
      'Catch basin and grate clean-out',
      'Downspout and yard line clearing',
      'Flushing to the outlet',
      'Pop-up emitter service',
      'Honest assessment of damaged lines',
    ],
    faqs: [
      { q: 'How often should yard drains be cleaned?', a: 'It depends on your trees and soil. A good habit is to check grates and basins before hurricane season starts on June 1 and after heavy leaf drop in the fall.' },
      { q: 'Do you clean drains you didn’t install?', a: 'Yes. We clean and service existing yard drainage systems, whoever built them.' },
    ],
    related: ['hydro-jetting-services-houston', 'stormwater-cleaning-houston', 'french-drain-installation-houston'],
  },
  {
    slug: 'stormwater-cleaning-houston',
    name: 'Stormwater Cleaning',
    short: 'Stormwater Cleaning',
    noun: 'stormwater cleaning',
    group: 'maintain',
    icon: 'stormwater',
    diagram: 'hydro-jet',
    metaTitle: 'Stormwater Drain Cleaning in Houston, TX',
    metaDescription:
      'Storm drain, inlet and stormwater line cleaning for Houston homes and properties. Keep runoff moving before hurricane season.',
    headline: 'Keep stormwater moving when it matters most',
    summary:
      'Cleaning storm drains, inlets and stormwater lines so runoff leaves your property instead of backing up onto it.',
    intro: [
      'A storm line that is half full of sediment only has half its capacity — and you won’t find out until the heaviest rain of the year.',
      'We clean storm drains, inlets and stormwater lines on residential and small commercial properties, removing built-up sediment and debris so the system can carry its full design flow.',
    ],
    signs: [
      'Storm inlets or grates are packed with debris',
      'Runoff ponds at inlets after moderate rain',
      'Sediment visible in lines or at outlets',
      'It has been years since the system was cleaned',
      'Hurricane season is coming',
    ],
    process: [
      { title: 'Inspect', body: 'We open inlets and check lines and outlets to see how much capacity has been lost.' },
      { title: 'Remove debris', body: 'Sediment and debris are cleared from inlets, then lines are cleaned through to the outlet.' },
      { title: 'Confirm flow', body: 'We verify water moves freely and note anything that needs repair.' },
    ],
    included: [
      'Inlet and grate clean-out',
      'Stormwater line cleaning',
      'Sediment and debris removal',
      'Outlet check',
      'Pre-hurricane-season service',
    ],
    faqs: [
      { q: 'When is the best time for stormwater cleaning?', a: 'Before the Atlantic hurricane season starts on June 1, and again after major storms that wash sediment into the system.' },
      { q: 'Do you work on commercial properties?', a: 'We focus on residential drainage and also serve smaller commercial properties. Call us to talk through your site.' },
    ],
    related: ['drain-cleaning-services-houston', 'culvert-cleaning-houston', 'hydro-jetting-services-houston'],
  },
  {
    slug: 'culvert-cleaning-houston',
    name: 'Culvert Cleaning',
    short: 'Culvert Cleaning',
    noun: 'culvert cleaning',
    group: 'maintain',
    icon: 'culvert-cleaning',
    diagram: 'culvert',
    metaTitle: 'Culvert Cleaning Services in Houston, TX',
    metaDescription:
      'Silted-up driveway culverts cleared so ditch water flows again. Houston culvert cleaning from a family-owned drainage team.',
    headline: 'Restore full flow under your driveway',
    summary:
      'Clearing silt, debris and vegetation from driveway and ditch culverts so they carry their full capacity.',
    intro: [
      'Driveway culverts silt up slowly. Every storm leaves a little more sediment behind until the pipe is half full and water backs up into the yard.',
      'We clear the pipe end to end and clean up the inlet and outlet so the ditch can flow — often restoring full capacity without the cost of replacement.',
    ],
    signs: [
      'You can’t see daylight through the culvert',
      'Water ponds on one side of the driveway',
      'Silt, grass or debris blocks the pipe ends',
      'The ditch drains slower than it used to',
    ],
    process: [
      { title: 'Assess', body: 'We check how blocked the pipe is and whether it is structurally sound enough to clean rather than replace.' },
      { title: 'Clear end to end', body: 'Sediment and debris are removed through the full length of the pipe, with hydro jetting where needed.' },
      { title: 'Open the ends', body: 'Inlet and outlet are cleared so water can enter and leave the pipe freely.' },
    ],
    included: [
      'Full-length pipe clearing',
      'Sediment and debris removal',
      'Inlet and outlet clean-up',
      'Condition check of the pipe',
    ],
    faqs: [
      { q: 'How do I know if my culvert needs cleaning or replacing?', a: 'If the pipe is intact and simply full of sediment, cleaning restores it. If it is crushed, rusted through or set at the wrong grade, replacement is the lasting fix. We’ll tell you which after we look.' },
    ],
    related: ['culvert-installation-houston', 'stormwater-cleaning-houston', 'hydro-jetting-services-houston'],
  },
  {
    slug: 'hydro-jetting-services-houston',
    name: 'Hydro Jetting',
    short: 'Hydro Jetting',
    noun: 'hydro jetting',
    group: 'maintain',
    icon: 'hydro-jet',
    diagram: 'hydro-jet',
    metaTitle: 'Hydro Jetting Services in Houston, TX',
    metaDescription:
      'High-pressure hydro jetting at 3,000–8,000 PSI clears roots, sediment and buildup from drain and stormwater lines — no digging. Houston, TX.',
    headline: 'High-pressure water. No digging.',
    summary:
      'Water at 3,000–8,000 PSI scours roots, sediment and buildup from drain lines and restores full flow without excavation.',
    intro: [
      'When a line is packed with roots, silt or mineral buildup, a snake only pokes a hole through it. Hydro jetting scours the pipe wall clean.',
      'A specialized nozzle sends water at 3,000 to 8,000 PSI — matched to the blockage and the condition of the pipe — through the line, cutting roots and flushing debris out to the outlet. It restores flow without digging up your lawn.',
    ],
    signs: [
      'Roots have grown into a drain line',
      'A line clogs again soon after being snaked',
      'Heavy sediment in French drains or storm lines',
      'Slow drainage throughout the system',
    ],
    process: [
      { title: 'Choose the pressure', body: 'We match pressure and nozzle to the blockage and the pipe — strong enough to clean, controlled enough to protect the line.' },
      { title: 'Jet the line', body: 'The nozzle travels the line, cutting roots and scouring buildup, flushing everything to the outlet.' },
      { title: 'Verify', body: 'We run water through to confirm full flow and let you know about any damaged sections we find.' },
    ],
    included: [
      '3,000–8,000 PSI jetting matched to your line',
      'Root cutting and sediment removal',
      'Full-length line flushing',
      'Flow verification',
    ],
    faqs: [
      { q: 'Is hydro jetting safe for my pipes?', a: 'In sound pipe, yes — that’s why we match the pressure to the line’s condition instead of running everything at maximum. If a line is already broken, we’ll tell you before jetting it.' },
      { q: 'Hydro jetting vs. snaking — what’s the difference?', a: 'A snake punches a path through a clog; jetting cleans the full inside of the pipe, so roots and sediment are less likely to come right back.' },
    ],
    related: ['drain-cleaning-services-houston', 'stormwater-cleaning-houston', 'culvert-cleaning-houston'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const installServices = services.filter((s) => s.group === 'install');
export const maintainServices = services.filter((s) => s.group === 'maintain');
export const servicePath = (s: Pick<Service, 'slug'>) => `/${s.slug}/`;
