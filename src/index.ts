import { defineNuxtModule, addServerPlugin, createResolver } from '@nuxt/kit';
import { INLINE_SCRIPTS_DEFAULT_OPTIONS } from './constant';
import type { NuxtModule } from '@nuxt/schema';
import { writeFileSync } from 'fs';

export default defineNuxtModule({
  meta: {
    name: 'nuxt-inline-scripts',
    configKey: 'inlineScripts',
  },
  defaults: INLINE_SCRIPTS_DEFAULT_OPTIONS,
  setup(options, nuxt) {
    // inlineScripts is true by default, so we don't need to do anything
    if (!options?.disable) {
      return;
    }
    const ssr = nuxt?.options?.ssr ?? true;
    if (ssr) {
      console.error(
        'nuxt-inline-scripts is not compatible with SSR. Please set ssr: false in your nuxt.config.ts'
      );
      return;
    }
    const resolver = createResolver(import.meta.url);
    addServerPlugin(resolver.resolve('./disable-inline-scripts'));
    // extract config
    writeFileSync('config.json', JSON.stringify(options));
  },
}) satisfies NuxtModule<typeof INLINE_SCRIPTS_DEFAULT_OPTIONS>;
