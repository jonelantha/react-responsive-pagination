import type { JSX } from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import type { FrameworkId } from './frameworkStyles';
import { frameworkCssUrls } from './frameworkStyles';

type PageFontsAndStylesProps = {
  frameworkId: FrameworkId;
  children: JSX.Element;
};

export function PageFontsAndStyles({
  frameworkId,
  children,
}: PageFontsAndStylesProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready) {
      setupPageFontsAndStyles(frameworkCssUrls[frameworkId]).then(() =>
        setReady(true),
      );
    }
  }, [ready, frameworkId]);

  return ready ? (
    <FrameworkIdContext.Provider value={frameworkId}>
      {children}
    </FrameworkIdContext.Provider>
  ) : null;
}

async function setupPageFontsAndStyles(cssUrl: string | undefined) {
  await windowLoadPromise();

  await Promise.all([document.fonts.load('16px Roboto'), cssUrl && addCss(cssUrl)]);

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

export const FrameworkIdContext = createContext<FrameworkId | undefined>(undefined);

export function useFrameworkId() {
  return useContext(FrameworkIdContext);
}
