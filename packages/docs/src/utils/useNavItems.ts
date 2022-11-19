import { useStaticQuery, graphql } from 'gatsby';
import { slug } from 'github-slugger';

export const fragmentQuery = graphql`
  fragment NavItem on Mdx {
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
`;

type NavItemsQueryNode = Queries.NavItemFragment;

export function useNavItems() {
  const result = useStaticQuery<Queries.NavItemsQuery>(
    graphql`
      query NavItems {
        allMdx {
          nodes {
            ...NavItem
          }
        }
      }
    `,
  );

  const nodes = result.allMdx.nodes;

  return {
    top: extractNavItems(
      nodes,
      node => node.frontmatter?.topNavOrder,
      node => node.frontmatter?.navTitle,
    ),
    side: extractNavItems(
      nodes,
      node => node.frontmatter?.sideNavOrder,
      node => node.frontmatter?.navTitle,
    ),
    footer: extractNavItems(
      nodes,
      node => node.frontmatter?.footerNavOrder,
      node => node.frontmatter?.footerNavTitle ?? node.frontmatter?.navTitle,
    ),
  };
}

function extractNavItems(
  nodes: ReadonlyArray<NavItemsQueryNode>,
  orderFn: (node: NavItemsQueryNode) => number | undefined | null,
  titleFn: (node: NavItemsQueryNode) => string | undefined | null,
) {
  return nodes
    .filter(orderFn)
    .sort((a, b) => orderFn(a)! - orderFn(b)!)
    .map(node => getNavItem(node, titleFn));
}

export type NavItem = ReturnType<typeof getNavItem>;

function getNavItem(
  page: NavItemsQueryNode,
  titleFn: (node: NavItemsQueryNode) => string | undefined | null,
) {
  const title = titleFn(page);
  if (!title) throw 'no title';

  return {
    slug: page.fields.slug,
    url: getPagePath(page),
    title,
    sections: getPageSections(page),
  };
}

function getPageSections(page: NavItemsQueryNode) {
  const overviewSection = page.frontmatter?.addOverview
    ? [
        {
          slug: page.fields.slug,
          title: 'Overview',
          url: getPagePath(page),
        },
      ]
    : [];

  const headings = page.headings
    ? page.headings
        .filter(({ depth }) => depth === 2)
        .map(({ value }) => ({
          slug: slug(value),
          title: value,
          url: getPagePath(page) + '#' + slug(value),
        }))
    : [];

  return [...overviewSection, ...headings];
}

function getPagePath(page: NavItemsQueryNode) {
  return page.frontmatter?.path ?? page.fields.slug;
}
