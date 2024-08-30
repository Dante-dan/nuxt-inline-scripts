import { readFileSync, existsSync } from 'node:fs';
import { join } from 'pathe';
import { INLINE_SCRIPTS_DEFAULT_OPTIONS, INTERNAL_PREFIX } from '../constant';
import { defineEventHandler } from 'h3';
export default defineEventHandler(async event => {
  const filename = event.node.req.url
    .toString()
    .replace(INTERNAL_PREFIX, '')
    .split('/')[1];
  const filePath = join(INLINE_SCRIPTS_DEFAULT_OPTIONS.output, filename);
  try {
    const file = readFileSync(filePath);
    return await event.respondWith(
      new Response(file, {
        status: 200,
        headers: {
          'cache-control': 'public, max-age=3600',
          'content-type': 'text/javascript',
        },
      })
    );
  } catch (_) {
    return await event.respondWith(
      new Response('Not Found, Please Check InlineScripts', { status: 404 })
    );
  }
});
