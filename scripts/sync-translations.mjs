// Explicit, one-time translation sync for public website copy. Normal builds
// are offline and fail if a new English string has no saved Spanish version.
// Review saved output and add editorial overrides to es-overrides.json.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { collectStrings, normalize } from './locale-shared.mjs';
const file = new URL('../src/i18n/es.json', import.meta.url);
await mkdir(new URL('../src/i18n/', import.meta.url),{recursive:true});
const data = await readFile(file,'utf8').then(JSON.parse,()=>({}));
const overrides = await readFile(new URL('../src/i18n/es-overrides.json',import.meta.url),'utf8').then(JSON.parse,()=>({}));
Object.assign(data,overrides);
const keys = (await collectStrings()).filter((text)=>data[text]===undefined);
const names = ['Flood Mitigators','Flood Snapshot','Flood Intelligence','Root Re-Router','Manny','The Woodlands','West University Place','Spring Branch','Energy Corridor','River Oaks','The Heights','Clear Lake','Memorial','Bellaire','Meyerland','Sugar Land','Pearland','Friendswood','Cypress','Kingwood','Katy','Buffalo Bayou','Brays Bayou','White Oak Bayou','Sims Bayou','Cypress Creek','Spring Creek','San Jacinto River','Lake Houston','Addicks','Barker','NDS','Texas 811','Texas Floodplain Management Association','Soil Science Society of America','Common Ground Alliance'];
function protect(text){for(let i=0;i<names.length;i++)text=text.replaceAll(names[i],`FMKEEP${String(i).padStart(3,'0')}X`);return text;}
function restore(text){for(let i=0;i<names.length;i++)text=text.replace(new RegExp(`FM\\s*KEEP\\s*${String(i).padStart(3,'0')}\\s*X`,'gi'),names[i]);return normalize(text);}
const batches=[];let batch=[],length=0;
for(const key of keys){if(length+key.length>2500&&batch.length){batches.push(batch);batch=[];length=0;}batch.push(key);length+=key.length+30;}
if(batch.length)batches.push(batch);
let completed=0;
for(const current of batches){
 const q=current.map((text,i)=>`[[T${String(i).padStart(5,'0')}]]\n${protect(text)}`).join('\n\n');
 let result;
 for(let attempt=0;attempt<4;attempt++){
  const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q='+encodeURIComponent(q);
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(response.ok){result=(await response.json())[0].map(x=>x[0]||'').join('');break;}
  if(attempt===3)throw Error(`Translation HTTP ${response.status}`);
  await new Promise(r=>setTimeout(r,1500*(attempt+1)));
 }
 const matches=[...result.matchAll(/\[\[\s*T\s*(\d{5})\s*\]\]/g)];
 if(matches.length!==current.length)throw Error('Translation markers changed; saved data is intact.');
 for(let i=0;i<matches.length;i++){
  const n=Number(matches[i][1]);const translated=restore(result.slice(matches[i].index+matches[i][0].length,matches[i+1]?.index));
  if(!translated||/FM\s*KEEP/i.test(translated))throw Error('Translation contains an unresolved name token');
  data[current[n]]=translated;
 }
 completed+=current.length;
 Object.assign(data,overrides);
 await writeFile(file,JSON.stringify(Object.fromEntries(Object.entries(data).sort(([a],[b])=>a.localeCompare(b))),null,2)+'\n');
 console.log(`Translated ${completed}/${keys.length} new strings.`);
 await new Promise(r=>setTimeout(r,100));
}
Object.assign(data,overrides);
await writeFile(file,JSON.stringify(Object.fromEntries(Object.entries(data).sort(([a],[b])=>a.localeCompare(b))),null,2)+'\n');
console.log(`${Object.keys(data).length} Spanish strings saved. Review src/i18n/es.json before publishing.`);
