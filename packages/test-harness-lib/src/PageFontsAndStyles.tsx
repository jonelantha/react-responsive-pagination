import { JSX, useEffect, useState } from 'react';

type PageFontsAndStylesProps = {
  cssUrl: string;
  children: JSX.Element;
};

export function PageFontsAndStyles({ cssUrl, children }: PageFontsAndStylesProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      setupPageFontsAndStyles(cssUrl).then(() => setReady(true));
    }
  }, [ready, cssUrl]);

  return ready ? children : null;
}

async function setupPageFontsAndStyles(cssUrl: string) {
  await windowLoadPromise();

  await Promise.all([
    await document.fonts.load('16px Roboto'),
    await addCss(cssUrl),
  ]);

  await new Promise(resolve => setTimeout(resolve, 100));
}

function windowLoadPromise() {
  return new Promise<void>(resolve => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', () => resolve());
    }
  });
}

export async function addCss(cssUrl: string) {
  return new Promise(resolve => {
    const cssLinkElement = document.createElement('link');
    cssLinkElement.href = cssUrl;
    cssLinkElement.rel = 'stylesheet';
    cssLinkElement.type = 'text/css';
    document.head.appendChild(cssLinkElement);
    cssLinkElement.onload = resolve;
  });
}
