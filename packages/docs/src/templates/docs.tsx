import React, { ReactNode } from 'react';
import { graphql, HeadProps } from 'gatsby';
import MarkdownContent from '../components/MarkdownContent';
import HeadContents from '../components/HeadContents';

export function Head({ data }: HeadProps<Queries.DocQuery>) {
  return (
    <HeadContents
      title={data.mdx?.frontmatter?.title ?? ''}
      description={data.mdx?.frontmatter?.description ?? ''}
    />
  );
}

type DocTemplateProps = {
  children: ReactNode;
};

export default function DocTemplate({ children }: DocTemplateProps) {
  return <MarkdownContent>{children}</MarkdownContent>;
}

export const pageQuery = graphql`
  query Doc($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        description
      }
    }
  }
`;
