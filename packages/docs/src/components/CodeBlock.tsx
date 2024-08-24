import { Highlight, Language } from 'prism-react-renderer';
import { MouseEvent, TouchEvent, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  borderRadius,
  monoFontFamily,
  mainFontFamily,
  fontWeightBold,
} from './GlobalStyles';
import zigZagSvg from './zig-zag.svg';
import downChevronSvg from './downChevron.svg';

type CodeBlockProps = {
  code: string;
  language?: Language;
  title?: string;
  previewSize?: number;
};

export default function CodeBlock({
  code,
  language,
  title,
  previewSize,
}: CodeBlockProps) {
  const [copyMessage, setCopyMessage] = useState('Copy');
  const [showSummary, setShowSummary] = useState(true);
  const [expanded, setExpanded] = useState(false);

  function handleSummaryTouchEnd(event: TouchEvent<HTMLElement>) {
    event.preventDefault();
    setExpanded(true);
    setShowSummary(false);
  }

  function handleSummaryClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const fromKeyboard = event.detail === 0;

    if (!expanded) {
      setExpanded(true);
      !fromKeyboard && setShowSummary(false);
    } else {
      setExpanded(false);
    }
  }

  function handleCopyClick() {
    try {
      navigator.clipboard.writeText(code.trim());
      setCopyMessage('Copied');
    } catch {
      setCopyMessage('Error');
    }

    // could be unmounted, but unlikely
    setTimeout(() => setCopyMessage('Copy'), 2000);
  }

  return (
    <Highlight code={code.trim()} language={language || 'javascript'}>
      {({ className, style, tokens: lines, getLineProps, getTokenProps }) => {
        const { previewLines, remainingLines } = splitLines(lines, previewSize);
        const expandable = remainingLines && remainingLines.length > 0 && !expanded;
        return (
          <Figure
            className={className + (expandable ? ' expandable' : '')}
            style={style}
          >
            {title && <FigCaption>{title}</FigCaption>}
            <Pre>
              <Code>
                {previewLines.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
                {remainingLines && (
                  <>
                    <Details open={expanded}>
                      <Summary
                        onClick={handleSummaryClick}
                        onTouchEnd={handleSummaryTouchEnd}
                        style={{ display: showSummary ? 'initial' : 'none' }}
                      >
                        {expanded
                          ? `Hide ${remainingLines.length} lines`
                          : `Show all - ${remainingLines.length} more lines`}
                      </Summary>

                      {remainingLines.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </Details>
                    <MoreLabel aria-hidden="true">
                      {remainingLines.length} more lines
                    </MoreLabel>
                  </>
                )}
              </Code>
              <CopyButton
                aria-label="Copy code to clipboard"
                onClick={handleCopyClick}
              >
                {copyMessage}
              </CopyButton>
            </Pre>
          </Figure>
        );
      }}
    </Highlight>
  );
}

const codeBlockPadding = '1rem';
const buttonPadding = { x: '0.4rem', y: '0.5rem' };
const buttonFont = `0.8rem/1.45 ${mainFontFamily}`;
const zigZagHeight = '10px';
const copyButtonInset = '0.5rem';

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
  position: relative;
  font: inherit;
  margin: 0;
  padding: 0;

  .expandable & {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: ${zigZagHeight};
      background: repeat-x 0 50% url(${zigZagSvg});
    }
  }
`;

const Code = styled.code`
  display: block;
  overflow-x: auto;
  font: inherit;
  padding: ${codeBlockPadding} 0;

  div {
    width: max-content;
    padding: 0 ${codeBlockPadding};
  }
`;

const Details = styled.details``;

const moreButtonPositionStyles = css`
  position: absolute;
  left: 50%;
  transform: translate(-50%, calc(-100% + ${codeBlockPadding}));
`;

const MoreLabel = styled.label`
  color: white;
  font: ${buttonFont};
  padding: ${buttonPadding.y} 0;

  ${moreButtonPositionStyles}

  &::after {
    content: url(${downChevronSvg});
    display: inline-block;
    margin-left: 0.5rem;
    width: 0.75rem;
    height: 0.5rem;
    vertical-align: baseline;
  }

  ${Details}[open] + & {
    display: none;
  }
`;

const buttonStyles = css`
  cursor: pointer;
  user-select: none;
  color: #fff;
  font: ${buttonFont};
  padding: ${buttonPadding.y} ${buttonPadding.x};
  border: 0;
  border-radius: ${borderRadius};
  background: black;

  opacity: 0;
  transition: opacity 200ms ease-in-out;

  ${Figure}:hover &, &:focus, ${Details}[open] & {
    opacity: 1;
  }
`;

const Summary = styled.summary`
  &::marker {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  list-style-type: none;

  z-index: 1;

  ${moreButtonPositionStyles}
  ${buttonStyles}
`;

const CopyButton = styled.button`
  ${buttonStyles}

  position: absolute;
  right: ${copyButtonInset};
  top: ${copyButtonInset};
`;

function splitLines<T>(lines: T[], size: number | undefined) {
  const previewLines = size === undefined ? lines : lines.slice(0, size);
  const remainingLines = size === undefined ? null : lines.slice(size);

  return { previewLines, remainingLines };
}
