import { useStaticQuery, graphql } from 'gatsby';

export function useSiteMetaData() {
  const result = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  return result.site.siteMetadata as {
    title: string;
    description: string;
    author: string;
  };
}
