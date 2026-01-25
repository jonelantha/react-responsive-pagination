import type { ReactNode } from 'react';
import { useFrameworkId } from '../test-support/framework-styles';

type FormRowProps = {
  label: string;
  htmlFor?: string;
  cellSize?: CellSize;
  flexCell?: boolean;
  children: ReactNode;
};

export type CellSize = 'small' | 'full';

export function FormRow({
  label,
  htmlFor,
  cellSize,
  flexCell,
  children,
}: FormRowProps) {
  const styles = useStyles(cellSize, flexCell);
  return (
    <div className={styles.row}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      <div className={styles.cell}>{children}</div>
    </div>
  );
}

function useStyles(cellSize: CellSize | undefined, flexCell: boolean | undefined) {
  const frameworkId = useFrameworkId();

  return frameworkId === 'tailwind'
    ? {
        row: 'flex flex-wrap mb-4',
        label: `w-full sm:w-1/3 block text-gray-700 dark:text-gray-300`,
        cell: `w-full ${cellSize === 'small' ? 'sm:w-1/6' : 'sm:w-2/3'} ${flexCell ? 'flex flex-wrap gap-x-4 gap-y-1 items-center' : ''}`,
      }
    : {
        row: 'mb-1 row',
        label: 'col-sm-4 col-form-label',
        cell: cellSize === 'small' ? 'col-sm-2' : 'col-sm-8',
      };
}
