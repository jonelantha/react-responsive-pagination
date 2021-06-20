import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/vsDark';
import styled from 'styled-components';
import { borderRadius, monoFontFamily } from './GlobalStyles';

const CodeContainer = styled.div`
  overflow-y: auto;
  border-radius: ${borderRadius};
`;

const CodeStyled = styled.code`
  float: left;
  padding: 1rem;
  font: 90% / 1.45 ${monoFontFamily};
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
