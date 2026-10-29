import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { load } from 'cheerio';
import { englishPages, visitTranslatable, normalize, origin } from './locale-shared.mjs';

const translations = JSON.parse(await readFile(new URL('../src/i18n/es.json', import.meta.url), 'utf8'));
const pages = await englishPages();
const paths = new Set(pages.map((p) => p.path));
const missing = new Set();
const translate = (text) => {
  const value = translations[normalize(text)];
  if (value === undefined) { missing.add(normalize(text)); return text; }
  return value;
};
const local = (url) => {
  if (!url) return url;
  const absolute = url.startsWith(origin);
  const raw = absolute ? url.slice(origin.length) : url;
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.startsWith('/es/')) return url;
  const path = raw.split(/[?#]/)[0];
  if (!paths.has(path)) return url;
  return (absolute ? origin : '') + '/es' + raw;
};
const localJson = (value, key = '') => {
  if (Array.isArray(value)) return value.map((v) => localJson(v, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k,localJson(v,k)]));
  return typeof value === 'string' && ['url','item','href'].includes(key) ? local(value) : value;
};
function alternates($, path, spanish) {
  $('link[rel=alternate][hreflang]').remove();
  for (const [lang, href] of [['en-US', path], ['es-US', '/es' + path], ['x-default', path]]) $('head').append(`<link rel="alternate" hreflang="${lang}" href="${origin}${href}">`);
  $('[data-language=en]').attr('href', path).attr('aria-current', spanish ? null : 'page');
  $('[data-language=es]').attr('href', '/es' + path).attr('aria-current', spanish ? 'page' : null);
}
const output = [];
const titleOverrides = {
  '/emergency/': 'Emergencias de drenaje 24/7 en Houston | Flood Mitigators',
  '/faq/': 'Preguntas sobre drenaje en Houston | Flood Mitigators',
  '/services/': 'Servicios de drenaje en Houston | Flood Mitigators',
  '/french-drain-installation-houston/': 'Drenajes franceses en Houston | Flood Mitigators',
  '/sump-pump-installation-houston/': 'Bombas de sumidero en Houston | Flood Mitigators',
  '/grading-drainage-houston/': 'Nivelación de terrenos en Houston | Flood Mitigators',
  '/downspout-catch-basin-houston/': 'Bajantes y cajas de captación en Houston | Flood Mitigators',
  '/channel-drain-houston/': 'Canaletas de drenaje en Houston | Flood Mitigators',
  '/dry-creek-bed-houston/': 'Cauces secos de piedra en Houston | Flood Mitigators',
  '/culvert-installation-houston/': 'Instalación de alcantarillas en Houston | Flood Mitigators',
  '/culvert-cleaning-houston/': 'Limpieza de alcantarillas en Houston | Flood Mitigators',
  '/drain-cleaning-services-houston/': 'Limpieza de drenajes en Houston | Flood Mitigators',
  '/stormwater-cleaning-houston/': 'Limpieza pluvial en Houston | Flood Mitigators',
  '/hydro-jetting-services-houston/': 'Limpieza de tuberías a presión en Houston | Flood Mitigators',
  '/rootrerouter/': 'Root Re-Router en Houston | Flood Mitigators',
};
for (const page of pages) {
  const html = await readFile(page.file, 'utf8');
  const en = load(html);
  alternates(en, page.path, false);
  en('meta[property="og:locale"]').remove(); en('head').append('<meta property="og:locale" content="en_US">');
  output.push({ file:page.file, html:en.html() });
  const es = load(html);
  visitTranslatable(es, translate);
  es('html').attr('lang', 'es-US');
  es('body').attr('data-locale', 'es');
  es('iframe[data-google-business-map]').each((_, el) => es(el).attr('src', es(el).attr('src').replaceAll('!1sen', '!1ses')));
  es('[href]').each((_, el) => { if (!es(el).is('[data-language], link[rel=canonical]')) es(el).attr('href', local(es(el).attr('href'))); });
  es('link[rel=canonical]').attr('href', origin + '/es' + page.path);
  es('meta[property="og:url"]').attr('content', origin + '/es' + page.path);
  es('head').append('<meta property="og:locale" content="es_US">');
  es('script[type="application/ld+json"],script[data-checkup-data]').each((_, el) => es(el).text(JSON.stringify(localJson(JSON.parse(es(el).text()))).replace(/</g, '\\u003c')));
  // Brand suffixes can push a translated search title past a useful length.
  const title = titleOverrides[page.path] || es('head > title').text();
  const displayTitle = title.length > 70 ? title.replace(/\s*\|\s*Flood Mitigators$/, '') : title;
  es('head > title').text(displayTitle); es('meta[property="og:title"]').attr('content', displayTitle);
  es('.language-switch').attr('aria-label', 'Idioma del sitio');
  alternates(es, page.path, true);
  const target = page.path.endsWith('.html') ? join('dist/es', page.path) : join('dist/es', page.path, 'index.html');
  output.push({file:target,html:es.html()});
}
if (missing.size) { await writeFile('translation-missing.json', JSON.stringify([...missing], null, 2)); throw new Error(`${missing.size} Spanish translations missing. Run npm run translations:sync after the Astro build.`); }
for (const {file,html} of output) { await mkdir(dirname(file),{recursive:true}); await writeFile(file,html); }
// Add the Spanish counterparts to Astro's canonical sitemap.
const sitemapPath = 'dist/sitemap-0.xml';
let xml = await readFile(sitemapPath,'utf8');
xml = xml.replace(/<url>[\s\S]*?<\/url>/g, (node) => node.includes(`<loc>${origin}/es/`) ? '' : node);
xml = xml.replace('</urlset>', [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => '<url>'+m[1].replace(/<loc>(.*?)<\/loc>/, (_, url) => `<loc>${origin}/es${url.slice(origin.length)}</loc>`)+'</url>').join('')+'</urlset>');
await writeFile(sitemapPath,xml);
console.log(`Built ${pages.length} English + ${pages.length} Spanish pages from saved translations.`);
