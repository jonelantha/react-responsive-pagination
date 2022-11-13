import { graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';
import React, { ReactNode } from 'react';

import HeadContents from '../components/HeadContents';
import GlobalStyles, {
  spacingVertical,
  headingFontFamily,
  fontWeightBold,
  getDynamicHPadding,
} from '../components/GlobalStyles';
import MarkdownContent from '../components/MarkdownContent';

type StandaloneTemplateHeadProps = {
  data: any;
};

export function Head({ data }: StandaloneTemplateHeadProps) {
  return (
    <HeadContents
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description || data.mdx.frontmatter.excerpt}
    />
  );
}

type StandaloneTemplateProps = {
  data: any;
  children: ReactNode;
};

export default function StandaloneTemplate({ children }: StandaloneTemplateProps) {
  return (
    <StandaloneLayout>
      <MarkdownContent>{children}</MarkdownContent>
    </StandaloneLayout>
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

interface StandaloneLayoutProps {
  children: React.ReactNode;
}

export function StandaloneLayout({ children: content }: StandaloneLayoutProps) {
  return (
    <>
      <GlobalStyles />
      <StandalonePageStyles />
      <StandaloneHeader />
      <Main>{content}</Main>
    </>
  );
}

const StandalonePageStyles = createGlobalStyle`
  body {
    padding: ${spacingVertical} ${getDynamicHPadding()};
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
      <Link to="/">react-responsive-pagination</Link>
    </Header>
  );
}
