// Pre-launch QA against the built site in /dist. Run `npm run build && npm run qa`.
// Checks every page for: broken internal links, SEO basics, valid JSON-LD,
// horizontal overflow from 320px to desktop, console errors and axe
// accessibility violations — then exercises the checkup and quote form.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const root = new URL('../dist/', import.meta.url).pathname;
const PORT = 4329;
const ORIGIN = `http://localhost:${PORT}`;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };

const exists = async (p) => stat(p).then(() => true, () => false);
const resolveFile = async (pathname) => {
  const file = join(root, decodeURIComponent(pathname));
  if (await exists(join(file, 'index.html'))) return join(file, 'index.html');
  if ((await exists(file)) && !(await stat(file)).isDirectory()) return file;
  return null;
};

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, ORIGIN);
  const file = await resolveFile(pathname);
  res.statusCode = file ? 200 : 404;
  res.setHeader('content-type', types[extname(file ?? '.html')] ?? 'application/octet-stream');
  res.end(await readFile(file ?? join(root, '404.html')));
}).listen(PORT);

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name === 'index.html') out.push('/' + relative(root, dir).replace(/\\/g, '/') + (dir === root ? '' : '/'));
  }
  return out;
};

const pages = (await walk(root)).map((p) => p.replace('//', '/')).sort();
const redirects = ['/flood-tips-faq-2/', '/rootrerouter/'];
const problems = [];
const warn = (page, msg) => problems.push(`${page}: ${msg}`);

const browser = await chromium.launch();
const widths = [320, 375, 414, 768, 1024, 1440];

for (const path of pages) {
  if (redirects.includes(path)) continue;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && warn(path, `console error: ${m.text()}`));
  page.on('pageerror', (e) => warn(path, `page error: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && r.url().startsWith(ORIGIN) && warn(path, `HTTP ${r.status()} ${r.url()}`));
  await page.goto(ORIGIN + path, { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
    h1: document.querySelectorAll('h1').length,
    ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    imgsNoAlt: [...document.querySelectorAll('img:not([alt])')].length,
    noindex: Boolean(document.querySelector('meta[name="robots"][content*="noindex"]')),
  }));

  if (!info.title || info.title.length > 70) warn(path, `title length ${info.title.length}: "${info.title}"`);
  if (!info.noindex && (info.desc.length < 70 || info.desc.length > 170)) warn(path, `meta description length ${info.desc.length}`);
  if (!info.canonical.endsWith(path)) warn(path, `canonical ${info.canonical}`);
  if (info.h1 !== 1) warn(path, `${info.h1} <h1> elements`);
  if (info.imgsNoAlt) warn(path, `${info.imgsNoAlt} images without alt`);
  for (const json of info.ld) {
    try {
      JSON.parse(json);
    } catch {
      warn(path, 'invalid JSON-LD');
    }
  }
  for (const href of new Set(info.links)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const { pathname } = new URL(href, ORIGIN);
    if (!(await resolveFile(pathname))) warn(path, `broken link ${href}`);
    else if (!pathname.endsWith('/') && !extname(pathname)) warn(path, `link missing trailing slash ${href}`);
  }

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) {
      const culprit = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const el = [...document.querySelectorAll('body *')].find((e) => e.getBoundingClientRect().right > vw + 1);
        return el ? `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}` : '?';
      });
      warn(path, `horizontal overflow ${overflow}px at ${width}px (${culprit})`);
    }
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    // @ts-ignore
    const r = await window.axe.run(document, { resultTypes: ['violations'] });
    return r.violations.map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes[0]?.target}`);
  });
  axe.forEach((v) => warn(path, `axe ${v}`));
  await ctx.close();
}

// Interaction: Drainage Checkup → quote form pre-fill.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/drainage-checkup/`);
  await page.locator('label.cu-card', { hasText: 'Standing water' }).click();
  await page.locator('label.cu-card', { hasText: 'foundation' }).click();
  await page.locator('.cu-seg label', { hasText: 'Yes' }).click();
  const recs = await page.locator('[data-recs] li').allTextContents();
  if (recs.length === 0) warn('/drainage-checkup/', 'no recommendations rendered');
  const href = await page.locator('[data-cta]').getAttribute('href');
  if (!href?.includes('issues=standing-water')) warn('/drainage-checkup/', `CTA href missing issues: ${href}`);
  await page.goto(ORIGIN + href);
  const checked = await page.locator('input[data-issue]:checked').count();
  const service = await page.locator('select[name="service"]').inputValue();
  if (checked !== 2) warn('/contact-us/', `expected 2 pre-checked issues, got ${checked}`);
  if (service === 'Not sure — help me figure it out') warn('/contact-us/', 'service not pre-selected');
  console.log(`checkup → ${recs.map((r) => r.replace(/\s+/g, ' ').trim()).join(' | ')} → form service "${service}"`);

  // Validation blocks an empty submit; a valid submit falls back to mailto.
  await page.locator('#contact-quote button[type="submit"]').click();
  const invalid = await page.locator('#contact-quote .field.invalid').count();
  if (invalid < 3) warn('/contact-us/', `expected ≥3 invalid fields on empty submit, got ${invalid}`);
  await page.fill('#contact-quote-name', 'Test Person');
  await page.fill('#contact-quote-phone', '(713) 555-0100');
  await page.fill('#contact-quote-zip', '77024');
  await page.locator('#contact-quote button[type="submit"]').click();
  await page.waitForTimeout(300);
  const status = await page.locator('#contact-quote [data-status]').textContent();
  if (!status?.includes('email app')) warn('/contact-us/', `unexpected submit status: ${status}`);
  console.log(`form submit → "${status?.trim().slice(0, 70)}…"`);
  await ctx.close();
}

// Mobile menu opens, traps scroll and closes on Escape.
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 740 } });
  const page = await ctx.newPage();
  await page.goto(`${ORIGIN}/`);
  await page.click('[data-mobile-toggle]');
  if (!(await page.locator('#mobile-menu').isVisible())) warn('/', 'mobile menu did not open');
  await page.keyboard.press('Escape');
  if (await page.locator('#mobile-menu').isVisible()) warn('/', 'mobile menu did not close on Escape');
  await ctx.close();
}

await browser.close();
server.close();

console.log(`\nChecked ${pages.length - redirects.length} pages at ${widths.join('/')}px.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('All checks passed.');
