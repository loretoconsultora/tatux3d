import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://tatux3d.com',
  // El sitio sigue siendo estático; solo /api/lead corre como función serverless.
  output: 'static',
  adapter: vercel(),
});
