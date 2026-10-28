import { test } from 'node:test';
import { deepEqual } from 'node:assert/strict';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';

// The Markdown versions of the pages are built into dist/ and compared with the
// copies in test/snapshots/. Build the docs first (npm run build), and after an
// intended change run `npm run test:update` and review the diff.
const distDir = new URL('../dist/', import.meta.url);
const snapshotsDir = new URL('./snapshots/', import.meta.url);

const built = readMarkdownFiles(distDir);

// Checked before the snapshots are touched, updating them replaces them all
if (built.size === 0) {
  throw new Error(
    'No Markdown pages in dist/, build the docs first (npm run build-docs)',
  );
}

if (process.execArgv.includes('--test-update-snapshots')) {
  replaceMarkdownFiles(snapshotsDir, built);
}

const snapshots = readMarkdownFiles(snapshotsDir);

test('there is a snapshot for each page and no others', () => {
  deepEqual([...snapshots.keys()], [...built.keys()]);
});

// Compared as lines, so a failure shows a line diff
for (const [name, text] of built) {
  test(name, () => {
    deepEqual(text.split('\n'), (snapshots.get(name) ?? '').split('\n'));
  });
}

/** The .md files in a directory by name, empty if the directory doesn't exist. */
function readMarkdownFiles(directory: URL) {
  if (!existsSync(directory)) return new Map<string, string>();

  const names = readdirSync(directory).filter(name => name.endsWith('.md'));

  return new Map(
    names.sort().map(name => [name, readText(new URL(name, directory))]),
  );
}

/** Makes the directory hold exactly these files. */
function replaceMarkdownFiles(directory: URL, files: Map<string, string>) {
  rmSync(directory, { recursive: true, force: true });
  mkdirSync(directory, { recursive: true });

  for (const [name, text] of files) {
    writeFileSync(new URL(name, directory), text);
  }
}

function readText(file: URL) {
  return readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
}
