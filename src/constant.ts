export const INLINE_SCRIPTS_DEFAULT_OPTIONS = {
  disable: false,
  // inline script output dir
  output: '.output/public/_nuxt',
  // cdn url
  cdnURL: process.env.NUXT_APP_CDN_URL || '/_nuxt',
};
