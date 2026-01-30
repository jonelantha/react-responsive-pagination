import type { ReactNode } from 'react';
import { useFrameworkId } from '../test-support/framework-styles';

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  const styles = useStyles();

  return <div className={styles.container}>{children}</div>;
}

function useStyles() {
  const frameworkId = useFrameworkId();

  return frameworkId === 'tailwind'
    ? {
        container: 'container mx-auto px-4',
      }
    : {
        container: 'container',
      };
}
