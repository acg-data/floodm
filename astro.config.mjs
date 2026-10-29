// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://floodmitigators.com',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !/\/(thank-you|privacy)\/$/.test(page) })],
});
