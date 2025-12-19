import { FormRow } from './FormRow';

type TextFieldRowProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function TextFieldRow({ label, ...inputProps }: TextFieldRowProps) {
  return (
    <FormRow label={label} cellCols={2} htmlFor={inputProps['id']}>
      <input type="text" className="form-control" {...inputProps} />
    </FormRow>
  );
}
