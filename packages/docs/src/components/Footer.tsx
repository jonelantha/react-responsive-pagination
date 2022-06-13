import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { NavItem } from '../utils/useNavItems';
import {
  footerBg,
  colorFooterLink,
  colorFooterLinkHover,
  mainFontFamily,
} from '../components/GlobalStyles';
import { external } from './icons';

type FooterProps = { items: NavItem[] };

export default function Footer({ items }: FooterProps) {
  return (
    <FooterStyles>
      <section>
        <h1>Useful Links</h1>
        {items.map(({ slug, url, title }) => (
          <GatsbyLink to={url} key={slug}>
            {title}
          </GatsbyLink>
        ))}
        <ExternalLink
          href="https://www.github.com/jonelantha/react-responsive-pagination"
          rel="noopener noreferrer"
        >
          GitHub
        </ExternalLink>
        <ExternalLink
          href="https://www.npmjs.com/package/react-responsive-pagination"
          rel="noopener noreferrer"
        >
          NPM Package
        </ExternalLink>
      </section>
      <small>
        Copyright &copy; 2019-{new Date().getFullYear()} &nbsp; jonelantha
      </small>
    </FooterStyles>
  );
}

export const FooterStyles = styled.footer`
  background: ${footerBg};
  padding: 1em;
  display: flex;
  flex-flow: column wrap;
  align-items: center;

  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
    margin: 0.5em;
    width: min(47em, 100% - 1em);

    h1 {
      grid-column: 1 / -1;
      font-size: 1em;
      margin-bottom: 0.5em;
      font-family: ${mainFontFamily};
    }
  }

  small {
    font-size: 1em;
    margin-top: 1em;
  }
`;

const LinkStyles = css`
  color: ${colorFooterLink};

  :hover {
    color: ${colorFooterLinkHover};
  }
`;

const GatsbyLink = styled(Link)`
  ${LinkStyles}
`;

const ExternalLink = styled.a`
  ${LinkStyles}

  ::after {
    content: ${external(colorFooterLink)};
    display: inline-block;
    margin-left: 0.4em;
    width: 0.8em;
    height: 0.8em;
  }

  :hover::after {
    content: ${external(colorFooterLinkHover)};
  }
`;
