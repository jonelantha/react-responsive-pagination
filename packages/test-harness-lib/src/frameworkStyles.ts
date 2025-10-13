import { lazy } from 'react';

import bootstrapThemeUrl from 'react-responsive-pagination/themes/bootstrap.css?raw';
import bootstrapLightDarkThemeUrl from 'react-responsive-pagination/themes/bootstrap-light-dark.css?raw';
import minimalThemeUrl from 'react-responsive-pagination/themes/minimal.css?raw';
import minimalLightDarkThemeUrl from 'react-responsive-pagination/themes/minimal-light-dark.css?raw';
import classicThemeUrl from 'react-responsive-pagination/themes/classic.css?raw';
import classicLightDarkThemeUrl from 'react-responsive-pagination/themes/classic-light-dark.css?raw';
import bootstrap5Css from 'bootstrap/dist/css/bootstrap.css?raw';

const frameworkStyles = {
  bootstrap400: cssLazyLoadComponent(
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',
  ),
  bootstrap4: cssLazyLoadComponent(
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
  ),
  bootstrap5: styleLazyLoadComponent(bootstrap5Css),
  bootstrapTheme: styleLazyLoadComponent(bootstrapThemeUrl),
  bootstrapLightDarkTheme: styleLazyLoadComponent(bootstrapLightDarkThemeUrl),
  minimalTheme: styleLazyLoadComponent(minimalThemeUrl),
  minimalLightDarkTheme: styleLazyLoadComponent(minimalLightDarkThemeUrl),
  classicTheme: styleLazyLoadComponent(classicThemeUrl),
  classicLightDarkTheme: styleLazyLoadComponent(classicLightDarkThemeUrl),
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

function styleLazyLoadComponent(css: string) {
  return lazy(async () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);

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
