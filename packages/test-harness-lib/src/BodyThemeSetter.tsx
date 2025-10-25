import { useEffect } from 'react';
import type { SubTheme } from './frameworkStyles';

export function BodyThemeSetter({ theme }: { theme: SubTheme }) {
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-pagination-subtheme', theme);
  }, [theme]);

  return null;
}
