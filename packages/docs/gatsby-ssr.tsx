import React from 'react';
import type { GatsbySSR } from 'gatsby';
import DocLayout from './src/components/DocLayout';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
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

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};
