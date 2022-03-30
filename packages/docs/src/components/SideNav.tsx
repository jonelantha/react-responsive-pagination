import { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { NavItem } from '../utils/useNavItems';
import Reveal from '../components/Reveal';
import {
  colorContent,
  borderRadius,
  fontWeightSemiBold,
  colorNavBgHover,
  footerBg,
  colorHighlightedBackground,
} from '../components/GlobalStyles';

type SideNavProps = {
  items: NavItem[];
  activeSlug: string;
};

export default function SideNav({ items, activeSlug }: SideNavProps) {
  const [openSideItem, setOpenSideItem] = useState<string | undefined>(activeSlug);
  useEffect(() => {
    setOpenSideItem(activeSlug);
  }, [activeSlug]);

  function toggleSideNav(slug: string) {
    if (openSideItem === slug) {
      setOpenSideItem(undefined);
    } else {
      setOpenSideItem(slug);
    }
  }

  function sideNavTopLevelClicked(slug: string) {
    if (slug !== openSideItem) {
      setOpenSideItem(slug);
    } else if (slug === openSideItem && window.location.hash === '') {
      setOpenSideItem(undefined);
    }
  }

  return (
    <Nav>
      <ul>
        {items.map(({ slug, url, title, sections }, index) => (
          <li key={slug}>
            <div
              className={
                (activeSlug === slug ? 'active ' : '') +
                (openSideItem === slug ? 'expanded' : '')
              }
            >
              <Link to={url} onClick={() => sideNavTopLevelClicked(slug)}>
                {title}
              </Link>
              <button
                aria-label={`${
                  openSideItem === slug ? 'Hide' : 'Show'
                } '${title}' sections`}
                aria-expanded={openSideItem === slug ? 'true' : 'false'}
                aria-controls={`sections_${index}`}
                onClick={() => toggleSideNav(slug)}
              />
            </div>
            <Reveal<HTMLUListElement> expanded={openSideItem === slug}>
              {props => (
                <ul {...props} id={`sections_${index}`}>
                  {sections.map(({ slug, url, title }) => (
                    <li key={slug}>
                      <Link to={url}>{title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Nav>
  );
}

const chevron = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
  colorContent,
)}" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>')`;

const Nav = styled.nav`
  background: white;
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  position: sticky;
  overflow: auto;
  padding: 0.5em;
  border-right: 1px solid ${footerBg};

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;

    li {
      div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        position: relative;
      }

      a {
        color: ${colorContent};
        display: block;
        text-decoration: none;
        padding: 0.4em 0.5em 0.4em 1em;
        flex: 1 0 0;

        line-height: 1.3;

        border-radius: ${borderRadius};

        :is(.active > *) {
          background-color: ${colorHighlightedBackground};
        }

        :is(:hover, :focus-visible) {
          background-color: ${colorNavBgHover};
        }

        :not(ul ul a) {
          // <a> is not nested in two uls, must be at top level
          font-weight: ${fontWeightSemiBold};
          padding-right: 2.5em;
        }
      }

      button {
        cursor: pointer;
        background: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        right: 0;
        height: 100%;
        min-width: 2rem;

        border: none;
        border-radius: 0 ${borderRadius} ${borderRadius} 0;

        :is(:hover, :focus-visible) {
          background-color: ${colorNavBgHover};
        }

        ::after {
          content: '';
          display: block;
          transform: rotate(90deg);
          transition: transform 200ms;
          height: 1.25rem;
          width: 1.25rem;
          background: ${chevron} 50% / 2rem 2rem;
        }

        :is(div.expanded > button) {
          ::after {
            transform: rotate(180deg);
          }
        }
      }

      // nested ul
      ul {
        margin-left: 1em;
      }
    }
  }
`;

export { Nav as SideNavStyles };
