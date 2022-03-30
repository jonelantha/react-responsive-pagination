import React from 'react';
import DocsLayout from './src/templates/docs-layout';

export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext.template === 'docs') {
    return <DocsLayout activeSlug={props.pageContext.slug}>{element}</DocsLayout>;
  } else {
    return element;
  }
};
