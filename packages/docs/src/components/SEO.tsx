import { Helmet } from 'react-helmet';
import { useSiteMetaData } from '../utils/useSiteMetaData';

export default function SEO({ description, title }: SEOPropTypes) {
  const siteMetadata = useSiteMetaData();

  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={makeMeta(
        title,
        description || siteMetadata.description,
        siteMetadata.author,
      )}
    />
  );
}

interface SEOPropTypes {
  description?: string;
  title: string;
}

function makeMeta(title: string, metaDescription: string, author: string) {
  return [
    {
      name: 'description',
      content: metaDescription,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ];
}
