import CodeTag from './CodeTag';

type CodeBlockProps = {
  code: string;
  language: string;
  title?: string;
};

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <pre>
      <CodeTag children={code} title={title} className={`language-${language}`} />
    </pre>
  );
}
