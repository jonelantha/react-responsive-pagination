import { lazy } from 'react';

const frameworkStyles = {
  bootstrap4: lazy(() => import('./Bootstrap4Styles')),
  bootstrap5: lazy(() => import('./Bootstrap5Styles')),
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
