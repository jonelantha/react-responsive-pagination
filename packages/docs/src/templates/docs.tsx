import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import MarkdownContent from '../components/MarkdownContent';
import HeadContents from '../components/HeadContents';

type DocTemplateHeadProps = {
  data: any;
};

export function Head({ data }: DocTemplateHeadProps) {
  return (
    <HeadContents
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description || data.mdx.frontmatter.excerpt}
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
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        description
      }
    }
  }
`;
