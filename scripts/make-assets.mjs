// Renders the social share image and PNG icons into /public.
// Run after changing the brand, phone number or tagline: `npm run assets`.
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const pub = new URL('../public/', import.meta.url);
const font = async (path) => (await readFile(require.resolve(path))).toString('base64');
const archivo = await font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2');
const inter = await font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2');
const favicon = await readFile(new URL('favicon.svg', pub), 'utf8');

const base = `
  @font-face { font-family: A; src: url(data:font/woff2;base64,${archivo}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  @font-face { font-family: I; src: url(data:font/woff2;base64,${inter}) format('woff2'); font-weight: 100 900; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 100vw; height: 100vh; overflow: hidden; }
`;

const og = `<!doctype html><html><head><style>${base}
  body { background: radial-gradient(70% 90% at 90% 0%, rgba(29,111,168,.55), transparent 60%), #0a1e2c; color: #fff; font-family: I; padding: 64px 72px; position: relative; }
  .brand { display: flex; align-items: center; gap: 18px; }
  .brand svg { width: 64px; height: 64px; }
  .w1 { font-family: A; font-stretch: 118%; font-weight: 850; font-size: 30px; letter-spacing: .02em; text-transform: uppercase; line-height: 1; }
  .w2 { font-family: A; font-stretch: 125%; font-weight: 700; font-size: 15px; letter-spacing: .26em; text-transform: uppercase; color: #5bb2e8; margin-top: 6px; }
  .eyebrow { margin-top: 54px; font-family: A; font-stretch: 112%; font-weight: 750; font-size: 20px; letter-spacing: .14em; text-transform: uppercase; color: #f4a62a; }
  h1 { margin-top: 14px; font-family: A; font-stretch: 112%; font-weight: 850; font-size: 76px; line-height: 1.02; letter-spacing: -.02em; max-width: 900px; }
  .meta { position: absolute; left: 72px; right: 72px; bottom: 60px; display: flex; justify-content: space-between; align-items: center; }
  .phone { display: flex; align-items: center; gap: 14px; background: #f4a62a; color: #1d1404; border-radius: 16px; padding: 16px 26px; font-family: A; font-stretch: 108%; font-weight: 850; font-size: 34px; }
  .facts { font-size: 21px; color: #c4d4df; font-weight: 550; }
  .waves { position: absolute; left: 0; right: 0; bottom: 0; height: 190px; }
</style></head><body>
  <svg class="waves" viewBox="0 0 1200 190" preserveAspectRatio="none"><path d="M0 90c100-34 200-34 300 0s200 34 300 0 200-34 300 0 200 34 300 0v100H0Z" fill="rgba(91,178,232,.08)"/><path d="M0 130c100-30 200-30 300 0s200 30 300 0 200-30 300 0 200 30 300 0v60H0Z" fill="rgba(91,178,232,.08)"/></svg>
  <div class="brand">${favicon}<div><div class="w1">Flood</div><div class="w2">Mitigators</div></div></div>
  <p class="eyebrow">Houston’s #1 yard drainage &amp; flood mitigation team</p>
  <h1>Your yard shouldn’t flood every time it rains.</h1>
  <div class="meta">
    <div class="phone">(281) 849-1082</div>
    <div class="facts">Family-owned · 3-year warranty · 24/7 emergency</div>
  </div>
</body></html>`;

const icon = (pad) => `<!doctype html><html><head><style>${base}
  body { background: #0f2b3f; display: grid; place-items: center; }
  svg { width: ${100 - pad * 2}vw; height: ${100 - pad * 2}vh; }
  svg rect { fill: transparent; }
</style></head><body>${favicon}</body></html>`;

const browser = await chromium.launch();
const shoot = async (html, w, h, file) => {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await writeFile(new URL(file, pub), await page.screenshot({ type: 'png' }));
  await page.close();
  console.log('wrote', file);
};

await shoot(og, 1200, 630, 'og.png');
await shoot(icon(6), 180, 180, 'apple-touch-icon.png');
await shoot(icon(6), 192, 192, 'icon-192.png');
await shoot(icon(6), 512, 512, 'icon-512.png');
await shoot(icon(0), 32, 32, 'favicon-32.png');
await browser.close();
