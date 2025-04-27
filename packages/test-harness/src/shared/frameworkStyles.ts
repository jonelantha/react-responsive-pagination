import { lazy } from 'react';

import bootstrapThemeUrl from 'react-responsive-pagination/themes/bootstrap.css?url';
import bootstrapLightDarkThemeUrl from 'react-responsive-pagination/themes/bootstrap-light-dark.css?url';
import minimalThemeUrl from 'react-responsive-pagination/themes/minimal.css?url';
import minimalLightDarkThemeUrl from 'react-responsive-pagination/themes/minimal-light-dark.css?url';
import classicThemeUrl from 'react-responsive-pagination/themes/classic.css?url';
import classicLightDarkThemeUrl from 'react-responsive-pagination/themes/classic-light-dark.css?url';
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
  bootstrapLightDarkTheme: cssLazyLoadComponent(bootstrapLightDarkThemeUrl),
  minimalTheme: cssLazyLoadComponent(minimalThemeUrl),
  minimalLightDarkTheme: cssLazyLoadComponent(minimalLightDarkThemeUrl),
  classicTheme: cssLazyLoadComponent(classicThemeUrl),
  classicLightDarkTheme: cssLazyLoadComponent(classicLightDarkThemeUrl),
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

export const subThemes = {
  Auto: '',
  Light: 'light',
  Dark: 'dark',
} as const;

export type SubTheme = (typeof subThemes)[keyof typeof subThemes];

const baseThemeVariables = [
  '--pagination-color',
  '--pagination-bg',
  '--pagination-border-color',
  '--pagination-active-bg',
  '--pagination-active-color',
  '--pagination-active-border-color',
  '--pagination-hover-color',
  '--pagination-hover-bg',
  '--pagination-hover-border-color',
  '--pagination-disabled-color',
  '--pagination-disabled-bg',
  '--pagination-disabled-border-color',
  '--pagination-focus-color',
  '--pagination-focus-bg',
  '--pagination-font-weight',
  '--pagination-active-font-weight',
];

export function getThemeVariables() {
  return [
    ...baseThemeVariables.map(variable => `${variable}-light`),
    ...baseThemeVariables.map(variable => `${variable}-dark`),
  ];
}

export function getThemeVariableTestValue(variable: string) {
  return variable.includes('font-weight') ? '800' : 'red';
}
