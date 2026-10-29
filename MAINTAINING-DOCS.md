# Keeping the README, docs and package metadata in step

Some facts and wording live in more than one place. When you change one, check the others in the same item.

- **Reasons to use, when not to use it**: README (top checklist, "When to choose something else", "Quality and maintenance") and the docs FAQ entry "Is this the right pagination component?" in `packages/docs/src/content/docs/faq.mdx`.
- **Integration notes**: README "Integration notes", and "Integration notes" and "Minimal example" in `packages/docs/src/content/docs/installation-compatibility.mdx` (ESM only is in its Compatibility list).
- **Package description and keywords**: `packages/react-responsive-pagination/package.json`, the README tagline, the docs index description, the default in `BaseHead.astro` and the GitHub About text (a repository setting).
- **Prop descriptions, defaults, `@since`**: TSDoc on `ResponsivePaginationProps` in `packages/react-responsive-pagination/src/ResponsivePagination.tsx`, and the docs prop pages in `packages/docs/src/content/props/`.
- **Opaque behaviours**: TSDoc on `NarrowBehaviour` and `LabelBehaviour`, and `narrowProps.mdx` and `legacyProps.mdx`.
- **Size claim ("under 5 kB gzipped")**: README (top checklist, "Quality and maintenance") and the docs FAQ entry. See "Size claim".
- **Page titles, descriptions and summaries**: frontmatter of each page in `packages/docs/src/content/docs/`. Keep them unique, titles about 30 characters or fewer (the site name is appended and search results cut off near 60), descriptions about 160 or fewer, and each `summary` (its one-line entry in the page list of the Markdown home page) about 100 or fewer. Avoid apostrophes (they are single-quoted YAML strings).
- **Markdown home page summary**: the `MdOnly` block in `packages/docs/src/content/docs/index.mdx` (package summary, compatibility and required props, GitHub and npm links; the page list under it is generated from the pages' frontmatter). Keep the compatibility line in step with `installation-compatibility.mdx` and the README, and the GitHub and npm links with `Footer.astro`.

## Size claim

The docs state an approximate size only, never an exact figure or a method. Search the README and the docs for `kB` to find every place.

Run `npm run package-size` only for changes that could alter the shipped size: runtime code in `packages/react-responsive-pagination/src` (not tests, comments or type-only changes), the `prop-types` dependency, or the library's compiler settings. It reports a figure; nothing checks it. Bundlephobia reads higher than the script, and its listing is where readers will look.

## Markdown versions of the docs pages

Each page in `packages/docs/src/content/docs/` is also published as Markdown, at `/<page>.md` (`/index.md` for the home page). `packages/docs/src/pages/[...slug].md.ts` serves it, generated from the page's MDX source by the code in `packages/docs/src/markdown/exporter/`.

- Each file starts with front matter (`title`, `description` and `index`), written by the endpoint.
- Plain Markdown is copied as written. A component or an `{expression}` inside a paragraph, list or table cell fails the build, and `<br />` is the one HTML tag allowed.
- Every component used as an element in a page needs a `markdownRenderer` export in its `.astro` file: `'skip'` leaves the element out, `'unwrap'` keeps only its children, or a function `(props, children) => string` (it can be async) typed with `MarkdownRenderer<Props>` from `packages/docs/src/markdown/renderer.ts`. A renderer must not use the network or the clock, so the same source always gives the same Markdown.
- The exporter fails the build on anything it does not support. Add support only for what a page needs, and keep failing for the rest.
- `WebOnly` leaves its content out of the Markdown, and `MdOnly` shows its content only there.
- `packages/docs/test/snapshots/` holds the expected Markdown of every page. `npm run test-docs` (after `npm run build-docs`) compares the built files with them, so a content or exporter change shows up as a failing page. After an intended change run `npm run test-docs:update` and review the diff; do not update the snapshots just to make a failure pass.
- Links to other docs pages are rewritten to their `.md` pages. Their fragments are not checked.

## Writing rules

- State facts that can be checked. Leave out figures that go stale, such as downloads, stars and release counts.
- Use an impersonal voice.
- Do not address the reader ("assistants should...").
- A change to `package.json` (description, keywords) or to the README reaches npm only with a release. Commit README changes as `docs(readme):`, which is the one docs scope that triggers a release.
