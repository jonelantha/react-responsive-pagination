import { useStaticQuery, graphql } from 'gatsby';
import GithubSlugger from 'github-slugger';

type NavItemsQueryNode = {
  fields: {
    slug: string;
  };
  frontmatter: {
    navTitle: string;
    topNavOrder?: number;
    sideNavOrder?: number;
    footerNavOrder?: number;
    addOverview?: boolean;
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
              navTitle
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
    top: extractNavItems(nodes, node => node.frontmatter.topNavOrder),
    side: extractNavItems(nodes, node => node.frontmatter.sideNavOrder),
    footer: extractNavItems(nodes, node => node.frontmatter.footerNavOrder),
  };
}

function extractNavItems(
  nodes: NavItemsQueryNode[],
  orderFn: (node: NavItemsQueryNode) => number | undefined,
) {
  return nodes
    .filter(orderFn)
    .sort((a, b) => orderFn(a)! - orderFn(b)!)
    .map(getNavItem);
}

export type NavItem = ReturnType<typeof getNavItem>;

function getNavItem(page: NavItemsQueryNode) {
  return {
    slug: page.fields.slug,
    url: page.fields.slug,
    title: page.frontmatter.navTitle,
    sections: getPageSections(page),
  };
}

function getPageSections(page: NavItemsQueryNode) {
  const overviewSection = page.frontmatter.addOverview
    ? [
        {
          slug: page.fields.slug,
          title: 'Overview',
          url: page.fields.slug,
        },
      ]
    : [];

  return [
    ...overviewSection,
    ...page.headings
      .filter(({ depth }) => depth === 2)
      .map(({ value }) => ({
        slug: GithubSlugger.slug(value),
        title: value,
        url: page.fields.slug + '#' + GithubSlugger.slug(value),
      })),
  ];
}
