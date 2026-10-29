// Renders site/assets/og.jpg (the 1200×630 link-preview image) from the
// site's own logo, photo and font. Run `npm run og` after changing them.
// Needs Playwright with Chromium installed on the machine.
import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { startServer } from './serve.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const PORT = 4396;
const server = await startServer(PORT, '127.0.0.1');
const base = `http://localhost:${PORT}/assets/`;

const html = `<!doctype html><html><head><style>
@font-face{font-family:J;src:url(${base}fonts/plus-jakarta-sans-latin-wght-normal.woff2) format("woff2");font-weight:200 800}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;font-family:J,sans-serif;background:radial-gradient(70% 90% at 0% 100%,rgba(22,125,196,.45),transparent 60%),#102F46;color:#fff;position:relative}
.copy{position:absolute;left:72px;top:64px;width:600px;display:grid;gap:26px}
.brand{display:flex;align-items:center;gap:14px}.brand img{height:56px;width:auto}
.eyebrow{font-size:17px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#65C7ED}
h1{font-size:66px;font-weight:800;letter-spacing:-.03em;line-height:1.02}
h1 span{display:block;color:#65C7ED}
.phone{justify-self:start;background:#1474B6;border-radius:10px;padding:16px 26px;font-size:30px;font-weight:800;letter-spacing:-.01em}
.photo{position:absolute;right:56px;top:56px;width:420px;height:518px;border-radius:22px 22px 22px 90px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.4)}
.photo img{width:100%;height:100%;object-fit:cover}
</style></head><body>
<div class="copy">
  <div class="brand"><img src="${base}img/logo-mark-white.png"><img src="${base}img/logo-wordmark-white.png"></div>
  <p class="eyebrow">Houston’s #1 flood assessment &amp; drainage team</p>
  <h1>Understand your risk.<span>Protect your property.</span></h1>
  <p class="phone">(281) 849-1082</p>
</div>
<div class="photo"><img src="${base}img/hero-house.jpg"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
// Same origin as the font files, so the browser will load them.
await page.goto(`http://localhost:${PORT}/robots.txt`);
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await writeFile(new URL('../public/assets/og.jpg', import.meta.url), await page.screenshot({ type: 'jpeg', quality: 86 }));
await browser.close();
server.close();
console.log('wrote site/assets/og.jpg');
