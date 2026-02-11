import { useEffect } from 'react';

export function BodyThemeSetter({ theme }: { theme: string }) {
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-pagination-subtheme', theme);
  }, [theme]);

  return null;
}
