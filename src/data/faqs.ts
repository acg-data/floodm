import type { Faq } from './services';

export const generalFaqs: { topic: string; items: Faq[] }[] = [
  {
    topic: 'Getting started',
    items: [
      { q: 'How does an evaluation work?', a: 'A drainage specialist looks at your property — on site, or virtually from photos and video you send — to find where water pools, where it comes from and where it can go. From that we prepare a detailed design and an itemized proposal with a timeline.' },
      { q: 'What areas do you serve?', a: 'Greater Houston and the surrounding communities, from Katy to Kingwood and The Woodlands to Pearland. If you are not sure we cover your street, call or text and ask.' },
      { q: 'What are your hours?', a: 'Monday to Friday, 6 am to 6 pm Central. We also offer 24/7 emergency response when water is threatening your home.' },
      { q: 'Can I send photos or video instead of scheduling a visit?', a: 'Yes. Photos or a short video of the problem area during or right after rain are incredibly useful — text them to us or attach them when you reply to our email.' },
    ],
  },
  {
    topic: 'Drainage basics',
    items: [
      { q: 'What is a French drain?', a: 'A trench filled with gravel around a perforated pipe. Surface water and groundwater enter the trench, drop into the pipe and are carried away from your home to a safe outlet.' },
      { q: 'Why does my Houston yard flood when it rains?', a: 'Houston combines heavy rain, nearly flat terrain and dense clay soil that absorbs water slowly. Water that can’t soak in and can’t run off just sits — in the lawn, the beds and against the foundation.' },
      { q: 'Do I need a French drain or a sump pump?', a: 'If water can flow downhill to the street or another outlet, gravity drainage usually works. If the problem area sits lower than every outlet, a sump pump lifts the water out. Many properties need both.' },
      { q: 'Does yard drainage protect my foundation?', a: 'Houston’s expansive clay swells when wet and shrinks when dry. Keeping water from collecting at the slab helps reduce the moisture swings that stress foundations.' },
      { q: 'Will a drainage system stop my house from flooding in a hurricane?', a: 'Yard drainage is designed to move rainfall off your property and away from your foundation. It can’t hold back rising floodwater from a bayou or street that is already overtopped — be wary of anyone who promises that.' },
    ],
  },
  {
    topic: 'Warranty & care',
    items: [
      { q: 'What warranty do you offer?', a: 'Our installations are backed by a 3-year parts and labor limited warranty. Your proposal spells out exactly what it covers.' },
      { q: 'Do drainage systems need maintenance?', a: 'A little. Keep grates and catch basins clear of leaves and mulch, check that pop-up emitters open, and have lines cleaned or hydro jetted if they start to slow down.' },
      { q: 'Do you service systems other companies installed?', a: 'Yes. We clean, repair and upgrade existing drainage systems, whoever built them.' },
    ],
  },
];
