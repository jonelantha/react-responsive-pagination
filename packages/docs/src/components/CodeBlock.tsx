import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/vsDark';
import styled from 'styled-components';

const monoFont = `SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`;

const CodeContainer = styled.div`
  overflow-y: auto;
  border-radius: 0.4rem;
`;

const CodeStyled = styled.code`
  float: left;
  padding: 1rem;
  font: 90% / 1.45 ${monoFont};
`;

export default function CodeBlock({
  children: code,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <Highlight
      {...defaultProps}
      code={code.trim()}
      language={(className?.split('-')[1] || 'javascript') as Language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeContainer className={className} style={style}>
          <CodeStyled>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </CodeStyled>
        </CodeContainer>
      )}
    </Highlight>
  );
}
