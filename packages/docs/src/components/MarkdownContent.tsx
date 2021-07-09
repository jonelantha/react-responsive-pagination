import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { math } from 'polished';

import mdxComponents from './mdxComponents';
import {
  leading,
  fontWeightBold,
  borderRadius,
  monoFontFamily,
} from './GlobalStyles';

const tableBorderColor = '#dadde1';
const tableStripeColor = '#f5f6f7';

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

  & > table {
    border-collapse: collapse;
    display: block;
    margin-bottom: ${leading};

    tr:nth-child(2n) {
      background-color: ${tableStripeColor};
    }

    th,
    td {
      border: 1px solid ${tableBorderColor};
      padding: 0.5rem;
      vertical-align: top;
    }

    th {
      color: var(--ifm-table-head-color);
      font-weight: ${fontWeightBold};
    }
  }

  td > code {
    background-color: #e6eeff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: ${borderRadius};
    font-family: ${monoFontFamily};
    font-size: 90%;
    padding: 0.1rem 0.3rem;
    vertical-align: middle;
  }

  /* li {
    word-wrap: break-word;

    & > p {
      margin-top: 1rem;
    }

    & + li {
      margin-top: 0.25rem;
    }
  } */
`;

export default function MarkdownContent({ compiledMdx }: { compiledMdx: string }) {
  // check if MDXProvider location makes a difference
  return (
    <MarkdownContainer>
      <MDXProvider components={mdxComponents}>
        <MDXRenderer>{compiledMdx}</MDXRenderer>
      </MDXProvider>
    </MarkdownContainer>
  );
}
