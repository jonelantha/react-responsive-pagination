import { test } from 'node:test';
import { deepEqual } from 'node:assert/strict';
import {
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

if (process.execArgv.includes('--test-update-snapshots')) {
  updateSnapshots();
}

const built = readMarkdownFiles(distDir);
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

function updateSnapshots() {
  rmSync(snapshotsDir, { recursive: true, force: true });
  mkdirSync(snapshotsDir, { recursive: true });

  for (const [name, text] of readMarkdownFiles(distDir)) {
    writeFileSync(new URL(name, snapshotsDir), text);
  }
}

function readMarkdownFiles(directory: URL) {
  const files = readdirSync(directory).filter(name => name.endsWith('.md'));

  return new Map(
    files.sort().map(name => [name, readText(new URL(name, directory))]),
  );
}

function readText(file: URL) {
  return readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
}
