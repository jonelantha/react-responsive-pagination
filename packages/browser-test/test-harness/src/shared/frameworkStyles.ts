import { lazy } from 'react';

const frameworkStyles = {
  bootstrap400: lazy(() => import('./Bootstrap4_0_0Styles')),
  bootstrap4: lazy(() => import('./Bootstrap4Styles')),
  bootstrap5: lazy(() => import('./Bootstrap5Styles')),
  bootstrapLightTheme: lazy(() => import('./BootstrapLightTheme')),
  minimalLightTheme: lazy(() => import('./MinimalLightTheme')),
  classicLightTheme: lazy(() => import('./ClassicLightTheme')),
};

export const frameworkIds = Object.keys(frameworkStyles);

export function getFrameworkStyles(frameworkId: string | undefined) {
  return frameworkId !== undefined && frameworkId in frameworkStyles
    ? frameworkStyles[frameworkId as keyof typeof frameworkStyles]
    : NullStyles;
}

export default function NullStyles({ children }: { children: JSX.Element }) {
  return children;
}
