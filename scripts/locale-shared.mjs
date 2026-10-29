import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { load } from 'cheerio';

export const normalize = (text) => text.replace(/\s+/g, ' ').trim();
export const origin = 'https://floodmitigators.com';
export const normalizePath = (path) => path.endsWith('/index.html') ? path.slice(0, -10) : path === '/index.html' ? '/' : path;
export async function englishPages(root = 'dist') {
  const pages = [];
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) { if (entry.name !== 'es') await walk(file); }
      else if (entry.name.endsWith('.html')) {
        const path = normalizePath('/' + relative(root, file).replaceAll('\\', '/'));
        pages.push({ file, path });
      }
    }
  }
  await walk(root);
  return pages;
}

const unchanged = new Set(['Flood Mitigators', 'Flood Snapshot', 'Flood Intelligence', 'Root Re-Router', 'Manny', 'NDS', 'Facebook', 'Instagram', 'Houston', 'Texas', 'EN', 'Español']);
export const shouldTranslate = (text) => {
  const value = normalize(text);
  return /[a-zA-Z]/.test(value) && !unchanged.has(value) && !/^https?:|^[^\s]+@[^\s]+$/.test(value);
};
export const stringKeys = new Set(['name', 'description', 'text', 'label', 'summary', 'serviceType', 'caption', 'jobTitle']);
export function visitJson(value, fn, key = '') {
  if (Array.isArray(value)) return value.map((item) => visitJson(item, fn, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, visitJson(v, fn, k)]));
  if (typeof value === 'string' && stringKeys.has(key) && shouldTranslate(value)) return fn(value);
  return value;
}

// Static, saved translations. No translation service is used by a visitor or
// during a normal build. The same HTML, assets and interactive controls are
// retained in both languages, with separately crawlable /es/ URLs.
export function visitTranslatable($, fn) {
  function visit(node) {
    if (node.type === 'text') {
      if (shouldTranslate(node.data)) {
        const key = normalize(node.data);
        const result = fn(key);
        if (result !== undefined) node.data = node.data.replace(node.data.trim(), result);
      }
      return;
    }
    if (node.type === 'script' || node.type === 'style' || ['script', 'style', 'noscript', 'code', 'pre'].includes(node.name)) return;
    if ($(node).is?.('.language-switch, .language-switch *')) return;
    for (const attr of ['alt', 'title', 'aria-label', 'placeholder', 'data-svc']) {
      const text = node.attribs?.[attr];
      if (text && shouldTranslate(text)) { const result = fn(normalize(text)); if (result !== undefined) $(node).attr(attr, result); }
    }
    if (node.name === 'meta') {
      const meta = $(node);
      if (['description', 'og:title', 'og:description'].includes(meta.attr('name') || meta.attr('property'))) {
        const value = meta.attr('content'); if (value && shouldTranslate(value)) { const result = fn(normalize(value)); if (result !== undefined) meta.attr('content', result); }
      }
    }
    for (const child of node.children || []) visit(child);
  }
  visit($.root()[0]);
  $('script[type="application/ld+json"], script[data-checkup-data]').each((_, el) => {
    const data = JSON.parse($(el).text());
    const result = visitJson(data, fn);
    $(el).text(JSON.stringify(result).replace(/</g, '\\u003c'));
  });
}

export async function collectStrings() {
  const keys = new Set();
  for (const page of await englishPages()) visitTranslatable(load(await readFile(page.file, 'utf8')), (text) => { keys.add(text); return text; });
  return [...keys].sort();
}
