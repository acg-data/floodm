import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const photos = [
  { id: 'neighborhood', creator: 'Sophie N', page: 'https://unsplash.com/photos/an-aerial-view-of-a-neighborhood-with-lots-of-houses-RJ-CaBQH7Sk', image: 'https://images.unsplash.com/photo-1637123433690-228bb002d9e9', width: 2000, height: 1250 },
  { id: 'home-and-lawn', creator: 'Roger Starnes Sr', page: 'https://unsplash.com/photos/a-brick-house-with-a-green-lawn-and-a-blue-sky-ph6qQVK00n0', image: 'https://images.unsplash.com/photo-1714177167566-5b447b38f61c', width: 1200, height: 1000 },
  { id: 'houston-heights-home', creator: 'Ed Uthman', page: 'https://commons.wikimedia.org/wiki/File:George_L._Burlingame_House,_1238_Harvard_St,_Houston_(HDR).jpg', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/George_L._Burlingame_House%2C_1238_Harvard_St%2C_Houston_%28HDR%29.jpg', width: 1200, height: 1000, license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', modifications: 'Cropped, resized and converted to WebP. These image adaptations remain CC BY-SA 3.0.', use: 'Documented Houston Heights residence, photographed in 2011. Illustrative local architecture; not a customer project or endorsement.' },
  { id: 'houston-bayou', creator: 'Anvesh Uppunuthula', page: 'https://unsplash.com/photos/a-city-skyline-with-a-river-running-through-it-VMwl7U2qeNg', image: 'https://images.unsplash.com/photo-1653149870708-50f54131a536', width: 1400, height: 900, use: 'Buffalo Bayou and the Houston skyline. Local context photography; not a drainage project.' },
];
await mkdir('public/assets/photos', { recursive: true });
const requested = new Set(process.argv.slice(2));
for (const photo of photos.filter(p => !requested.size || requested.has(p.id))) {
  const url = photo.image.includes('images.unsplash.com') ? `${photo.image}?auto=format&fit=crop&w=${photo.width}&h=${photo.height}&q=88` : photo.image;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Photo download failed: ${response.status}`);
  const original = Buffer.from(await response.arrayBuffer());
  for (const width of [640, photo.width]) {
    const file = `public/assets/photos/${photo.id}-${width}.webp`;
    await sharp(original).resize(width, Math.round(width * photo.height / photo.width), { fit: 'cover' }).webp({ quality: 82 }).toFile(file);
    console.log(file);
  }
  if (photo.id === 'neighborhood') {
    await sharp(original).resize(800, 1600, { fit: 'cover', position: 'centre' }).webp({ quality: 80 }).toFile('public/assets/photos/neighborhood-mobile.webp');
  }
}
await writeFile('public/assets/photos/provenance.json', JSON.stringify(photos.map(({ image, ...photo }) => ({ ...photo, license: photo.license || 'Unsplash License', licenseUrl: photo.licenseUrl || 'https://unsplash.com/license', retrieved: '2026-10-29', use: photo.use || 'Illustrative residential photography; not represented as a Flood Mitigators project or a specific Houston property.' })), null, 2) + '\n');
