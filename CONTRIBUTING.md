# Contributing

This is an npm workspaces monorepo. Run everything from the repo root.

```bash
npm ci
```

Note: `.npmrc` sets `ignore-scripts=true` (install scripts don't run), `save-exact=true` (new dependencies are pinned to exact versions) and `min-release-age=7` (npm only resolves package versions that were published at least 7 days ago, as a supply chain precaution; requires a recent npm — check `npm config get min-release-age` prints `7`). Don't override it (e.g. `--min-release-age=0`) without the maintainer's explicit approval, even if a newer version is available.

## Packages

| Package                                  | Purpose                                                           |
| ---------------------------------------- | ----------------------------------------------------------------- |
| `packages/react-responsive-pagination`   | The published library (source in `src/`, CSS themes in `themes/`) |
| `packages/integration-test`              | Node tests against the **built** library (SSR snapshot)           |
| `packages/browser-test`                  | Playwright tests (text snapshots) run against the test harnesses  |
| `packages/test-harness-react-{17,18,19}` | Vite apps that render the built library under each React version  |
| `packages/test-harness-lib`              | Shared code for the harnesses                                     |
| `packages/docs`                          | Astro docs site                                                   |

## Checks

These mirror CI (`.github/workflows/test.yml`); run them in this order:

```bash
npm run build              # library build (tsc + api-extractor). Required before integration/browser tests
npm run tsc                # type check all workspaces
npm run lint               # eslint all workspaces
npm run format-check       # prettier --check (fix with `npx prettier --write <files>`)
npm test                   # unit tests (node --test, src/**/*.test.ts)
npm run integration-test   # needs a fresh build
npm run build-docs         # docs site: lint + astro build
```

Browser tests (Playwright, chromium/firefox/webkit) — CI runs these once per React version:

```bash
npx playwright install                 # first time only
npm run browser-test-19                # also browser-test-18 / browser-test-17
```

`browser-test-<n>` is a thin wrapper around [scripts/browser-test.ts](scripts/browser-test.ts), which builds the library and the matching harness, serves the harness with `vite preview` and runs the whole suite. The script owns the port and the wiring between the harness and browser-test packages. Any extra args are passed to Playwright, e.g. `npm run browser-test-19 -- --project=chromium labels.spec.ts`. The harness is served on port 3000 plus the React version (3019 for React 19); set `PORT` to use another port (an occupied port makes the run fail instead of reusing whatever is listening).

## Development workflows

### Interactive (humans)

Three long-running processes, so a change to the component hot reloads in the harness:

```bash
npm start                    # library: tsc --watch (dev build)
npm run start-test-harness   # React 19 harness dev server, uses the watched library
npm run browser-test-dev     # headed Playwright (chromium) against the running harness
```

Other servers: `npm run start-docs` (docs dev server).

### Non-interactive (agents / scripts)

Avoid watch/dev servers, `--headed`, `--debug` and `--ui`. Use one-shot commands that exit:

```bash
npm run check                # build + tsc + lint + format + unit + integration tests + docs build

# Rebuilds the library and React 19 harness, then runs chromium only with the list reporter.
# Extra args go to Playwright, so narrow while debugging:
npm run browser-test-quick -- labels.spec.ts -g "ariaNextLabel"
```

- Playwright starts and stops the preview server itself; there's nothing to clean up.
- Failures print the diff against the committed text snapshot, which is usually enough. Add `--trace=on` for more detail.
- Run the full `npm run browser-test-<n>` matrix (all browsers, React 17/18/19) only as a final check.
- Add `--update-snapshots` only for intentional changes, then review the diff.
- `npm run check` should be kept in step with the core steps in `.github/workflows/test.yml`.

## Notes for changes

- `npm run build` prints three known api-extractor `ae-forgotten-export` warnings (`PaginationItem`, `CompositionItem`, `NarrowBehaviourMetaData`). These types appear in public signatures but are not part of the public API (they are deliberately opaque); we may fix this properly in v3. Report any other warning.
- Changing runtime code in `packages/react-responsive-pagination/src`, the README, the docs site or package metadata: see [MAINTAINING-DOCS.md](MAINTAINING-DOCS.md) for what to keep in step, including when to run `npm run package-size`.
- Run a single unit test file: `node --test packages/react-responsive-pagination/src/path/to/file.test.ts`.
- Snapshot files (`*.snapshot`, `*-snapshots/`) are committed. Update them deliberately and review the diff; don't regenerate to make a failure go away.
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `build:`, `ci:`, …) — releases are automated with semantic-release from `main`, so don't edit the version or `CHANGELOG.md` by hand. Only `feat`, `fix` and breaking changes (and `docs(readme)`) trigger a release. Use `build(deps):` for dependency updates that don't ship; use `fix(deps):` if the change affects consumers (runtime `dependencies` or `peerDependencies`).
- After a dependency update, run the full set of checks above, including all three browser-test React versions.
