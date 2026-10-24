import tsconfig from '../../../tsconfig.json';
import type { JsxElement } from './mdx.ts';

/** Finds the root-relative path of the file an element's component was imported from, throws if it wasn't imported. */
type FindImport = (element: JsxElement) => string;

/**
 * Reads the imports from the MDX ESM blocks of a page, and returns the function to find
 * which one an element's component came from. Only `import Name from '...'` (single
 * quotes) is supported, anything else throws.
 */
export function readImports(esmBlocks: string[]): FindImport {
  const imports = new Map<string, string>();

  for (const esm of esmBlocks) {
    const rest = esm.replace(
      /import\s+([\w$]+)\s+from\s+'([^']+)';?/g,
      (_, name: string, specifier: string) => {
        imports.set(name, specifier);

        return '';
      },
    );

    if (rest.trim()) throw new Error(`Unsupported MDX ESM: ${rest.trim()}`);
  }

  return element => {
    const specifier = imports.get(element.name ?? '');

    if (!specifier) throw new Error(`<${element.name}> is not imported`);

    return resolve(specifier);
  };
}

// Only `"@name/*": ["./src/dir/*"]` paths are supported, anything else throws
const aliases = Object.entries(tsconfig.compilerOptions.paths).map(
  ([alias, targets]) => {
    const [, prefix] = alias.match(/^(.+\/)\*$/) ?? [];
    const [, directory] =
      (targets.length === 1 && targets[0]?.match(/^\.(\/.+\/)\*$/)) || [];

    if (!prefix || !directory) {
      throw new Error(`Unsupported tsconfig path alias: ${alias}`);
    }

    return { prefix, directory };
  },
);

/** The root-relative path a specifier points at. Only tsconfig path aliases are supported, anything else throws. */
function resolve(specifier: string) {
  const alias = aliases.find(({ prefix }) => specifier.startsWith(prefix));

  if (!alias) throw new Error(`Unsupported import specifier: ${specifier}`);

  return alias.directory + specifier.slice(alias.prefix.length);
}
