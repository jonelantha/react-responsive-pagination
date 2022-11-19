import { useStaticQuery, graphql } from 'gatsby';

export function useSiteMetaData() {
  const result = useStaticQuery<Queries.SiteMetaDataQuery>(
    graphql`
      query SiteMetaData {
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

  return result.site!.siteMetadata;
}
