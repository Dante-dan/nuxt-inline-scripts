import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { createHash } from 'crypto';
import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin';
import { join, dirname } from 'path';
import { useNuxt } from '@nuxt/kit';
import { INLINE_SCRIPTS_DEFAULT_OPTIONS } from './constant';

// generate a short hash by content
function generateHash(content: string) {
  return createHash('sha256').update(content).digest('hex').slice(0, 8);
}

function extractInlineScript(
  html: string,
  options: { cdnURL: string; output: string }
) {
  const inlineScript = html.matchAll(/<script( [^>]*)?>([\s\S]*?)<\/script>/g);
  const { output, cdnURL } = options;
  for (const [script, _, scriptContent] of inlineScript) {
    if (!scriptContent.trim()) {
      continue;
    }
    const hash = generateHash(scriptContent);
    const filename = `inline-script-${hash}.js`;
    let filePath = join(output, filename);
    const path = cdnURL.endsWith('/')
      ? `${cdnURL}${filename}`
      : `${cdnURL}/${filename}`;
    if (procss?.dev || process?.env?.NODE_ENV === 'development') {
      // Be consistent with the production environment
      filePath = join('.nuxt/dev/public', filename);
    }
    if (!existsSync(filePath)) {
      // if no directory, create it
      if (!existsSync(dirname(filePath))) {
        mkdirSync(dirname(filePath), { recursive: true });
      }
      writeFileSync(filePath, scriptContent);
    }
    html = html.replace(script, `<script src="${path}"></script>`);
  }
  return html;
}

export default defineNitroPlugin(async nitroApp => {
  nitroApp.hooks.hook(
    // @ts-ignore
    'render:html',
    (html: {
      head: string[];
      body: string[];
      bodyPrepend: string[];
      bodyAppend: string[];
    }) => {
      const { options: nuxtOptions } = useNuxt();
      // @ts-ignore
      const { inlineScripts } = nuxtOptions;
      const options = { ...INLINE_SCRIPTS_DEFAULT_OPTIONS, ...inlineScripts };
      if (Array.isArray(html.head) && html.head.length > 0) {
        html.head = html.head.map(item => extractInlineScript(item, options));
      }
      if (Array.isArray(html.body) && html.body.length > 0) {
        html.body = html.body.map(item => extractInlineScript(item, options));
      }
      if (Array.isArray(html.bodyPrepend) && html.bodyPrepend.length > 0) {
        html.bodyPrepend = html.bodyPrepend.map(item =>
          extractInlineScript(item, options)
        );
      }
      if (Array.isArray(html.bodyAppend) && html.bodyAppend.length > 0) {
        html.bodyAppend = html.bodyAppend.map(item =>
          extractInlineScript(item, options)
        );
      }
    }
  );
});
//
