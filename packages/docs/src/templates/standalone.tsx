import { graphql } from 'gatsby';
import styled from 'styled-components';
import { math } from 'polished';
import 'bootstrap/dist/css/bootstrap.css';

import SEO from '../components/SEO';
import GlobalStyles, {
  spacingHorizontal,
  spacingVertical,
} from '../components/GlobalStyles';
import MarkdownContent from '../components/MarkdownContent';

const Container = styled.div`
  padding: ${spacingVertical} ${math(`${spacingHorizontal} + 0.5rem`)};
`;

export default function DocTemplate({ data }: { data: any }) {
  return (
    <>
      <SEO
        title={data.mdx.frontmatter.title}
        description={
          data.mdx.frontmatter.description || data.mdx.frontmatter.excerpt
        }
      />
      <GlobalStyles />
      <Container>
        <MarkdownContent compiledMdx={data.mdx.body} />
      </Container>
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
