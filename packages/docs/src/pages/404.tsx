import DocLayout from '../components/DocLayout';
import { MarkdownContainer } from '../components/MarkdownContent';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <DocLayout activeSlug="">
      <SEO title="404 not found" />
      <MarkdownContainer>
        <h1>404 - Page Not Found</h1>
      </MarkdownContainer>
    </DocLayout>
  );
}
