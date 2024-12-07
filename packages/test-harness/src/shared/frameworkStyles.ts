import { lazy } from 'react';

import bootstrapThemeUrl from 'react-responsive-pagination/themes/bootstrap.css?url';
import minimalThemeUrl from 'react-responsive-pagination/themes/minimal.css?url';
import classicThemeUrl from 'react-responsive-pagination/themes/classic.css?url';
import bootstrap5Url from 'bootstrap/dist/css/bootstrap.css?url';

const frameworkStyles = {
  bootstrap400: cssLazyLoadComponent(
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',
  ),
  bootstrap4: cssLazyLoadComponent(
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
  ),
  bootstrap5: cssLazyLoadComponent(bootstrap5Url),
  bootstrapTheme: cssLazyLoadComponent(bootstrapThemeUrl),
  minimalTheme: cssLazyLoadComponent(minimalThemeUrl),
  classicTheme: cssLazyLoadComponent(classicThemeUrl),
};

export const frameworkIds = Object.keys(frameworkStyles);

export function getFrameworkStyles(frameworkId: string | undefined) {
  return frameworkId !== undefined && frameworkId in frameworkStyles
    ? frameworkStyles[frameworkId as keyof typeof frameworkStyles]
    : NullStyles;
}

function NullStyles({ children }: { children: React.JSX.Element }) {
  return children;
}

function cssLazyLoadComponent(cssUrl: string) {
  return lazy(async () => {
    await new Promise(resolve => {
      const cssLinkElement = document.createElement('link');
      cssLinkElement.href = cssUrl;
      cssLinkElement.rel = 'stylesheet';
      cssLinkElement.type = 'text/css';
      document.head.appendChild(cssLinkElement);
      cssLinkElement.onload = resolve;
    });

    return { default: ({ children }: { children: React.JSX.Element }) => children };
  });
}
