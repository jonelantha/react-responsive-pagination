import { Link } from 'gatsby';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { math } from 'polished';
import {
  colorContent,
  borderRadius,
  fontWeightSemiBold,
  colorNavBgHover,
} from './GlobalStyles';
import { NavItem } from '../utils/useNavItems';
import { hamburger, external } from './icons';

type TopNavProps = { items: NavItem[]; onMenuClicked: () => void };

const TopNav = forwardRef<HTMLElement, TopNavProps>(
  ({ items, onMenuClicked }, ref) => {
    return (
      <Nav ref={ref}>
        <HamburgerButton aria-label="Open navigation menu" onClick={onMenuClicked} />
        <ProjectLink to="/">
          <span aria-hidden="true">📐📖</span>
          react-responsive-pagination
        </ProjectLink>
        {items.map(({ url, slug, title }) => (
          <GatsbyLink to={url} key={slug}>
            {title}
          </GatsbyLink>
        ))}
        <GitHubLink
          href="https://www.github.com/jonelantha/react-responsive-pagination"
          rel="noopener noreferrer"
        >
          <img src="/GitHub-Mark-64px.png" aria-hidden="true" />
          GitHub
        </GitHubLink>
      </Nav>
    );
  },
);

export const topNavMinHeight = '48px';

export const topNavFullWidthBreakPoint = '930px';
export const topNavNoLinksBreakPoint = '850px';

const hPadding = '0.4em';
const hItemLeftMargin = '0.5em';

const HamburgerButton = styled.button`
  cursor: pointer;
  font-size: inherit;
  box-sizing: content-box;
  padding: 0;
  min-height: 2em;
  width: 1.75em;
  margin: 0 0 0 ${hItemLeftMargin};
  border: 0;
  border-radius: ${borderRadius};
  padding: 0 ${hPadding};
  background: no-repeat ${hamburger(colorContent)} 50% / 1.75rem 1.75rem;

  :is(:hover, :focus-visible) {
    background-color: ${colorNavBgHover};
  }
`;

const LinkStyles = css`
  display: inline-flex;
  align-items: center;

  min-height: 2em;
  margin: 0 0 0 ${hItemLeftMargin};
  font-weight: ${fontWeightSemiBold};
  text-decoration: none;
  padding: 0 ${hPadding};
  color: ${colorContent};
  border-radius: ${borderRadius};

  :is(:hover, :focus-visible) {
    color: initial;
    background: ${colorNavBgHover};
  }
`;

const GatsbyLink = styled(Link)`
  ${LinkStyles}
`;

const NavLink = styled.a`
  ${LinkStyles}
`;

const ProjectLink = styled(GatsbyLink)`
  padding-left: ${math(`${hPadding} - 0.1em`)};

  span {
    font-size: 1.6em;
    line-height: 1;
    margin-right: 0.25em;
  }
`;

const GitHubLink = styled(NavLink)`
  img {
    width: 1.25em;
    height: 1.25em;
    margin-right: 0.4em;
  }

  ::after {
    content: ${external(colorContent)};
    display: inline-block;
    line-height: 1;
    margin-left: 0.4em;
    width: 0.8em;
    height: 0.8em;
  }
`;

const Nav = styled.nav`
  background: white;
  padding: 0.5em 0;

  display: flex;
  flex-flow: row wrap;
  align-items: stretch;

  min-height: ${topNavMinHeight};

  @media not screen and (max-width: ${topNavFullWidthBreakPoint}) {
    ${HamburgerButton} {
      display: none;
    }
  }

  @media screen and (max-width: ${topNavFullWidthBreakPoint}) {
    ${GitHubLink} {
      display: none;
    }
  }

  @media screen and (max-width: ${topNavNoLinksBreakPoint}) {
    ${ProjectLink} ~ a {
      display: none;
    }
  }
`;

export { TopNav as default, Nav as TopNavStyles };
