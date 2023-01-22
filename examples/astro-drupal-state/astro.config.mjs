import { defineConfig } from 'astro/config';
import astroDrupalState from '@gdwc/astro-drupal-state'

// https://astro.build/config
export default defineConfig({
    integrations: [astroDrupalState()]
});
