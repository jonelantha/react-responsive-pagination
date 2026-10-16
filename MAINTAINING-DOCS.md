# Keeping the README, docs and package metadata in step

Some facts and wording live in more than one place. When you change one, check the others in the same row.

| Content                               | Where it lives                                                                                             | Also update                                                                                                                                                                                                    |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reasons to use, when not to use it    | README: top checklist, "When to choose something else", "Quality and maintenance"                          | Docs FAQ entry "Is this the right pagination component?" (`packages/docs/src/content/docs/faq.mdx`)                                                                                                            |
| Integration notes                     | README: "Integration notes"                                                                                | Docs: "Integration notes" and "Minimal example" in `installation-compatibility.mdx` (ESM only is in its Compatibility list)                                                                                    |
| Package description and keywords      | `packages/react-responsive-pagination/package.json`                                                        | README tagline, docs index description and the default in `BaseHead.astro`, and the GitHub About text (a repository setting)                                                                                   |
| Prop descriptions, defaults, `@since` | TSDoc on `ResponsivePaginationProps` (`packages/react-responsive-pagination/src/ResponsivePagination.tsx`) | Docs prop pages (`packages/docs/src/content/props/`). Each prop's `@see` link points at its anchor on the props page                                                                                           |
| Opaque behaviours                     | TSDoc on `NarrowBehaviour` and `LabelBehaviour`                                                            | `narrowProps.mdx` and `legacyProps.mdx`                                                                                                                                                                        |
| Size claim ("under 5 kB gzipped")     | README: top checklist and "Quality and maintenance". Docs: FAQ entry                                       | See below                                                                                                                                                                                                      |
| Page titles and descriptions          | Frontmatter of each page in `packages/docs/src/content/docs/`                                              | Keep them unique. Titles about 30 characters or fewer (the site name is appended and search results cut off near 60), descriptions about 160 or fewer. Avoid apostrophes (they are single-quoted YAML strings) |

## Size claim

The docs state an approximate size only, never an exact figure or a method. Search the README and the docs for `kB` to find every place.

Run `npm run package-size` only for changes that could alter the shipped size: runtime code in `packages/react-responsive-pagination/src` (not tests, comments or type-only changes), the `prop-types` dependency, or the library's compiler settings. It reports a figure; nothing checks it.

Other tools measure differently. Bundlephobia reads about 15% higher than the script (4.72 kB against 4.10 kB for 2.14.0), and its listing is where readers will look.

## Writing rules

- State facts that can be checked. Leave out figures that go stale, such as downloads, stars and release counts.
- Use an impersonal voice.
- Do not address the reader ("assistants should...").
- A change to `package.json` (description, keywords) or to the README reaches npm only with a release. Commit README changes as `docs(readme):`, which is the one docs scope that triggers a release.
