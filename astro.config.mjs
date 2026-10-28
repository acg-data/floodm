// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const noindex = ['/thank-you/', '/privacy/'];

export default defineConfig({
  site: 'https://floodmitigators.com',
  trailingSlash: 'always',
  // Old floodmitigators.com URLs that moved. Hosts that read public/_redirects
  // (Cloudflare Pages, Netlify) serve real 301s; elsewhere these pages redirect.
  redirects: {
    '/flood-tips-faq-2/': '/faq/',
    '/rootrerouter/': '/hydro-jetting-services-houston/',
  },
  integrations: [
    sitemap({
      filter: (page) => !noindex.some((p) => page.endsWith(p)) && !/\/(flood-tips-faq-2|rootrerouter)\/$/.test(page),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
