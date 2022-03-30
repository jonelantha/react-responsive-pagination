import { Link } from 'gatsby';
import { forwardRef } from 'react';
import styled from 'styled-components';
import {
  colorContent,
  borderRadius,
  fontWeightSemiBold,
  colorNavBgHover,
} from '../components/GlobalStyles';
import { NavItem } from '../utils/useNavItems';
import ExternalIcon from '../components/ExternalIcon';

type TopNavProps = { items: NavItem[] };

const TopNav = forwardRef<HTMLElement, TopNavProps>(({ items }, ref) => {
  return (
    <Nav ref={ref}>
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
      {items.map(({ url, slug, title }) => (
        <Link to={url} key={slug}>
          {title}
        </Link>
      ))}
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
    </Nav>
  );
});

const Nav = styled.nav`
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

    :is(:hover, :focus-visible) {
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

export { TopNav as default, Nav as TopNavStyles };
