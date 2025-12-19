import { FormRow } from './FormRow';
import type { ReactNode } from 'react';

type StyleRowProps = {
  label: string;
  children: ReactNode;
};

export function StyleRow({ label, children }: StyleRowProps) {
  return (
    <FormRow label={label} cellCols={8}>
      <div className="form-control">{children}</div>
    </FormRow>
  );
}
