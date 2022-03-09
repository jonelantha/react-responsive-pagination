import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import GlobalStyles, {
  colorContent,
  borderRadius,
  fontWeightSemiBold,
  colorNavBgHover,
  spacingVertical,
  getDynamicHPadding,
  footerBg,
  colorFooterLink,
  colorFooterLinkHover,
  mainFontFamily,
} from '../components/GlobalStyles';
import ExternalIcon from '../components/ExternalIcon';
import MarkdownContent, { MarkdownContainer } from '../components/MarkdownContent';

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
      <Layout>
        <TopNav>
          <a
            href="https://www.npmjs.com/package/react-responsive-pagination"
            rel="noopener noreferrer"
            className="logo-link"
            aria-hidden="true"
          >
            <span>📐📖</span>
          </a>
          <a
            href="https://www.npmjs.com/package/react-responsive-pagination"
            rel="noopener noreferrer"
            className="project-link"
          >
            react-responsive-pagination
          </a>
          <Link to="/live-demo">Live Demo</Link>
          <Link to="/bootstrap-pagination">Bootstrap Usage</Link>
          <Link to="/custom-styled-pagination">Custom Styles</Link>
          <Link to="/faq">FAQ</Link>
          <a
            href="https://www.github.com/jonelantha/react-responsive-pagination"
            rel="noopener noreferrer"
            className="github-link"
          >
            <img src="/GitHub-Mark-64px.png" aria-hidden="true" />
            <span>
              GitHub
              <ExternalIcon />
            </span>
          </a>
        </TopNav>
        <MarkdownContent compiledMdx={data.mdx.body} />
        <Footer>
          <section>
            <h1>Useful Links</h1>
            <a
              href="https://www.npmjs.com/package/react-responsive-pagination"
              rel="noopener noreferrer"
            >
              README
              <ExternalIcon />
            </a>
            <Link to="/live-demo">Live Demo</Link>
            <Link to="/bootstrap-pagination">Bootstrap Usage</Link>
            <Link to="/custom-styled-pagination">Custom Styles</Link>
            <Link to="/faq">FAQ</Link>
            <a
              href="https://www.github.com/jonelantha/react-responsive-pagination"
              rel="noopener noreferrer"
            >
              GitHub
              <ExternalIcon />
            </a>
            <a
              href="https://www.npmjs.com/package/react-responsive-pagination"
              rel="noopener noreferrer"
            >
              NPM Package
              <ExternalIcon />
            </a>
          </section>
          <small>
            Copyright &copy; 2019-{new Date().getFullYear()} &nbsp; jonelantha
          </small>
        </Footer>
      </Layout>
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

const Layout = styled.main`
  display: grid;
  grid-template-areas:
    'top-nav'
    'content'
    'footer';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;

  ${MarkdownContainer} {
    grid-area: content;
    padding: ${spacingVertical} ${getDynamicHPadding()};
    min-width: 100px;
  }
`;

const TopNav = styled.nav`
  grid-area: top-nav;
  background: white;
  position: sticky;
  top: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  z-index: 5;
  width: 100%;
  font-size: 1em;
  padding: 0.6em 0.5em;

  display: flex;
  flex-flow: row wrap;
  align-items: stretch;

  > * {
    display: inline-flex;
    align-items: center;
    margin: 0 0.3em;
  }

  a {
    font-weight: ${fontWeightSemiBold};
    text-decoration: none;
    padding: 0.2em 0.5em;
    color: ${colorContent};
    border-radius: ${borderRadius};

    :hover,
    :focus {
      background: ${colorNavBgHover};
    }

    svg {
      margin-left: 0.4em;
      width: 0.8em;
      height: 0.8em;
    }
  }

  .logo-link {
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;

    span {
      font-size: 1.5em;
      line-height: 1;
    }

    :hover {
      background: inherit;
    }
  }

  .project-link {
    margin-left: 0;
  }

  .github-link {
    img {
      width: 1.25em;
      height: 1.25em;
      margin-right: 0.4em;
    }
  }

  @media screen and (max-width: 920px) {
    .github-link {
      display: none;
    }
  }

  @media screen and (max-width: 760px) {
    .project-link ~ a {
      display: none;
    }
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  background: ${footerBg};
  padding: 1em;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
    margin: 0.5em;
    width: min(47em, calc(100% - 1em));

    h1 {
      grid-column: 1 / -1;
      font-size: 1em;
      margin-bottom: 0.5em;
      font-family: ${mainFontFamily};
    }

    a {
      color: ${colorFooterLink};

      &:hover {
        color: ${colorFooterLinkHover};
      }

      svg {
        margin-left: 0.4em;
        width: 0.8em;
        height: 0.8em;
      }
    }
  }

  small {
    font-size: 1em;
    margin-top: 1em;
  }
`;
