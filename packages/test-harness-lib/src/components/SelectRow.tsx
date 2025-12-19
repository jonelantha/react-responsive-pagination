import { FormRow } from './FormRow';

type SelectRowProps = {
  label: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectRow({ label, options, ...selectProps }: SelectRowProps) {
  return (
    <FormRow label={label} cellCols={8} htmlFor={selectProps.id}>
      <select className="form-select" {...selectProps}>
        <option value="">Select</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FormRow>
  );
}
