import React from 'react';
import DocLayout from './src/components/DocLayout';

export const wrapPageElement = ({ element, props }) => {
  if (props.pageContext.template === 'docs') {
    return <DocLayout activeSlug={props.pageContext.slug}>{element}</DocLayout>;
  } else {
    return element;
  }
};
