import { Link } from 'gatsby';
import styled from 'styled-components';
import { NavItem } from '../utils/useNavItems';
import {
  footerBg,
  colorFooterLink,
  colorFooterLinkHover,
  mainFontFamily,
} from '../components/GlobalStyles';
import ExternalIcon from '../components/ExternalIcon';

type FooterProps = { items: NavItem[] };

export default function Footer({ items }: FooterProps) {
  return (
    <FooterStyles>
      <section>
        <h1>Useful Links</h1>
        <a
          href="https://www.npmjs.com/package/react-responsive-pagination"
          rel="noopener noreferrer"
        >
          README
          <ExternalIcon />
        </a>
        {items.map(({ slug, url, title }) => (
          <Link to={url} key={slug}>
            {title}
          </Link>
        ))}
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
