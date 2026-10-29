// Historical observations and published estimates, checked 2026-10-29.
// Keep station, period, event scope and cost basis visible with each number.
const climateUrl = 'https://www.weather.gov/hgx/climate_iah_normals_summary';
export const houstonFacts = [
  { value: '51.84″', unit: 'normal annual rainfall', title: 'Rain is part of life in Houston.', detail: 'Houston Intercontinental Airport averages 51.84 inches of rain a year in the 1991–2020 climate normals. Your neighborhood’s rainfall can differ.', source: 'National Weather Service', url: climateUrl },
  { value: '16.07″', unit: 'in a single day', title: 'One storm can change the picture.', detail: 'That much rain fell at Houston Intercontinental Airport on August 27, 2017, during Harvey—about 31% of the station’s normal annual rainfall in one day.', source: 'National Weather Service', url: climateUrl },
  { value: '$25,000', unit: 'possible home damage', title: 'Even an inch indoors can be costly.', detail: 'The Texas Department of Insurance says just one inch of water inside a home can cause about $25,000 in damage. Actual repair costs vary by property.', source: 'Texas Department of Insurance', url: 'https://www.tdi.texas.gov/podcast/who-should-have-flood-insurance.html' },
  { value: '$125', unit: 'billion · Harvey (2017)', title: 'The impact reaches far beyond one lot.', detail: 'USGS reports an estimated $125 billion in wind and flood damage from Hurricane Harvey. This historical, storm-wide U.S. estimate is in 2017 dollars, covering more than Houston. It is not a cost prediction for your home.', source: 'USGS · Harvey assessment', url: 'https://www.usgs.gov/centers/oklahoma-texas-water-science-center/science/post-hurricane-harvey-assessment' },
] as const;

// NWS IAH station, 1991–2020 precipitation normals (inches).
export const monthlyRainfall = [
  { month: 'January', short: 'Jan', inches: 3.76 },
  { month: 'February', short: 'Feb', inches: 2.97 },
  { month: 'March', short: 'Mar', inches: 3.47 },
  { month: 'April', short: 'Apr', inches: 3.95 },
  { month: 'May', short: 'May', inches: 5.01 },
  { month: 'June', short: 'Jun', inches: 6.00 },
  { month: 'July', short: 'Jul', inches: 3.77 },
  { month: 'August', short: 'Aug', inches: 4.84 },
  { month: 'September', short: 'Sep', inches: 4.71 },
  { month: 'October', short: 'Oct', inches: 5.46 },
  { month: 'November', short: 'Nov', inches: 3.87 },
  { month: 'December', short: 'Dec', inches: 4.03 },
] as const;

export const houstonClimateSource = climateUrl;
