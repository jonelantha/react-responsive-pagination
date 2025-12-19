import { FormRow } from './FormRow';

type CheckboxRowProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function CheckboxRow({ label, ...inputProps }: CheckboxRowProps) {
  return (
    <FormRow label={label} cellCols={2} htmlFor={inputProps.id}>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" {...inputProps} />
      </div>
    </FormRow>
  );
}
