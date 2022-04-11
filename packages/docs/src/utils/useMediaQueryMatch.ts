import { useEffect, useState } from 'react';

export function useMediaQueryMatch(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaMatch = window.matchMedia(query);

    const listener = () => setMatches(mediaMatch.matches);

    listener();

    mediaMatch.addEventListener('change', listener);

    return () => mediaMatch.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
