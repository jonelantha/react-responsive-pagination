import { useFrameworkId } from '../test-support/framework-styles';
import { type CellSize, FormRow } from './FormRow';

type InputRowProps = {
  label: string;
  id: string;
  children: (attrs: { className: string; id: string }) => React.ReactNode;
  cellSize?: CellSize;
};

export function InputRow({ label, id, children, cellSize }: InputRowProps) {
  const styles = useStyles();

  return (
    <FormRow label={label} htmlFor={id} cellSize={cellSize}>
      {children({ className: styles.cell, id })}
    </FormRow>
  );
}

function useStyles() {
  const frameworkId = useFrameworkId();

  return frameworkId === 'tailwind'
    ? {
        cell: 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white',
      }
    : {
        cell: 'form-control',
      };
}
