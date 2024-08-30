import {
  defineNuxtModule,
  createResolver,
  addServerPlugin,
  addServerHandler,
} from '@nuxt/kit';
import {
  INLINE_SCRIPTS_DEFAULT_OPTIONS,
  INTERNAL_PREFIX,
} from './runtime/constant.js';

export default defineNuxtModule<typeof INLINE_SCRIPTS_DEFAULT_OPTIONS>({
  meta: {
    name: 'nuxt-inline-scripts',
    configKey: 'inlineScripts',
  },
  defaults: INLINE_SCRIPTS_DEFAULT_OPTIONS,
  setup(_options: typeof INLINE_SCRIPTS_DEFAULT_OPTIONS, _nuxt: any) {
    const resolver = createResolver(import.meta.url);
    // inlineScripts is true by default, so we don't need to do anything
    if (!_options?.disable) {
      return;
    }
    const ssr = _nuxt?.options?.ssr ?? true;
    if (ssr) {
      console.error(
        'nuxt-inline-scripts is not compatible with SSR. Please set ssr: false in your nuxt.config.ts'
      );
      return;
    }
    // @ts-ignore
    const combineOptions = { ..._options };
    _nuxt.hook('nitro:config', (nitroConfig: any) => {
      nitroConfig.runtimeConfig ||= {};
      nitroConfig.runtimeConfig.nitro ||= {};
      nitroConfig.runtimeConfig.inlineScripts = {
        ...combineOptions,
      };
    });
    // _nuxt.hook('vite:extendConfig', (viteInlineConfig: any) => {
    //   viteInlineConfig.optimizeDeps ||= {};
    //   viteInlineConfig.optimizeDeps.include ||= [];
    //   viteInlineConfig.optimizeDeps.include.push('nuxt-inline-scripts');
    // });
    addServerHandler({
      route: `${INTERNAL_PREFIX}/*`,
      handler: resolver.resolve('./runtime/server/inline-scripts.get'),
    });
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addServerPlugin(
      resolver.resolve('./runtime/server/disable-inline-scripts')
    );
  },
});
