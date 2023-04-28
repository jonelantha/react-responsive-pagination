import { Link } from 'gatsby';
import { ReactNode, isValidElement } from 'react';
import CodeBlock from './CodeBlock';
import TickList from './TickList';

const mdxComponents = {
  a: ({ href, ...props }: { href?: string }) => {
    if (!href) {
      return <a {...props} />;
    } else if (!href.startsWith('http')) {
      return <Link to={href} {...props} />;
    } else {
      return <a href={href} rel="noopener noreferrer" {...props} />;
    }
  },
  CodeBlock,
  TickList,
  pre: ({ children: codeTag }: { children?: ReactNode }) => {
    if (!isValidElement(codeTag)) throw new Error();

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
