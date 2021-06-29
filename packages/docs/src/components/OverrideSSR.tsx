import { useEffect, useState } from 'react';

export default function OverrideSSR({ children }: NoSSRProps) {
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return children(isSSR);
}

type NoSSRProps = { children: (isSSR: boolean) => React.ReactNode };
