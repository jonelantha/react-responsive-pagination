import { createContext, useContext } from 'react';

import bootstrapThemeUrl from 'react-responsive-pagination/themes/bootstrap.css?url';
import bootstrapLightDarkThemeUrl from 'react-responsive-pagination/themes/bootstrap-light-dark.css?url';
import minimalThemeUrl from 'react-responsive-pagination/themes/minimal.css?url';
import minimalLightDarkThemeUrl from 'react-responsive-pagination/themes/minimal-light-dark.css?url';
import classicThemeUrl from 'react-responsive-pagination/themes/classic.css?url';
import classicLightDarkThemeUrl from 'react-responsive-pagination/themes/classic-light-dark.css?url';
import bootstrap5Url from 'bootstrap/dist/css/bootstrap.css?url';
import tailwindUrl from '../css/tailwind.css?url';

export const frameworkCssUrls = {
  bootstrap400:
    'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css',
  bootstrap4:
    'https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css',
  bootstrap5: bootstrap5Url,
  bootstrapTheme: bootstrapThemeUrl,
  bootstrapLightDarkTheme: bootstrapLightDarkThemeUrl,
  minimalTheme: minimalThemeUrl,
  minimalLightDarkTheme: minimalLightDarkThemeUrl,
  classicTheme: classicThemeUrl,
  classicLightDarkTheme: classicLightDarkThemeUrl,
  tailwind: tailwindUrl,
};

export type FrameworkId = keyof typeof frameworkCssUrls;

export const frameworkIds = Object.keys(frameworkCssUrls) as FrameworkId[];

export const FrameworkIdContext = createContext<FrameworkId | undefined>(undefined);

export const useFrameworkId = () => useContext(FrameworkIdContext);

export const subThemes = ['none', 'light', 'dark'] as const;

export type SubTheme = (typeof subThemes)[number];

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
