import { test, describe } from 'node:test';
import { deepEqual, ok } from 'node:assert';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

// The shipped types are what editors and agents read, so every prop needs a doc
// comment. The comments are kept terse: a sentence, and a @see link to the
// prop's anchor on the docs site (where the full explanation lives).
const typesPath = new URL(
  './index.d.ts',
  import.meta.resolve('react-responsive-pagination'),
);
// (api-extractor writes CRLF line endings by default)
const typesText = readFileSync(typesPath, 'utf8').replaceAll('\r\n', '\n');
const sourceFile = ts.createSourceFile(
  'index.d.ts',
  typesText,
  ts.ScriptTarget.Latest,
  true,
);

const props = getProps('ResponsivePaginationProps');

describe('props documentation', () => {
  test('finds the props', () => {
    ok(props.length > 20, `expected the full prop list, found ${props.length}`);
  });

  test('every prop has a description', () => {
    const undocumented = props
      .filter(({ doc }) => !description(doc))
      .map(({ name }) => name);

    deepEqual(
      undocumented,
      [],
      `props without a doc comment: ${undocumented.join(', ')} (see src/ResponsivePagination.tsx)`,
    );
  });

  test('every prop links to its own anchor in the props reference', () => {
    const wrong = props
      .filter(
        ({ name, doc }) =>
          !doc.includes(
            `@see https://react-responsive-pagination.elantha.com/props#${name}\n`,
          ),
      )
      .map(({ name }) => name);

    deepEqual(
      wrong,
      [],
      `props missing a correct @see link to .../props#<name>: ${wrong.join(', ')}`,
    );
  });
});

function getProps(typeName: string) {
  const alias = sourceFile.statements.find(
    (statement): statement is ts.TypeAliasDeclaration =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === typeName,
  );

  if (!alias || !ts.isTypeLiteralNode(alias.type))
    throw new Error(`${typeName} not found`);

  return alias.type.members.filter(ts.isPropertySignature).map(member => ({
    name: member.name.getText(sourceFile),
    doc: leadingDocComment(member),
  }));
}

function leadingDocComment(node: ts.Node) {
  const ranges = ts.getLeadingCommentRanges(typesText, node.getFullStart()) ?? [];
  const docRange = ranges.findLast(({ pos }) => typesText.startsWith('/**', pos));

  return docRange ? typesText.slice(docRange.pos, docRange.end) + '\n' : '';
}

// the comment text before the first @tag
function description(doc: string) {
  return doc
    .replace(/^\/\*\*|\*\/\s*$/g, '')
    .split('\n')
    .map(line => line.replace(/^\s*\* ?/, ''))
    .join('\n')
    .split(/^@/m)[0]
    .trim();
}
