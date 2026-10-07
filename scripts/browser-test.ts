// Builds the library and a test harness, then runs the Playwright browser tests
// against it.
//
// Usage: node scripts/browser-test.ts <react-version> [--quick] [playwright args...]
//
// --quick: chromium only with the list reporter (see packages/browser-test)
//
// This script owns the cross-package wiring so that the harness and browser-test
// packages don't need to know about each other (the port and how to serve the
// harness are passed to browser-test via PORT / SERVE_COMMAND).

import { spawnSync } from 'node:child_process';

const PORT = 3000;
const REACT_VERSIONS = ['17', '18', '19'];

const [reactVersion, ...restArgs] = process.argv.slice(2);
const quick = restArgs.includes('--quick');
const playwrightArgs = restArgs.filter(arg => arg !== '--quick');

if (!reactVersion || !REACT_VERSIONS.includes(reactVersion)) {
  console.error(
    `Usage: node scripts/browser-test.ts <${REACT_VERSIONS.join('|')}> [--quick] [playwright args...]`,
  );
  process.exit(2);
}

const harness = `test-harness-react-${reactVersion}`;

run('npm', ['run', 'build']);
run('npm', ['run', 'build', '-w', harness]);
run('npm', ['run', 'test-prod', '-w', 'browser-test', '--', ...playwrightArgs], {
  PORT: String(PORT),
  ...(quick && { BROWSER_TEST_QUICK: '1' }),
  SERVE_COMMAND: `npm run preview -w ${harness} -- --port ${PORT}`,
});

function run(command: string, args: string[], env: Record<string, string> = {}) {
  console.log(`\n> ${[command, ...args].join(' ')}`);

  const { status } = spawnSync(command, args, {
    stdio: 'inherit',
    env: { ...process.env, ...env },
  });

  if (status !== 0) process.exit(status ?? 1);
}
