import styled, { createGlobalStyle, css } from 'styled-components';
import { useState, useEffect } from 'react';
import GlobalStyles, {
  spacingVertical,
  getDynamicHPadding,
  footerBg,
} from './GlobalStyles';
import TopNav, { TopNavStyles, topNavMinHeight } from './TopNav';
import SideNav, { SideNavStyles } from './SideNav';
import Footer, { FooterStyles } from './Footer';
import { MarkdownContainer } from './MarkdownContent';
import { useHeightListener } from '../utils/useHeightListener';
import { useMediaQueryMatch } from '../utils/useMediaQueryMatch';
import { useNavItems } from '../utils/useNavItems';
import { popupNavMediaQuery, staticNavMediaQuery } from './DocLayoutBreakpoints';

type DocTemplateProps = {
  children: React.ReactNode;
  activeSlug: string;
};

export default function DocLayout({ children, activeSlug }: DocTemplateProps) {
  const navItems = useNavItems();
  const [popupSideNavVisible, setPopupSideNavVisible] = useState(false);
  const [sideBarExpandedSlug, setSideBarExpandedSlug] = useState<string | undefined>(
    activeSlug,
  );

  useEffect(() => {
    setSideBarExpandedSlug(activeSlug);
  }, [activeSlug]);

  const isStaticNav = useMediaQueryMatch(staticNavMediaQuery);

  useEffect(() => {
    isStaticNav && setPopupSideNavVisible(false);
  }, [isStaticNav]);

  const headerRef = useHeightListener(height => {
    if (!height) return;

    document.documentElement.style.setProperty(
      '--root-header-height',
      `${height}px`,
    );
  });

  return (
    <Layout popupSideNavVisible={popupSideNavVisible}>
      <GlobalStyles />
      <TopNav
        ref={headerRef}
        onMenuClicked={() => setPopupSideNavVisible(true)}
        items={navItems.top}
      />
      <SideNav
        items={navItems.side}
        activeSlug={activeSlug}
        expandedSlug={sideBarExpandedSlug}
        onExpandedSlugChange={setSideBarExpandedSlug}
        onClose={() => setPopupSideNavVisible(false)}
      />
      {popupSideNavVisible && (
        <>
          <PopupSideNavBackground onClick={() => setPopupSideNavVisible(false)} />
          <BodyScrollLockStyles />
        </>
      )}
      {children}
      <Footer items={navItems.footer} />
    </Layout>
  );
}

const PopupSideNavBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BodyScrollLockStyles = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Layout = styled.main<{ popupSideNavVisible: boolean }>`
  display: grid;

  @media ${staticNavMediaQuery} {
    grid-template-areas:
      'top-nav top-nav'
      'side-nav content'
      'side-nav footer';
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  @media ${popupNavMediaQuery} {
    grid-template-areas:
      'top-nav'
      'content'
      'footer';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }

  --header-height: var(--root-header-height, ${topNavMinHeight});

  ${TopNavStyles} {
    grid-area: top-nav;
    position: sticky;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    z-index: 5;
    width: 100%;
  }

  ${SideNavStyles} {
    @media ${staticNavMediaQuery} {
      grid-area: side-nav;
      top: var(--header-height);
      height: calc(100vh - var(--header-height));
      position: sticky;
      border-right: 1px solid ${footerBg};
    }

    @media ${popupNavMediaQuery} {
      ${({ popupSideNavVisible }) =>
        popupSideNavVisible
          ? css`
              position: fixed;
              top: 0;
              left: 0;
              z-index: 10;
              height: 100vh;
              border-right: 1px solid ${footerBg};
              width: clamp(300px, 85%, 500px);
            `
          : css`
              display: none;
            `}
    }
  }

  ${FooterStyles} {
    grid-area: footer;
  }

  ${MarkdownContainer} {
    grid-area: content;
    padding: ${spacingVertical} ${getDynamicHPadding()} 3rem ${getDynamicHPadding()};
    min-width: 100px;

    h1,
    h2 {
      scroll-margin-top: calc(var(--header-height) + 10px);
    }
  }
`;
