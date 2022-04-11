import { graphql } from 'gatsby';
import MarkdownContent from '../components/MarkdownContent';
import SEO from '../components/SEO';

export default function Doc({ data }: { data: any }) {
  return (
    <>
      <SEO
        title={data.mdx.frontmatter.title}
        description={
          data.mdx.frontmatter.description || data.mdx.frontmatter.excerpt
        }
      />
      <MarkdownContent compiledMdx={data.mdx.body} />
    </>
  );
}

export const pageQuery = graphql`
  query ($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        description
      }
    }
  }
`;
