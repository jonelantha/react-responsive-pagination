import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/vsDark';
import styled from 'styled-components';
import { borderRadius, monoFontFamily, fontWeightBold } from './GlobalStyles';

type CodeBlockProps = {
  code: string;
  language?: Language;
  title?: string;
};

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <Highlight
      {...defaultProps}
      code={code.trim()}
      language={language || 'javascript'}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Figure className={className} style={style}>
          {title && <FigCaption>{title}</FigCaption>}
          <Pre>
            <Code>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </Code>
          </Pre>
        </Figure>
      )}
    </Highlight>
  );
}

const Figure = styled.figure`
  border-radius: ${borderRadius};
  font: 0.9rem/1.45 ${monoFontFamily};
  margin: 0;
`;

const FigCaption = styled.figcaption`
  font-weight: ${fontWeightBold};
  padding: 0.5rem 1rem;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
`;

const Pre = styled.pre`
  margin: 0;
  overflow-y: auto;
  font: inherit;
`;

const Code = styled.code`
  padding: 1rem;
  font: inherit;
  float: left;
`;
