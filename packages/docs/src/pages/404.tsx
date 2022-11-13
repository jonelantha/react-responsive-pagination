import DocLayout from '../components/DocLayout';
import { MarkdownContainer } from '../components/MarkdownContent';
import HeadContents from '../components/HeadContents';

export function Head() {
  return <HeadContents title="404 not found" />;
}

export default function NotFoundPage() {
  return (
    <DocLayout activeSlug="">
      <MarkdownContainer>
        <h1>404 - Page Not Found</h1>
      </MarkdownContainer>
    </DocLayout>
  );
}
