import { graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { math } from 'polished';

import SEO from '../components/SEO';
import GlobalStyles, {
  spacingHorizontal,
  spacingVertical,
  headingFontFamily,
  fontWeightBold,
} from '../components/GlobalStyles';
import MarkdownContent from '../components/MarkdownContent';

const baseHPadding = '0.5rem';

const extraHPaddingStartPx = 500;
const extraHPaddingEndPx = 800;
const extraHPaddingSizePx = 16;

// padding = width * gradient + constant
// padding = width * padding / (end - start) - padding * end * / (end - start)
// (* 100 to turn the gradient into vw units)
const extraHPaddingGradientVw =
  (extraHPaddingSizePx / (extraHPaddingEndPx - extraHPaddingStartPx)) * 100;
const extraHPaddingConstantPx =
  -(extraHPaddingSizePx * extraHPaddingStartPx) /
  (extraHPaddingEndPx - extraHPaddingStartPx);

const StandalonePageStyles = createGlobalStyle`
  body {
    --extra-h-padding: clamp(0px, ${extraHPaddingGradientVw}vw + ${extraHPaddingConstantPx}px, ${extraHPaddingSizePx}px);
    padding: ${spacingVertical} calc(${baseHPadding} + var(--extra-h-padding));
  }
`;

const Header = styled.header`
  font-family: ${headingFontFamily};
  font-size: 1.5rem;
  font-weight: ${fontWeightBold};
  margin-bottom: 1rem;
`;

const Main = styled.main``;

function StandaloneHeader() {
  return (
    <Header>
      <a href="https://www.npmjs.com/package/react-responsive-pagination">
        react-responsive-pagination
      </a>
    </Header>
  );
}

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
      <StandalonePageStyles />
      <StandaloneHeader />
      <Main>
        <MarkdownContent compiledMdx={data.mdx.body} />
      </Main>
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
