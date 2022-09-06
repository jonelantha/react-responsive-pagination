exports.remarkHeadingsPlugin = function remarkHeadingsPlugin() {
  return async function transformer(tree, file) {
    file.data.meta ??= {};

    file.data.meta.headings = [...getHeadingNodes(tree)].map(headingNode => ({
      value: getTextValue(headingNode),
      depth: headingNode.depth,
    }));
  };
};

function* getHeadingNodes(node) {
  if (node.type === 'heading') {
    yield node;
    return;
  }

  if (!Array.isArray(node.children)) return;

  for (const childNode of node.children) {
    yield* getHeadingNodes(childNode);
  }
}

function getTextValue(node) {
  if (node.type === 'text') {
    return node.value;
  }

  if (node.children.length !== 1) {
    console.error('Only one child supported');
    throw new Error('Only one child supported');
  }

  return getTextValue(node.children[0]);
}
