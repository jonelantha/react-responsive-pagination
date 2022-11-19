import { useSiteMetaData } from '../utils/useSiteMetaData';

export default function HeadContents({ description, title }: HeadContentsProps) {
  const siteMetadata = useSiteMetaData();

  const metaDescription = description || siteMetadata.description;

  return (
    <>
      <title>{`${title} | ${siteMetadata.title}`}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  );
}

interface HeadContentsProps {
  description?: string;
  title: string;
}
