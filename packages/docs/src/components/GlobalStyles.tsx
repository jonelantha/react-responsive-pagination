import { shade } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const mainFontFamily = `system-ui, -apple-system, BlinkMacSystemFont,
'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
'Segoe UI Emoji', 'Segoe UI Symbol'`;
export const monoFontFamily = `SFMono-Regular, Menlo, Monaco, Consolas,
'Liberation Mono', 'Courier New', monospace`;
export const headingFontFamily = `Trebuchet MS`;

export const fontWeightBold = 700;
export const fontWeightSemiBold = 500;
const headingLineHeight = 1.25;

const globalSpacing = '1rem';
export const spacingVertical = globalSpacing;
export const spacingHorizontal = globalSpacing;
const colorContent = '#1c1e21';

export const leading = '1.25rem';

export const borderRadius = '0.4rem';

export const colorLink = '#007bff';
const colorLinkHover = shade(0.2, colorLink);

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

  html, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  p {
    margin: 0 0 ${leading};
  }

  a {
    color: ${colorLink};

    &:hover {
      color: ${colorLinkHover};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${headingFontFamily};
    font-weight: ${fontWeightBold};
    line-height: ${headingLineHeight};
    color: inherit;
    margin: 0 0 ${spacingVertical} 0;
  }
`;

export default GlobalStyles;