import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { math } from 'polished';

import mdxComponents from './mdxComponents';
import { leading } from './GlobalStyles';

export const MarkdownContainer = styled.article`
  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }

  & > h1 {
    font-size: 3rem;
    margin-top: ${math(`3 * ${leading}`)};
    margin-bottom: ${math(`1.25 * ${leading}`)};
  }

  & > h2 {
    font-size: 2rem;
    margin-top: ${math(`2 * ${leading}`)};
    margin-bottom: ${leading};
  }

  & > h3 {
    font-size: 1.5rem;
    margin-top: ${math(`1.5 * ${leading}`)};
    margin-bottom: ${leading};
  }

  & > h4 {
    font-size: 1rem;
    margin-top: ${math(`1.25 * ${leading}`)};
    margin-bottom: ${leading};
  }

  & > h5 {
    font-size: 0.875rem;
    margin-top: ${math(`1.25 * ${leading}`)};
    margin-bottom: ${leading};
  }

  & > h6 {
    font-size: 0.85rem;
    margin-top: ${math(`1.25 * ${leading}`)};
    margin-bottom: ${leading};
  }

  & > pre,
  & > ul,
  & > p {
    margin-bottom: ${leading};
  }
`;

export default function MarkdownContent({ compiledMdx }: { compiledMdx: string }) {
  return (
    <MarkdownContainer>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{compiledMdx}</MDXRenderer>
      </MDXProvider>
    </MarkdownContainer>
  );
}
