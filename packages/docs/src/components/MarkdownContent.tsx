import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { ReactNode } from 'react';

import mdxComponents from './mdxComponents';
import {
  leading,
  fontWeightBold,
  borderRadius,
  monoFontFamily,
  colorHighlightedBackground,
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

  & > ul,
  & > ol {
    margin: 0 0 1rem;
    padding-left: 2rem;

    ol {
      list-style-type: lower-roman;
    }

    ul,
    ol {
      margin: 0;

      ol {
        list-style-type: lower-alpha;
      }
    }
  }

  & > figure,
  & > ul,
  & > p {
    margin-bottom: ${leading};
  }

  & > table {
    border-collapse: collapse;
    margin-bottom: ${leading};

    tr:nth-child(even) td {
      background-color: ${tableStripeColor};
    }

    th,
    td {
      border: 1px solid ${tableBorderColor};
      padding: 0.5rem;
      vertical-align: top;

      & > *:last-child {
        margin-bottom: 0 !important;
      }
    }

    th {
      font-weight: ${fontWeightBold};
    }
  }

  td > code,
  p > strong > code,
  p > code {
    background-color: ${colorHighlightedBackground};
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

export default function MarkdownContent({ children }: { children: ReactNode }) {
  return (
    <MarkdownContainer>
      <MDXProvider components={mdxComponents}>{children}</MDXProvider>
    </MarkdownContainer>
  );
}
