import { ReactElement } from 'react';
import CodeBlock from './CodeBlock';
import CTALink from './CTALink';
import TickList from './TickList';

const mdxComponents = {
  CodeBlock,
  CTALink,
  TickList,
  pre: ({ children: codeTag }: { children: ReactElement }) => {
    const codeTagProps = codeTag.props;

    const language = codeTagProps.className?.split('-')[1];
    const code = codeTagProps.children;
    const title = codeTagProps.title;
    const previewSize = codeTagProps.previewSize;

    return (
      <CodeBlock
        code={code}
        language={language}
        title={title}
        previewSize={previewSize}
      />
    );
  },
};

export default mdxComponents;