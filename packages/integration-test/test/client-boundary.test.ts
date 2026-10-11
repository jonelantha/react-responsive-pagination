import { test, describe } from 'node:test';
import { deepEqual, doesNotMatch } from 'node:assert';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The built package must mark exactly the component module(s) as client
// modules. See the note at the top of src/index.tsx for why the directive
// must not be on the barrel.
const EXPECTED_CLIENT_MODULES = ['ResponsivePagination.js'];

const distDir = fileURLToPath(
  new URL('.', import.meta.resolve('react-responsive-pagination')),
);

const modules = readdirSync(distDir, { recursive: true, encoding: 'utf8' })
  .filter(file => file.endsWith('.js'))
  .map(file => ({ file, source: readFileSync(join(distDir, file), 'utf8') }));

describe('client boundary', () => {
  test('only the component module has a use client directive', () => {
    const clientModules = modules
      .filter(({ source }) => hasUseClientDirective(source))
      .map(({ file }) => file)
      .sort();

    deepEqual(
      clientModules,
      EXPECTED_CLIENT_MODULES,
      "'use client' must be on the component module(s) only, not on the index barrel - see src/index.tsx",
    );
  });

  test('client modules do not use export * (unsupported by webpack in a client boundary)', () => {
    for (const { file, source } of modules.filter(({ source }) =>
      hasUseClientDirective(source),
    )) {
      doesNotMatch(source, /^\s*export\s*\*/m, `${file} must not use export *`);
    }
  });
});

// a directive only counts when it is the first statement (comments may precede it)
function hasUseClientDirective(source: string) {
  const withoutLeadingComments = source.replace(
    /^(?:\s|\/\/[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*/,
    '',
  );
  return /^(['"])use client\1\s*;?/.test(withoutLeadingComments);
}
