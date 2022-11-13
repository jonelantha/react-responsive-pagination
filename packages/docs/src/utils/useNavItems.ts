import { useStaticQuery, graphql } from 'gatsby';
import { slug } from 'github-slugger';

type NavItemsQueryNode = {
  fields: {
    slug: string;
  };
  frontmatter: {
    navTitle: string;
    footerNavTitle?: string;
    topNavOrder?: number;
    sideNavOrder?: number;
    footerNavOrder?: number;
    addOverview?: boolean;
    path?: string;
  };
  headings: {
    depth: number;
    value: string;
  }[];
};

export function useNavItems() {
  const result = useStaticQuery<{ allMdx: { nodes: NavItemsQueryNode[] } }>(
    graphql`
      query {
        allMdx {
          nodes {
            fields {
              slug
            }
            frontmatter {
              path
              navTitle
              footerNavTitle
              topNavOrder
              sideNavOrder
              footerNavOrder
              addOverview
            }
            headings {
              depth
              value
            }
          }
        }
      }
    `,
  );

  const nodes = result.allMdx.nodes;

  return {
    top: extractNavItems(
      nodes,
      node => node.frontmatter.topNavOrder,
      node => node.frontmatter.navTitle,
    ),
    side: extractNavItems(
      nodes,
      node => node.frontmatter.sideNavOrder,
      node => node.frontmatter.navTitle,
    ),
    footer: extractNavItems(
      nodes,
      node => node.frontmatter.footerNavOrder,
      node => node.frontmatter.footerNavTitle ?? node.frontmatter.navTitle,
    ),
  };
}

function extractNavItems(
  nodes: NavItemsQueryNode[],
  orderFn: (node: NavItemsQueryNode) => number | undefined,
  titleFn: (node: NavItemsQueryNode) => string,
) {
  return nodes
    .filter(orderFn)
    .sort((a, b) => orderFn(a)! - orderFn(b)!)
    .map(node => getNavItem(node, titleFn));
}

export type NavItem = ReturnType<typeof getNavItem>;

function getNavItem(
  page: NavItemsQueryNode,
  titleFn: (node: NavItemsQueryNode) => string,
) {
  return {
    slug: page.fields.slug,
    url: getPagePath(page),
    title: titleFn(page),
    sections: getPageSections(page),
  };
}

function getPageSections(page: NavItemsQueryNode) {
  const overviewSection = page.frontmatter.addOverview
    ? [
        {
          slug: page.fields.slug,
          title: 'Overview',
          url: getPagePath(page),
        },
      ]
    : [];

  return [
    ...overviewSection,
    ...page.headings
      .filter(({ depth }) => depth === 2)
      .map(({ value }) => ({
        slug: slug(value),
        title: value,
        url: getPagePath(page) + '#' + slug(value),
      })),
  ];
}

function getPagePath(page: NavItemsQueryNode) {
  return page.frontmatter.path ?? page.fields.slug;
}
