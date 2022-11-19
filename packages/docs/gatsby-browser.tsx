import React from 'react';
import type { GatsbyBrowser } from 'gatsby';
import DocLayout from './src/components/DocLayout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => {
  if (props.pageContext.template === 'docs') {
    return (
      <DocLayout activeSlug={props.pageContext.slug as string}>{element}</DocLayout>
    );
  } else {
    return element;
  }
};
