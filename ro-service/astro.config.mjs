import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://roservicesupport.co.in',
  output: 'server',
  adapter: vercel(),
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false }
});