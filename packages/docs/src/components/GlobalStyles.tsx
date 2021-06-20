import { createGlobalStyle } from 'styled-components';

const mainFontFamily = `system-ui, -apple-system, BlinkMacSystemFont,
'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
'Segoe UI Emoji', 'Segoe UI Symbol'`;
export const monoFontFamily = `SFMono-Regular, Menlo, Monaco, Consolas,
'Liberation Mono', 'Courier New', monospace`;
export const headingFontFamily = `Trebuchet MS`;

const fontWeightBold = 700;
export const fontWeightSemiBold = 500;
const headingLineHeight = 1.25;

const globalSpacing = '1rem';
export const spacingVertical = globalSpacing;
export const spacingHorizontal = globalSpacing;
const colorContent = '#1c1e21';

export const leading = '1.25rem';

export const borderRadius = '0.4rem';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background-color: transparent;
    color: ${colorContent};
    font: 100%/1.65 ${mainFontFamily};
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizelegibility;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    word-wrap: break-word;
  }

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  p {
    margin: 0 0 ${leading};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font: 100%/1.65 ${headingFontFamily};
    color: inherit;
    font-weight: ${fontWeightBold};
    line-height: ${headingLineHeight};
    margin: 0 0 ${spacingVertical} 0;
  }
`;

export default GlobalStyles;
