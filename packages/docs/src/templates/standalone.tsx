import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { math } from 'polished';
import 'bootstrap/dist/css/bootstrap.css';

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
      <Helmet title={data.mdx.frontmatter.title} />
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
