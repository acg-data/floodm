// Pre-launch QA for site/. Run `npm test`.
// Loads the page in Chromium and fails on: missing files, console errors,
// broken in-page links, sideways scrolling from 320px to desktop, and axe
// accessibility violations. Then it drives every interactive piece: mobile
// menu, Flood Snapshot (address → email), booking dialog, runoff calculator.
// Needs Playwright with Chromium installed on the machine.
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { startServer } from './serve.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const PORT = 4391;
const SITE = `http://localhost:${PORT}/`;
const server = await startServer(PORT, '127.0.0.1');
const browser = await chromium.launch();
const problems = [];
const fail = (msg) => problems.push(msg);
const widths = [320, 360, 375, 390, 414, 600, 768, 900, 901, 1024, 1180, 1280, 1440];

const newPage = async (viewport, opts = {}) => {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce', ...opts });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && fail(`console error: ${m.text()}`));
  page.on('pageerror', (e) => fail(`page error: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && fail(`HTTP ${r.status()} ${r.url()}`));
  // The no-endpoint fallback opens mailto:; swallow it so the page stays put.
  await page.route('mailto:*', (route) => route.abort());
  return { ctx, page };
};

// 1. Structure, links, SEO basics
{
  const { ctx, page } = await newPage({ width: 1280, height: 900 });
  await page.goto(SITE, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content ?? '',
    h1: document.querySelectorAll('h1').length,
    anchors: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    imgsNoAlt: document.querySelectorAll('img:not([alt])').length,
    brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== 'lazy').map((i) => i.src),
    font: document.fonts.check('700 16px "Plus Jakarta Sans"'),
  }));
  // Icons, manifest, preloads and the share image all exist.
  const headAssets = await page.evaluate(() => [
    ...[...document.querySelectorAll('link[href]')].map((l) => l.getAttribute('href')).filter((h) => !/^https?:/.test(h)),
    new URL(document.querySelector('meta[property="og:image"]').content).pathname,
  ]);
  for (const href of headAssets) {
    const res = await page.request.get(new URL(href, SITE).href);
    if (!res.ok()) fail(`missing head asset ${href} (${res.status()})`);
  }
  if (info.title.length > 70) fail(`title is ${info.title.length} chars`);
  if (info.desc.length < 70 || info.desc.length > 170) fail(`meta description is ${info.desc.length} chars`);
  if (info.h1 !== 1) fail(`${info.h1} h1 elements`);
  if (info.imgsNoAlt) fail(`${info.imgsNoAlt} images without alt`);
  if (info.brokenImgs.length) fail(`broken images: ${info.brokenImgs.join(', ')}`);
  if (!info.font) fail('Plus Jakarta Sans did not load');
  for (const href of new Set(info.anchors)) if (href !== '#' && !info.ids.includes(href.slice(1))) fail(`in-page link to missing ${href}`);
  for (const json of info.ld) {
    try { JSON.parse(json); } catch { fail('invalid JSON-LD'); }
  }
  // Every lazy image actually loads once scrolled into view.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
  });
  await page.waitForLoadState('networkidle');
  const lazyBroken = await page.evaluate(() => [...document.images].filter((i) => i.naturalWidth === 0).map((i) => i.getAttribute('src')));
  if (lazyBroken.length) fail(`images failed to load: ${lazyBroken.join(', ')}`);
  await ctx.close();
}

// 2. No sideways scrolling at any width
{
  const { ctx, page } = await newPage({ width: 1440, height: 900 });
  await page.goto(SITE, { waitUntil: 'networkidle' });
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const over = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const extra = document.documentElement.scrollWidth - vw;
      if (extra <= 0) return null;
      const el = [...document.querySelectorAll('body *')].find((e) => e.getBoundingClientRect().right > vw + 1);
      return `${extra}px (${el ? el.tagName.toLowerCase() + '.' + [...el.classList].join('.') : '?'})`;
    });
    if (over) fail(`horizontal overflow at ${width}px: ${over}`);
    // Header contents stay on one row and inside the viewport.
    const hdr = await page.evaluate(() => {
      const r = document.querySelector('#hdr .wrap').getBoundingClientRect();
      return r.height;
    });
    if (hdr > 90) fail(`header wraps at ${width}px (height ${Math.round(hdr)}px)`);
  }
  await ctx.close();
}

// 3. Accessibility (axe) on desktop and phone
for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  const { ctx, page } = await newPage(viewport);
  await page.goto(SITE, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });
  const violations = await page.evaluate(async () => {
    // @ts-ignore
    const r = await window.axe.run(document, { resultTypes: ['violations'] });
    return r.violations.map((v) => `${v.impact} ${v.id} ×${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => n.target).join(' | ')}`);
  });
  violations.forEach((v) => fail(`axe @${viewport.width}px: ${v}`));
  await ctx.close();
}

// 4. Interactions on a phone
{
  const { ctx, page } = await newPage({ width: 390, height: 844 }, { isMobile: true, hasTouch: true });
  await page.goto(SITE, { waitUntil: 'networkidle' });

  // Sticky call bar
  if (!(await page.locator('.mbar').isVisible())) fail('mobile call bar not visible');
  if ((await page.locator('.mbar a').getAttribute('href')) !== 'tel:+12818491082') fail('call bar phone link wrong');

  // Menu
  await page.click('#menuBtn');
  if (!(await page.locator('#nav').isVisible())) fail('mobile menu did not open');
  await page.click('#nav a[href="#about"]');
  if (await page.locator('#nav').isVisible()) fail('mobile menu did not close after tapping a link');

  // Flood Snapshot: bad address, good address, bad email, good email
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.fill('#snapAddr', 'abc');
  await page.click('#snapBtn');
  if (await page.locator('#snapErr').isHidden()) fail('snapshot: no error for an address without a number');
  await page.fill('#snapAddr', '2218 Bayou Crest Dr, Houston, TX');
  await page.click('#snapBtn');
  if ((await page.getAttribute('#snapAddr', 'type')) !== 'email') fail('snapshot: did not move to the email step');
  await page.fill('#snapAddr', 'not-an-email');
  await page.click('#snapBtn');
  if (await page.locator('#snapErr').isHidden()) fail('snapshot: no error for a bad email');
  await page.fill('#snapAddr', 'test@example.com');
  await page.click('#snapBtn');
  await page.waitForTimeout(200);
  if (await page.locator('#snapDone').isHidden()) fail('snapshot: no confirmation shown');

  // Booking dialog from a service card
  await page.locator('.mini', { hasText: 'Hydro jetting' }).click();
  if (!(await page.locator('#book').isVisible())) fail('booking dialog did not open');
  if (!(await page.locator('#need-install').isChecked())) fail('install option not preselected from service card');
  if ((await page.textContent('#svcHint')) !== 'Hydro jetting') fail('service name not carried into dialog');
  await page.click('#bookForm button[type=submit]');
  if (await page.locator('#bookErr').isHidden()) fail('booking: no validation error on empty submit');
  await page.fill('#bName', 'Test Person');
  await page.fill('#bEmail', 'test@example.com');
  await page.fill('#bAddr', '2218 Bayou Crest Dr, Houston');
  await page.click('#bookForm button[type=submit]');
  await page.waitForTimeout(200);
  if (await page.locator('#bookDone').isHidden()) fail('booking: no confirmation shown');
  await page.click('#bookDoneClose');
  if (await page.locator('#book').isVisible()) fail('booking dialog did not close');

  // Runoff calculator
  await page.locator('.chip[data-rain="10"]').click();
  await page.waitForTimeout(100);
  const gal = await page.textContent('#gal');
  if (gal !== '14,952') fail(`runoff: expected 14,952 gal for 2,400 sq ft × 10 in, got ${gal}`);
  await ctx.close();
}

await browser.close();
server.close();

console.log(`Checked site/index.html at ${widths.join('/')}px, axe on desktop + phone, and all interactions.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n- ${[...new Set(problems)].join('\n- ')}`);
  process.exit(1);
}
console.log('All checks passed.');
