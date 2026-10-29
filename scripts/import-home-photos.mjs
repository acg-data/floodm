import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const photos = [
  { id: 'neighborhood', creator: 'Sophie N', page: 'https://unsplash.com/photos/an-aerial-view-of-a-neighborhood-with-lots-of-houses-RJ-CaBQH7Sk', image: 'https://images.unsplash.com/photo-1637123433690-228bb002d9e9', width: 2000, height: 1250 },
  { id: 'home-and-lawn', creator: 'Roger Starnes Sr', page: 'https://unsplash.com/photos/a-brick-house-with-a-green-lawn-and-a-blue-sky-ph6qQVK00n0', image: 'https://images.unsplash.com/photo-1714177167566-5b447b38f61c', width: 1200, height: 1000 },
];
await mkdir('public/assets/photos', { recursive: true });
for (const photo of photos) {
  const response = await fetch(`${photo.image}?auto=format&fit=crop&w=${photo.width}&h=${photo.height}&q=88`);
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
await writeFile('public/assets/photos/provenance.json', JSON.stringify(photos.map(({ image, ...photo }) => ({ ...photo, license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', retrieved: '2026-10-29', use: 'Illustrative residential photography; not represented as a Flood Mitigators project or a specific Houston property.' })), null, 2) + '\n');
