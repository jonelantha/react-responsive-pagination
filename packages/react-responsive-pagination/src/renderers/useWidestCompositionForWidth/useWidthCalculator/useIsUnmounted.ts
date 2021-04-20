import { useRef, useEffect, useCallback } from 'react';

export function useIsUnmounted() {
  const isUnmountedRef = useRef(false);
  isUnmountedRef.current = false;

  useEffect(() => {
    isUnmountedRef.current = false;
    return () => {
      isUnmountedRef.current = true;
    };
  }, []);

  return useCallback(() => isUnmountedRef.current, []);
}
