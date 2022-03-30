import styled from 'styled-components';
import GlobalStyles, {
  spacingVertical,
  getDynamicHPadding,
} from '../components/GlobalStyles';
import TopNav, { TopNavStyles } from '../components/TopNav';
import SideNav, { SideNavStyles } from '../components/SideNav';
import Footer, { FooterStyles } from '../components/Footer';
import { MarkdownContainer } from '../components/MarkdownContent';
import { useHeightListener } from '../utils/useHeightListener';
import { useNavItems } from '../utils/useNavItems';

type DocTemplateProps = {
  children: React.ReactNode;
  activeSlug: string;
};

export default function DocTemplate({ children, activeSlug }: DocTemplateProps) {
  const navItems = useNavItems();

  const headerRef = useHeightListener(height => {
    if (!height) return;

    document.documentElement.style.setProperty(
      '--root-header-height',
      `${height}px`,
    );
  });

  return (
    <>
      <GlobalStyles />
      <Layout>
        <TopNav ref={headerRef} items={navItems.top} />
        <SideNav items={navItems.side} activeSlug={activeSlug} />
        {children}
        <Footer items={navItems.footer} />
      </Layout>
    </>
  );
}

const Layout = styled.main`
  display: grid;

  grid-template-areas:
    'top-nav top-nav'
    'side-nav content'
    'side-nav footer';
  grid-template-columns: 300px 1fr;
  grid-template-rows: auto 1fr auto;

  @media screen and (max-width: 920px) {
    grid-template-areas:
      'top-nav'
      'content'
      'footer';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
  }

  --header-height: var(--root-header-height, 51px);

  ${TopNavStyles} {
    grid-area: top-nav;
  }

  ${SideNavStyles} {
    grid-area: side-nav;

    @media screen and (max-width: 920px) {
      display: none;
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
