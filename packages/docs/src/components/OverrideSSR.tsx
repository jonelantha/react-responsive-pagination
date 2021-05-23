import { useEffect, useState } from 'react';

export default function OverrideSSR({ ssrContent, children }: NoSSRProps) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);

  return isServer ? ssrContent : children;
}

type NoSSRProps = { ssrContent: React.ReactNode; children: React.ReactNode };
