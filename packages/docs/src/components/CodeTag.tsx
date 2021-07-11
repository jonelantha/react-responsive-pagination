import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/vsDark';
import styled from 'styled-components';
import { borderRadius, monoFontFamily, fontWeightBold } from './GlobalStyles';

const CodeContainer = styled.div`
  border-radius: ${borderRadius};
  font: 0.9rem/1.45 ${monoFontFamily};
`;

const ScrollContainer = styled.div`
  overflow-y: auto;
  & > * {
    float: left;
  }
`;

const CodeStyled = styled.code`
  padding: 1rem;
  font: inherit;
`;

const CodeTitle = styled.header`
  font-weight: ${fontWeightBold};
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
`;

type CodeTagProps = {
  children: string;
  className?: string;
  title?: string;
};

export default function CodeTag({ children: code, className, title }: CodeTagProps) {
  return (
    <Highlight
      {...defaultProps}
      code={code.trim()}
      language={(className?.split('-')[1] || 'javascript') as Language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeContainer className={className} style={style}>
          {title && <CodeTitle>{title}</CodeTitle>}
          <ScrollContainer>
            <CodeStyled>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </CodeStyled>
          </ScrollContainer>
        </CodeContainer>
      )}
    </Highlight>
  );
}
