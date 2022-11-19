import type { Transformer } from 'unified';
import type { Node as BaseNode, Parent as BaseParent } from 'unist';

type FileMeta = { headings: { value: string; depth: number }[] };
interface Node extends BaseNode {
  value: string;
  depth: number;
}
type Parent = BaseParent<Node>;

export const remarkHeadingsPlugin = function remarkHeadingsPlugin() {
  const transformer: Transformer<Node> = (tree, file) => {
    file.data.meta ??= {};

    (file.data.meta as FileMeta).headings = [...getHeadingNodes(tree)].map(
      headingNode => ({
        value: getTextValue(headingNode),
        depth: headingNode.depth,
      }),
    );
  };
  return transformer;
};

function* getHeadingNodes(node: Node): Generator<Node> {
  if (node.type === 'heading') {
    yield node;
    return;
  }

  if (!isParentNode(node)) return;

  for (const childNode of node.children) {
    yield* getHeadingNodes(childNode);
  }
}

function isParentNode(node: Node | Parent): node is Parent {
  return 'children' in node && Array.isArray(node.children);
}

function getTextValue(node: Node): string {
  if (node.type === 'text') {
    return node.value;
  }

  if (!isParentNode(node) || node.children.length !== 1) {
    console.error('Only one child supported');
    throw new Error('Only one child supported');
  }

  return getTextValue(node.children[0]);
}
