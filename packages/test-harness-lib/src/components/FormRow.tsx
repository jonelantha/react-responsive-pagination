import type { ReactNode } from 'react';

type FormRowProps = {
  label: string;
  htmlFor?: string;
  cellCols: number;
  children: ReactNode;
};

export function FormRow({ label, htmlFor, cellCols, children }: FormRowProps) {
  return (
    <div className="mb-1 row">
      <label className="col-sm-4 col-form-label" htmlFor={htmlFor}>
        {label}
      </label>
      <div className={`col-sm-${cellCols}`}>{children}</div>
    </div>
  );
}
