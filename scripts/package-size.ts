// Reports the size of the built component as an app would ship it.
//
// Usage: npm run package-size
//
// Rebuilds the library, then bundles `import ResponsivePagination from
// 'react-responsive-pagination'` (just the component, none of the helpers) with
// Vite, minified, with react and react-dom external and NODE_ENV=production.
//
// This only reports a figure; nothing checks it and nothing updates it. The docs
// only state an approximate size (see MAINTAINING-DOCS.md for when to re-run this).
// Other tools (for example Bundlephobia) minify differently and give slightly
// different figures, so the docs should never state an exact one.

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { build } from 'vite';

const packageDir = new URL(
  '../packages/react-responsive-pagination/',
  import.meta.url,
);
const distIndex = fileURLToPath(new URL('dist/index.js', packageDir));
const { version } = JSON.parse(
  readFileSync(new URL('package.json', packageDir), 'utf8'),
);

const built = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' });
if (built.status !== 0) {
  console.error('npm run build failed, not measuring');
  process.exit(built.status ?? 1);
}

const withPropTypes = await measure([]);
const libraryOnly = await measure(['prop-types']);

console.log(
  `\nreact-responsive-pagination ${version}: the ResponsivePagination component`,
);
console.log(
  '(minified, react and react-dom external, NODE_ENV=production, gzip level 9)\n',
);
console.log(format('with its dependency (prop-types)', withPropTypes));
console.log(format('library code only', libraryOnly));

async function measure(external: string[]) {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    plugins: [
      {
        name: 'virtual-entry',
        resolveId: id => (id === 'virtual:entry' ? '\0virtual:entry' : undefined),
        load: id =>
          id === '\0virtual:entry'
            ? `export { default } from ${JSON.stringify(distIndex)};`
            : undefined,
      },
    ],
    build: {
      write: false,
      minify: true,
      modulePreload: false,
      rollupOptions: {
        input: 'virtual:entry',
        external: ['react', 'react-dom', ...external],
      },
    },
  });

  const outputs = (Array.isArray(result) ? result : [result]).flatMap(item =>
    'output' in item ? item.output : [],
  );
  const code = outputs
    .filter(item => item.type === 'chunk')
    .map(item => item.code)
    .join('\n');

  return {
    minified: Buffer.byteLength(code),
    gzipped: gzipSync(code, { level: 9 }).length,
  };
}

function format(
  label: string,
  { minified, gzipped }: Awaited<ReturnType<typeof measure>>,
) {
  const kb = (bytes: number) => (bytes / 1000).toFixed(2).padStart(6);

  return `${label.padEnd(36)} ${kb(minified)} kB minified   ${kb(gzipped)} kB gzipped   (${minified} B / ${gzipped} B)`;
}
