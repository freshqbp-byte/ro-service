import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false }
});