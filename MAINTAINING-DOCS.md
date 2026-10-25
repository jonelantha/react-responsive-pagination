# Keeping the README, docs and package metadata in step

Some facts and wording live in more than one place. When you change one, check the others in the same row.

| Content                               | Where it lives                                                                                                                             | Also update                                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reasons to use, when not to use it    | README: top checklist, "When to choose something else", "Quality and maintenance"                                                          | Docs FAQ entry "Is this the right pagination component?" (`packages/docs/src/content/docs/faq.mdx`)                                                                                                            |
| Integration notes                     | README: "Integration notes"                                                                                                                | Docs: "Integration notes" and "Minimal example" in `installation-compatibility.mdx` (ESM only is in its Compatibility list)                                                                                    |
| Markdown home page summary            | The `MdOnly` block in `packages/docs/src/content/docs/index.mdx`: package summary, compatibility and required props, and the list of pages | Add each new docs page to its list. Keep the compatibility line in step with `installation-compatibility.mdx` and the README                                                                                   |
| Package description and keywords      | `packages/react-responsive-pagination/package.json`                                                                                        | README tagline, docs index description and the default in `BaseHead.astro`, and the GitHub About text (a repository setting)                                                                                   |
| Prop descriptions, defaults, `@since` | TSDoc on `ResponsivePaginationProps` (`packages/react-responsive-pagination/src/ResponsivePagination.tsx`)                                 | Docs prop pages (`packages/docs/src/content/props/`). Each prop's `@see` link points at its anchor on the props page                                                                                           |
| Opaque behaviours                     | TSDoc on `NarrowBehaviour` and `LabelBehaviour`                                                                                            | `narrowProps.mdx` and `legacyProps.mdx`                                                                                                                                                                        |
| Size claim ("under 5 kB gzipped")     | README: top checklist and "Quality and maintenance". Docs: FAQ entry                                                                       | See below                                                                                                                                                                                                      |
| Page titles and descriptions          | Frontmatter of each page in `packages/docs/src/content/docs/`                                                                              | Keep them unique. Titles about 30 characters or fewer (the site name is appended and search results cut off near 60), descriptions about 160 or fewer. Avoid apostrophes (they are single-quoted YAML strings) |

## Size claim

The docs state an approximate size only, never an exact figure or a method. Search the README and the docs for `kB` to find every place.

Run `npm run package-size` only for changes that could alter the shipped size: runtime code in `packages/react-responsive-pagination/src` (not tests, comments or type-only changes), the `prop-types` dependency, or the library's compiler settings. It reports a figure; nothing checks it.

Other tools measure differently. Bundlephobia reads about 15% higher than the script (4.72 kB against 4.10 kB for 2.14.0), and its listing is where readers will look.

## Markdown versions of the docs pages

Each page in `packages/docs/src/content/docs/` is also published as Markdown, at `/<page>.md` (`/index.md` for the home page). `packages/docs/src/pages/[...slug].md.ts` serves it, generated from the page's MDX source by the code in `packages/docs/src/markdown/exporter/`.

- Plain Markdown is copied as written. The build fails if a block would mean something different in plain Markdown than it does in MDX, such as a component or an `{expression}` inside a paragraph, list or table cell. `<br />` is the one HTML tag allowed there.
- Every component used as an element in a page needs a `markdownRenderer` export in its `.astro` file: `'skip'` leaves the element out, `'unwrap'` keeps only its children, or a function `(props, children) => string` typed with `MarkdownRenderer<Props>` from `packages/docs/src/markdown/renderer.ts` (which also has the `codeBlock` helper). Its props are the element's attributes, which must be plain strings or have no value. The build fails for a component without the export and for an attribute written as an expression.
- Imports in a page must be `import Name from '…'` through a tsconfig path alias. A `.mdx` import (the prop descriptions in `packages/docs/src/content/props/`) is expanded in place, an `.svg` import is skipped, and an `.astro` import needs the export above. `{/* comments */}` are ignored and any other expression fails the build.
- The `WebOnly` component leaves its content out of the Markdown, and `MdOnly` shows its content only there.
- Links to other docs pages (`/page` or `/page#fragment`) are published as `/page.md` or `/page.md#fragment`, and the home page `/` as `/index.md`. Links in code are left as written. The build fails for a link to a page that does not exist, for a relative link, and for any image or reference definition. The fragment itself is not checked.

The Markdown pages pick up new docs pages automatically, but the page list in the `MdOnly` block of `index.mdx` is written by hand.

## Writing rules

- State facts that can be checked. Leave out figures that go stale, such as downloads, stars and release counts.
- Use an impersonal voice.
- Do not address the reader ("assistants should...").
- A change to `package.json` (description, keywords) or to the README reaches npm only with a release. Commit README changes as `docs(readme):`, which is the one docs scope that triggers a release.
