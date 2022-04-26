import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { NavItem } from '../utils/useNavItems';
import Reveal from '../components/Reveal';
import {
  colorContent,
  borderRadius,
  fontWeightSemiBold,
  colorNavBgHover,
  colorHighlightedBackground,
} from '../components/GlobalStyles';
import { staticNavMediaQuery } from './DocLayoutBreakpoints';
import { chevron, close, external } from './icons';

type SideNavProps = {
  items: NavItem[];
  activeSlug: string | undefined;
  onClose: () => void;
  onActiveSlugChange: (slug: string | undefined) => void;
};

export default function SideNav({
  items,
  activeSlug,
  onActiveSlugChange: setActiveSlug,
  onClose: close,
}: SideNavProps) {
  function handleTopLevelLinkClicked(clickedSlug: string) {
    if (clickedSlug !== activeSlug) {
      // expand section if not already expanded
      setActiveSlug(clickedSlug);
    } else if (clickedSlug === activeSlug && window.location.hash === '') {
      // close section if already expanded
      setActiveSlug(undefined);
    }
    close();
  }

  function handleExpanderClicked(clickedSlug: string) {
    // toggle
    setActiveSlug(activeSlug !== clickedSlug ? clickedSlug : undefined);
  }

  function handleLinkClicked() {
    close();
  }

  return (
    <Nav>
      <SideNavTopBar>
        react-responsive-pagination
        <CloseButton aria-label="Close navigation menu" onClick={close} />
      </SideNavTopBar>
      <RootUL>
        {items.map(({ slug, url, title, sections }, index) => (
          <li key={slug}>
            <SectionHead>
              <GatsbyLink
                to={url}
                $active={activeSlug === slug}
                onClick={() => handleTopLevelLinkClicked(slug)}
              >
                {title}
              </GatsbyLink>
              <ExpandButton
                expanded={activeSlug === slug}
                aria-label={`${
                  activeSlug === slug ? 'Hide' : 'Show'
                } '${title}' sections`}
                aria-expanded={activeSlug === slug ? 'true' : 'false'}
                aria-controls={`sections_${index}`}
                onClick={() => handleExpanderClicked(slug)}
              />
            </SectionHead>
            <Reveal<HTMLUListElement> open={activeSlug === slug}>
              {props => (
                <NestedUL {...props} id={`sections_${index}`}>
                  {sections.map(({ slug, url, title }) => (
                    <li key={slug}>
                      <GatsbyLink to={url} onClick={handleLinkClicked}>
                        {title}
                      </GatsbyLink>
                    </li>
                  ))}
                </NestedUL>
              )}
            </Reveal>
          </li>
        ))}
        <li className="popup-only">
          <GatsbyLink to="/live-demo/">Live Demo</GatsbyLink>
        </li>
        <li className="popup-only">
          <ExternalLink
            href="https://www.github.com/jonelantha/react-responsive-pagination"
            rel="noopener noreferrer"
          >
            GitHub
          </ExternalLink>
        </li>
      </RootUL>
    </Nav>
  );
}

const SideNavTopBar = styled.div`
  padding-left: 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  font-weight: ${fontWeightSemiBold};

  @media ${staticNavMediaQuery} {
    display: none;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  font-size: inherit;
  margin: 0.5em;
  padding: 0;
  width: 2em;
  height: 2em;
  border: 0;
  line-height: 1;
  border-radius: ${borderRadius};

  background: no-repeat ${close(colorContent)} 50% / 1rem 1rem;

  :is(:hover, :focus-visible) {
    background-color: ${colorNavBgHover};
  }
`;

const Nav = styled.nav`
  background: white;
  overflow: auto;

  @media ${staticNavMediaQuery} {
    .popup-only {
      display: none;
    }
  }
`;

const RootUL = styled.ul`
  list-style: none;
  padding: 0.5em;
  margin: 0;
`;

const NestedUL = styled.ul`
  list-style: none;
  margin-left: 1em;
  padding: 0;
`;

const LinkStyles = css`
  color: ${colorContent};
  display: block;
  text-decoration: none;
  padding: 0.4em 0.5em 0.4em 1em;

  line-height: 1.3;

  border-radius: ${borderRadius};

  :is(:hover, :focus-visible) {
    background-color: ${colorNavBgHover};
    color: inherit;
  }
`;

const ExternalLink = styled.a`
  ${LinkStyles}

  ::after {
    content: ${external(colorContent)};
    display: inline-block;
    margin-left: 0.4em;
    width: 0.8em;
    height: 0.8em;
  }
`;

const GatsbyLink = styled(Link)<{ $active?: boolean }>`
  ${LinkStyles}

  ${({ $active }) => $active && `background-color: ${colorHighlightedBackground};`}
`;

const SectionHead = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;

  ${GatsbyLink} {
    font-weight: ${fontWeightSemiBold};
    padding-right: 2.5em;
    flex: 1 0 0;
  }
`;

const ExpandButton = styled.button<{ expanded: boolean }>`
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
  border-radius: ${borderRadius};

  :is(:hover, :focus-visible) {
    background-color: ${colorNavBgHover};
  }

  ::after {
    content: ${chevron(colorContent)};
    display: block;
    height: 2rem;
    width: 2rem;
    transition: transform 200ms;
    transform: rotate(${({ expanded }) => (expanded ? '180deg' : '90deg')});
  }
`;

export { Nav as SideNavStyles };
