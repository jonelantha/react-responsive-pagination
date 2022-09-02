import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import MarkdownContent from '../components/MarkdownContent';
import SEO from '../components/SEO';

type DocTemplateProps = {
  data: any;
  children: ReactNode;
};

export default function DocTemplate({ data, children }: DocTemplateProps) {
  return (
    <>
      <SEO
        title={data.mdx.frontmatter.title}
        description={
          data.mdx.frontmatter.description || data.mdx.frontmatter.excerpt
        }
      />
      <MarkdownContent>{children}</MarkdownContent>
    </>
  );
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
