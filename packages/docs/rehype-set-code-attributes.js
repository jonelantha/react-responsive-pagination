module.exports = function rehypeSetCodeAttributes() {
  return tree => setCodeAttributes(tree);
};

// https://mdxjs.com/guides/syntax-highlighting/
const extractAttributesRe = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

function setCodeAttributes(node) {
  if (node.tagName === 'code' && node.data?.meta) {
    extractAttributesRe.lastIndex = 0;

    let match;
    while ((match = extractAttributesRe.exec(node.data.meta))) {
      node.properties[match[1]] = match[2] || match[3] || match[4] || '';
    }
  }

  if (!Array.isArray(node.children)) return;

  for (const childNode of node.children) {
    setCodeAttributes(childNode);
  }
}
