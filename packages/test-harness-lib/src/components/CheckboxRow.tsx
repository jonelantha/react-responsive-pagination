import type { ReactNode } from 'react';
import { useFrameworkId } from '../test-support/framework-styles';
import { FormRow } from './FormRow';

type CheckboxRowProps = {
  label: string;
  id: string;
  children: (attrs: { className: string; id: string }) => ReactNode;
};

export function CheckboxRow({ label, id, children }: CheckboxRowProps) {
  const styles = useStyles();

  return (
    <FormRow label={label} cellSize="small" htmlFor={id}>
      <div className={styles.cell}>{children({ className: styles.input, id })}</div>
    </FormRow>
  );
}

function useStyles() {
  const frameworkId = useFrameworkId();

  return frameworkId === 'tailwind'
    ? {
        cell: 'flex items-center',
        input: 'w-4 h-4 rounded border-gray-300',
      }
    : {
        cell: 'form-check',
        input: 'form-check-input',
      };
}
