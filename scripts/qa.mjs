// Pre-launch QA for the built site (dist/). Run `npm test` (type check + build + this).
// Crawls every page and fails on: missing files, console errors, broken
// internal links, bad titles/descriptions, invalid structured data, sideways
// scrolling from 320px phones to desktop, and axe accessibility violations.
// Then it drives the interactive pieces: menus, Snapshot form, booking dialog,
// contact form, runoff calculator, drainage checkup and checklist.
// Needs Playwright with Chromium installed on the machine.
import { createRequire } from 'node:module';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { startServer } from './serve.mjs';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const PORT = 4391;
const SITE = `http://localhost:${PORT}`;
const server = await startServer(PORT, '127.0.0.1');
const browser = await chromium.launch();
const problems = [];
const fail = (page, msg) => problems.push(`${page}: ${msg}`);
const widths = [320, 375, 414, 768, 1024, 1081, 1280, 1440];

const walk = async (dir) => {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name === 'index.html') out.push(`/${relative(root, dir).replaceAll('\\', '/')}/`.replace('//', '/'));
  }
  return out;
};
const pages = (await walk(root)).sort();
const exists = new Set(pages);

const newPage = async (viewport, label, opts = {}) => {
  const ctx = await browser.newContext({ viewport, reducedMotion: 'reduce', ...opts });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && fail(label(), `console error: ${m.text()}`));
  page.on('pageerror', (e) => fail(label(), `page error: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && r.url().startsWith(SITE) && fail(label(), `HTTP ${r.status()} ${r.url()}`));
  await page.route('mailto:*', (route) => route.abort());
  return { ctx, page };
};

// 1. Every page: content checks, overflow at each width, axe on phone + desktop.
let current = '';
const { ctx, page } = await newPage({ width: 1280, height: 900 }, () => current);
for (const path of pages) {
  current = path;
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(SITE + path, { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name=description]')?.content ?? '',
    canonical: document.querySelector('link[rel=canonical]')?.href ?? '',
    noindex: !!document.querySelector('meta[name=robots][content*=noindex]'),
    h1: document.querySelectorAll('h1').length,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    noAlt: document.querySelectorAll('img:not([alt])').length,
    dupIds: (() => { const c = {}; document.querySelectorAll('[id]').forEach((e) => (c[e.id] = (c[e.id] || 0) + 1)); return Object.keys(c).filter((k) => c[k] > 1); })(),
  }));
  if (info.title.length > 70 || info.title.length < 15) fail(path, `title ${info.title.length} chars: ${info.title}`);
  if (!info.noindex && (info.desc.length < 70 || info.desc.length > 170)) fail(path, `description ${info.desc.length} chars`);
  if (!info.canonical.endsWith(path === '/404/' ? '/404/' : path)) fail(path, `canonical ${info.canonical}`);
  if (info.h1 !== 1) fail(path, `${info.h1} h1 elements`);
  if (info.noAlt) fail(path, `${info.noAlt} images without alt`);
  if (info.dupIds.length) fail(path, `duplicate ids: ${info.dupIds.join(', ')}`);
  for (const j of info.ld) { try { JSON.parse(j); } catch { fail(path, 'invalid JSON-LD'); } }
  for (const href of new Set(info.links)) {
    if (href.startsWith('#')) { if (href.length > 1 && !info.ids.includes(href.slice(1))) fail(path, `in-page link to missing ${href}`); continue; }
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const u = new URL(href, SITE);
    if (/\.\w+$/.test(u.pathname)) { const r = await page.request.get(u.href); if (!r.ok()) fail(path, `broken file link ${href}`); continue; }
    if (!exists.has(u.pathname)) fail(path, `broken link ${href}`);
  }
  // lazy images load
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 15)); } });
  await page.waitForLoadState('networkidle');
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')));
  if (broken.length) fail(path, `images failed: ${broken.join(', ')}`);

  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 });
    const over = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const extra = document.documentElement.scrollWidth - vw;
      if (extra <= 0) return null;
      const clipped = (e) => { for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a).overflowX; if (o !== 'visible') return true; } return false; };
      const el = [...document.querySelectorAll('body *')].find((e) => e.getBoundingClientRect().right > vw + 1 && !clipped(e));
      return `${extra}px (${el ? el.tagName.toLowerCase() + '.' + [...el.classList].join('.') : '?'})`;
    });
    if (over) fail(path, `overflow at ${w}px: ${over}`);
    const hdr = await page.evaluate(() => document.querySelector('#hdr .wrap').getBoundingClientRect().height);
    if (hdr > 90) fail(path, `header wraps at ${w}px`);
  }
  for (const w of [390, 1280]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.addScriptTag({ content: axeSource });
    const v = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ['violations'] })).violations.map((x) => `${x.impact} ${x.id} ×${x.nodes.length}: ${x.nodes.slice(0, 2).map((n) => n.target).join(' | ')}`));
    v.forEach((x) => fail(path, `axe @${w}: ${x}`));
  }
}
await ctx.close();

// 2. Interactions
const flow = async (name, viewport, fn, opts) => {
  const s = await newPage(viewport, () => name, opts);
  try { await fn(s.page); } catch (e) { fail(name, `threw: ${e.message.split('\n')[0]}`); }
  await s.ctx.close();
};

await flow('desktop menus', { width: 1280, height: 900 }, async (p) => {
  await p.goto(SITE + '/');
  await p.click('.navtoggle[aria-controls="dd-services"]');
  if (!(await p.locator('#dd-services').isVisible())) fail('desktop menus', 'services menu did not open on click');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(250);
  if (await p.locator('#dd-services').isVisible()) fail('desktop menus', 'services menu did not close on Escape');
  await p.hover('.navtoggle[aria-controls="dd-resources"]');
  await p.waitForTimeout(250);
  if (!(await p.locator('#dd-resources').isVisible())) fail('desktop menus', 'resources menu did not open on hover');
});

await flow('mobile menu', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/');
  if (!(await p.locator('.mbar').isVisible())) fail('mobile menu', 'call bar hidden');
  await p.click('#menuBtn');
  if (!(await p.locator('#nav').isVisible())) fail('mobile menu', 'menu did not open');
  await p.click('.navtoggle[aria-controls="dd-services"]');
  if (!(await p.locator('#dd-services a[href="/hydro-jetting-services-houston/"]').isVisible())) fail('mobile menu', 'services group did not expand');
  await p.click('#dd-services a[href="/hydro-jetting-services-houston/"]');
  await p.waitForURL('**/hydro-jetting-services-houston/');
});

await flow('snapshot', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/reports/flood-snapshot/');
  await p.fill('#snapAddr', 'abc'); await p.click('#snapBtn');
  if (await p.locator('#snapErr').isHidden()) fail('snapshot', 'no error for bad address');
  await p.fill('#snapAddr', '2218 Bayou Crest Dr, Houston'); await p.click('#snapBtn');
  if ((await p.getAttribute('#snapAddr', 'type')) !== 'email') fail('snapshot', 'no email step');
  await p.fill('#snapAddr', 'test@example.com'); await p.click('#snapBtn');
  await p.waitForTimeout(200);
  if (await p.locator('#snapDone').isHidden()) fail('snapshot', 'no confirmation');
});

await flow('booking', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/french-drain-installation-houston/');
  await p.locator('.hero [data-book="install"]').first().click();
  if (!(await p.locator('#book').isVisible())) fail('booking', 'dialog did not open');
  if (!(await p.locator('#need-install').isChecked())) fail('booking', 'install not preselected');
  if ((await p.textContent('#svcHint')) !== 'Yard & French drains') fail('booking', 'service not carried into dialog');
  await p.click('#bookForm button[type=submit]');
  if (await p.locator('#bookErr').isHidden()) fail('booking', 'no validation');
  await p.fill('#bName', 'Test Person'); await p.fill('#bEmail', 'test@example.com'); await p.fill('#bAddr', '2218 Bayou Crest Dr');
  await p.click('#bookForm button[type=submit]');
  await p.waitForTimeout(200);
  if (await p.locator('#bookDone').isHidden()) fail('booking', 'no confirmation');
});

await flow('contact form', { width: 1280, height: 900 }, async (p) => {
  await p.goto(SITE + '/contact/');
  await p.click('#contactForm button[type=submit]');
  if (await p.locator('#cErr').isHidden()) fail('contact form', 'no validation');
  await p.fill('#cName', 'Test Person'); await p.fill('#cEmail', 'test@example.com'); await p.fill('#cAddr', '2218 Bayou Crest Dr');
  await p.click('#contactForm button[type=submit]');
  await p.waitForTimeout(200);
  if (await p.locator('#cDone').isHidden()) fail('contact form', 'no confirmation');
});

await flow('runoff', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/runoff-calculator/');
  await p.locator('.chip[data-rain="10"]').click();
  await p.waitForTimeout(100);
  const g = await p.textContent('#gal');
  if (g !== '14,952') fail('runoff', `expected 14,952, got ${g}`);
});

await flow('checkup', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/drainage-checkup/');
  await p.locator('.cu-card', { hasText: 'Downspouts dump' }).click();
  await p.locator('.cu-card', { hasText: 'against the foundation' }).click();
  const recs = await p.locator('.cu-recs li').count();
  if (recs < 2) fail('checkup', `only ${recs} recommendations`);
  await p.click('[data-cu-book]');
  if (!(await p.locator('#book').isVisible())) fail('checkup', 'booking dialog did not open');
  if (!(await p.inputValue('#bNotes')).includes('Drainage Checkup')) fail('checkup', 'answers not carried into notes');
});

await flow('checklist', { width: 390, height: 844 }, async (p) => {
  await p.goto(SITE + '/resources/hurricane-season-checklist/');
  await p.locator('.cl label').first().click();
  if (!(await p.textContent('[data-progress]'))?.includes('1 of')) fail('checklist', 'progress not updated');
  await p.reload();
  if (!(await p.locator('.cl input').first().isChecked())) fail('checklist', 'checkmark not remembered');
});

await browser.close();
server.close();
console.log(`Checked ${pages.length} pages at ${widths.join('/')}px, axe on phone + desktop, and 8 interaction flows.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n- ${[...new Set(problems)].join('\n- ')}`);
  process.exit(1);
}
console.log('All checks passed.');
